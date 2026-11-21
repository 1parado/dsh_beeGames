export function composeHudRows(status, titles) {
  const rows = [];
  if (!(status instanceof Map)) return rows;
  for (const [id, entry] of status) {
    if (!entry || typeof entry !== 'object') continue;
    const title = typeof titles?.[id] === 'string' ? titles[id] : '';
    // Precedence: a waiting decision outranks everything; an unread
    // completion follows; a live session is a glanceable extra. A session
    // with none of these renders no row (it settled and was seen).
    if (entry.pendingInteraction !== undefined && entry.pendingInteraction !== null) {
      rows.push({ id, title, tone: 'warn', kind: 'question' });
    } else if (entry.completionUnread === true) {
      rows.push({ id, title, tone: 'success', kind: 'done' });
    } else if (entry.running === true) {
      rows.push({ id, title, tone: 'live', kind: 'running' });
    }
  }
  return rows;
}

export function hudTone(rows) {
  if (rows.some(row => row.tone === 'warn')) return 'warn';
  if (rows.some(row => row.tone === 'success')) return 'success';
  return 'live';
}

export function sameHudRows(left, right) {
  return left.length === right.length && left.every((row, index) => {
    const other = right[index];
    return row.id === other.id && row.title === other.title && row.kind === other.kind && row.tone === other.tone;
  });
}

/** Stable selector results let host hooks ignore unrelated session updates. */
export function createSessionSelectors() {
  let statusResult;
  let titleResult;
  return {
    status(snapshot) {
      if (!(snapshot instanceof Map)) return undefined;
      const rows = composeHudRows(snapshot, {});
      if (!statusResult || !sameHudRows(statusResult.rows, rows)) statusResult = { rows };
      return statusResult;
    },
    titles(snapshot) {
      const byId = snapshot?.byId;
      if (!byId || typeof byId !== 'object' || Array.isArray(byId)) return undefined;
      const titles = Object.fromEntries(Object.entries(byId).map(([id, row]) => [id, typeof row?.title === 'string' ? row.title : '']));
      if (!titleResult || Object.keys(titleResult).length !== Object.keys(titles).length ||
          Object.keys(titles).some(id => titleResult[id] !== titles[id])) titleResult = titles;
      return titleResult;
    },
  };
}

export function createHudProjection() {
  let previous = { ready: false, rows: [] };
  return (status, titles) => {
    const ready = status !== undefined && titles !== undefined;
    const rows = ready ? status.rows.map(row => ({ ...row, title: titles[row.id] ?? '' })) : [];
    if (previous.ready !== ready || !sameHudRows(previous.rows, rows)) previous = { ready, rows };
    return previous;
  };
}
