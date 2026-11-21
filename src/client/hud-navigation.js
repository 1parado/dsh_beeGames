/** One navigation at a time, shared across HUD adapter remounts. */
export function createHudNavigation(ctx, session, inbox) {
  let snapshot = { pending: false, failed: false };
  let disposed = false;
  const listeners = new Set();
  const publish = next => { snapshot = next; for (const listener of listeners) listener(); };
  return {
    getSnapshot: () => snapshot,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
    async open(id) {
      if (disposed || snapshot.pending) return false;
      const notice = inbox.getSnapshot().find(item => item.id === id);
      const before = session.getSnapshot();
      publish({ pending: true, failed: false });
      try {
        const workspace = ctx.get('uiWorkspace');
        if (typeof workspace?.openSession !== 'function' || await workspace.openSession(id) === false) throw new Error('Session unavailable');
        if (disposed) return false;
        // Do not clear the shell selection or overwrite a newer game/mode.
        const current = session.getSnapshot();
        if (current.game === before.game && current.mode === before.mode) session.setAway();
        if (notice) inbox.acknowledge(id, notice.notificationId);
        publish({ pending: false, failed: false });
        return true;
      } catch {
        if (!disposed) publish({ pending: false, failed: true });
        return false;
      }
    },
    dispose() { disposed = true; listeners.clear(); },
  };
}
