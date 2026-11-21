import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { readGeometry, writeGeometry } from './geometry.js';

export function useHudPosition(visible) {
  const rootRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);
  const [position, setPosition] = useState(() => readGeometry('dsh-beegame-hud-position', ['left', 'top']));
  const [fitted, setFitted] = useState(null);
  useEffect(() => { writeGeometry('dsh-beegame-hud-position', position); }, [position]);
  const [dragging, setDragging] = useState(false);
  const clamp = point => {
    const root = rootRef.current;
    const stage = root?.parentElement;
    // A queued observer can run after the away layout commits. Its narrow
    // return card must never overwrite the game's saved position.
    if (root?.closest('.bg_persistent')?.dataset.mode === 'away' || !stage || !root.offsetWidth || !stage.clientWidth) return point;
    return {
      left: Math.max(8, Math.min(point.left, stage.clientWidth - root.offsetWidth - 8)),
      top: Math.max(8, Math.min(point.top, stage.clientHeight - root.offsetHeight - 8)),
    };
  };
  useLayoutEffect(() => {
    if (!visible || !rootRef.current) return undefined;
    // Fit the rendered position without replacing the user's preference when
    // a mini window, an expanded list, or translated text changes its bounds.
    const keepVisible = () => setFitted(current => {
      if (!position) return null;
      const next = clamp(position);
      return next.left === current?.left && next.top === current?.top ? current : next;
    });
    keepVisible();
    const observer = new ResizeObserver(keepVisible);
    observer.observe(rootRef.current);
    observer.observe(rootRef.current.parentElement);
    return () => observer.disconnect();
  }, [visible, position]);
  useEffect(() => {
    if (!visible) { dragRef.current = null; setDragging(false); }
  }, [visible]);
  const finish = event => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    suppressClick.current = drag.moved;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return {
    rootRef, dragging,
    style: position ? { ...(fitted ?? position), right: 'auto' } : undefined,
    consumeDragClick: event => {
      if (!suppressClick.current || event.detail === 0) { suppressClick.current = false; return false; }
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
      return true;
    },
    handlers: {
      onPointerDown: event => {
        if (event.button !== 0 || event.isPrimary === false) return;
        const root = rootRef.current;
        const rect = root.getBoundingClientRect();
        const parent = root.parentElement.getBoundingClientRect();
        suppressClick.current = false;
        dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left - parent.left, top: rect.top - parent.top, moved: false };
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      onPointerMove: event => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 5) return;
        drag.moved = true;
        setDragging(true);
        setPosition(clamp({ left: drag.left + dx, top: drag.top + dy }));
      },
      onPointerUp: finish,
      onPointerCancel: finish,
      onLostPointerCapture: finish,
      onKeyDown: event => {
        if (event.key === 'Home') { event.preventDefault(); setPosition(null); return; }
        const step = event.shiftKey ? 48 : 16;
        const offset = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
        if (!offset) return;
        event.preventDefault();
        const root = rootRef.current;
        const rect = root.getBoundingClientRect();
        const parent = root.parentElement.getBoundingClientRect();
        setPosition(clamp({ left: rect.left - parent.left + offset[0], top: rect.top - parent.top + offset[1] }));
      },
    },
  };
}
