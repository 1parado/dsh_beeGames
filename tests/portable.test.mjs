import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { test } from 'node:test';
import vm from 'node:vm';
import { apply, ROUTE_PREFIX } from '../index.js';
import { SEED_CATALOG } from '../seed.js';
import { createApi } from '../src/client/api.js';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('client.js', root), 'utf8');
function clientAt(baseURI) {
  let client;
  const externalModules = [];
  vm.runInNewContext(source, {
    window: { __ModuleLoader__: { load: specification => {
      assert.equal(specification.id, 'dsh-beegame');
      client = specification.factory(name => { externalModules.push(name); assert.equal(name, 'react'); return { memo: component => component }; });
    } } },
    document: { baseURI }, URL, AbortSignal, setTimeout, clearTimeout,
  });
  return { client, externalModules };
}

function hostWith(connection) {
  let route;
  const ctx = {
    logger: { warn() {} }, get: () => connection,
    inject: (names, callback) => callback(ctx), effect: callback => callback(),
    webServer: { register: value => { route = value; return () => {}; } },
  };
  apply(ctx);
  assert.equal(route.path, ROUTE_PREFIX);
  return route;
}
async function invoke(route, path, headers = {}, method = 'GET') {
  let status, responseHeaders, body;
  await route.handler({ url: path, method, headers: { host: 'localhost:51273', ...headers } }, {
    writeHead: (code, values) => { status = code; responseHeaders = values; },
    end: value => { body = value; },
  });
  return { status, headers: responseHeaders, data: body ? JSON.parse(body) : undefined };
}

test('client follows the current host, port and deployment base without local dependencies', async () => {
  for (const base of ['http://localhost:51273/', 'http://127.0.0.1:60431/', 'https://harness.example/', 'https://harness.example/tools/dsh/']) {
    const calls = [];
    const { client, externalModules } = clientAt(base);
    const api = createApi({ baseURI: base, fetch: async (path, options) => {
      calls.push({ url: new URL(path, base), options });
      return { ok: true, text: async () => '{"games":[]}' };
    } });
    await api('/home?locale=en');
    const expected = new URL('api/beegame/home?locale=en', base);
    assert.equal(calls[0].url.href, expected.href);
    assert.equal(calls[0].options.credentials, 'same-origin');
    assert.deepEqual([...new Set(externalModules)], ['react']);
    assert.deepEqual(Object.keys(client).sort(), ['apply', 'inject', 'name']);
    assert.equal(client.name, 'beegame');
  }
});

test('fallback catalog matches its shipped source and has no local game URLs', async () => {
  assert.deepEqual(SEED_CATALOG, JSON.parse(await readFile(new URL('data/seed.json', root), 'utf8')));
  assert.equal(new Set(SEED_CATALOG.games.map(game => game.id)).size, SEED_CATALOG.games.length);
  for (const game of SEED_CATALOG.games) {
    for (const field of ['url', 'image']) {
      const url = new URL(game[field]);
      assert.equal(url.protocol, 'https:');
      assert.ok(url.hostname.endsWith('.bee.games'));
    }
  }
});

test('host serves the fallback on an OS-assigned port, with no connection service', async () => {
  const route = hostWith(undefined);
  const server = createServer((request, response) => { void route.handler(request, response); });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}${ROUTE_PREFIX}/seed`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), SEED_CATALOG);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('host admission decides whether a remote harness request is allowed', async () => {
  const request = { host: 'harness.example:8443', origin: 'https://harness.example:8443' };
  assert.equal((await invoke(hostWith({ admit: () => ({}) }), '/api/beegame/seed', request)).status, 200);
  assert.equal((await invoke(hostWith({ admit: () => ({ rejection: 401 }) }), '/api/beegame/seed', request)).status, 401);
  assert.equal((await invoke(hostWith({ admit: () => { throw new Error('Unavailable'); } }), '/api/beegame/seed', request)).status, 503);
  // Without host admission, preserve the existing local trust boundary.
  assert.equal((await invoke(hostWith(undefined), '/api/beegame/seed', request)).status, 403);
  assert.equal((await invoke(hostWith(undefined), '/api/beegame/seed', { origin: 'http://untrusted.example' })).status, 403);
});

test('catalog proxy uses public upstream, normalized queries and no user credentials', async () => {
  const originalFetch = globalThis.fetch;
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url: new URL(url), options };
    return { ok: true, json: async () => ({ code: 200, data: { items: [] } }) };
  };
  try {
    const response = await invoke(hostWith(undefined), '/api/beegame/games?locale=en&page_size=200&search=test');
    assert.equal(response.status, 200);
    assert.equal(request.url.origin, 'https://api.bee.games');
    assert.equal(request.url.searchParams.get('locale'), 'en');
    assert.equal(request.url.searchParams.get('page_size'), '36');
    assert.equal(request.options.credentials, 'omit');
    assert.equal(request.options.headers.cookie, undefined);
    assert.equal(request.options.headers.authorization, undefined);
  } finally { globalThis.fetch = originalFetch; }
});

test('offline upstream fails cleanly while the packaged catalog remains available', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Network unavailable'); };
  try {
    const route = hostWith(undefined);
    assert.equal((await invoke(route, '/api/beegame/home')).status, 502);
    assert.equal((await invoke(route, '/api/beegame/seed')).status, 200);
  } finally { globalThis.fetch = originalFetch; }
});

test('HTTP cache separates locale/category pages, bypasses search, and still checks admission on hits', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0, rejected = false;
  globalThis.fetch = async () => {
    calls += 1;
    const game = { id: 'one', name: 'One', url: 'https://games.example/one' };
    return { ok: true, json: async () => ({ code: 200, data: { featured: [game], items: [game] } }) };
  };
  try {
    const route = hostWith({ admit: () => rejected ? { rejection: 401 } : {} });
    const request = path => invoke(route, path);
    await request('/api/beegame/home?locale=en'); await request('/api/beegame/home?locale=en');
    assert.equal(calls, 1);
    await request('/api/beegame/home?locale=zh-CN'); assert.equal(calls, 2);
    await request('/api/beegame/games?categories=Puzzle&page=1&page_size=200');
    await request('/api/beegame/games?page_size=36&page=1&categories=Puzzle'); assert.equal(calls, 3);
    await request('/api/beegame/games?categories=Racing&page=1'); assert.equal(calls, 4);
    await request('/api/beegame/games?search=one'); await request('/api/beegame/games?search=one'); assert.equal(calls, 6);
    rejected = true;
    assert.equal((await request('/api/beegame/home?locale=en')).status, 401);
    assert.equal(calls, 6);
  } finally { globalThis.fetch = originalFetch; }
});

test('failed HTTP catalog responses are not cached and may recover immediately', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    if (++calls === 1) throw Object.assign(new Error('timeout'), { name: 'TimeoutError' });
    return { ok: true, json: async () => ({ code: 200, data: { featured: [{ id: 'one', name: 'One', url: 'https://games.example/one' }] } }) };
  };
  try {
    const route = hostWith(undefined);
    assert.equal((await invoke(route, '/api/beegame/home')).status, 504);
    assert.equal((await invoke(route, '/api/beegame/home')).status, 200);
    assert.equal(calls, 2);
  } finally { globalThis.fetch = originalFetch; }
});
