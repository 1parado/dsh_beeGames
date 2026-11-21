import { test } from 'node:test';
import assert from 'node:assert/strict';
import { httpsUrl, gameUrl } from '../src/shared/urls.js';
import { savedGame, readRecords } from '../src/client/records.js';
import { createGameSession } from '../src/client/game-session.js';

test('game URL guard rejects normalized host origins but keeps HTTPS games on other origins', () => {
  const origin = 'https://harness.example';
  for (const url of ['https://harness.example/game', 'https://HARNESS.example:443/game', 'https://harness.example/a/../game']) assert.equal(gameUrl(url, origin), '');
  assert.equal(gameUrl('https://games.example/game', origin), 'https://games.example/game');
  assert.equal(gameUrl('https://harness.example:8443/game', origin), 'https://harness.example:8443/game');
  assert.equal(httpsUrl('https://harness.example/cover'), 'https://harness.example/cover');
  for (const url of ['http://games.example', 'data:text/html,hello', 'https://user:pass@games.example', '//games.example']) assert.equal(gameUrl(url, origin), '');
});

test('same-origin games cannot enter through network data, saved records, or direct session open', () => {
  const oldLocation = Object.getOwnPropertyDescriptor(globalThis, 'location');
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const local = { id: 'poisoned', name: 'Game', url: 'https://harness.example/game', category: [] };
  const external = { ...local, id: 'safe', url: 'https://games.example/game' };
  Object.defineProperty(globalThis, 'location', { value: { origin: 'https://harness.example' }, configurable: true });
  Object.defineProperty(globalThis, 'window', { value: { localStorage: { getItem: () => JSON.stringify({ favorites: [local, external], recent: [local] }) } }, configurable: true });
  try {
    assert.equal(savedGame(local), null);
    assert.deepEqual(readRecords().favorites.map(game => game.id), ['safe']);
    assert.deepEqual(readRecords().recent, []);
    const session = createGameSession({}, () => {}, () => true);
    assert.equal(session.open(local), false); assert.equal(session.getSnapshot().game, null);
    session.open(external); assert.equal(session.getSnapshot().game.id, 'safe');
  } finally {
    if (oldLocation) Object.defineProperty(globalThis, 'location', oldLocation); else delete globalThis.location;
    if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow); else delete globalThis.window;
  }
});
