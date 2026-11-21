import { createElement as h } from 'react';
import beeIcon from '../../icon.svg';

export function Icon(props) {
  const { size = 16, children, ...rest } = props;
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true, ...rest,
  }, children);
}
export const IconSearch = props => h(Icon, props, h('circle', { cx: 11, cy: 11, r: 7 }), h('path', { d: 'm20 20-3.5-3.5' }));
export const IconHeart = ({ filled, ...props }) => h(Icon, { ...props, fill: filled ? 'currentColor' : 'none' },
  h('path', { d: 'M12 20.5C7 16.5 4 13.3 4 9.9 4 7.2 6 5 8.6 5c1.5 0 2.7.7 3.4 1.8C12.7 5.7 13.9 5 15.4 5 18 5 20 7.2 20 9.9c0 3.4-3 6.6-8 10.6Z' }));
export const IconClock = props => h(Icon, props, h('circle', { cx: 12, cy: 12, r: 8 }), h('path', { d: 'M12 8v4l3 2' }));
export const IconGrid = props => h(Icon, props, h('rect', { x: 4, y: 4, width: 7, height: 7, rx: 1.5 }), h('rect', { x: 13, y: 4, width: 7, height: 7, rx: 1.5 }), h('rect', { x: 4, y: 13, width: 7, height: 7, rx: 1.5 }), h('rect', { x: 13, y: 13, width: 7, height: 7, rx: 1.5 }));
export const IconRefresh = props => h(Icon, props, h('path', { d: 'M20 12a8 8 0 1 1-2.3-5.6' }), h('path', { d: 'M20 4v4h-4' }));
export const IconBack = props => h(Icon, props, h('path', { d: 'M14 6l-6 6 6 6' }));
export const IconExternal = props => h(Icon, props, h('path', { d: 'M14 5h5v5' }), h('path', { d: 'M19 5l-8 8' }), h('path', { d: 'M19 14v5H5V5h5' }));
export const IconDice = props => h(Icon, props, h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 3 }), h('circle', { cx: 9, cy: 9, r: 1.1, fill: 'currentColor' }), h('circle', { cx: 15, cy: 15, r: 1.1, fill: 'currentColor' }), h('circle', { cx: 12, cy: 12, r: 1.1, fill: 'currentColor' }));
export const IconCreate = props => h(Icon, props, h('path', { d: 'M12 20h9' }), h('path', { d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z' }));
export const IconClose = props => h(Icon, props, h('path', { d: 'M6 6l12 12' }), h('path', { d: 'M18 6 6 18' }));
export const IconFullscreen = ({ active, ...props }) => h(Icon, props, active
  ? [h('path', { key: 'a', d: 'M9 3H3v6' }), h('path', { key: 'b', d: 'M15 21h6v-6' }), h('path', { key: 'c', d: 'M3 15v6h6' }), h('path', { key: 'd', d: 'M21 9V3h-6' })]
  : [h('path', { key: 'a', d: 'M3 9V3h6' }), h('path', { key: 'b', d: 'M21 15v6h-6' }), h('path', { key: 'c', d: 'M15 3h6v6' }), h('path', { key: 'd', d: 'M9 21H3v-6' })]);
export const IconPlay = props => h(Icon, { ...props, fill: 'currentColor', stroke: 'none' }, h('path', { d: 'M8 5.5v13l11-6.5Z' }));
export const IconBell = props => h(Icon, props, h('path', { d: 'M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z' }), h('path', { d: 'M10 18.5a2 2 0 0 0 4 0' }));
export const IconQuestion = props => h(Icon, props, h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M9.6 9.2a2.5 2.5 0 1 1 3.4 2.9c-.7.4-1 1-1 1.9' }), h('circle', { cx: 12, cy: 17, r: 1, fill: 'currentColor', stroke: 'none' }));
export const IconDone = props => h(Icon, props, h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'm8.5 12.3 2.4 2.4 4.6-5' }));
export const IconRun = props => h(Icon, props, h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M12 7v5l3.5 2' }));
export const IconMinimize = props => h(Icon, props, h('path', { d: 'M5 12h14' }));
export const IconExpand = props => h(Icon, props, h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 3 }), h('path', { d: 'M9 12h6' }), h('path', { d: 'M12 9v6' }));

/** The panel glyph shown in the sidebar rail and expanded list. */
export function BeeGlyph(props) {
  const { size = 18 } = props;
  return h('img', {
    src: beeIcon, width: size, height: size, alt: '', 'aria-hidden': true,
    style: { display: 'block' },
  });
}
