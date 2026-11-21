import { savedGame, uniqueGames } from './records.js';

const gamesFrom = payload => uniqueGames((Array.isArray(payload?.games) ? payload.games : []).map(savedGame));
const errorKey = error => error?.name === 'TimeoutError' ? 'timeout' : 'loadFailed';
const cursorFrom = payload => typeof payload?.cursor === 'string' ? payload.cursor : '';

/** Catalog requests and pagination, independent of React and the host shell. */
export function createCatalogStore(request, scheduler = {
  setTimeout: (fn, delay) => setTimeout(fn, delay), clearTimeout: id => clearTimeout(id),
}) {
  let state = {
    homeGames: [], homeTotal: 0, updatedAt: 0, offline: false, loading: true, loadError: '',
    category: '', query: '', searching: false, searchError: '', searchResults: null, searchHasMore: false,
    discoverHasMore: false, discoverLoadingMore: false, discoverError: '', categoryResults: null,
  };
  const listeners = new Set();
  let active = false, locale = 'zh-CN', timer;
  let homeGeneration = 0, searchGeneration = 0, discoverGeneration = 0;
  let searchCursor = '', discoverCursor = '', discoverPage = 2, stalledPages = 0;
  const update = patch => {
    state = { ...state, ...patch };
    for (const listener of listeners) listener();
  };
  const current = (kind, generation) => active && generation ===
    (kind === 'home' ? homeGeneration : kind === 'search' ? searchGeneration : discoverGeneration);
  function resetDiscover(category = state.category) {
    discoverGeneration += 1;
    discoverCursor = '';
    discoverPage = category === '' ? 2 : 1;
    stalledPages = 0;
  }
  function cancelSearch() {
    searchGeneration += 1;
    scheduler.clearTimeout(timer);
    timer = undefined;
  }

  async function loadHome(force = false) {
    if (!active) return;
    const generation = ++homeGeneration;
    if (state.category === '') resetDiscover();
    update({ loading: true, loadError: '', ...(state.category === '' ? { discoverLoadingMore: false, discoverError: '' } : {}) });
    try {
      const payload = await request(`/home?locale=${encodeURIComponent(locale)}`);
      if (!current('home', generation)) return;
      const games = gamesFrom(payload);
      update({ homeGames: games, homeTotal: Number(payload?.total) || games.length,
        updatedAt: Number(payload?.updatedAt) || 0, offline: false,
        ...(state.category === '' ? { discoverHasMore: games.length > 0 } : {}) });
    } catch (error) {
      if (!current('home', generation)) return;
      if (!force && state.homeGames.length > 0) {
        update({ loadError: errorKey(error) });
        return;
      }
      try {
        const seed = await request('/seed');
        if (!current('home', generation)) return;
        resetDiscover('');
        const games = gamesFrom(seed);
        update({ homeGames: games, homeTotal: games.length, updatedAt: Number(seed?.updatedAt) || 0,
          offline: true, loadError: '', category: '', categoryResults: null,
          discoverHasMore: false, discoverLoadingMore: false, discoverError: '' });
      } catch {
        if (current('home', generation)) update({ homeGames: [], discoverHasMore: false, loadError: errorKey(error) });
      }
    } finally {
      if (current('home', generation)) update({ loading: false });
    }
  }

  async function runSearch(text = state.query.trim(), cursor = '') {
    if (!active || !text || (cursor !== '' && state.searching)) return;
    cancelSearch();
    const generation = searchGeneration;
    update({ searching: true, searchError: '' });
    try {
      const params = new URLSearchParams({ search: text, locale, page_size: '36' });
      if (cursor) params.set('cursor', cursor);
      const payload = await request(`/games?${params}`, 9_000);
      if (!current('search', generation)) return;
      const games = gamesFrom(payload);
      const nextCursor = cursorFrom(payload);
      searchCursor = nextCursor;
      update({ searchResults: cursor ? uniqueGames([...(state.searchResults ?? []), ...games]) : games,
        searchHasMore: payload?.hasMore === true && nextCursor !== '' && nextCursor !== cursor });
    } catch (error) {
      if (current('search', generation)) update({ searchError: errorKey(error), ...(cursor ? {} : { searchResults: [] }) });
    } finally {
      if (current('search', generation)) update({ searching: false });
    }
  }

  function setQuery(query) {
    // Invalidate synchronously, including the interval before the next React
    // effect/render. A previous response cannot win during the debounce gap.
    cancelSearch();
    searchCursor = '';
    const text = query.trim();
    update({ query, searching: text !== '', searchError: '', searchHasMore: false,
      searchResults: text ? [] : null });
    if (text && active) timer = scheduler.setTimeout(() => { void runSearch(text); }, 400);
  }

  async function loadMoreGames() {
    if (!active || state.discoverLoadingMore || state.offline || (!state.discoverHasMore && !state.discoverError)) return;
    const generation = ++discoverGeneration;
    const category = state.category;
    const cursor = discoverCursor;
    update({ discoverLoadingMore: true, discoverError: '' });
    try {
      const params = new URLSearchParams({ locale, page_size: '36' });
      if (category) params.set('categories', category);
      if (cursor) params.set('cursor', cursor);
      else params.set('page', String(discoverPage));
      const payload = await request(`/games?${params}`);
      if (!current('discover', generation)) return;
      const previous = category ? state.categoryResults ?? [] : state.homeGames;
      const games = uniqueGames([...previous, ...gamesFrom(payload)]);
      stalledPages = games.length === previous.length ? stalledPages + 1 : 0;
      discoverCursor = cursorFrom(payload);
      discoverPage += 1;
      update({ ...(category ? { categoryResults: games } : { homeGames: games }),
        discoverHasMore: payload?.hasMore === true && stalledPages < 2 && !(cursor && cursor === discoverCursor) });
    } catch (error) {
      // Stop scroll retries after failures; the explicit retry can try again.
      if (current('discover', generation)) update({ discoverHasMore: false, discoverError: errorKey(error) });
    } finally {
      if (current('discover', generation)) update({ discoverLoadingMore: false });
    }
  }

  function changeCategory(category) {
    resetDiscover(category);
    update({ category, categoryResults: category ? [] : null,
      discoverHasMore: !state.offline && (category !== '' || state.homeGames.length > 0),
      discoverLoadingMore: false, discoverError: '' });
    return category ? loadMoreGames() : Promise.resolve();
  }

  async function refresh() {
    const work = [loadHome(true)];
    if (state.query.trim()) work.push(runSearch());
    else if (state.category) work.push(changeCategory(state.category));
    await Promise.all(work);
  }

  function deactivate() {
    active = false;
    homeGeneration += 1;
    discoverGeneration += 1;
    cancelSearch();
  }
  function activate(nextLocale) {
    deactivate();
    active = true;
    locale = nextLocale;
    const category = state.category;
    resetDiscover(category);
    update({ loading: true, loadError: '', offline: false, discoverError: '', discoverLoadingMore: false,
      homeGames: [], homeTotal: 0, updatedAt: 0, categoryResults: category ? [] : null,
      discoverHasMore: category !== '' });
    const work = [loadHome()];
    if (category) work.push(loadMoreGames());
    setQuery(state.query);
    return Promise.all(work);
  }

  return {
    getSnapshot: () => state,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
    activate, deactivate, setQuery, changeCategory, refresh, loadHome, runSearch, loadMoreGames,
    loadMoreSearch: () => state.searchHasMore ? runSearch(state.query.trim(), searchCursor) : Promise.resolve(),
  };
}
