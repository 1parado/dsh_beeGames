import { httpsUrl, gameUrl } from '../shared/urls.js';
import { STORAGE_KEY, MAX_RECENT } from './constants.js';

export function savedGame(value) {
  if (!value || typeof value !== 'object') return null;
  const url = gameUrl(value.url);
  const id = typeof value.id === 'string' ? value.id : '';
  const name = typeof value.name === 'string' ? value.name : '';
  if (id === '' || name === '' || url === '') return null;
  const category = Array.isArray(value.category) ? value.category.filter(x => typeof x === 'string' && x !== '') : [];
  const orientation = ['portrait', 'landscape'].includes(value.orientation) ? value.orientation : 'responsive';
  const lastPlayed = Number.isFinite(value.lastPlayed) && value.lastPlayed > 0 ? value.lastPlayed : undefined;
  return {
    id, name, url,
    slug: typeof value.slug === 'string' ? value.slug : id,
    image: httpsUrl(value.image),
    category,
    orientation,
    description: typeof value.description === 'string' ? value.description : '',
    ...(lastPlayed === undefined ? {} : { lastPlayed }),
  };
}

/** De-duplicate a record list by id. */
export function uniqueGames(games) {
  const seen = new Set();
  return games.filter(game => {
    if (game === null || seen.has(game.id)) return false;
    seen.add(game.id);
    return true;
  });
}

export function readRecords() {
  try {
    const raw = JSON.parse(window.localStorage?.getItem(STORAGE_KEY) ?? 'null');
    if (!raw || typeof raw !== 'object') return { favorites: [], recent: [] };
    const list = value => uniqueGames((Array.isArray(value) ? value : []).map(savedGame));
    return { favorites: list(raw.favorites), recent: list(raw.recent).slice(0, MAX_RECENT) };
  } catch { return { favorites: [], recent: [] }; }
}

export function writeRecords(records) {
  try { window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(records)); } catch { /* storage unavailable */ }
}
