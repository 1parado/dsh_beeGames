import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCatalogStore } from '../src/client/catalog-store.js';

const game = id => ({ id, name: id, url: `https://games.example/${id}`, category: [] });
const payload = (ids, extra = {}) => ({ games: ids.map(game), ...extra });
const ids = games => games.map(item => item.id);
const flush = () => new Promise(resolve => setImmediate(resolve));
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function clock() {
  let now = 0, serial = 0;
  const timers = new Map();
  return {
    setTimeout: (fn, delay) => { timers.set(++serial, { fn, due: now + delay }); return serial; },
    clearTimeout: id => timers.delete(id),
    advance(ms) {
      now += ms;
      for (const [id, timer] of timers) if (timer.due <= now) { timers.delete(id); timer.fn(); }
    },
    get pending() { return timers.size; },
  };
}
function harness(respond = () => payload(['result'])) {
  const calls = [], scheduler = clock();
  const store = createCatalogStore((path, timeout) => {
    const url = new URL(path, 'https://host.example');
    calls.push({ url, timeout });
    return url.pathname.endsWith('/home') ? Promise.resolve(payload(['home'])) : respond(url);
  }, scheduler);
  return { store, calls, scheduler };
}

test('search debounces for 400ms and sends only the final trimmed query', async () => {
  const h = harness();
  await h.store.activate('en');
  h.store.setQuery('a'); h.scheduler.advance(200); h.store.setQuery(' ab ');
  h.scheduler.advance(399); await flush();
  assert.equal(h.calls.length, 1);
  h.scheduler.advance(1); await flush();
  assert.equal(h.calls.length, 2);
  assert.equal(h.calls[1].url.searchParams.get('search'), 'ab');
  assert.equal(h.calls[1].url.searchParams.get('locale'), 'en');
  assert.equal(h.calls[1].timeout, 9_000);
  assert.deepEqual(ids(h.store.getSnapshot().searchResults), ['result']);
  h.store.deactivate();
});

test('a previous search response cannot win during the next debounce interval', async () => {
  const old = deferred(), latest = deferred();
  const h = harness(url => url.searchParams.get('search') === 'old' ? old.promise : latest.promise);
  await h.store.activate('en');
  h.store.setQuery('old'); h.scheduler.advance(400);
  h.store.setQuery('latest'); old.resolve(payload(['obsolete'])); await flush();
  assert.deepEqual(h.store.getSnapshot().searchResults, []);
  assert.equal(h.store.getSnapshot().searching, true);
  h.scheduler.advance(400); latest.resolve(payload(['current'])); await flush();
  assert.deepEqual(ids(h.store.getSnapshot().searchResults), ['current']);
  h.store.deactivate();
});

test('clearing search and unmounting cancel timers and ignore in-flight completions', async () => {
  const old = deferred();
  const h = harness(() => old.promise);
  await h.store.activate('en');
  h.store.setQuery('old'); h.scheduler.advance(400); h.store.setQuery('');
  old.resolve(payload(['obsolete'])); await flush();
  assert.equal(h.store.getSnapshot().searchResults, null);
  h.store.setQuery('pending'); h.store.deactivate(); h.scheduler.advance(500);
  assert.equal(h.scheduler.pending, 0);
  assert.equal(h.calls.length, 2);
});

test('out-of-order home responses cannot revert a changed language', async () => {
  const old = deferred(), latest = deferred();
  const store = createCatalogStore(path => path.includes('zh-CN') ? old.promise : latest.promise, clock());
  const oldWork = store.activate('zh-CN'), latestWork = store.activate('en');
  latest.resolve(payload(['English'])); await latestWork;
  old.resolve(payload(['中文'])); await oldWork;
  assert.deepEqual(ids(store.getSnapshot().homeGames), ['English']);
  assert.equal(store.getSnapshot().loading, false);
  store.deactivate();
});

test('a superseded category failure cannot clear a newer category or its loading state', async () => {
  const old = deferred(), latest = deferred();
  const h = harness(url => url.searchParams.get('categories') === 'Puzzle' ? old.promise : latest.promise);
  await h.store.activate('en');
  const oldWork = h.store.changeCategory('Puzzle'), newWork = h.store.changeCategory('Racing');
  old.reject(new Error('old failure')); await oldWork;
  assert.equal(h.store.getSnapshot().discoverLoadingMore, true);
  latest.resolve(payload(['race'], { hasMore: true })); await newWork;
  assert.equal(h.store.getSnapshot().category, 'Racing');
  assert.deepEqual(ids(h.store.getSnapshot().categoryResults), ['race']);
  assert.equal(h.store.getSnapshot().discoverError, '');
  h.store.deactivate();
});

test('category pagination without cursors advances 1, 2, 3 and deduplicates records', async () => {
  const h = harness(url => payload(['same', `page${url.searchParams.get('page')}`], { hasMore: true }));
  await h.store.activate('en'); await h.store.changeCategory('Puzzle');
  await h.store.loadMoreGames(); await h.store.loadMoreGames();
  assert.deepEqual(h.calls.slice(1).map(call => call.url.searchParams.get('page')), ['1', '2', '3']);
  assert.deepEqual(ids(h.store.getSnapshot().categoryResults), ['same', 'page1', 'page2', 'page3']);
  h.store.deactivate();
});

test('discover stops after two pages without new games and restarts on category change', async () => {
  const h = harness(() => payload(['home'], { hasMore: true }));
  await h.store.activate('en'); await h.store.loadMoreGames();
  assert.equal(h.store.getSnapshot().discoverHasMore, true);
  await h.store.loadMoreGames(); await h.store.loadMoreGames();
  assert.equal(h.store.getSnapshot().discoverHasMore, false);
  assert.equal(h.calls.length, 3);
  assert.deepEqual(h.calls.slice(1).map(call => call.url.searchParams.get('page')), ['2', '3']);
  await h.store.changeCategory('Puzzle');
  assert.equal(h.store.getSnapshot().discoverHasMore, true);
  h.store.deactivate();
});

test('repeated cursors cannot create an endless discover request loop', async () => {
  const h = harness(() => payload(['new'], { hasMore: true, cursor: 'same-cursor' }));
  await h.store.activate('en'); await h.store.loadMoreGames(); await h.store.loadMoreGames();
  assert.equal(h.store.getSnapshot().discoverHasMore, false);
  await h.store.loadMoreGames(); assert.equal(h.calls.length, 3);
  h.store.deactivate();
});

test('simultaneous load-more calls share the in-progress page and failure is explicitly retryable', async () => {
  const pending = deferred(); let attempts = 0;
  const h = harness(() => ++attempts === 1 ? pending.promise : payload(['retry'], { hasMore: false }));
  await h.store.activate('en');
  const first = h.store.loadMoreGames(), second = h.store.loadMoreGames();
  assert.equal(attempts, 1);
  pending.reject(new Error('network')); await Promise.all([first, second]);
  assert.equal(h.store.getSnapshot().discoverHasMore, false);
  assert.equal(h.store.getSnapshot().discoverError, 'loadFailed');
  await h.store.loadMoreGames();
  assert.deepEqual(ids(h.store.getSnapshot().homeGames), ['home', 'retry']);
  assert.equal(h.store.getSnapshot().discoverError, '');
  h.store.deactivate();
});

test('refresh invalidates a previous discover page before replacing the home listing', async () => {
  const pending = deferred(); const h = harness(() => pending.promise);
  await h.store.activate('en'); const more = h.store.loadMoreGames();
  await h.store.refresh(); pending.resolve(payload(['obsolete'], { hasMore: true })); await more;
  assert.deepEqual(ids(h.store.getSnapshot().homeGames), ['home']);
  assert.equal(h.store.getSnapshot().discoverLoadingMore, false);
  h.store.deactivate();
});

test('search pages deduplicate games and stop if the cursor fails to advance', async () => {
  const h = harness(url => payload(url.searchParams.has('cursor') ? ['same', 'second'] : ['same'], { hasMore: true, cursor: 'cursor1' }));
  await h.store.activate('en'); h.store.setQuery('game'); h.scheduler.advance(400); await flush();
  await h.store.loadMoreSearch();
  assert.deepEqual(ids(h.store.getSnapshot().searchResults), ['same', 'second']);
  assert.equal(h.store.getSnapshot().searchHasMore, false);
  await h.store.loadMoreSearch(); assert.equal(h.calls.length, 3);
  h.store.deactivate();
});

test('offline fallback replaces the selected category and prevents late pages from overwriting it', async () => {
  const home = deferred(), category = deferred();
  const store = createCatalogStore(path => path.includes('/home') ? home.promise : path === '/seed' ? Promise.resolve(payload(['seed'])) : category.promise, clock());
  const activation = store.activate('en'), categoryWork = store.changeCategory('Puzzle');
  home.reject(new Error('offline')); await activation;
  category.resolve(payload(['obsolete'], { hasMore: true })); await categoryWork;
  const state = store.getSnapshot();
  assert.equal(state.offline, true); assert.equal(state.category, '');
  assert.equal(state.categoryResults, null); assert.equal(state.discoverHasMore, false);
  assert.deepEqual(ids(state.homeGames), ['seed']);
  store.deactivate();
});
