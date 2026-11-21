import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeGame, gamesUpstreamQuery, gamesResult, homeResult } from '../src/host/catalog.js';
import { createCatalogCache } from '../src/host/catalog-cache.js';

const raw = { id: 1, name: ' Game ', url: 'https://games.example/play', category: ' Puzzle, Casual ,Puzzle,,', cover_image: 'https://games.example/cover' };
const query = text => new URL(gamesUpstreamQuery(new URL(`https://host.example/games?${text}`)), 'https://api.bee.games').searchParams;

test('upstream games reject missing names, unsafe URLs and embedded credentials', () => {
  for (const value of [null, {}, { ...raw, name: undefined }, { ...raw, name: '  ' }, { ...raw, id: undefined },
    ...['http://games.example/play', 'javascript:alert(1)', 'file:///game.html', 'https://user:secret@games.example/play'].map(url => ({ ...raw, url }))]) {
    assert.equal(normalizeGame(value), null, JSON.stringify(value));
  }
  const result = normalizeGame(raw);
  assert.equal(result.id, '1'); assert.equal(result.name, 'Game');
  assert.deepEqual(result.category, ['Puzzle', 'Casual']);
  assert.equal(result.orientation, 'responsive');
  assert.deepEqual(normalizeGame({ ...raw, category: ['Puzzle', ' Casual, Racing ', null] }).category, ['Puzzle', 'Casual', 'Racing']);
  assert.equal(normalizeGame({ ...raw, cover_image: 'http://unsafe.example/cover' }).image, '');
});

test('upstream query clamps numeric inputs, caps text, encodes values and prefers cursor to page', () => {
  assert.equal(query('page_size=1000').get('page_size'), '36');
  assert.equal(query('page_size=-5').get('page_size'), '1');
  assert.equal(query('page_size=bad').get('page_size'), '36');
  for (const page of ['Infinity', 'NaN', '-10', '99999999999999999999']) assert.equal(query(`page=${page}`).get('page'), '1');
  assert.equal(query('page=2.9').get('page'), '2');
  const cursor = query('cursor=abc&page=20');
  assert.equal(cursor.get('cursor'), 'abc'); assert.equal(cursor.has('page'), false);
  const text = query('search=%20a%26b%20&categories=%20Puzzle%20&locale=');
  assert.equal(text.get('search'), 'a&b'); assert.equal(text.get('categories'), 'Puzzle'); assert.equal(text.get('locale'), 'zh-CN');
  assert.equal(query('search=' + 'x'.repeat(200)).get('search').length, 128);
});

test('catalog normalization removes duplicate/invalid items and rejects empty home payloads', () => {
  assert.equal(gamesResult({ items: [raw, { ...raw, name: 'duplicate' }, null], has_more: true }).games.length, 1);
  assert.deepEqual(gamesResult({ items: {} }).games, []);
  assert.throws(() => homeResult({}), /empty/);
  assert.equal(homeResult({ featured: [raw], trending: [raw] }).games.length, 1);
});

test('catalog cache coalesces concurrent requests and expires after exactly 60 seconds', async () => {
  let time = 0, loads = 0, finish;
  const cache = createCatalogCache({ now: () => time });
  const load = () => { loads += 1; return new Promise(resolve => { finish = resolve; }); };
  const first = cache.get('home/en', load), second = cache.get('home/en', load);
  assert.equal(first, second); await Promise.resolve(); assert.equal(loads, 1);
  finish({ games: ['first'] }); const initial = await first;
  time = 59_999; assert.equal(await cache.get('home/en', load), initial);
  time = 60_000; const expired = cache.get('home/en', load); await Promise.resolve();
  assert.equal(loads, 2); finish({ games: ['fresh'] });
  assert.deepEqual(await expired, { games: ['fresh'] });
});

test('failed loads are retryable and cache memory is bounded with LRU eviction', async () => {
  const cache = createCatalogCache({ maxEntries: 2 });
  await assert.rejects(cache.get('failure', () => { throw new Error('offline'); }), /offline/);
  assert.equal(await cache.get('failure', () => 'recovered'), 'recovered');
  await cache.get('a', () => 'a'); await cache.get('b', () => 'b');
  assert.equal(await cache.get('a', () => 'wrong'), 'a');
  await cache.get('c', () => 'c');
  assert.equal(await cache.get('b', () => 'reloaded'), 'reloaded');
  cache.clear(); assert.equal(await cache.get('a', () => 'after-clear'), 'after-clear');
});
