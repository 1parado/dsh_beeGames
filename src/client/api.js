import { httpsUrl } from '../shared/urls.js';

export function apiBase(baseURI = globalThis.document?.baseURI) {
  try { return new URL('api/beegame', baseURI).pathname; } catch { return '/api/beegame'; }
}

export function createApi({ baseURI, fetch: request = (...args) => fetch(...args) } = {}) {
  const base = apiBase(baseURI);
  return async (path, timeoutMs = 16_000) => {
    const response = await request(`${base}${path}`, { signal: AbortSignal.timeout(timeoutMs), credentials: 'same-origin' });
    const text = await response.text();
    let payload;
    try { payload = text === '' ? {} : JSON.parse(text); } catch { payload = { error: text.slice(0, 200) }; }
    if (!response.ok) throw new Error(payload?.error ?? `HTTP ${response.status}`);
    return payload;
  };
}
export const api = createApi();

/** Open one https URL in a new tab; non-https input is refused. */
export function openExternal(url) {
  const safe = httpsUrl(url);
  if (safe === '') return;
  try { window.open(safe, '_blank', 'noopener,noreferrer'); } catch { /* popup refused */ }
}

/** The Bee.games home route; only Chinese carries a locale prefix. */
export function officialHomeUrl(localeTag) {
  return localeTag === 'zh-CN' ? 'https://bee.games/zh-CN' : 'https://bee.games/';
}

/** One game's detail route on the Bee.games site. */
export function officialGameUrl(game) {
  const slug = typeof game?.slug === 'string' && game.slug !== '' ? game.slug : '';
  if (slug === '') return officialHomeUrl('en');
  return `https://bee.games/game/${encodeURIComponent(slug)}`;
}
