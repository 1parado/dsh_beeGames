import { httpsUrl } from '../shared/urls.js';

/** Upstream public catalog API of Bee.games. */
const API_BASE = 'https://api.bee.games';

/** Request timeout per upstream call, in milliseconds. */
export const UPSTREAM_TIMEOUT_MS = 16_000;
/** Search pages time out faster, matching the reference extension. */
export const SEARCH_TIMEOUT_MS = 9_000;

/** Upstream page size; the panel passes page_size itself, this is the clamp. */
const MAX_PAGE_SIZE = 36;

/** Categories the panel knows how to label; anything else passes through. */
const KNOWN_ORIENTATIONS = new Set(['portrait', 'landscape']);

/**
 * Normalize one upstream game record into the panel's shape.
 * @param {unknown} raw - upstream record, untrusted.
 * @returns {object|null} normalized record, or null when unusable.
 */
export function normalizeGame(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const url = httpsUrl(raw.url ?? raw.playUrl);
  const id = String(raw.id ?? raw.slug ?? '');
  if (id === '' || url === '' || typeof raw.name !== 'string' || raw.name.trim() === '') return null;
  const rawCategory = raw.category_v2 ?? raw.category ?? raw.genre ?? 'Other';
  const category = [...new Set((Array.isArray(rawCategory) ? rawCategory : [rawCategory])
    .filter(value => typeof value === 'string').flatMap(value => value.split(','))
    .map(part => part.trim()).filter(Boolean))];
  const orientation = String(raw.play_orientation ?? raw.orientation ?? '');
  return {
    id,
    slug: String(raw.document_id ?? raw.slug ?? id),
    name: raw.name.trim(),
    url,
    image: httpsUrl(raw.cover_image ?? raw.coverImage ?? raw.web_logo1 ?? raw.logo),
    category,
    orientation: KNOWN_ORIENTATIONS.has(orientation) ? orientation : 'responsive',
    description: String(raw.slogan ?? raw.description ?? ''),
  };
}

/** De-duplicate normalized games by id, preserving first-seen order. */
export function uniqueGames(games) {
  const seen = new Map();
  for (const game of games) if (game !== null && !seen.has(game.id)) seen.set(game.id, game);
  return [...seen.values()];
}

/**
 * Build the upstream query path for one panel request.
 * @param {URL} url - request URL already carrying the panel's params.
 * @returns {string} upstream /api/games path with clamped params.
 */
export function gamesUpstreamQuery(url) {
  const query = new URLSearchParams();
  const pageSize = Number(url.searchParams.get('page_size') ?? '36');
  query.set('page_size', String(Number.isFinite(pageSize) ? Math.min(Math.max(Math.trunc(pageSize), 1), MAX_PAGE_SIZE) : 36));
  query.set('sort', 'popular');
  const locale = String(url.searchParams.get('locale') ?? 'zh-CN').slice(0, 16);
  query.set('locale', locale === '' ? 'zh-CN' : locale);
  const cursor = String(url.searchParams.get('cursor') ?? '').slice(0, 128);
  if (cursor !== '') query.set('cursor', cursor);
  else {
    const page = Math.trunc(Number(url.searchParams.get('page') ?? '1'));
    query.set('page', String(Number.isSafeInteger(page) ? Math.max(1, page) : 1));
  }
  const search = String(url.searchParams.get('search') ?? '').trim().slice(0, 128);
  if (search !== '') query.set('search', search);
  const category = String(url.searchParams.get('categories') ?? '').trim().slice(0, 64);
  if (category !== '') query.set('categories', category);
  return `/api/games?${query}`;
}

/**
 * Fetch one upstream JSON payload with a hard timeout.
 * @param {string} path - upstream path with query.
 * @param {number} timeoutMs - abort budget in milliseconds.
 * @returns {Promise<object>} the upstream `data` envelope, untrusted.
 */
export async function fetchUpstream(path, timeoutMs) {
  const response = await fetch(`${API_BASE}${path}`, {
    signal: AbortSignal.timeout(timeoutMs),
    credentials: 'omit',
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`upstream HTTP ${response.status}`);
  const payload = await response.json();
  if (!payload || typeof payload !== 'object' || payload.code !== 200 || !payload.data) {
    throw new Error('invalid upstream catalog response');
  }
  return payload.data;
}

/** HTTP error carrying a status, for the route handler to map. */
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/**
 * Build the panel's game-list response from the upstream page.
 * @param {object} data - upstream data envelope.
 * @returns {object} { games, hasMore, cursor, total }.
 */
export function gamesResult(data) {
  const items = Array.isArray(data?.items) ? data.items : [];
  return {
    games: uniqueGames(items.map(normalizeGame)),
    hasMore: data?.has_more === true,
    cursor: typeof data?.next_cursor === 'string' ? data.next_cursor : '',
    total: Number(data?.total) || 0,
  };
}

/**
 * Build the panel's home response from the upstream home sections.
 * @param {object} data - upstream data envelope.
 * @returns {object} { games, updatedAt, total }.
 */
export function homeResult(data) {
  const sections = ['featured', 'trending', 'new_releases', 'top_charts'];
  const games = uniqueGames(sections.flatMap((key) => (Array.isArray(data?.[key]) ? data[key] : []).map(normalizeGame)));
  if (games.length === 0) throw new HttpError(502, 'upstream catalog is empty');
  return {
    games,
    updatedAt: Date.now(),
    total: Number(data?.total_games) || games.length,
  };
}
