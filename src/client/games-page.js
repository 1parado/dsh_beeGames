import { useCatalog } from './use-catalog.js';
import { createElement as h, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { sharedSession, useGameSession, usePluginLocale } from './runtime.js';
import { openExternal, officialHomeUrl } from './api.js';
import { savedGame } from './records.js';
import { PROMO_KEY, MAX_RECENT, CATEGORY_KEYS, CHIP_CATEGORIES } from './constants.js';
import { GameCard, EmptyState, SkeletonGrid } from './cards.js';
import { IconSearch, IconClose, IconRefresh, IconDice, IconCreate, IconExternal, IconGrid, IconHeart, IconClock } from './icons.js';

export function GamesPage() {
  const { t, language, localeTag } = usePluginLocale();
  const session = useGameSession();
  const [tab, setTab] = useState('discover');
  const { homeGames, updatedAt, offline, loading, loadError, category, query, searching,
    searchError, searchResults, searchHasMore, discoverHasMore, discoverLoadingMore,
    discoverError, categoryResults, catalog } = useCatalog(localeTag);
  const { setQuery, loadMoreGames, loadMoreSearch } = catalog;
  const scrollRef = useRef(null);
  // records
  const records = session.records;
  // promo banner: dismissible, remembered per panel storage
  const [promoHidden, setPromoHidden] = useState(() => {
    try { return window.localStorage?.getItem(PROMO_KEY) === '1'; } catch { return false; }
  });
  const hidePromo = useCallback(() => {
    setPromoHidden(true);
    try { window.localStorage?.setItem(PROMO_KEY, '1'); } catch { /* storage unavailable */ }
  }, []);
  // player
  const playing = session.game !== null && session.mode === 'full' ? session.game : null;
  // scroll position kept across the player round-trip (the library tree
  // unmounts while the player is up, so a ref is the only survivor).
  const savedScroll = useRef(0);

  const searchInputRef = useRef(null);
  // Reopening the Games panel restores the existing instance. Unmounting
  // this page only detaches its positioning anchor, never the player.
  useEffect(() => { sharedSession.show(); }, []);
  const attachPlayer = useCallback(node => sharedSession.attach(node), []);

  const persistRecords = useCallback((next) => {
    sharedSession.updateRecords(next);
  }, []);

  const toggleFavorite = useCallback((game) => {
    persistRecords(current => {
      const exists = current.favorites.some(item => item.id === game.id);
      return exists
        ? { ...current, favorites: current.favorites.filter(item => item.id !== game.id) }
        : { ...current, favorites: [game, ...current.favorites] };
    });
  }, [persistRecords]);

  const playGame = useCallback((game) => {
    const safe = savedGame(game);
    if (safe === null) return;
    // Remember where the user was so returning from the player restores it.
    const scroller = scrollRef.current;
    savedScroll.current = scroller === null ? 0 : scroller.scrollTop;
    sharedSession.open(safe);
    persistRecords(current => ({
      ...current,
      recent: [{ ...safe, lastPlayed: Date.now() }, ...current.recent.filter(item => item.id !== safe.id)].slice(0, MAX_RECENT),
    }));
  }, [persistRecords]);

  const stopGame = useCallback(() => {
    sharedSession.close();
  }, []);

  /** Remove one record (recent entry or favorite) by id. */
  const removeRecent = useCallback((game) => {
    persistRecords(current => ({ ...current, recent: current.recent.filter(item => item.id !== game.id) }));
  }, [persistRecords]);

  /** Clear the whole recent list. */
  const clearRecent = useCallback(() => {
    persistRecords(current => ({ ...current, recent: [] }));
  }, [persistRecords]);

  /** Reset the library scroll to the top (tab/category switches). */
  const resetScroll = useCallback(() => {
    const scroller = scrollRef.current;
    if (scroller !== null) scroller.scrollTop = 0;
    savedScroll.current = 0;
  }, []);

  const changeCategory = useCallback(next => {
    resetScroll();
    void catalog.changeCategory(next);
  }, [catalog, resetScroll]);
  useEffect(() => { if (query.trim()) setTab('discover'); }, [query]);

  /** Tab switch: a new listing starts from the top. */
  const changeTab = useCallback((next) => {
    setTab(current => current === next ? current : (resetScroll(), next));
  }, [resetScroll]);

  // Infinite scroll: when the Discover tab nears its bottom, load more.
  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller === null) return undefined;
    const onScroll = () => {
      if (tab !== 'discover' || query.trim() !== '' || !discoverHasMore) return;
      if (discoverLoadingMore || loading || offline) return;
      const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      if (remaining < 320) void loadMoreGames();
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [tab, query, discoverHasMore, discoverLoadingMore, loading, offline, loadMoreGames]);

  // Esc: stop the game first, then clear the search. Scoped to keydowns
  // that originate inside this panel, so other app surfaces keep their own
  // Escape behavior (a game iframe consumes its own keys while focused).
  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest('.bg_page') === null) return;
      if (playing !== null) { stopGame(); return; }
      if (query !== '') setQuery('');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing, query, stopGame]);

  const favoriteIds = useMemo(() => new Set(records.favorites.map(item => item.id)), [records.favorites]);

  const isFavorite = useCallback(game => favoriteIds.has(game.id), [favoriteIds]);

  // Search results win, then the server-filtered category pages, then the
  // unfiltered home catalog (which /games paging keeps extending).
  const discoverList = useMemo(() => {
    if (searchResults !== null) return searchResults;
    if (categoryResults !== null) return categoryResults;
    return homeGames;
  }, [searchResults, categoryResults, homeGames]);

  const tabList = useMemo(() => {
    if (tab === 'favorites') return records.favorites;
    if (tab === 'recent') return records.recent;
    return discoverList;
  }, [tab, records, discoverList]);

  // cacheAge counts wall-clock minutes, so re-render it on a slow tick.
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNowTick(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const cacheAge = useMemo(() => {
    if (!updatedAt) return t('cacheUnknown');
    const minutes = Math.floor(Math.max(0, nowTick - updatedAt) / 60_000);
    if (minutes < 1) return t('cacheJustNow');
    if (minutes < 60) return t('cacheMinutes', { n: String(minutes) });
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return t('cacheHours', { n: String(hours) });
    return t('cacheDays', { n: String(Math.floor(hours / 24)) });
  }, [updatedAt, nowTick, t]);

  // Returning from the player remounts the library; restore its scroll.
  useEffect(() => {
    if (playing !== null) return;
    const scroller = scrollRef.current;
    if (scroller !== null && savedScroll.current > 0) scroller.scrollTop = savedScroll.current;
  }, [playing]);

  if (playing !== null) return h('div', { className: 'bg_player-anchor', ref: attachPlayer, 'aria-label': playing.name });

  const statusLine = loading || searching ? t('loading')
    : tab === 'discover' && loadError !== '' ? t(loadError)
    : tab === 'discover' && searchError !== '' ? t(searchError)
    : '';
  const sourceLabel = offline ? t('offlineSource') : t('source');

  return h('div', { className: 'bg_page', lang: language },
    h('div', { className: 'bg_toolbar' },
      h('h1', { className: 'bg_title' }, t('title')),
      h('label', { className: 'bg_search' },
        h(IconSearch, { size: 14 }),
        h('input', {
          ref: searchInputRef,
          type: 'search', value: query, placeholder: t('searchPlaceholder'),
          'aria-label': t('searchLabel'), autoComplete: 'off',
          onChange: event => setQuery(event.target.value),
        }),
        query !== '' && h('button', {
          type: 'button', className: 'bg_iconbtn bg_search-clear',
          'aria-label': t('clearSearch'), title: t('clearSearch'),
          onClick: () => {
            setQuery('');
            searchInputRef.current?.focus();
          },
        }, h(IconClose, { size: 12 })),
      ),
      h('div', { className: 'bg_toolbar-actions' },
        h('button', {
          type: 'button', className: 'bg_tool', title: t('refresh'),
          disabled: loading,
          // A refresh re-reads the data and keeps the user's filters.
          onClick: () => { void catalog.refresh(); },
        }, h(IconRefresh, { size: 14 }), t('refresh')),
        h('button', {
          type: 'button', className: 'bg_tool', title: t('surprise'),
          disabled: tabList.length === 0,
          onClick: () => {
            if (tabList.length === 0) return;
            playGame(tabList[Math.floor(Math.random() * tabList.length)]);
          },
        }, h(IconDice, { size: 14 }), t('surprise')),
        h('button', {
          type: 'button', className: 'bg_tool', 'data-primary': 'true', title: t('createGame'),
          onClick: () => openExternal('https://bee.games/create'),
        }, h(IconCreate, { size: 14 }), t('createGame')),
        h('button', {
          type: 'button', className: 'bg_tool', 'data-accent': 'true', title: t('officialWebsite'),
          onClick: () => openExternal(officialHomeUrl(localeTag)),
        }, h(IconExternal, { size: 14 }), t('official')),
      ),
    ),
    h('div', { className: 'bg_scroll', ref: scrollRef },
      h('div', { className: 'bg_tabs', role: 'group', 'aria-label': t('title') },
        h('button', { type: 'button', className: 'bg_tab', 'aria-pressed': tab === 'discover', onClick: () => changeTab('discover') }, h(IconGrid, { size: 12 }), t('catAll')),
        h('button', { type: 'button', className: 'bg_tab', 'aria-pressed': tab === 'favorites', onClick: () => changeTab('favorites') }, h(IconHeart, { size: 12, filled: tab === 'favorites' }), t('favorites')),
        h('button', { type: 'button', className: 'bg_tab', 'aria-pressed': tab === 'recent', onClick: () => changeTab('recent') }, h(IconClock, { size: 12 }), t('recent')),
      ),
      tab === 'discover' && h('div', { className: 'bg_chips', role: 'group', 'aria-label': t('catAll') },
        CHIP_CATEGORIES.map(chip => h('button', {
          key: chip || 'all', type: 'button', className: 'bg_chip',
          'aria-pressed': category === chip,
          disabled: searchResults !== null || offline,
          onClick: () => changeCategory(chip),
        }, chip === '' ? t('catAll') : (CATEGORY_KEYS[chip] === undefined ? chip : t(CATEGORY_KEYS[chip])))),
      ),
      tab === 'discover' && !promoHidden && h('div', { className: 'bg_promo', role: 'complementary', 'aria-label': t('promoTitle') },
        h('span', { className: 'bg_promo-icon' }, h(IconCreate, { size: 18 })),
        h('div', { className: 'bg_promo-body' },
          h('span', { className: 'bg_promo-title' }, t('promoTitle')),
          h('span', { className: 'bg_promo-text' }, t('promoText')),
        ),
        h('div', { className: 'bg_promo-actions' },
          h('button', {
            type: 'button', className: 'bg_btn', 'data-primary': 'true',
            onClick: () => openExternal('https://bee.games/create'),
          }, h(IconCreate, { size: 13 }), t('promoCreate')),
          h('button', {
            type: 'button', className: 'bg_btn',
            onClick: () => openExternal(officialHomeUrl(localeTag)),
          }, h(IconExternal, { size: 13 }), t('promoVisit')),
        ),
        h('button', {
          type: 'button', className: 'bg_iconbtn bg_promo-close',
          'aria-label': t('promoDismiss'), title: t('promoDismiss'),
          onClick: hidePromo,
        }, h(IconClose, { size: 12 })),
      ),
      h('div', { className: 'bg_meta' },
        h('h2', null,
          tab === 'discover' ? (searchResults !== null ? t('searchScope') : (category === '' ? t('catAll') : (CATEGORY_KEYS[category] === undefined ? category : t(CATEGORY_KEYS[category]))))
          : tab === 'favorites' ? t('favorites') : t('recent')),
        h('div', { className: 'bg_meta-side' },
          tab === 'recent' && records.recent.length > 0 && h('button', {
            type: 'button', className: 'bg_btn bg_btn-compact',
            onClick: () => { clearRecent(); resetScroll(); },
          }, t('clearRecent')),
          h('span', { className: 'bg_count' }, t(tabList.length === 1 ? 'countOne' : 'count', { n: tabList.length })),
        ),
      ),
      statusLine !== '' && h('p', { className: 'bg_status', role: 'status', 'data-tone': loadError !== '' || searchError !== '' ? 'error' : undefined }, statusLine),
      loading && tabList.length === 0 ? h(SkeletonGrid, null)
      : !loading && tabList.length === 0 ? (
        tab === 'favorites' ? h(EmptyState, { icon: h(IconHeart, { size: 22 }), text: t('emptyFavorites') })
        : tab === 'recent' ? h(EmptyState, { icon: h(IconClock, { size: 22 }), text: t('emptyRecent') })
        : h(EmptyState, { icon: h(IconSearch, { size: 22 }), text: searchError !== '' ? t(searchError) : (searchResults !== null ? t('noResults') : t('loadFailed')) })
      ) : h('div', { className: 'bg_grid', role: 'list' },
        tabList.map(game => h(GameCard, {
          key: game.id, game, t,
          favorite: isFavorite(game),
          onPlay: playGame,
          onToggleFavorite: toggleFavorite,
          // Recent entries get a delete affordance; favorites use the heart.
          ...(tab === 'recent' ? {
            onRemove: removeRecent,
            removeLabel: t('removeRecent'),
          } : {}),
        })),
      ),
      tab === 'discover' && searchResults !== null && searchHasMore && h('div', { style: { display: 'flex', justifyContent: 'center', marginTop: 14 } },
        h('button', {
          type: 'button', className: 'bg_btn', disabled: searching,
          onClick: () => { void loadMoreSearch(); },
        }, t('loadMore')),
      ),
      tab === 'discover' && searchResults === null && discoverError !== '' && !loading && h('div', { style: { display: 'flex', justifyContent: 'center', marginTop: 14 } },
        h('button', { type: 'button', className: 'bg_btn', onClick: () => { void loadMoreGames(); } },
          t('retry')),
      ),
      tab === 'discover' && searchResults === null && discoverError === '' && discoverHasMore && !loading && h('div', { style: { display: 'flex', justifyContent: 'center', marginTop: 14 } },
        h('button', {
          type: 'button', className: 'bg_btn', disabled: discoverLoadingMore,
          onClick: () => { void loadMoreGames(); },
        }, discoverLoadingMore ? t('loadingMore') : t('loadMore')),
      ),
    ),
    h('div', { className: 'bg_footer' },
      h('span', { className: 'bg_dot', 'data-offline': offline || undefined }),
      h('span', null, sourceLabel),
      h('button', {
        type: 'button', className: 'bg_footer-link', title: t('officialWebsite'),
        onClick: () => openExternal(officialHomeUrl(localeTag)),
      }, t('official')),
      h('span', null, cacheAge),
      session.game !== null && h('button', {
        type: 'button', className: 'bg_footer-link', title: t('resumeHint'),
        onClick: () => sharedSession.resume(),
      }, t('resumeGameLabel', { name: session.game.name })),
    ),
  );
}
