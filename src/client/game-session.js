import { PANEL_ID } from './constants.js';
import { gameUrl } from '../shared/urls.js';

export function createGameSession(initialRecords, saveRecords, navigate) {
  let snapshot = { game: null, mode: 'away', anchor: null, pause: 'unavailable', records: initialRecords };
  const listeners = new Set();
  const update = patch => {
    if (Object.entries(patch).every(([key, value]) => snapshot[key] === value)) return;
    snapshot = { ...snapshot, ...patch };
    for (const listener of listeners) listener();
  };
  const updateRecords = next => {
    const records = typeof next === 'function' ? next(snapshot.records) : next;
    saveRecords(records);
    update({ records });
  };
  return {
    getSnapshot: () => snapshot,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
    updateRecords,
    open: game => {
      if (gameUrl(game?.url) === '') return false;
      const same = snapshot.game?.id === game.id && snapshot.game?.url === game.url;
      update({ game: same ? snapshot.game : game, mode: 'full', ...(same ? {} : { pause: 'unavailable' }) });
    },
    attach: anchor => update({ anchor, ...(anchor === null && snapshot.mode === 'full' ? { mode: 'away' } : {}) }),
    minimize: () => { if (snapshot.game) update({ mode: 'mini' }); },
    setAway: () => { if (snapshot.game) update({ mode: 'away' }); },
    leave: () => {
      if (snapshot.game) update({ mode: 'away' });
      navigate(null);
    },
    resume: () => {
      if (snapshot.game && navigate(PANEL_ID) !== false) update({ mode: 'full' });
    },
    show: () => { if (snapshot.game) update({ mode: 'full' }); },
    setPause: pause => update({ pause }),
    close: () => update({ game: null, mode: 'away', pause: 'unavailable' }),
    dispose: () => { listeners.clear(); },
  };
}
