import { createElement as h } from 'react';
import zhLocale from '../../locale/zh.json';
import enLocale from '../../locale/en.json';
import CSS from './styles.css';
import { NS, PANEL_ID } from './constants.js';
import { configureRuntime } from './runtime.js';
import { createGameSession } from './game-session.js';
import { createHudNotifications } from './hud-notifications.js';
import { createHudNavigation } from './hud-navigation.js';
import { readRecords, writeRecords } from './records.js';
import { PersistentPlayer } from './floating-player.js';
import { GamesPage } from './games-page.js';
import { BeeGlyph } from './icons.js';

export const name = 'beegame';
export const inject = ['slots', 'locale', 'sessions'];
const { meta: zhMeta, ...zhDict } = zhLocale;
const { meta: enMeta, ...enDict } = enLocale;

export function apply(ctx) {
  const session = createGameSession(readRecords(), writeRecords, panelId => {
    try {
      const layout = ctx.get('layout');
      if (typeof layout?.selectPanel !== 'function') return false;
      layout.selectPanel(panelId);
      return true;
    } catch { return false; }
  });
  const t = ctx.locale.bind(NS);
  const hudNotifications = createHudNotifications();
  const hudNavigation = createHudNavigation(ctx, session, hudNotifications);
  configureRuntime(ctx, session, t, hudNotifications, hudNavigation);
  ctx.effect(() => () => hudNavigation.dispose(), 'beegame: HUD navigation disposal');
  ctx.effect(() => () => hudNotifications.dispose(), 'beegame: HUD notifications disposal');

  ctx.effect(() => ctx.locale.register(NS, { zh: zhDict, en: enDict }), 'beegame: dictionaries');

  ctx.effect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-plugin', 'dsh-beegame');
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, 'beegame: styles');

  // Register once. Game state changes re-render the same entry instead
  // of disposing/re-registering it, so its iframe stays connected.
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'beegame.persistent-player',
    order: 90,
    locale: NS,
  }, props => h(PersistentPlayer, props)));
  const playerSession = session;
  ctx.effect(() => () => playerSession.dispose(), 'beegame: player session disposal');

  // The sidebar rail/list entry; clicking selects the main panel below.
  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: 20,
    label: () => t('panel'),
    locale: NS,
  }, props => h(BeeGlyph, { size: props?.size ?? 18 })));

  // The central panel; the sidebar's row click sets activePanelId='beegame'.
  // GamesPage owns the library and an anchor, never the game iframe.
  ctx.slots.inject('main', () => ctx.slots.register({
    name: 'main',
    key: PANEL_ID,
    locale: NS,
  }, props => h(GamesPage, props)));
}
