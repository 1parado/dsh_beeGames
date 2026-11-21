import { createElement as h, useState, useEffect, useRef } from 'react';
import { sharedSession, useGameSession, usePluginLocale } from './runtime.js';
import { Player } from './player.js';
import { RESIZE_KEYS } from './constants.js';
import { readGeometry, writeGeometry } from './geometry.js';

function fitFloatingSize(size) {
  return {
    width: Math.max(Math.min(320, window.innerWidth - 16), Math.min(size.width, window.innerWidth - 16)),
    height: Math.max(Math.min(200, window.innerHeight - 16), Math.min(size.height, window.innerHeight - 16)),
  };
}

function resizeFloatingRect(rect, edge, dx, dy) {
  const minWidth = Math.min(320, window.innerWidth - 16);
  const minHeight = Math.min(200, window.innerHeight - 16);
  let { left, top, right, bottom } = rect;
  if (edge.includes('e')) right = Math.max(left + minWidth, Math.min(right + dx, window.innerWidth - 8));
  if (edge.includes('s')) bottom = Math.max(top + minHeight, Math.min(bottom + dy, window.innerHeight - 8));
  if (edge.includes('w')) left = Math.max(8, Math.min(left + dx, right - minWidth));
  if (edge.includes('n')) top = Math.max(8, Math.min(top + dy, bottom - minHeight));
  return { left, top, width: right - left, height: bottom - top };
}

/** The only mounted player for the current game, independent of main. */
export function PersistentPlayer(props) {
  const { t, language } = usePluginLocale();
  const session = useGameSession();
  const [bounds, setBounds] = useState(null);
  const [position, setPosition] = useState(() => readGeometry('dsh-beegame-window-position', ['left', 'top']));
  const [size, setSize] = useState(() => readGeometry('dsh-beegame-window-size', ['width', 'height']));
  useEffect(() => { writeGeometry('dsh-beegame-window-position', position); }, [position]);
  useEffect(() => { writeGeometry('dsh-beegame-window-size', size); }, [size]);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const rootRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const clampPosition = (point) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return point;
    return {
      left: Math.max(8, Math.min(point.left, window.innerWidth - rect.width - 8)),
      top: Math.max(8, Math.min(point.top, window.innerHeight - rect.height - 8)),
    };
  };
  useEffect(() => {
    dragRef.current = null;
    resizeRef.current = null;
    setDragging(false);
    setResizing(false);
    if (session.mode === 'full' || !rootRef.current) return undefined;
    const keepVisible = () => {
      if (session.mode === 'mini') setSize(current => {
        if (!current) return current;
        const next = fitFloatingSize(current);
        return next.width === current.width && next.height === current.height ? current : next;
      });
      setPosition(current => {
        if (!current) return current;
        const next = clampPosition(current);
        return next.left === current.left && next.top === current.top ? current : next;
      });
    };
    keepVisible();
    const observer = new ResizeObserver(keepVisible);
    observer.observe(rootRef.current);
    window.addEventListener('resize', keepVisible);
    return () => { observer.disconnect(); window.removeEventListener('resize', keepVisible); };
  }, [session.mode, session.game]);
  const stopDragging = event => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const dragHandle = session.mode === 'full' ? {} : {
    className: 'bg_playing-name bg_drag-handle',
    role: 'button', tabIndex: 0,
    'aria-label': t('moveWindowLabel', { name: session.game?.name ?? '' }),
    title: t('moveWindowHint'),
    onPointerDown: event => {
      if (event.button !== 0 || event.isPrimary === false) return;
      const rect = rootRef.current.getBoundingClientRect();
      dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      event.preventDefault();
    },
    onPointerMove: event => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      setPosition(clampPosition({ left: drag.left + event.clientX - drag.x, top: drag.top + event.clientY - drag.y }));
    },
    onPointerUp: stopDragging,
    onPointerCancel: stopDragging,
    onLostPointerCapture: stopDragging,
    onKeyDown: event => {
      if (event.key === 'Home') { event.preventDefault(); setPosition(null); return; }
      const step = event.shiftKey ? 48 : 16;
      const offset = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
      if (!offset) return;
      event.preventDefault();
      const rect = rootRef.current.getBoundingClientRect();
      setPosition(clampPosition({ left: rect.left + offset[0], top: rect.top + offset[1] }));
    },
  };
  const applyResize = (rect, edge, dx, dy) => {
    const next = resizeFloatingRect(rect, edge, dx, dy);
    setPosition({ left: next.left, top: next.top });
    setSize({ width: next.width, height: next.height });
  };
  const stopResizing = event => {
    if (resizeRef.current?.pointerId !== event.pointerId) return;
    resizeRef.current = null;
    setResizing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const resizeHandle = edge => ({
    key: edge, className: 'bg_resize-handle', 'data-edge': edge,
    role: 'button', tabIndex: edge === 'se' ? 0 : -1,
    'aria-label': t('resizeWindowLabel', { edge: t(RESIZE_KEYS[edge]) }),
    title: t('resizeWindowHint'),
    onPointerDown: event => {
      if (event.button !== 0 || event.isPrimary === false) return;
      resizeRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rect: rootRef.current.getBoundingClientRect(), edge };
      event.currentTarget.setPointerCapture(event.pointerId);
      setResizing(true);
      event.preventDefault();
      event.stopPropagation();
    },
    onPointerMove: event => {
      const start = resizeRef.current;
      if (!start || start.pointerId !== event.pointerId) return;
      applyResize(start.rect, start.edge, event.clientX - start.x, event.clientY - start.y);
    },
    onPointerUp: stopResizing,
    onPointerCancel: stopResizing,
    onLostPointerCapture: stopResizing,
    onKeyDown: event => {
      const step = event.shiftKey ? 48 : 16;
      const offset = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
      if (!offset) return;
      event.preventDefault();
      applyResize(rootRef.current.getBoundingClientRect(), edge, offset[0], offset[1]);
    },
  });
  useEffect(() => {
    const anchor = session.anchor;
    if (anchor === null) return undefined;
    const measure = () => {
      const rect = anchor.getBoundingClientRect();
      const next = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
      setBounds(old => old && Object.keys(next).every(key => old[key] === next[key]) ? old : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(anchor);
    // Sidebar/rightbar animation moves the anchor as well as resizing it.
    const mutation = new MutationObserver(measure);
    for (let parent = anchor.parentElement; parent; parent = parent.parentElement) {
      mutation.observe(parent, { attributes: true, attributeFilter: ['style', 'class'] });
    }
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [session.anchor]);
  if (session.game === null) return null;
  const full = session.mode === 'full';
  const style = full ? (bounds && session.anchor ? { ...bounds } : { visibility: 'hidden' })
    : { ...(position ? { ...position, right: 'auto', bottom: 'auto' } : {}), ...(session.mode === 'mini' && size ? size : {}) };
  return h('div', { ref: rootRef, className: 'bg_persistent', lang: language, 'data-mode': session.mode, 'data-dragging': dragging || undefined, 'data-resizing': resizing || undefined, style },
    h(Player, { ...props, key: `${session.game.id}:${session.game.url}`, session, bounds, dragHandle, t }),
    session.mode === 'mini' && ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'].map(edge => h('div', resizeHandle(edge))));
}
