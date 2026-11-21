import { createElement as h, useEffect, useState } from 'react';

/** A temporary banner; expiry never acknowledges the persistent task row. */
export function CompletionToasts({ notices, t, onOpen, onExpand, pending }) {
  const [now, setNow] = useState(Date.now);
  const active = notices.filter(notice => notice.expiresAt > now);
  const nextExpiry = Math.min(...active.map(notice => notice.expiresAt));
  useEffect(() => {
    if (!Number.isFinite(nextExpiry)) return undefined;
    const timer = setTimeout(() => setNow(Date.now()), Math.max(0, nextExpiry - Date.now()));
    return () => clearTimeout(timer);
  }, [nextExpiry]);
  const visible = active.filter(notice => notice.expiresAt > Date.now());
  if (visible.length > 2) return h('button', {
    type: 'button', className: 'bg_hud-flash bg_hud-summary', 'data-tone': 'success', onClick: onExpand,
  }, t('hudCompletedSummary', { n: visible.length }));
  return visible.map(notice => {
    const text = t('hudFlash', { status: t('hudDone'), title: notice.title || t('hudUntitled') });
    return h('button', { key: notice.notificationId,
      type: 'button', className: 'bg_hud-flash', 'data-tone': 'success', 'data-session-id': notice.id,
      disabled: pending, onClick: () => onOpen(notice.id), title: `${text}\n${t('hudOpenSession')}`,
    }, text);
  });
}
