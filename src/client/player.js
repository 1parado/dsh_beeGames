import { createElement as h, useState, useEffect, useRef } from 'react';
import { sharedSession } from './runtime.js';
import { HELP_KEY } from './constants.js';
import { openExternal, officialGameUrl } from './api.js';
import { createPauseBridge } from './pause-bridge.js';
import { SessionHud } from './session-hud.js';
import { IconBack, Icon, IconHeart, IconMinimize, IconFullscreen, IconClose, IconRefresh, IconExternal } from './icons.js';

export function Player(props) {
  const { session, bounds, dragHandle, t, useSessionStatus, useSessions } = props;
  const { game, mode, pause, records } = session;
  const full = mode === 'full';
  const away = mode === 'away';
  const favorite = records.favorites.some(item => item.id === game.id);
  const [loaded, setLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpHidden, setHelpHidden] = useState(() => {
    try { return window.localStorage?.getItem(HELP_KEY) === '1'; } catch { return false; }
  });
  const [reload, setReload] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const frameRef = useRef(null);
  const frameLoadedRef = useRef(false);
  const stageRef = useRef(null);
  const pauseRef = useRef(null);
  useEffect(() => {
    const bridge = createPauseBridge(frameRef.current, game.url, status => sharedSession.setPause(status));
    pauseRef.current = bridge;
    bridge.setPaused(sharedSession.getSnapshot().mode === 'away');
    if (frameLoadedRef.current) bridge.connect();
    return () => { pauseRef.current = null; bridge.dispose(); };
  }, [game.url]);
  useEffect(() => { pauseRef.current?.setPaused(away); }, [away]);
  useEffect(() => {
    const hideTimer = setTimeout(() => setLoaded(true), 7_000);
    return () => clearTimeout(hideTimer);
  }, [game.id, reload]);
  useEffect(() => {
    if (helpHidden) return undefined;
    const helpTimer = setTimeout(() => setShowHelp(true), 16_000);
    return () => clearTimeout(helpTimer);
  }, [game.id, reload, helpHidden]);
  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  useEffect(() => {
    if (!full && document.fullscreenElement === stageRef.current) void document.exitFullscreen().catch(() => {});
  }, [full]);
  const toggleFullscreen = () => {
    const stage = stageRef.current;
    if (stage === null) return;
    try {
      const request = document.fullscreenElement === stage ? document.exitFullscreen() : stage.requestFullscreen();
      void request?.catch(() => {});
    } catch { /* fullscreen refused */ }
  };
  const toggleFavorite = () => sharedSession.updateRecords(current => ({
    ...current,
    favorites: favorite ? current.favorites.filter(item => item.id !== game.id) : [game, ...current.favorites],
  }));
  const restart = () => {
    setLoaded(false);
    setShowHelp(false);
    setReload(current => current + 1);
    frameLoadedRef.current = false;
    if (frameRef.current !== null) frameRef.current.src = game.url;
  };
  const dismissHelp = () => {
    setHelpHidden(true);
    setShowHelp(false);
    try { window.localStorage?.setItem(HELP_KEY, '1'); } catch { /* storage unavailable */ }
  };
  const pauseLabel = pause === 'paused' ? t('gamePaused') : pause === 'requesting' ? t('pausePending') : null;
  return h('section', { className: 'bg_page bg_player', style: { height: away ? 'auto' : '100%' }, 'aria-label': game.name },
    h('div', { className: 'bg_player-toolbar', key: 'toolbar' },
      full && h('button', { type: 'button', className: 'bg_iconbtn', title: t('endGame'), 'aria-label': t('endGame'), onClick: () => sharedSession.close() }, h(IconBack, { size: 16 })),
      h('h2', { className: 'bg_playing-name', ...dragHandle, style: { flex: 1, minWidth: 0 } },
        !full && h('span', { className: 'bg_drag-grip', 'aria-hidden': true }, h(Icon, { size: 12 },
          h('path', { d: 'M8 4v.01M16 4v.01M8 12v.01M16 12v.01M8 20v.01M16 20v.01', strokeWidth: 3 }))),
        game.name),
      !full && h('button', { type: 'button', className: 'bg_btn bg_resume', onClick: () => sharedSession.resume() }, t('resumeGame')),
      !away && h('button', { type: 'button', className: 'bg_btn', title: t('leaveGame'), onClick: () => sharedSession.leave() }, t('leaveGame')),
      full && h('button', { type: 'button', className: 'bg_iconbtn', 'aria-label': favorite ? t('unfavorite') : t('favorite'), 'aria-pressed': favorite, onClick: toggleFavorite }, h(IconHeart, { size: 15, filled: favorite })),
      full && h('button', { type: 'button', className: 'bg_iconbtn', title: t('minimize'), 'aria-label': t('minimize'), onClick: () => sharedSession.minimize() }, h(IconMinimize, { size: 15 })),
      full && h('button', { type: 'button', className: 'bg_iconbtn', title: t('fullscreen'), 'aria-label': t('fullscreen'), 'aria-pressed': fullscreen, onClick: toggleFullscreen }, h(IconFullscreen, { size: 15, active: fullscreen })),
      !full && h('button', { type: 'button', className: 'bg_iconbtn', title: t('endGame'), 'aria-label': t('endGame'), onClick: () => sharedSession.close() }, h(IconClose, { size: 14 })),
    ),
    // Stable type, key, parent, and position: never move or replace this
    // iframe during mode changes, even while its main page is unmounted.
    h('div', { key: 'stage', className: 'bg_game-area', ref: stageRef },
      h(SessionHud, { useSessionStatus, useSessions, t, mode }),
    h('div', { className: 'bg_stage', 'data-layout': game.orientation,
      style: away && bounds ? { width: bounds.width, height: Math.max(120, bounds.height - 120) } : undefined,
      'aria-hidden': away || undefined },
      h('iframe', {
        ref: frameRef, title: game.name, src: game.url, tabIndex: away ? -1 : 0,
        sandbox: 'allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-orientation-lock',
        allow: 'autoplay; fullscreen; gamepad; accelerometer; gyroscope',
        referrerPolicy: 'strict-origin-when-cross-origin',
        onLoad: () => { frameLoadedRef.current = true; setLoaded(true); pauseRef.current?.connect(); },
      }),
      !loaded && h('div', { className: 'bg_loading' },
        h('span', { className: 'bg_spinner', 'aria-hidden': true }),
        h('p', { style: { margin: 0 } }, t('loadingGame')),
        h('small', null, t('loadingGameHint'))),
    )),
    h('div', { key: 'actions', className: 'bg_actions', hidden: !full, style: !full ? { display: 'none' } : undefined },
      h('button', { type: 'button', className: 'bg_btn', onClick: restart }, h(IconRefresh, { size: 13 }), t('restart')),
      h('button', { type: 'button', className: 'bg_btn', onClick: () => sharedSession.leave() }, t('leaveGame')),
      h('button', { type: 'button', className: 'bg_btn', onClick: toggleFullscreen }, h(IconFullscreen, { size: 13, active: fullscreen }), t('fullscreen')),
      h('button', { type: 'button', className: 'bg_btn', onClick: () => openExternal(game.url) }, h(IconExternal, { size: 13 }), t('openWindow')),
      h('button', { type: 'button', className: 'bg_btn', onClick: () => openExternal(officialGameUrl(game)) }, h(IconExternal, { size: 13 }), t('official')),
    ),
    full && showHelp && !helpHidden && h('div', { key: 'help', className: 'bg_help', role: 'status' },
      h('p', null, t('gameHelp')),
      h('button', { type: 'button', className: 'bg_iconbtn', title: t('dismissGameHelp'), 'aria-label': t('dismissGameHelp'), onClick: dismissHelp }, h(IconClose, { size: 14 }))),
    away && pauseLabel !== null && h('p', { key: 'note', className: 'bg_pause-status', role: 'status', 'data-paused': pause === 'paused' || undefined }, pauseLabel),
  );
}
