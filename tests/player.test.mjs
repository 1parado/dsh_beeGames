import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createGameSession } from '../src/client/game-session.js';
import { createPauseBridge } from '../src/client/pause-bridge.js';
const game = { id: 'a', name: 'Game', url: 'https://example.test/game', category: [] };

test('leave, page unmount, restore, and mini mode retain the game object', () => {
  const navigations = [];
  const session = createGameSession({ favorites: [], recent: [] }, () => {}, id => navigations.push(id));
  session.open(game);
  const instance = session.getSnapshot().game;
  const anchor = {};
  session.attach(anchor);
  session.leave();
  session.attach(null);
  assert.equal(session.getSnapshot().mode, 'away');
  assert.equal(session.getSnapshot().game, instance);
  session.resume();
  session.attach(anchor);
  session.minimize();
  session.attach(null);
  assert.equal(session.getSnapshot().mode, 'mini');
  session.resume();
  session.open({ ...game });
  assert.equal(session.getSnapshot().game, instance);
  assert.deepEqual(navigations, [null, 'beegame', 'beegame']);
  session.attach(anchor);
  session.attach(null);
  assert.equal(session.getSnapshot().mode, 'away', 'direct sidebar navigation also keeps the game');
  session.show();
  assert.equal(session.getSnapshot().game, instance);
  session.close();
  assert.equal(session.getSnapshot().game, null);
});

test('only a different URL or game replaces the current instance', () => {
  const session = createGameSession({}, () => {}, () => {});
  session.open(game);
  session.open({ ...game, url: `${game.url}/other` });
  assert.notEqual(session.getSnapshot().game, game);
  assert.equal(session.getSnapshot().game.url, `${game.url}/other`);
});

test('shared records persist values and remain usable after main unmount', () => {
  const writes = [];
  const session = createGameSession({ favorites: [], recent: [] }, records => writes.push(records), () => {});
  session.updateRecords(current => ({ ...current, favorites: [game] }));
  session.leave();
  session.updateRecords(current => ({ ...current, recent: [game] }));
  assert.equal(writes.length, 2);
  assert.equal(typeof writes[0], 'object');
  assert.equal(session.getSnapshot().records.favorites[0], game);
  assert.equal(session.getSnapshot().records.recent[0], game);
});

test('snapshot notifications are stable; failed navigation keeps the return control', () => {
  const session = createGameSession({}, () => {}, () => false);
  let changes = 0;
  const off = session.subscribe(() => { changes += 1; });
  const snapshot = session.getSnapshot();
  session.attach(null);
  assert.equal(session.getSnapshot(), snapshot);
  assert.equal(changes, 0);
  session.open(game);
  session.leave();
  session.resume();
  assert.equal(session.getSnapshot().mode, 'away');
  const count = changes;
  off();
  session.close();
  assert.equal(changes, count);
});

function bridgeHarness() {
  const messages = [];
  const statuses = [];
  const listeners = new Set();
  const pending = new Map();
  let serial = 0;
  const timers = {
    setTimeout: fn => { pending.set(++serial, fn); return serial; },
    clearTimeout: id => pending.delete(id),
  };
  const frame = { contentWindow: { postMessage: (data, origin) => messages.push({ data, origin }) } };
  const events = {
    addEventListener: (_, fn) => listeners.add(fn),
    removeEventListener: (_, fn) => listeners.delete(fn),
  };
  const bridge = createPauseBridge(frame, game.url, status => statuses.push(status), events, timers);
  const dispatch = (data, overrides = {}) => {
    for (const listener of listeners) listener({ source: frame.contentWindow, origin: 'https://example.test', data: { version: 1, ...data }, ...overrides });
  };
  const capabilities = () => dispatch({ type: 'beegame:capabilities', requestId: messages.at(-1).data.requestId, pause: true });
  return { bridge, messages, statuses, listeners, pending, dispatch, capabilities };
}

test('pause and resume require matching game acknowledgements', () => {
  const h = bridgeHarness();
  h.bridge.setPaused(true);
  h.bridge.connect();
  assert.equal(h.statuses.at(-1), 'unavailable');
  h.capabilities();
  assert.equal(h.statuses.at(-1), 'requesting');
  const pause = h.messages.at(-1);
  assert.equal(pause.origin, 'https://example.test');
  assert.equal(pause.data.paused, true);
  h.dispatch({ type: 'beegame:paused', requestId: pause.data.requestId, paused: true });
  assert.equal(h.statuses.at(-1), 'paused');
  h.bridge.setPaused(false);
  const resume = h.messages.at(-1).data;
  assert.equal(resume.paused, false);
  h.dispatch({ type: 'beegame:paused', requestId: resume.requestId, paused: false });
  assert.equal(h.statuses.at(-1), 'playing');
  assert.equal(h.pending.size, 0);
  h.bridge.dispose();
  assert.equal(h.listeners.size, 0);
});

test('cross-origin, wrong-window, outdated, and contradictory responses cannot claim pause', () => {
  const h = bridgeHarness();
  h.bridge.connect();
  const hello = h.messages.at(-1).data.requestId;
  const cap = { type: 'beegame:capabilities', requestId: hello, pause: true };
  h.dispatch(cap, { origin: 'https://untrusted.test' });
  h.dispatch(cap, { source: {} });
  h.dispatch({ ...cap, requestId: 'old' });
  assert.equal(h.messages.length, 1);
  h.dispatch(cap);
  const oldCommand = h.messages.at(-1).data.requestId;
  h.bridge.setPaused(true);
  const command = h.messages.at(-1).data.requestId;
  h.dispatch({ type: 'beegame:paused', requestId: oldCommand, paused: false });
  h.dispatch({ type: 'beegame:paused', requestId: command, paused: false });
  assert.equal(h.statuses.at(-1), 'requesting');
  h.dispatch({ type: 'beegame:paused', requestId: command, paused: true }, { origin: 'null' });
  assert.equal(h.statuses.at(-1), 'requesting');
  for (const fn of h.pending.values()) fn();
  assert.equal(h.statuses.at(-1), 'unavailable');
  h.dispatch({ type: 'beegame:paused', requestId: command, paused: true });
  assert.equal(h.statuses.at(-1), 'unavailable', 'late acknowledgement cannot undo timeout');
  h.bridge.dispose();
});

test('reload clears capability and stale confirmations; disposal clears timers', () => {
  const h = bridgeHarness();
  h.bridge.connect();
  h.capabilities();
  const command = h.messages.at(-1).data.requestId;
  h.bridge.connect();
  h.dispatch({ type: 'beegame:paused', requestId: command, paused: false });
  assert.equal(h.statuses.at(-1), 'unavailable');
  h.capabilities();
  assert.equal(h.pending.size, 1);
  h.bridge.dispose();
  assert.equal(h.pending.size, 0);
});
