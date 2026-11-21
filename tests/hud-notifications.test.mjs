import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHudNotifications, mergeHudNotices } from '../src/client/hud-notifications.js';

const done = (id, title = id) => ({ id, title, kind: 'done', tone: 'success' });

test('decisions have persistent banners until opened, and resolved decisions disappear', () => {
  const inbox = createHudNotifications();
  const question = { id: 'ask', title: 'Approve', kind: 'question', tone: 'warn' };
  inbox.observe([done('one'), question]);
  assert.equal(mergeHudNotices([done('one'), question], inbox.getSnapshot())[0].kind, 'question');
  const notice = inbox.getSnapshot().find(row => row.id === 'ask');
  inbox.acknowledge('ask', notice.notificationId);
  inbox.observe([question, done('one')]);
  assert.equal(inbox.getSnapshot().some(row => row.id === 'ask'), false);
  assert.equal(mergeHudNotices([question], inbox.getSnapshot())[0].kind, 'question');
  inbox.observe([]);
  inbox.observe([question]);
  assert.equal(inbox.getSnapshot().some(row => row.id === 'ask'), true);
  inbox.observe([]);
  assert.equal(inbox.getSnapshot().some(row => row.id === 'ask'), false);
});

test('every completion survives host unread resets, new runs and removed sessions', () => {
  const inbox = createHudNotifications();
  inbox.observe([done('one'), done('two')]);
  const original = inbox.getSnapshot();
  inbox.observe([]);
  assert.equal(inbox.getSnapshot(), original);
  inbox.observe([{ id: 'one', title: 'Renamed', kind: 'running', tone: 'live' }]);
  assert.deepEqual(inbox.getSnapshot().map(notice => notice.title), ['Renamed', 'two']);
  assert.equal(inbox.getSnapshot()[0].notificationId, original[0].notificationId);
  inbox.observe([done('three')]);
  assert.deepEqual(inbox.getSnapshot().map(notice => notice.id), ['one', 'two', 'three']);
});

test('acknowledging one task keeps others and does not revive an unchanged host unread flag', () => {
  const inbox = createHudNotifications();
  const rows = [done('one'), done('two')];
  inbox.observe(rows);
  inbox.acknowledge('one', inbox.getSnapshot()[0].notificationId);
  assert.deepEqual(inbox.getSnapshot().map(notice => notice.id), ['two']);
  inbox.observe(rows.map(row => ({ ...row })));
  assert.deepEqual(inbox.getSnapshot().map(notice => notice.id), ['two']);
  const display = mergeHudNotices(rows, inbox.getSnapshot());
  assert.deepEqual(display.map(row => row.id), ['two']);
});

test('a later completion can notify again and cannot be dismissed by an older navigation', () => {
  const inbox = createHudNotifications();
  inbox.observe([done('one')]);
  const first = inbox.getSnapshot()[0];
  inbox.observe([{ id: 'one', title: 'one', kind: 'running', tone: 'live' }]);
  inbox.observe([done('one')]);
  const second = inbox.getSnapshot()[0];
  assert.notEqual(second.notificationId, first.notificationId);
  assert.equal(inbox.getSnapshot().length, 1);
  inbox.acknowledge('one', first.notificationId);
  assert.equal(inbox.getSnapshot()[0], second);
  inbox.acknowledge('one', second.notificationId);
  assert.deepEqual(inbox.getSnapshot(), []);
  inbox.observe([]);
  inbox.observe([done('one')]);
  assert.equal(inbox.getSnapshot().length, 1);
});

test('merged HUD rows retain decisions and show pending completions after the host clears them', () => {
  const question = { id: 'one', title: 'Question', kind: 'question', tone: 'warn' };
  const running = { id: 'two', title: 'Running', kind: 'running', tone: 'live' };
  const notices = [done('one'), done('two'), done('three')];
  assert.deepEqual(mergeHudNotices([question, running], notices), [question, notices[1], notices[2]]);
  assert.deepEqual(mergeHudNotices([], notices), notices);
  assert.deepEqual(mergeHudNotices([done('acknowledged')], []), []);
});

test('inbox updates preserve snapshot identity for unrelated changes and clean subscriptions', () => {
  const inbox = createHudNotifications();
  let updates = 0;
  const unsubscribe = inbox.subscribe(() => updates++);
  inbox.observe([done('one')]);
  const initial = inbox.getSnapshot();
  inbox.observe([{ ...done('one'), tokenCount: 100 }]);
  inbox.acknowledge('missing', 100);
  assert.equal(inbox.getSnapshot(), initial);
  assert.equal(updates, 1);
  inbox.observe([done('one', 'Renamed')]);
  assert.equal(updates, 2);
  unsubscribe();
  inbox.acknowledge('one', inbox.getSnapshot()[0].notificationId);
  assert.equal(updates, 2);
  inbox.dispose();
  assert.deepEqual(inbox.getSnapshot(), []);
});
