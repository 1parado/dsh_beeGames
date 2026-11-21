/**
 * dsh-beegame — plugin entry (Host half).
 *
 * The Web GUI cannot call api.bee.games directly: the API answers
 * `Access-Control-Allow-Origin` only for allow-listed origins (bee.games
 * among them; a plain harness page origin gets no CORS grant), so a browser
 * fetch from the harness page fails the preflight-free CORS check. The Host
 * process has no such restriction, so this half proxies the two catalog
 * endpoints the panel needs and falls back to a built-in snapshot when the
 * upstream is unreachable.
 *
 * Routes (longest-prefix-wins against the kernel's `/api` prefix — this
 * prefix is longer, so these handlers run first; every request still passes
 * the same admission fence the kernel applies to its own routes):
 *
 *   GET /api/beegame/home?locale=zh-CN   — Bee home sections, normalized
 *   GET /api/beegame/games?…             — Bee game list (search/category/page/cursor)
 *   GET /api/beegame/seed                — built-in snapshot (offline fallback)
 *
 * Only `webServer` is a hard requirement: a headless composition keeps the
 * bundle harmless (nothing else in this half needs services).
 *
 * @module index.js
 */

import { SEED_CATALOG } from './seed.js';
import { createCatalogCache } from './src/host/catalog-cache.js';
import { fetchUpstream, homeResult, gamesResult, gamesUpstreamQuery, UPSTREAM_TIMEOUT_MS, SEARCH_TIMEOUT_MS } from './src/host/catalog.js';

export const name = 'beegame';

export const inject = ['webServer'];

export const ROUTE_PREFIX = '/api/beegame';

/**
 * Serve one JSON body.
 * @param {import('node:http').ServerResponse} res - response to write.
 * @param {number} status - HTTP status.
 * @param {unknown} payload - JSON-serializable body.
 */
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(body);
}

/** Structural fence replica (see trust notes below): loopback hostnames. */
const LOOPBACK_NAMES = new Set(['127.0.0.1', '[::1]', '::1', 'localhost']);

/** Split a Host/Origin/Referer authority into {scheme, hostname, port}. */
function authorityOf(value, defaultScheme) {
  if (typeof value !== 'string' || value.trim() === '') return null;
  let url;
  try {
    url = new URL(value.includes('://') ? value.trim() : `${defaultScheme ?? 'http'}://${value.trim()}`);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  const port = url.port === '' ? (url.protocol === 'https:' ? '443' : '80') : url.port;
  return { scheme: url.protocol.replace(':', ''), hostname: url.hostname.toLowerCase(), port };
}

/**
 * Decide one request outside a mounted `connection` service. Same shape as
 * the kernel's own fence: DNS-rebinding defence via the Host header, no
 * cross-site fetches, and an Origin/Referer that matches the Host authority.
 * @param {import('node:http').IncomingMessage} req - incoming request.
 * @returns {number|undefined} rejection status, or undefined to allow.
 */
function structuralRejection(req) {
  const host = authorityOf(req.headers.host, 'http');
  // Intentional fallback boundary, not a deployment hostname setting. Remote
  // and container hosts require the host connection service's admission/auth;
  // a hostname allowlist alone would not authenticate those requests.
  if (host === null || !LOOPBACK_NAMES.has(host.hostname)) return 403;
  const site = String(req.headers['sec-fetch-site'] ?? '').toLowerCase();
  if (site === 'cross-site') return 403;
  for (const header of ['origin', 'referer']) {
    const raw = req.headers[header];
    if (typeof raw !== 'string' || raw.trim() === '') continue;
    const authority = authorityOf(raw.trim());
    if (authority === null) return 403;
    if (authority.scheme !== host.scheme || authority.hostname !== host.hostname || authority.port !== host.port) return 403;
  }
  return undefined;
}

/**
 * The plugin entry. Mounts the proxy routes on the composition's web server.
 * @param {object} ctx - plugin context carrying webServer and optionally connection.
 */
export function apply(ctx) {
  const logger = ctx.logger ?? console;
  const catalogCache = createCatalogCache();
  const fenceConnection = () => ctx.get('connection');

  /**
   * Admission fence: the kernel's own decision when a `connection` service is
   * mounted (this prefix outranks `/api`, so the kernel's check would not run
   * by itself), falling back to the structural replica above.
   * @param {import('node:http').IncomingMessage} req - incoming request.
   * @returns {number|undefined} rejection status, or undefined to allow.
   */
  function rejectionFor(req) {
    try {
      const connection = fenceConnection();
      const admit = connection?.admit;
      if (typeof admit === 'function') {
        const admission = admit.call(connection, req);
        const status = admission && typeof admission === 'object' ? admission.rejection : undefined;
        return status === undefined ? undefined : status;
      }
      const reject = connection?.requestRejection;
      if (typeof reject === 'function') {
        const status = reject.call(connection, req);
        return status === undefined ? undefined : status;
      }
    } catch {
      // Never bypass authentication because a mounted service failed.
      return 503;
    }
    return structuralRejection(req);
  }

  async function handler(req, res) {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const routePath = url.pathname.slice(ROUTE_PREFIX.length).replace(/\/+$/, '') || '/';
    const method = String(req.method ?? 'GET').toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') {
      sendJson(res, 405, { error: 'method not allowed' });
      return;
    }
    const rejection = rejectionFor(req);
    if (rejection !== undefined) {
      sendJson(res, rejection, {
        error: rejection === 401 ? 'unauthorized' : rejection === 503 ? 'admission unavailable' : 'forbidden',
      });
      return;
    }
    if (method === 'HEAD') {
      res.writeHead(204);
      res.end();
      return;
    }
    try {
      if (routePath === '/seed') {
        sendJson(res, 200, SEED_CATALOG);
        return;
      }
      if (routePath === '/home') {
        const locale = String(url.searchParams.get('locale') ?? 'zh-CN').slice(0, 16) || 'zh-CN';
        const path = `/api/home?${new URLSearchParams({ locale })}`;
        const result = await catalogCache.get(path, async () => homeResult(await fetchUpstream(path, UPSTREAM_TIMEOUT_MS)));
        sendJson(res, 200, result);
        return;
      }
      if (routePath === '/games') {
        const search = String(url.searchParams.get('search') ?? '').trim();
        const path = gamesUpstreamQuery(url);
        const load = async () => gamesResult(await fetchUpstream(path, search !== '' ? SEARCH_TIMEOUT_MS : UPSTREAM_TIMEOUT_MS));
        const result = search !== '' ? await load() : await catalogCache.get(path, load);
        sendJson(res, 200, result);
        return;
      }
      sendJson(res, 404, { error: 'not found' });
    } catch (error) {
      const aborted = error?.name === 'TimeoutError' || error?.name === 'AbortError';
      logger.warn?.(`beegame: upstream catalog unavailable (${aborted ? 'timeout' : error instanceof Error ? error.message : String(error)})`);
      sendJson(res, aborted ? 504 : 502, { error: aborted ? 'upstream timeout' : 'upstream unavailable' });
    }
  }

  ctx.effect(() => () => catalogCache.clear(), 'beegame: catalog cache disposal');

  ctx.inject(['webServer'], (scoped) => {
    scoped.effect(() => scoped.webServer.register({ kind: 'prefix', path: ROUTE_PREFIX, handler }), 'beegame: catalog proxy routes');
  });
}
