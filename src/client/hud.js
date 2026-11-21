import { createElement as h, useState, useEffect, useSyncExternalStore, memo } from 'react';
import { IconQuestion, IconDone, IconRun, IconBell } from './icons.js';
import { hudTone } from './hud-model.js';
import { mergeHudNotices } from './hud-notifications.js';
import { CompletionToasts } from './hud-toasts.js';
import { useHudPosition } from './hud-position.js';
import { sharedHudNavigation, sharedHudNotifications } from './runtime.js';

function hudRowKind(kind, t) {
  if (kind === 'question') return t('hudNeedsYou');
  if (kind === 'done') return t('hudDone');
  return t('hudRunning');
}
function hudRowIcon(kind) {
  if (kind === 'question') return h(IconQuestion, { size: 13 });
  if (kind === 'done') return h(IconDone, { size: 13 });
  return h(IconRun, { size: 13 });
}

/**
 * Shared task HUD: floats over the game and remains in the away return card.
 * Decisions stay above completion toasts until opened. Completion toasts
 * expire after six seconds; more than two collapse into a summary.
 * Every completion stays in the list until clicked and opened. Host unread
 * resets and other completions cannot dismiss it. Clicking a row hands the
 * screen back to the shell (the game keeps running in its iframe).
 */
function TaskHudView({ rows, ready, t, mode }) {
  const [open, setOpen] = useState(false);
  const away = mode === 'away';
  const navigation = useSyncExternalStore(sharedHudNavigation.subscribe,
    sharedHudNavigation.getSnapshot, sharedHudNavigation.getSnapshot);
  const notices = useSyncExternalStore(sharedHudNotifications.subscribe,
    sharedHudNotifications.getSnapshot, sharedHudNotifications.getSnapshot);
  const displayRows = mergeHudNotices(rows, notices);
  const floating = useHudPosition(!away && ready && displayRows.length > 0);
  useEffect(() => {
    if (ready) sharedHudNotifications.observe(rows);
  }, [ready, rows]);

  const tone = hudTone(displayRows);
  const counts = { warn: 0, done: 0, live: 0 };
  for (const row of displayRows) counts[row.tone === 'warn' ? 'warn' : row.tone === 'success' ? 'done' : 'live'] += 1;
  counts.done = notices.filter(notice => notice.kind === 'done').length;

  const openSession = async (sessionId) => {
    if (await sharedHudNavigation.open(sessionId)) setOpen(false);
  };

  if (!ready) return null;
  if (displayRows.length === 0) return null;
  const questions = notices.filter(notice => notice.kind === 'question');
  return h('div', { ref: floating.rootRef, className: 'bg_hud', style: away ? undefined : floating.style,
    'data-dragging': floating.dragging || undefined, 'aria-busy': navigation.pending },
    questions.length > 0 && h('div', { className: 'bg_hud-questions', role: 'status' },
      h('button', { type: 'button', className: 'bg_hud-flash', 'data-tone': 'warn', disabled: navigation.pending,
        onClick: () => openSession(questions[0].id), title: t('hudOpenSession'),
      }, t('hudFlash', { status: t('hudNeedsYou'), title: questions[0].title || t('hudUntitled') })),
      questions.length > 1 && h('button', { type: 'button', className: 'bg_hud-more', onClick: () => setOpen(true) },
        t('hudQuestionsSummary', { n: questions.length }))),
    notices.length > 0 && h('div', { className: 'bg_hud-notices', role: 'log', 'aria-live': 'polite',
      'aria-label': t('hudDoneCount', { n: counts.done }) },
      h(CompletionToasts, { notices: notices.filter(notice => notice.kind === 'done'), t,
        onOpen: openSession, onExpand: () => setOpen(true), pending: navigation.pending }),
    ),
    navigation.failed && h('p', { className: 'bg_hud-error', role: 'alert' }, t('hudOpenFailed')),
    h('button', {
      type: 'button', className: 'bg_hud-pill',
      'aria-expanded': open,
      'aria-label': t('hudToggle'),
      title: away ? t('hudToggle') : t('moveHudHint'),
      ...(!away ? floating.handlers : {}),
      onClick: event => { if (away || !floating.consumeDragClick(event)) setOpen(current => !current); },
    },
      h('span', { className: 'bg_hud-badge', 'data-tone': tone }, h(IconBell, { size: 13 })),
      counts.warn > 0 && h('span', { className: 'bg_hud-badge', 'data-tone': 'warn' }, t('hudNeedsYouCount', { n: counts.warn })),
      counts.done > 0 && h('span', { className: 'bg_hud-badge', 'data-tone': 'success' }, t('hudDoneCount', { n: counts.done })),
      counts.live > 0 && h('span', { className: 'bg_hud-rowkind' }, t('hudRunningShort', { n: String(counts.live) })),
    ),
    open && h('div', { className: 'bg_hud-list', role: 'list' },
      displayRows.map(row => h('button', {
        key: row.id, type: 'button', className: 'bg_hud-row', role: 'listitem', 'data-session-id': row.id,
        title: t('hudOpenSession'), disabled: navigation.pending,
        onClick: () => openSession(row.id),
      },
        h('span', { className: 'bg_hud-rowicon', 'data-tone': row.tone }, hudRowIcon(row.kind)),
        h('span', { className: 'bg_hud-rowtitle' }, row.title || t('hudUntitled')),
        h('span', { className: 'bg_hud-rowkind' }, hudRowKind(row.kind, t)),
      )),
    ),
  );
}
export const TaskHud = memo(TaskHudView);
