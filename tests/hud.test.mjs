import { test } from 'node:test';
import assert from 'node:assert/strict';
import { composeHudRows, hudTone, createSessionSelectors, createHudProjection } from '../src/client/hud-model.js';
import { mergeHudNotices } from '../src/client/hud-notifications.js';

const titles = { s1: '修复登录', s2: '', s3: '部署', s4: '文档' };
const statuses = new Map([
  ['s1', { pendingInteraction: { key: 'ask' }, running: true, completionUnread: true }],
  ['s2', { running: true }], ['s3', { completionUnread: true }], ['s4', {}],
]);

test('HUD precedence is question, unread completion, running; settled rows stay hidden', () => {
  const rows = composeHudRows(statuses, titles);
  assert.deepEqual(rows.map(row => [row.id, row.kind, row.tone]), [
    ['s1', 'question', 'warn'], ['s2', 'running', 'live'], ['s3', 'done', 'success'],
  ]);
  assert.equal(rows[0].title, titles.s1);
  assert.deepEqual(composeHudRows(undefined, titles), []);
  assert.deepEqual(composeHudRows(new Map([['bad', null]]), titles), []);
  assert.equal(composeHudRows(new Map([['unknown', { running: true }]]), {}).at(0).title, '');
  assert.equal(hudTone(rows), 'warn');
  assert.equal(hudTone(rows.slice(1)), 'success');
  assert.equal(hudTone(rows.slice(1, 2)), 'live');
});

test('HUD keeps decisions before completions and running rows regardless of arrival order', () => {
  const rows = [{ id: 'run', kind: 'running' }, { id: 'ask-new', kind: 'question' }];
  const notices = [{ id: 'done-old', kind: 'done' }, { id: 'ask-old', kind: 'question' }, { id: 'done-new', kind: 'done' }];
  assert.deepEqual(mergeHudNotices(rows, notices).map(row => row.id),
    ['ask-old', 'ask-new', 'done-old', 'done-new', 'run']);
});

test('HUD selectors retain reference identity across unrelated store updates', () => {
  const select = createSessionSelectors();
  const firstStatus = select.status(statuses);
  const firstTitles = select.titles({ byId: { s1: { title: '修复登录', messages: [] } } });
  const nextStatus = new Map([...statuses].map(([id, entry]) => [id, { ...entry, tokenCount: 200 }]));
  nextStatus.set('irrelevant', { tokenCount: 50 });
  assert.equal(select.status(nextStatus), firstStatus);
  assert.equal(select.titles({ byId: { s1: { title: '修复登录', messages: ['streaming'] } } }), firstTitles);
  nextStatus.set('s2', { completionUnread: true });
  assert.notEqual(select.status(nextStatus), firstStatus);
  assert.notEqual(select.titles({ byId: { s1: { title: '新标题' } } }), firstTitles);
});

test('HUD projection ignores unshown titles but updates visible titles, row order and readiness', () => {
  const select = createSessionSelectors(), project = createHudProjection();
  const facts = select.status(statuses);
  const first = project(facts, select.titles({ byId: { s1: { title: 'First' } } }));
  const unchanged = project(facts, select.titles({ byId: { s1: { title: 'First' }, hidden: { title: 'background' } } }));
  assert.equal(unchanged, first);
  assert.equal(unchanged.rows, first.rows);
  const renamed = project(facts, select.titles({ byId: { s1: { title: 'Renamed' } } }));
  assert.equal(renamed.rows[0].title, 'Renamed');
  assert.notEqual(renamed, first);
  const reordered = project(select.status(new Map([...statuses].reverse())), select.titles({ byId: {} }));
  assert.equal(reordered.rows[0].id, 's3');
  const unavailable = project(undefined, undefined);
  assert.equal(unavailable.ready, false);
  assert.deepEqual(unavailable.rows, []);
  assert.equal(project(undefined, undefined), unavailable);
});

test('HUD rejects incompatible snapshot shapes instead of treating store objects as facts', () => {
  const select = createSessionSelectors();
  assert.equal(select.status({ getSnapshot() {} }), undefined);
  assert.equal(select.titles(new Map()), undefined);
  assert.equal(select.titles({ byId: [] }), undefined);
  assert.equal(select.titles(null), undefined);
  assert.deepEqual(select.titles({ byId: { missing: null } }), { missing: '' });
});
