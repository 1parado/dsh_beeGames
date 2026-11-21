import { useSyncExternalStore, useCallback } from 'react';

export let sharedCtx = null;
export let sharedSession = null;
export let sharedHudNotifications = null;
export let sharedHudNavigation = null;
let sharedT = key => key;
export function configureRuntime(ctx, session, translate, hudNotifications, hudNavigation) {
  sharedCtx = ctx;
  sharedSession = session;
  sharedT = translate;
  sharedHudNotifications = hudNotifications;
  sharedHudNavigation = hudNavigation;
}

const INITIAL_LOCALE = Object.freeze({ active: 'zh', revision: 0 });
const subscribeLocale = listener => sharedCtx.locale.subscribe(listener);
const getLocaleSnapshot = () => sharedCtx.locale.getSnapshot();
export function usePluginLocale() {
  const snapshot = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, () => INITIAL_LOCALE);
  const language = snapshot.active.toLowerCase().startsWith('en') ? 'en' : 'zh';
  const t = useCallback((key, params) => sharedT(key, params), [snapshot]);
  return { t, language, localeTag: language === 'zh' ? 'zh-CN' : 'en' };
}

export function useGameSession() {
  return useSyncExternalStore(sharedSession.subscribe, sharedSession.getSnapshot, sharedSession.getSnapshot);
}
