/** Attention notices belong to the plugin, not a HUD mount or host unread flag. */
export function createHudNotifications() {
  let notices = [];
  let previousAttention = new Set();
  let sequence = 0;
  const listeners = new Set();
  const publish = next => {
    if (next.length === notices.length && next.every((notice, index) => notice === notices[index])) return;
    notices = next;
    for (const listener of listeners) listener();
  };
  return {
    getSnapshot: () => notices,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
    observe(rows) {
      const attention = rows.filter(row => row.kind === 'done' || row.kind === 'question');
      const next = new Map(notices.map(notice => [notice.id, notice]));
      for (const row of attention) {
        if (!previousAttention.has(`${row.id}:${row.kind}`)) {
          next.set(row.id, { ...row, notificationId: ++sequence,
            ...(row.kind === 'done' ? { expiresAt: Date.now() + 6_000 } : {}) });
        }
      }
      // Resolved decisions must not keep claiming the session is blocked.
      for (const [id, notice] of next) {
        if (notice.kind === 'question' && !attention.some(row => row.id === id && row.kind === 'question')) next.delete(id);
      }
      // Preserve notices when the host clears unread, removes a session, or
      // starts another run. Titles can still follow the live session row.
      for (const row of rows) {
        const notice = next.get(row.id);
        if (notice && row.title && notice.title !== row.title) next.set(row.id, { ...notice, title: row.title });
      }
      previousAttention = new Set(attention.map(row => `${row.id}:${row.kind}`));
      publish([...next.values()]);
    },
    acknowledge(id, notificationId) {
      // A delayed navigation must not clear a newer completion of this task.
      publish(notices.filter(notice => notice.id !== id || notice.notificationId !== notificationId));
    },
    dispose() { listeners.clear(); notices = []; previousAttention.clear(); },
  };
}

export function mergeHudNotices(rows, notices) {
  // Host unread flags can lag after a click; only the inbox owns done rows.
  const byId = new Map(rows.filter(row => row.kind === 'running').map(row => [row.id, row]));
  for (const notice of notices) {
    byId.set(notice.id, notice);
  }
  // Decisions that were opened remain in the list while still blocked, but
  // no longer need an intrusive persistent banner.
  for (const row of rows) if (row.kind === 'question') byId.set(row.id, row);
  const rank = { question: 0, done: 1, running: 2 };
  return [...byId.values()].sort((a, b) => rank[a.kind] - rank[b.kind]);
}
