import { createElement as h, useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import { sharedCtx } from './runtime.js';
import { createSessionSelectors, createHudProjection } from './hud-model.js';
import { TaskHud } from './hud.js';

const adapters = new Map();
const warnedContexts = new WeakSet();
const missingHook = () => undefined;
const noSubscription = () => () => {};

function fallbackStore(name) {
  try {
    return name === 'status' ? sharedCtx?.get?.('uiSession')?.sessionStatus : sharedCtx?.sessions?.list;
  } catch { return undefined; }
}

function useStoreSelection(store, select) {
  const usable = typeof store?.getSnapshot === 'function' && typeof store?.subscribe === 'function';
  const subscribe = useCallback(listener => usable ? store.subscribe(listener) : noSubscription(), [store, usable]);
  const snapshot = useCallback(() => select(usable ? store.getSnapshot() : undefined), [store, select, usable]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

function adapterFor(useStatus, useSessions) {
  let bySessions = adapters.get(useStatus);
  if (!bySessions) adapters.set(useStatus, bySessions = new Map());
  if (bySessions.has(useSessions)) return bySessions.get(useSessions);
  // Each exact pair of host hook functions owns a component type. A changed
  // host contract remounts only this adapter, preserving React's hook order and
  // the Player/iframe even if a hook appears or disappears at runtime.
  function SessionAdapter({ t, mode }) {
    const selectors = useMemo(createSessionSelectors, []);
    const project = useMemo(createHudProjection, []);
    const hookStatus = useStatus(selectors.status);
    const hookTitles = useSessions(selectors.titles);
    const statusFallback = !Array.isArray(hookStatus?.rows);
    const titlesFallback = !hookTitles || typeof hookTitles !== 'object' || Array.isArray(hookTitles) || hookTitles instanceof Map ||
      Object.values(hookTitles).some(value => typeof value !== 'string');
    const fallbackStatus = useStoreSelection(statusFallback ? fallbackStore('status') : undefined, selectors.status);
    const fallbackTitles = useStoreSelection(titlesFallback ? fallbackStore('titles') : undefined, selectors.titles);
    useEffect(() => {
      if ((!statusFallback && !titlesFallback) || !sharedCtx || warnedContexts.has(sharedCtx)) return;
      warnedContexts.add(sharedCtx);
      console.warn('[beeGames] Session HUD is using service fallback; check host useSessionStatus/useSessions hooks and snapshot shapes.',
        { statusFallback, titlesFallback });
    }, [statusFallback, titlesFallback]);
    const hud = project(statusFallback ? fallbackStatus : hookStatus, titlesFallback ? fallbackTitles : hookTitles);
    return h(TaskHud, { ...hud, t, mode });
  }
  bySessions.set(useSessions, SessionAdapter);
  return SessionAdapter;
}

export function SessionHud({ useSessionStatus, useSessions, t, mode }) {
  const Adapter = adapterFor(typeof useSessionStatus === 'function' ? useSessionStatus : missingHook,
    typeof useSessions === 'function' ? useSessions : missingHook);
  return h(Adapter, { t, mode });
}
