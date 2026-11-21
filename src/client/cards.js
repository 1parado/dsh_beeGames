import { createElement as h, useState } from 'react';
import { CATEGORY_KEYS } from './constants.js';
import { IconGrid, IconPlay, IconClose, IconHeart } from './icons.js';

export function GameCard({ game, favorite, onPlay, onToggleFavorite, onRemove, removeLabel, t }) {
  const [imageBroken, setImageBroken] = useState(false);
  const cats = game.category.slice(0, 2).map(cat => {
    const key = CATEGORY_KEYS[cat];
    return key === undefined ? cat : t(key);
  }).join(' · ');
  return h('div', { className: 'bg_card', role: 'listitem' },
    h('button', {
      type: 'button', className: 'bg_cover', 'aria-label': game.name,
      title: game.name,
      onClick: () => onPlay(game),
    },
      game.image !== '' && !imageBroken
        ? h('img', {
            src: game.image, alt: '', loading: 'lazy', draggable: false,
            onError: () => setImageBroken(true),
          })
        : h('span', { className: 'bg_cover-fallback' }, h(IconGrid, { size: 22 })),
      h('span', { className: 'bg_play-hint', 'aria-hidden': true }, h(IconPlay, { size: 30 })),
    ),
    typeof onRemove === 'function' && h('button', {
      type: 'button', className: 'bg_remove',
      'aria-label': removeLabel, title: removeLabel,
      onClick: () => onRemove(game),
    }, h(IconClose, { size: 13 })),
    h('button', {
      type: 'button', className: 'bg_fav', 'data-active': favorite === true,
      'aria-label': favorite === true ? t('unfavorite') : t('favorite'),
      'aria-pressed': favorite === true,
      title: favorite === true ? t('unfavorite') : t('favorite'),
      onClick: () => onToggleFavorite(game),
    }, h(IconHeart, { size: 14, filled: favorite === true })),
    h('button', { type: 'button', className: 'bg_body', title: game.name, onClick: () => onPlay(game) },
      h('span', { className: 'bg_name' }, game.name),
      h('span', { className: 'bg_cats' }, cats),
    ),
  );
}

/** The empty-state block shared by the three tabs. */
export function EmptyState({ icon, text }) {
  return h('div', { className: 'bg_empty' }, h('span', null, icon), h('p', { style: { margin: 0 } }, text));
}

/** Placeholder cards shown while the first catalog page is in flight. */
export function SkeletonGrid() {
  return h('div', { className: 'bg_grid bg_skeleton', 'aria-hidden': true },
    Array.from({ length: 8 }, (_, index) => h('div', { key: index, className: 'bg_card' },
      h('div', { className: 'bg_cover' }),
      h('div', { className: 'bg_body' },
        h('span', { className: 'bg_sk-line', style: { width: '70%' } }),
        h('span', { className: 'bg_sk-line', style: { width: '45%', height: 10 } }),
      ),
    )),
  );
}
