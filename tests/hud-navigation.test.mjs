import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHudNavigation } from '../src/client/hud-navigation.js';
import { createHudNotifications } from '../src/client/hud-notifications.js';
import { createGameSession } from '../src/client/game-session.js';

function fixture(openSession) {
  const inbox = createHudNotifications();
  inbox.observe([{ id: 'one', kind: 'done', tone: 'success', title: 'one' }]);
  const session = createGameSession({}, () => {}, () => { throw new Error('Must not change shell selection'); });
  session.open({ id: 'game', url: 'https://games.example/game' });
  const navigation = createHudNavigation({ get: () => ({ openSession }) }, session, inbox);
  return { inbox, session, navigation };
}

test('navigation refusal and rejection preserve game mode and notification', async () => {
  for (const open of [() => false, () => Promise.reject(new Error('Rejected'))]) {
    const { inbox, session, navigation } = fixture(open);
    assert.equal(await navigation.open('one'), false);
    assert.equal(session.getSnapshot().mode, 'full');
    assert.equal(inbox.getSnapshot().length, 1);
    assert.equal(navigation.getSnapshot().failed, true);
  }
});

test('navigation is serialized and acknowledges only after async success', async () => {
  let resolve, calls = 0;
  const { inbox, session, navigation } = fixture(() => { calls++; return new Promise(done => { resolve = done; }); });
  const first = navigation.open('one');
  assert.equal(await navigation.open('two'), false);
  assert.equal(calls, 1);
  assert.equal(session.getSnapshot().mode, 'full');
  assert.equal(inbox.getSnapshot().length, 1);
  assert.equal(navigation.getSnapshot().pending, true);
  resolve();
  assert.equal(await first, true);
  assert.equal(session.getSnapshot().mode, 'away');
  assert.equal(inbox.getSnapshot().length, 0);
});

test('delayed navigation cannot clear newer completions or overwrite a newer game', async () => {
  let resolve;
  const { inbox, session, navigation } = fixture(() => new Promise(done => { resolve = done; }));
  const opening = navigation.open('one');
  inbox.observe([]);
  inbox.observe([{ id: 'one', kind: 'done', tone: 'success', title: 'New completion' }]);
  session.open({ id: 'new', url: 'https://games.example/new' });
  resolve();
  await opening;
  assert.equal(inbox.getSnapshot().length, 1);
  assert.equal(session.getSnapshot().mode, 'full');
  assert.equal(session.getSnapshot().game.id, 'new');
});
