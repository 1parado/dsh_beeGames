// Generated from src/client and locale/*.json. Run npm run build; do not edit.
window.__ModuleLoader__.load({ id: 'dsh-beegame', factory: require => {
const module = { exports: {} };
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/entry.js
var entry_exports = {};
__export(entry_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(entry_exports);
var import_react12 = require("react");

// locale/zh.json
var zh_default = {
  meta: {
    title: "Bee \u6E38\u620F\u9762\u677F",
    description: "\u4FA7\u8FB9\u680F\u91CC\u7684\u6E38\u620F\u5E93\u9762\u677F\uFF1A\u6D4F\u89C8 Bee.games \u76EE\u5F55\uFF0C\u641C\u7D22\u3001\u6536\u85CF\u5E76\u5C31\u5730\u6E38\u73A9\u3002"
  },
  panel: "beeGames",
  title: "beeGames",
  searchPlaceholder: "\u641C\u7D22\u4E0B\u4E00\u6B3E\u5FC3\u5934\u597D\u2026",
  searchLabel: "\u641C\u7D22\u6E38\u620F",
  catAll: "\u53D1\u73B0",
  catPuzzle: "\u89E3\u8C1C",
  catCasual: "\u4F11\u95F2",
  catArcade: "\u8857\u673A",
  catRacing: "\u7ADE\u901F",
  catSports: "\u4F53\u80B2",
  catShooter: "\u5C04\u51FB",
  catCards: "\u5361\u724C",
  catMerge: "\u5408\u6210",
  catPlatformer: "\u8DD1\u9177",
  catAI: "AI \u521B\u4F5C",
  catBall: "\u7403\u7C7B",
  catMatch: "\u4E09\u6D88",
  catDifference: "\u627E\u4E0D\u540C",
  catMahjong: "\u9EBB\u5C06",
  catParking: "\u505C\u8F66",
  catNew: "\u6700\u65B0",
  catOther: "\u5176\u4ED6",
  catEscape: "\u5BC6\u5BA4\u9003\u8131",
  catConnect: "\u8FDE\u63A5",
  catBoomBlast: "\u7206\u7834\u6D88\u9664",
  officialWebsite: "\u8BBF\u95EE Bee.games \u5B98\u7F51",
  createGame: "\u521B\u5EFA\u4F60\u81EA\u5DF1\u7684\u6E38\u620F",
  loadingMore: "\u6B63\u5728\u52A0\u8F7D\u66F4\u591A\u2026",
  clearSearch: "\u6E05\u7A7A\u641C\u7D22",
  clearRecent: "\u6E05\u7A7A",
  removeRecent: "\u4ECE\u6700\u8FD1\u79FB\u9664",
  fullscreen: "\u5168\u5C4F",
  hudToggle: "DSH \u4EFB\u52A1\u52A8\u6001",
  hudOpenSession: "\u6682\u79BB\u6E38\u620F\uFF0C\u6253\u5F00\u8BE5\u4F1A\u8BDD",
  hudUntitled: "\u672A\u547D\u540D\u4F1A\u8BDD",
  hudNeedsYou: "\u9700\u8981\u4F60\u51B3\u5B9A",
  hudDone: "\u5DF2\u5B8C\u6210",
  hudRunning: "\u8FD0\u884C\u4E2D",
  hudRunningShort: "\u8FD0\u884C\u4E2D \xD7{n}",
  hudNeedsYouCount: "\u5F85\u51B3\u5B9A {n}",
  hudDoneCount: "\u5B8C\u6210 {n}",
  hudFlash: "{status}\uFF1A{title}",
  hudCompletedSummary: "{n} \u4E2A\u4EFB\u52A1\u5DF2\u5B8C\u6210 \xB7 \u70B9\u51FB\u5C55\u5F00",
  hudQuestionsSummary: "{n} \u4E2A\u4EFB\u52A1\u5F85\u51B3\u5B9A \xB7 \u67E5\u770B\u5168\u90E8",
  hudOpenFailed: "\u65E0\u6CD5\u6253\u5F00\u4F1A\u8BDD\uFF0C\u8BF7\u91CD\u8BD5\u3002\u4EFB\u52A1\u901A\u77E5\u5DF2\u4FDD\u7559\u3002",
  minimize: "\u7F29\u5C0F\u5230\u60AC\u6D6E\u7A97\uFF08\u4FDD\u7559\u5F53\u524D\u6E38\u620F\uFF09",
  resumeHint: "\u5F53\u524D\u6E38\u620F\u5DF2\u4FDD\u7559\uFF0C\u70B9\u51FB\u8FD4\u56DE",
  promoTitle: "\u60F3\u505A\u4E00\u6B3E\u81EA\u5DF1\u7684\u6E38\u620F\uFF1F",
  promoText: "\u7528 Bee.games \u7684 AI \u521B\u4F5C\u5DE5\u5177\uFF0C\u51E0\u5206\u949F\u5C31\u80FD\u505A\u51FA\u4E00\u6B3E\u5C0F\u6E38\u620F\u5E76\u5206\u4EAB\u7ED9\u670B\u53CB\u3002",
  promoCreate: "\u53BB\u521B\u5EFA\u6E38\u620F",
  promoVisit: "\u5148\u901B\u901B\u5B98\u7F51",
  promoDismiss: "\u6536\u8D77\u8FD9\u6761\u63D0\u793A",
  favorites: "\u6536\u85CF",
  recent: "\u6700\u8FD1",
  surprise: "\u968F\u4FBF\u73A9\u4E00\u4E2A",
  refresh: "\u5237\u65B0\u6E38\u620F\u76EE\u5F55",
  restart: "\u91CD\u5F00",
  openWindow: "\u72EC\u7ACB\u7A97\u53E3",
  official: "\u5B98\u7F51",
  favorite: "\u6536\u85CF\u6B64\u6E38\u620F",
  unfavorite: "\u53D6\u6D88\u6536\u85CF",
  emptyFavorites: "\u8FD8\u6CA1\u6709\u6536\u85CF\u3002\u70B9\u51FB\u4EFB\u610F\u6E38\u620F\u5361\u7247\u4E0A\u7684\u7231\u5FC3\uFF0C\u628A\u5B83\u7559\u5728\u8FD9\u91CC\u3002",
  emptyRecent: "\u73A9\u8FC7\u7684\u6E38\u620F\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",
  loading: "\u6B63\u5728\u52A0\u8F7D\u6E38\u620F\u2026",
  loadFailed: "\u65E0\u6CD5\u52A0\u8F7D\u6E38\u620F\u76EE\u5F55\u3002",
  offlineSource: "\u6E38\u620F\u6765\u81EA Bee.games\uFF08\u5185\u7F6E\u5FEB\u7167\uFF09",
  source: "\u6E38\u620F\u6765\u81EA Bee.games",
  retry: "\u91CD\u8BD5",
  timeout: "\u76EE\u5F55\u8BF7\u6C42\u8D85\u65F6\u3002",
  cacheJustNow: "\u521A\u521A\u66F4\u65B0",
  cacheMinutes: "{n} \u5206\u949F\u524D\u66F4\u65B0",
  cacheHours: "{n} \u5C0F\u65F6\u524D\u66F4\u65B0",
  cacheDays: "{n} \u5929\u524D\u66F4\u65B0",
  cacheUnknown: "\u66F4\u65B0\u65F6\u95F4\u672A\u77E5",
  loadingGame: "\u6B63\u5728\u6253\u5F00\u6E38\u620F\u2026",
  loadingGameHint: "\u9996\u6B21\u52A0\u8F7D\u53EF\u80FD\u9700\u8981\u4E00\u70B9\u65F6\u95F4",
  gameHelp: "\u753B\u9762\u7A7A\u767D\u6216\u65E0\u6CD5\u64CD\u4F5C\uFF1F\u8BD5\u8BD5\u91CD\u5F00\u6216\u5728\u65B0\u6807\u7B7E\u9875\u6253\u5F00\u3002",
  dismissGameHelp: "\u5173\u95ED\u5E76\u4E0D\u518D\u63D0\u793A",
  count: "{n} \u6B3E\u6E38\u620F",
  countOne: "{n} \u6B3E\u6E38\u620F",
  noResults: "\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u6E38\u620F\u3002",
  searchScope: "\u6B63\u5728\u641C\u7D22\u6574\u4E2A\u5728\u7EBF\u76EE\u5F55",
  loadMore: "\u53D1\u73B0\u66F4\u591A\u6E38\u620F",
  leaveGame: "\u6682\u79BB\uFF0C\u53BB\u4F1A\u8BDD",
  resumeGame: "\u8FD4\u56DE\u6E38\u620F",
  endGame: "\u7ED3\u675F\u6E38\u620F",
  pausePending: "\u6B63\u5728\u8BF7\u6C42\u6E38\u620F\u6682\u505C\u2026",
  gamePaused: "\u6E38\u620F\u5DF2\u786E\u8BA4\u6682\u505C",
  moveWindowHint: "\u62D6\u52A8\u6807\u9898\u79FB\u52A8\u5C0F\u7A97\uFF1B\u65B9\u5411\u952E\u5FAE\u8C03\uFF0CHome \u6062\u590D\u9ED8\u8BA4\u4F4D\u7F6E",
  moveWindowLabel: "\u62D6\u52A8\u6E38\u620F\u5C0F\u7A97 \xB7 {name}",
  resizeWindowLabel: "\u8C03\u6574\u6E38\u620F\u5C0F\u7A97\u5927\u5C0F\uFF08{edge}\uFF09",
  resizeN: "\u4E0A\u8FB9",
  resizeE: "\u53F3\u8FB9",
  resizeS: "\u4E0B\u8FB9",
  resizeW: "\u5DE6\u8FB9",
  resizeNe: "\u53F3\u4E0A\u89D2",
  resizeNw: "\u5DE6\u4E0A\u89D2",
  resizeSe: "\u53F3\u4E0B\u89D2",
  resizeSw: "\u5DE6\u4E0B\u89D2",
  resumeGameLabel: "\u8FD4\u56DE\u6E38\u620F \xB7 {name}",
  resizeWindowHint: "\u62D6\u52A8\u8FB9\u7F18\u6216\u56DB\u89D2\u8C03\u6574\u5927\u5C0F\uFF1B\u805A\u7126\u53F3\u4E0B\u89D2\u540E\u53EF\u7528\u65B9\u5411\u952E\u5FAE\u8C03",
  moveHudHint: "\u70B9\u51FB\u5C55\u5F00\u4EFB\u52A1\uFF1B\u6309\u4F4F\u80F6\u56CA\u62D6\u52A8\uFF0C\u65B9\u5411\u952E\u5FAE\u8C03\uFF0CHome \u6062\u590D\u9ED8\u8BA4\u4F4D\u7F6E"
};

// locale/en.json
var en_default = {
  meta: {
    title: "Bee Game Panel",
    description: "A side game library panel in the sidebar: browse Bee.games, search, favorite, and play in place."
  },
  panel: "beeGames",
  title: "beeGames",
  searchPlaceholder: "Search games\u2026",
  searchLabel: "Search games",
  catAll: "Discover",
  catPuzzle: "Puzzle",
  catCasual: "Casual",
  catArcade: "Arcade",
  catRacing: "Racing",
  catSports: "Sports",
  catShooter: "Shooter",
  catCards: "Cards",
  catMerge: "Merge",
  catPlatformer: "Platformer",
  catAI: "AI Builds",
  catBall: "Ball",
  catMatch: "Match-3",
  catDifference: "Find Difference",
  catMahjong: "Mahjong",
  catParking: "Parking",
  catNew: "New",
  catOther: "Other",
  catEscape: "Escape the Room",
  catConnect: "Connect",
  catBoomBlast: "Boom Blast",
  officialWebsite: "Visit the Bee.games website",
  createGame: "Create your own game",
  loadingMore: "Loading more\u2026",
  clearSearch: "Clear search",
  clearRecent: "Clear all",
  removeRecent: "Remove from recent",
  fullscreen: "Fullscreen",
  hudToggle: "DSH task updates",
  hudOpenSession: "Leave the game and open that session",
  hudUntitled: "Untitled session",
  hudNeedsYou: "Needs your decision",
  hudDone: "Completed",
  hudRunning: "Running",
  hudRunningShort: "Running \xD7{n}",
  hudNeedsYouCount: "Needs you {n}",
  hudDoneCount: "Done {n}",
  hudFlash: "{status}: {title}",
  hudCompletedSummary: "{n} tasks completed \xB7 Show all",
  hudQuestionsSummary: "{n} tasks need a decision \xB7 Show all",
  hudOpenFailed: "Could not open the conversation. Try again; the notification is still available.",
  minimize: "Minimize (keep this game open)",
  resumeHint: "Your game is still open. Click to return.",
  promoTitle: "Ever wanted to make a game?",
  promoText: "Bee.games AI tools let you build a small game in minutes and share it with friends.",
  promoCreate: "Create a game",
  promoVisit: "Browse the site",
  promoDismiss: "Dismiss this tip",
  favorites: "Favorites",
  recent: "Recent",
  surprise: "Play a random game",
  refresh: "Refresh catalog",
  restart: "Restart",
  openWindow: "Open in new tab",
  official: "Official site",
  favorite: "Favorite",
  unfavorite: "Unfavorite",
  emptyFavorites: "No favorites yet. Tap the heart on any game to keep it here.",
  emptyRecent: "Games you play show up here.",
  loading: "Loading games\u2026",
  loadFailed: "Could not load the catalog.",
  offlineSource: "Games from Bee.games (built-in snapshot)",
  source: "Games from Bee.games",
  retry: "Retry",
  timeout: "The catalog request timed out.",
  cacheJustNow: "Updated just now",
  cacheMinutes: "Updated {n} min ago",
  cacheHours: "Updated {n} h ago",
  cacheDays: "Updated {n} d ago",
  cacheUnknown: "Update time unknown",
  loadingGame: "Opening game\u2026",
  loadingGameHint: "First load may take a moment",
  gameHelp: "Blank screen or controls not working? Try restart or open in a new tab.",
  dismissGameHelp: "Dismiss and do not show again",
  count: "{n} games",
  countOne: "{n} game",
  noResults: "No games match your search.",
  searchScope: "Searching the whole online catalog",
  loadMore: "Discover more games",
  leaveGame: "Go to conversations",
  resumeGame: "Return to game",
  endGame: "End game",
  pausePending: "Requesting a game pause\u2026",
  gamePaused: "Game confirmed paused",
  moveWindowHint: "Drag the title to move; arrow keys adjust, Home resets the position",
  moveWindowLabel: "Move game window \xB7 {name}",
  resizeWindowLabel: "Resize game window ({edge})",
  resizeN: "top edge",
  resizeE: "right edge",
  resizeS: "bottom edge",
  resizeW: "left edge",
  resizeNe: "top-right corner",
  resizeNw: "top-left corner",
  resizeSe: "bottom-right corner",
  resizeSw: "bottom-left corner",
  resumeGameLabel: "Return to game \xB7 {name}",
  resizeWindowHint: "Drag an edge or corner to resize; focus the bottom-right corner to adjust with arrow keys",
  moveHudHint: "Click to toggle tasks; drag the pill to move, use arrow keys to adjust or Home to reset"
};

// src/client/styles.css
var styles_default = `.bg_page{display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:13px}
.bg_toolbar{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;flex:none;padding:10px 16px 8px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.bg_title{margin:0;font-size:15px;font-weight:600;line-height:1.2;justify-self:start;white-space:nowrap}
.bg_search{display:flex;align-items:center;gap:6px;min-width:0;width:100%;height:30px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);justify-self:center}
.bg_search:focus-within{border-color:var(--dsw-alias-brand-primary)}
.bg_search input{flex:1;min-width:0;border:none;outline:none;background:transparent;color:var(--dsw-alias-label-primary);font:inherit}
.bg_page :focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.bg_search input:focus-visible{outline:none}
.bg_search input::placeholder{color:var(--dsw-alias-label-secondary)}
.bg_search-clear{width:18px;height:18px;border-radius:4px;flex:none}
.bg_toolbar-actions{display:flex;align-items:center;gap:8px;justify-self:end;flex-wrap:wrap}
.bg_tool{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:999px;padding:5px 12px;font:inherit;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .12s ease,border-color .12s ease,transform .12s ease}
.bg_tool:hover{background:var(--dsw-alias-bg-layer-2);transform:translateY(-1px)}
.bg_tool:active{transform:translateY(0)}
.bg_tool[data-primary="true"]{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.bg_tool[data-primary="true"]:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 88%,#000)}
.bg_tool[data-accent="true"]{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,var(--dsw-alias-border-l2));color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,var(--dsw-alias-bg-layer-1))}
.bg_tool[data-accent="true"]:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 14%,var(--dsw-alias-bg-layer-1))}
.bg_tool:disabled{opacity:.45;cursor:default;transform:none}
.bg_iconbtn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex:none;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;padding:0}
.bg_iconbtn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.bg_iconbtn[data-active="true"]{color:var(--dsw-alias-state-error-primary)}
.bg_iconbtn:disabled{opacity:.45;cursor:default}
.bg_scroll{flex:1;overflow-y:auto;min-height:0;padding:12px 16px 16px}
.bg_tabs{display:flex;gap:6px;margin-bottom:10px}
.bg_tab{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:4px 12px;font:inherit;font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
.bg_tab[aria-pressed="true"]{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.bg_chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.bg_promo{position:relative;display:flex;align-items:center;gap:12px;margin-bottom:12px;padding:10px 40px 10px 14px;border-radius:12px;border:1px solid color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,var(--dsw-alias-border-l1));background:linear-gradient(120deg,color-mix(in srgb,var(--dsw-alias-brand-primary) 16%,var(--dsw-alias-bg-layer-1)) 0%,color-mix(in srgb,var(--dsw-alias-brand-primary) 6%,var(--dsw-alias-bg-layer-1)) 55%,var(--dsw-alias-bg-layer-1) 100%);overflow:hidden}
.bg_promo-icon{display:flex;align-items:center;justify-content:center;width:34px;height:34px;flex:none;border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 22%,transparent);color:var(--dsw-alias-brand-primary)}
.bg_promo-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.bg_promo-title{font-size:13px;font-weight:600}
.bg_promo-text{font-size:12px;color:var(--dsw-alias-label-secondary)}
.bg_promo-actions{display:flex;gap:8px;flex:none}
.bg_promo-close{position:absolute;top:6px;right:6px}
@media (max-width:720px){.bg_promo{flex-wrap:wrap}.bg_promo-actions{width:100%;justify-content:flex-start}}
.bg_chip{border:none;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:3px 10px;font:inherit;font-size:12px;cursor:pointer}
.bg_chip[aria-pressed="true"]{background:var(--dsw-alias-brand-primary);color:#fff}
.bg_meta{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin:0 0 10px}
.bg_meta h2{margin:0;font-size:14px;font-weight:600}
.bg_meta-side{display:flex;align-items:center;gap:8px}
.bg_btn-compact{padding:2px 8px;font-size:11px}
.bg_count{color:var(--dsw-alias-label-secondary);font-size:12px;flex:none}
.bg_status{margin:6px 0;color:var(--dsw-alias-label-secondary);font-size:12px}
.bg_status[data-tone="error"]{color:var(--dsw-alias-state-error-primary)}
.bg_grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:12px}
.bg_card{position:relative;display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;overflow:hidden;background:var(--dsw-alias-bg-layer-1);cursor:pointer;padding:0;text-align:left;font:inherit;color:inherit;transition:transform .12s ease,border-color .12s ease;content-visibility:auto;contain-intrinsic-size:auto 220px}
.bg_card:hover{transform:translateY(-2px);border-color:var(--dsw-alias-border-l2)}
.bg_cover{position:relative;aspect-ratio:4/3;width:100%;border:none;background:var(--dsw-alias-bg-layer-2);padding:0;display:block;cursor:pointer}
.bg_cover img{width:100%;height:100%;object-fit:cover;display:block}
.bg_cover img[data-error="true"],.bg_cover img[data-missing="true"]{opacity:0}
.bg_cover-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary)}
.bg_play-hint{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dsw-alias-bg-base) 45%,transparent);color:#fff;opacity:0;transition:opacity .14s ease}
.bg_cover:hover .bg_play-hint,.bg_cover:focus-visible .bg_play-hint{opacity:1}
.bg_body{padding:8px 10px 10px;display:flex;flex-direction:column;gap:2px;min-width:0;border:none;background:none;color:inherit;font:inherit;cursor:pointer}
.bg_name{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bg_cats{font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bg_fav{position:absolute;top:6px;right:6px;width:26px;height:26px;border:none;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 72%,transparent);color:var(--dsw-alias-label-primary);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
.bg_fav:hover{color:var(--dsw-alias-state-error-primary)}
.bg_fav[data-active="true"]{color:var(--dsw-alias-state-error-primary)}
.bg_remove{position:absolute;top:6px;left:6px;width:26px;height:26px;border:none;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 72%,transparent);color:var(--dsw-alias-label-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}
.bg_remove:hover{color:var(--dsw-alias-state-error-primary)}
.bg_empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:48px 16px;color:var(--dsw-alias-label-secondary);text-align:center}
.bg_skeleton{pointer-events:none}
.bg_skeleton .bg_cover{background:var(--dsw-alias-bg-layer-2)}
.bg_sk-line{display:block;height:12px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);animation:bg-pulse 1.4s ease-in-out infinite}
@keyframes bg-pulse{0%,100%{opacity:.55}50%{opacity:1}}
.bg_actions{display:flex;gap:8px;margin-top:10px;flex:none;padding:0 16px 12px}
.bg_btn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 12px;font:inherit;font-size:12px;cursor:pointer}
.bg_btn:hover{background:var(--dsw-alias-bg-layer-2)}
.bg_btn[data-primary="true"]{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.bg_btn:disabled{opacity:.45;cursor:default}
.bg_footer{flex:none;display:flex;align-items:center;gap:6px;padding:8px 16px;border-top:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary);font-size:11px}
.bg_footer-link{border:none;background:none;padding:0;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
.bg_footer-link:hover{color:var(--dsw-alias-brand-primary)}
.bg_dot{width:6px;height:6px;border-radius:999px;background:var(--dsw-alias-state-success-primary);flex:none}
.bg_dot[data-offline="true"]{background:var(--dsw-alias-state-warn-primary)}
.bg_player{display:flex;flex-direction:column;flex:1;min-height:0}
.bg_player-toolbar{display:flex;align-items:center;gap:8px;flex:none;padding:8px 16px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.bg_playing-name{margin:0;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bg_playing-cats{color:var(--dsw-alias-label-secondary);font-size:11px;flex:none}
.bg_stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;background:var(--dsw-alias-bg-layer-2);position:relative}
.bg_stage iframe{width:100%;height:100%;border:none;display:block}
.bg_stage[data-layout="portrait"] iframe{max-width:480px}
.bg_stage[data-layout="landscape"] iframe{max-width:1200px}
.bg_game-area:fullscreen iframe{max-width:none}
.bg_hud{position:absolute;top:10px;right:10px;z-index:6;display:flex;flex-direction:column;align-items:flex-end;gap:6px;max-width:min(340px,86%);max-height:calc(100% - 20px)}
.bg_game-area{position:relative;display:flex;flex:1;min-height:0;width:100%}
.bg_game-area>.bg_stage{width:100%}
.bg_game-area:fullscreen{background:var(--dsw-alias-bg-layer-2)}
.bg_hud-questions{display:flex;flex-direction:column;align-items:flex-end;gap:4px;max-width:100%;flex-shrink:0}
.bg_hud-questions .bg_hud-flash{color:var(--dsw-alias-state-warn-primary);font-weight:600}
.bg_hud-more{border:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-state-warn-primary);font:inherit;font-size:12px;cursor:pointer;border-radius:6px;padding:4px 8px}
.bg_hud-error{margin:0;font-size:12px;color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-bg-base);padding:6px;border-radius:6px}
.bg_hud button:disabled{cursor:progress;opacity:.6}
.bg_hud-pill{display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 11px;border:1px solid var(--dsw-alias-border-l2);border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 82%,transparent);backdrop-filter:blur(4px);color:var(--dsw-alias-label-primary);cursor:pointer;font:inherit;font-size:12px}
.bg_hud-pill:hover{border-color:var(--dsw-alias-brand-primary)}
.bg_hud-pill{cursor:grab;touch-action:none;user-select:none;flex-shrink:0}
.bg_hud[data-dragging="true"] .bg_hud-pill{cursor:grabbing}
.bg_hud-flash{flex-shrink:0}
.bg_hud-notices{display:flex;flex-direction:column;align-items:flex-end;gap:6px;max-width:100%;min-height:0;max-height:40vh;overflow-y:auto;flex-shrink:1}
.bg_hud-notices:empty{display:none}
.bg_hud-list{box-sizing:border-box;min-height:0}
.bg_hud-badge{display:inline-flex;align-items:center;gap:4px;font-weight:600}
.bg_hud-badge[data-tone="warn"]{color:var(--dsw-alias-state-warn-primary)}
.bg_hud-badge[data-tone="success"]{color:var(--dsw-alias-state-success-primary)}
.bg_hud-badge[data-tone="live"]{color:var(--dsw-alias-state-idle-primary)}
.bg_hud-list{display:flex;flex-direction:column;gap:5px;width:100%;max-height:40vh;overflow-y:auto;padding:9px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 92%,transparent);backdrop-filter:blur(6px);box-shadow:0 6px 24px rgba(0,0,0,.18)}
.bg_hud-row{display:flex;align-items:center;gap:6px;width:100%;border:none;background:none;color:inherit;font:inherit;font-size:12px;text-align:left;padding:0;cursor:pointer;border-radius:6px}
.bg_hud-row:hover{background:var(--dsw-alias-bg-layer-2)}
.bg_hud-rowicon{flex:none;display:inline-flex}
.bg_hud-rowicon[data-tone="warn"]{color:var(--dsw-alias-state-warn-primary)}
.bg_hud-rowicon[data-tone="success"]{color:var(--dsw-alias-state-success-primary)}
.bg_hud-rowicon[data-tone="live"]{color:var(--dsw-alias-state-idle-primary)}
.bg_hud-rowtitle{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bg_hud-rowkind{flex:none;color:var(--dsw-alias-label-secondary);font-size:11px}
.bg_hud-flash{max-width:100%;padding:4px 10px;border-radius:8px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 88%,transparent);border:1px solid var(--dsw-alias-border-l2);font-size:12px;color:var(--dsw-alias-label-primary);animation:bg-hud-in .18s ease;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer}
.bg_hud-flash:hover{border-color:var(--dsw-alias-brand-primary)}
.bg_hud-flash[data-tone="warn"]{border-color:var(--dsw-alias-state-warn-primary)}
.bg_hud-flash[data-tone="success"]{border-color:var(--dsw-alias-state-success-primary)}
@keyframes bg-hud-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.bg_float{position:fixed;right:16px;bottom:16px;z-index:80;width:min(420px,42vw);height:min(320px,42vh);display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;overflow:hidden;background:var(--dsw-alias-bg-base);box-shadow:0 10px 34px rgba(0,0,0,.28)}
.bg_float-toolbar{display:flex;align-items:center;gap:6px;flex:none;padding:5px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);cursor:grab}
.bg_float-title{flex:1;min-width:0;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bg_float-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;background:var(--dsw-alias-bg-layer-2);position:relative}
.bg_float-stage iframe{width:100%;height:100%;border:none;display:block}
.bg_float-badge{position:absolute;top:6px;left:6px;z-index:7;display:inline-flex;align-items:center;gap:4px;height:20px;padding:0 8px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-base) 88%,transparent);font-size:11px;color:var(--dsw-alias-label-secondary)}
.bg_float-badge[data-tone="warn"]{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary)}
.bg_float-badge[data-tone="success"]{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
.bg_player-anchor{height:100%;min-height:0;width:100%}
.bg_persistent{position:fixed;z-index:70;pointer-events:auto;box-sizing:border-box;overflow:hidden}
.bg_persistent[data-mode="full"]{border-radius:inherit}
.bg_persistent[data-mode="mini"]{right:16px;bottom:16px;width:min(420px,calc(100vw - 32px));height:min(340px,50vh);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:0 10px 34px #0003}
.bg_persistent[data-mode="away"]{right:16px;bottom:16px;width:min(360px,calc(100vw - 32px));height:auto;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:0 6px 24px #0002}
.bg_persistent[data-mode="away"] .bg_stage{position:fixed;left:-10000px;top:0;width:800px;height:600px;visibility:hidden;pointer-events:none}
.bg_persistent[data-mode="away"] .bg_game-area{flex:none;display:block}
.bg_persistent[data-mode="away"] .bg_hud{position:relative;inset:auto;max-width:none;max-height:50vh;padding:0 12px 10px;align-items:stretch}
.bg_persistent[data-mode="away"] .bg_hud-pill{align-self:flex-end;cursor:pointer}
.bg_persistent[data-mode="away"] .bg_hud-list{max-height:25vh}
.bg_persistent[data-mode="away"] .bg_hud-notices{align-items:stretch}
.bg_persistent[data-mode="away"] .bg_player-toolbar{padding:10px 12px;flex-wrap:wrap}
.bg_persistent[data-mode="mini"] .bg_player-toolbar{padding:5px 8px;gap:4px;flex-wrap:wrap}
.bg_persistent[data-mode="mini"] .bg_playing-name{min-width:80px!important}
.bg_resize-handle{position:absolute;z-index:30;touch-action:none;user-select:none}
.bg_resize-handle[data-edge="n"],.bg_resize-handle[data-edge="s"]{left:12px;right:12px;height:6px;cursor:ns-resize}
.bg_resize-handle[data-edge="n"]{top:0}
.bg_resize-handle[data-edge="s"]{bottom:0}
.bg_resize-handle[data-edge="e"],.bg_resize-handle[data-edge="w"]{top:12px;bottom:12px;width:6px;cursor:ew-resize}
.bg_resize-handle[data-edge="e"]{right:0}
.bg_resize-handle[data-edge="w"]{left:0}
.bg_resize-handle[data-edge="ne"],.bg_resize-handle[data-edge="nw"],.bg_resize-handle[data-edge="se"],.bg_resize-handle[data-edge="sw"]{width:12px;height:12px}
.bg_resize-handle[data-edge="ne"],.bg_resize-handle[data-edge="nw"]{top:0}
.bg_resize-handle[data-edge="se"],.bg_resize-handle[data-edge="sw"]{bottom:0}
.bg_resize-handle[data-edge="ne"],.bg_resize-handle[data-edge="se"]{right:0}
.bg_resize-handle[data-edge="nw"],.bg_resize-handle[data-edge="sw"]{left:0}
.bg_resize-handle[data-edge="ne"],.bg_resize-handle[data-edge="sw"]{cursor:nesw-resize}
.bg_resize-handle[data-edge="nw"],.bg_resize-handle[data-edge="se"]{cursor:nwse-resize}
.bg_resize-handle[data-edge="se"]:after{content:'';position:absolute;right:3px;bottom:3px;width:6px;height:6px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;opacity:.45}
.bg_resize-handle:focus-visible{outline:2px solid currentColor;outline-offset:-2px}
.bg_persistent[data-resizing="true"] iframe{pointer-events:none}
.bg_drag-handle{cursor:grab;touch-action:none;user-select:none;display:flex;align-items:center;gap:6px;min-height:28px}
.bg_drag-handle:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:4px}
.bg_persistent[data-dragging="true"] .bg_drag-handle{cursor:grabbing}
.bg_drag-grip{flex:none;opacity:.5}
.bg_resume{min-height:32px}
.bg_pause-status{margin:0;padding:8px 12px;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
.bg_pause-status[data-paused="true"]{color:var(--dsw-alias-state-success-primary)}
.bg_loading{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary)}
.bg_spinner{width:22px;height:22px;border-radius:999px;border:2px solid var(--dsw-alias-border-l2);border-top-color:var(--dsw-alias-brand-primary);animation:bg-spin .8s linear infinite}
@keyframes bg-spin{to{transform:rotate(360deg)}}
.bg_help{flex:none;display:flex;align-items:center;gap:8px;margin:8px 16px 0;padding:6px 10px;border-radius:8px;background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-primary);font-size:12px}
.bg_help p{margin:0;flex:1}
.bg_page :focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.bg_card,.bg_card:hover{transition:none;transform:none}.bg_play-hint{transition:none}.bg_spinner,.bg_sk-line{animation-duration:.01ms}}
`;

// src/client/constants.js
var NS = "beegame";
var PANEL_ID = "beegame";
var STORAGE_KEY = "dsh-beegame-v1";
var PROMO_KEY = "dsh-beegame-promo-hidden";
var HELP_KEY = "dsh-beegame-help-hidden";
var MAX_RECENT = 40;
var RESIZE_KEYS = {
  n: "resizeN",
  e: "resizeE",
  s: "resizeS",
  w: "resizeW",
  ne: "resizeNe",
  nw: "resizeNw",
  se: "resizeSe",
  sw: "resizeSw"
};
var CATEGORY_KEYS = {
  "": "catAll",
  Puzzle: "catPuzzle",
  Casual: "catCasual",
  Arcade: "catArcade",
  Racing: "catRacing",
  Sports: "catSports",
  Shooter: "catShooter",
  Cards: "catCards",
  Merge: "catMerge",
  Platformer: "catPlatformer",
  "AI Builds": "catAI",
  Ball: "catBall",
  "Match-3": "catMatch",
  "Find Difference": "catDifference",
  Mahjong: "catMahjong",
  Parking: "catParking",
  New: "catNew",
  Other: "catOther",
  "Escape the Room": "catEscape",
  Connect: "catConnect",
  "Boom Blast": "catBoomBlast"
};
var CHIP_CATEGORIES = ["", "Puzzle", "Casual", "Arcade", "Racing", "Sports", "Shooter", "Cards", "Merge", "Platformer", "AI Builds"];

// src/client/runtime.js
var import_react = require("react");
var sharedCtx = null;
var sharedSession = null;
var sharedHudNotifications = null;
var sharedHudNavigation = null;
var sharedT = (key) => key;
function configureRuntime(ctx, session, translate, hudNotifications, hudNavigation) {
  sharedCtx = ctx;
  sharedSession = session;
  sharedT = translate;
  sharedHudNotifications = hudNotifications;
  sharedHudNavigation = hudNavigation;
}
var INITIAL_LOCALE = Object.freeze({ active: "zh", revision: 0 });
var subscribeLocale = (listener) => sharedCtx.locale.subscribe(listener);
var getLocaleSnapshot = () => sharedCtx.locale.getSnapshot();
function usePluginLocale() {
  const snapshot = (0, import_react.useSyncExternalStore)(subscribeLocale, getLocaleSnapshot, () => INITIAL_LOCALE);
  const language = snapshot.active.toLowerCase().startsWith("en") ? "en" : "zh";
  const t = (0, import_react.useCallback)((key, params) => sharedT(key, params), [snapshot]);
  return { t, language, localeTag: language === "zh" ? "zh-CN" : "en" };
}
function useGameSession() {
  return (0, import_react.useSyncExternalStore)(sharedSession.subscribe, sharedSession.getSnapshot, sharedSession.getSnapshot);
}

// src/shared/urls.js
function httpsUrl(value) {
  if (typeof value !== "string" || value === "") return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return "";
    return url.href;
  } catch {
    return "";
  }
}
function gameUrl(value, hostOrigin = globalThis.location?.origin) {
  const safe = httpsUrl(value);
  return safe && new URL(safe).origin !== hostOrigin ? safe : "";
}

// src/client/game-session.js
function createGameSession(initialRecords, saveRecords, navigate) {
  let snapshot = { game: null, mode: "away", anchor: null, pause: "unavailable", records: initialRecords };
  const listeners = /* @__PURE__ */ new Set();
  const update = (patch) => {
    if (Object.entries(patch).every(([key, value]) => snapshot[key] === value)) return;
    snapshot = { ...snapshot, ...patch };
    for (const listener of listeners) listener();
  };
  const updateRecords = (next) => {
    const records = typeof next === "function" ? next(snapshot.records) : next;
    saveRecords(records);
    update({ records });
  };
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    updateRecords,
    open: (game) => {
      if (gameUrl(game?.url) === "") return false;
      const same = snapshot.game?.id === game.id && snapshot.game?.url === game.url;
      update({ game: same ? snapshot.game : game, mode: "full", ...same ? {} : { pause: "unavailable" } });
    },
    attach: (anchor) => update({ anchor, ...anchor === null && snapshot.mode === "full" ? { mode: "away" } : {} }),
    minimize: () => {
      if (snapshot.game) update({ mode: "mini" });
    },
    setAway: () => {
      if (snapshot.game) update({ mode: "away" });
    },
    leave: () => {
      if (snapshot.game) update({ mode: "away" });
      navigate(null);
    },
    resume: () => {
      if (snapshot.game && navigate(PANEL_ID) !== false) update({ mode: "full" });
    },
    show: () => {
      if (snapshot.game) update({ mode: "full" });
    },
    setPause: (pause) => update({ pause }),
    close: () => update({ game: null, mode: "away", pause: "unavailable" }),
    dispose: () => {
      listeners.clear();
    }
  };
}

// src/client/hud-notifications.js
function createHudNotifications() {
  let notices = [];
  let previousAttention = /* @__PURE__ */ new Set();
  let sequence = 0;
  const listeners = /* @__PURE__ */ new Set();
  const publish = (next) => {
    if (next.length === notices.length && next.every((notice, index) => notice === notices[index])) return;
    notices = next;
    for (const listener of listeners) listener();
  };
  return {
    getSnapshot: () => notices,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    observe(rows) {
      const attention = rows.filter((row) => row.kind === "done" || row.kind === "question");
      const next = new Map(notices.map((notice) => [notice.id, notice]));
      for (const row of attention) {
        if (!previousAttention.has(`${row.id}:${row.kind}`)) {
          next.set(row.id, {
            ...row,
            notificationId: ++sequence,
            ...row.kind === "done" ? { expiresAt: Date.now() + 6e3 } : {}
          });
        }
      }
      for (const [id, notice] of next) {
        if (notice.kind === "question" && !attention.some((row) => row.id === id && row.kind === "question")) next.delete(id);
      }
      for (const row of rows) {
        const notice = next.get(row.id);
        if (notice && row.title && notice.title !== row.title) next.set(row.id, { ...notice, title: row.title });
      }
      previousAttention = new Set(attention.map((row) => `${row.id}:${row.kind}`));
      publish([...next.values()]);
    },
    acknowledge(id, notificationId) {
      publish(notices.filter((notice) => notice.id !== id || notice.notificationId !== notificationId));
    },
    dispose() {
      listeners.clear();
      notices = [];
      previousAttention.clear();
    }
  };
}
function mergeHudNotices(rows, notices) {
  const byId = new Map(rows.filter((row) => row.kind === "running").map((row) => [row.id, row]));
  for (const notice of notices) {
    byId.set(notice.id, notice);
  }
  for (const row of rows) if (row.kind === "question") byId.set(row.id, row);
  const rank = { question: 0, done: 1, running: 2 };
  return [...byId.values()].sort((a, b) => rank[a.kind] - rank[b.kind]);
}

// src/client/hud-navigation.js
function createHudNavigation(ctx, session, inbox) {
  let snapshot = { pending: false, failed: false };
  let disposed = false;
  const listeners = /* @__PURE__ */ new Set();
  const publish = (next) => {
    snapshot = next;
    for (const listener of listeners) listener();
  };
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    async open(id) {
      if (disposed || snapshot.pending) return false;
      const notice = inbox.getSnapshot().find((item) => item.id === id);
      const before = session.getSnapshot();
      publish({ pending: true, failed: false });
      try {
        const workspace = ctx.get("uiWorkspace");
        if (typeof workspace?.openSession !== "function" || await workspace.openSession(id) === false) throw new Error("Session unavailable");
        if (disposed) return false;
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
    dispose() {
      disposed = true;
      listeners.clear();
    }
  };
}

// src/client/records.js
function savedGame(value) {
  if (!value || typeof value !== "object") return null;
  const url = gameUrl(value.url);
  const id = typeof value.id === "string" ? value.id : "";
  const name2 = typeof value.name === "string" ? value.name : "";
  if (id === "" || name2 === "" || url === "") return null;
  const category = Array.isArray(value.category) ? value.category.filter((x) => typeof x === "string" && x !== "") : [];
  const orientation = ["portrait", "landscape"].includes(value.orientation) ? value.orientation : "responsive";
  const lastPlayed = Number.isFinite(value.lastPlayed) && value.lastPlayed > 0 ? value.lastPlayed : void 0;
  return {
    id,
    name: name2,
    url,
    slug: typeof value.slug === "string" ? value.slug : id,
    image: httpsUrl(value.image),
    category,
    orientation,
    description: typeof value.description === "string" ? value.description : "",
    ...lastPlayed === void 0 ? {} : { lastPlayed }
  };
}
function uniqueGames(games) {
  const seen = /* @__PURE__ */ new Set();
  return games.filter((game) => {
    if (game === null || seen.has(game.id)) return false;
    seen.add(game.id);
    return true;
  });
}
function readRecords() {
  try {
    const raw = JSON.parse(window.localStorage?.getItem(STORAGE_KEY) ?? "null");
    if (!raw || typeof raw !== "object") return { favorites: [], recent: [] };
    const list = (value) => uniqueGames((Array.isArray(value) ? value : []).map(savedGame));
    return { favorites: list(raw.favorites), recent: list(raw.recent).slice(0, MAX_RECENT) };
  } catch {
    return { favorites: [], recent: [] };
  }
}
function writeRecords(records) {
  try {
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
  }
}

// src/client/floating-player.js
var import_react8 = require("react");

// src/client/player.js
var import_react7 = require("react");

// src/client/api.js
function apiBase(baseURI = globalThis.document?.baseURI) {
  try {
    return new URL("api/beegame", baseURI).pathname;
  } catch {
    return "/api/beegame";
  }
}
function createApi({ baseURI, fetch: request = (...args) => fetch(...args) } = {}) {
  const base = apiBase(baseURI);
  return async (path, timeoutMs = 16e3) => {
    const response = await request(`${base}${path}`, { signal: AbortSignal.timeout(timeoutMs), credentials: "same-origin" });
    const text = await response.text();
    let payload;
    try {
      payload = text === "" ? {} : JSON.parse(text);
    } catch {
      payload = { error: text.slice(0, 200) };
    }
    if (!response.ok) throw new Error(payload?.error ?? `HTTP ${response.status}`);
    return payload;
  };
}
var api = createApi();
function openExternal(url) {
  const safe = httpsUrl(url);
  if (safe === "") return;
  try {
    window.open(safe, "_blank", "noopener,noreferrer");
  } catch {
  }
}
function officialHomeUrl(localeTag) {
  return localeTag === "zh-CN" ? "https://bee.games/zh-CN" : "https://bee.games/";
}
function officialGameUrl(game) {
  const slug = typeof game?.slug === "string" && game.slug !== "" ? game.slug : "";
  if (slug === "") return officialHomeUrl("en");
  return `https://bee.games/game/${encodeURIComponent(slug)}`;
}

// src/client/pause-bridge.js
function createPauseBridge(frame, gameUrl2, onStatus, events = window, timers = {
  setTimeout: (fn, delay) => setTimeout(fn, delay),
  clearTimeout: (id) => clearTimeout(id)
}) {
  const origin = new URL(gameUrl2).origin;
  let supported = false;
  let desired = false;
  let serial = 0;
  let helloId = "";
  let commandId = "";
  let timer;
  const send = (payload) => frame.contentWindow?.postMessage({ version: 1, ...payload }, origin);
  const request = () => {
    timers.clearTimeout(timer);
    if (!supported) {
      onStatus("unavailable");
      return;
    }
    commandId = `state-${++serial}`;
    onStatus("requesting");
    send({ type: "beegame:set-paused", requestId: commandId, paused: desired });
    timer = timers.setTimeout(() => {
      commandId = "";
      onStatus("unavailable");
    }, 1500);
  };
  const onMessage = (event) => {
    const data = event.data;
    if (event.source !== frame.contentWindow || event.origin !== origin || data?.version !== 1) return;
    if (data.type === "beegame:capabilities" && data.requestId === helloId && data.pause === true) {
      supported = true;
      request();
    } else if (data.type === "beegame:paused" && commandId !== "" && data.requestId === commandId && data.paused === desired) {
      timers.clearTimeout(timer);
      commandId = "";
      onStatus(desired ? "paused" : "playing");
    }
  };
  events.addEventListener("message", onMessage);
  return {
    connect: () => {
      timers.clearTimeout(timer);
      supported = false;
      commandId = "";
      helloId = `hello-${++serial}`;
      onStatus("unavailable");
      send({ type: "beegame:hello", requestId: helloId });
    },
    setPaused: (paused) => {
      desired = paused;
      request();
    },
    dispose: () => {
      timers.clearTimeout(timer);
      events.removeEventListener("message", onMessage);
    }
  };
}

// src/client/session-hud.js
var import_react6 = require("react");

// src/client/hud-model.js
function composeHudRows(status, titles) {
  const rows = [];
  if (!(status instanceof Map)) return rows;
  for (const [id, entry] of status) {
    if (!entry || typeof entry !== "object") continue;
    const title = typeof titles?.[id] === "string" ? titles[id] : "";
    if (entry.pendingInteraction !== void 0 && entry.pendingInteraction !== null) {
      rows.push({ id, title, tone: "warn", kind: "question" });
    } else if (entry.completionUnread === true) {
      rows.push({ id, title, tone: "success", kind: "done" });
    } else if (entry.running === true) {
      rows.push({ id, title, tone: "live", kind: "running" });
    }
  }
  return rows;
}
function hudTone(rows) {
  if (rows.some((row) => row.tone === "warn")) return "warn";
  if (rows.some((row) => row.tone === "success")) return "success";
  return "live";
}
function sameHudRows(left, right) {
  return left.length === right.length && left.every((row, index) => {
    const other = right[index];
    return row.id === other.id && row.title === other.title && row.kind === other.kind && row.tone === other.tone;
  });
}
function createSessionSelectors() {
  let statusResult;
  let titleResult;
  return {
    status(snapshot) {
      if (!(snapshot instanceof Map)) return void 0;
      const rows = composeHudRows(snapshot, {});
      if (!statusResult || !sameHudRows(statusResult.rows, rows)) statusResult = { rows };
      return statusResult;
    },
    titles(snapshot) {
      const byId = snapshot?.byId;
      if (!byId || typeof byId !== "object" || Array.isArray(byId)) return void 0;
      const titles = Object.fromEntries(Object.entries(byId).map(([id, row]) => [id, typeof row?.title === "string" ? row.title : ""]));
      if (!titleResult || Object.keys(titleResult).length !== Object.keys(titles).length || Object.keys(titles).some((id) => titleResult[id] !== titles[id])) titleResult = titles;
      return titleResult;
    }
  };
}
function createHudProjection() {
  let previous = { ready: false, rows: [] };
  return (status, titles) => {
    const ready = status !== void 0 && titles !== void 0;
    const rows = ready ? status.rows.map((row) => ({ ...row, title: titles[row.id] ?? "" })) : [];
    if (previous.ready !== ready || !sameHudRows(previous.rows, rows)) previous = { ready, rows };
    return previous;
  };
}

// src/client/hud.js
var import_react5 = require("react");

// src/client/icons.js
var import_react2 = require("react");

// icon.svg
var icon_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="19" fill="%23ffc735"/><g stroke="%2329271f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M26 26c-18-16-20 4-9 10m21-10c18-16 20 4 9 10" fill="%23fff8dd"/><path d="m26 20-3-5m15 5 3-5"/><ellipse cx="32" cy="36" rx="16" ry="17" fill="%23ffdb58"/><path d="M18 30h28M17 39h30M23 49h18" fill="none"/><path d="M26 25h.1m12 0h.1" stroke-width="5"/></g></svg>%0A';

// src/client/icons.js
function Icon(props) {
  const { size = 16, children, ...rest } = props;
  return (0, import_react2.createElement)("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...rest
  }, children);
}
var IconSearch = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("circle", { cx: 11, cy: 11, r: 7 }), (0, import_react2.createElement)("path", { d: "m20 20-3.5-3.5" }));
var IconHeart = ({ filled, ...props }) => (0, import_react2.createElement)(
  Icon,
  { ...props, fill: filled ? "currentColor" : "none" },
  (0, import_react2.createElement)("path", { d: "M12 20.5C7 16.5 4 13.3 4 9.9 4 7.2 6 5 8.6 5c1.5 0 2.7.7 3.4 1.8C12.7 5.7 13.9 5 15.4 5 18 5 20 7.2 20 9.9c0 3.4-3 6.6-8 10.6Z" })
);
var IconClock = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("circle", { cx: 12, cy: 12, r: 8 }), (0, import_react2.createElement)("path", { d: "M12 8v4l3 2" }));
var IconGrid = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("rect", { x: 4, y: 4, width: 7, height: 7, rx: 1.5 }), (0, import_react2.createElement)("rect", { x: 13, y: 4, width: 7, height: 7, rx: 1.5 }), (0, import_react2.createElement)("rect", { x: 4, y: 13, width: 7, height: 7, rx: 1.5 }), (0, import_react2.createElement)("rect", { x: 13, y: 13, width: 7, height: 7, rx: 1.5 }));
var IconRefresh = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M20 12a8 8 0 1 1-2.3-5.6" }), (0, import_react2.createElement)("path", { d: "M20 4v4h-4" }));
var IconBack = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M14 6l-6 6 6 6" }));
var IconExternal = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M14 5h5v5" }), (0, import_react2.createElement)("path", { d: "M19 5l-8 8" }), (0, import_react2.createElement)("path", { d: "M19 14v5H5V5h5" }));
var IconDice = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("rect", { x: 4, y: 4, width: 16, height: 16, rx: 3 }), (0, import_react2.createElement)("circle", { cx: 9, cy: 9, r: 1.1, fill: "currentColor" }), (0, import_react2.createElement)("circle", { cx: 15, cy: 15, r: 1.1, fill: "currentColor" }), (0, import_react2.createElement)("circle", { cx: 12, cy: 12, r: 1.1, fill: "currentColor" }));
var IconCreate = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M12 20h9" }), (0, import_react2.createElement)("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" }));
var IconClose = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M6 6l12 12" }), (0, import_react2.createElement)("path", { d: "M18 6 6 18" }));
var IconFullscreen = ({ active, ...props }) => (0, import_react2.createElement)(Icon, props, active ? [(0, import_react2.createElement)("path", { key: "a", d: "M9 3H3v6" }), (0, import_react2.createElement)("path", { key: "b", d: "M15 21h6v-6" }), (0, import_react2.createElement)("path", { key: "c", d: "M3 15v6h6" }), (0, import_react2.createElement)("path", { key: "d", d: "M21 9V3h-6" })] : [(0, import_react2.createElement)("path", { key: "a", d: "M3 9V3h6" }), (0, import_react2.createElement)("path", { key: "b", d: "M21 15v6h-6" }), (0, import_react2.createElement)("path", { key: "c", d: "M15 3h6v6" }), (0, import_react2.createElement)("path", { key: "d", d: "M9 21H3v-6" })]);
var IconPlay = (props) => (0, import_react2.createElement)(Icon, { ...props, fill: "currentColor", stroke: "none" }, (0, import_react2.createElement)("path", { d: "M8 5.5v13l11-6.5Z" }));
var IconBell = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" }), (0, import_react2.createElement)("path", { d: "M10 18.5a2 2 0 0 0 4 0" }));
var IconQuestion = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("circle", { cx: 12, cy: 12, r: 9 }), (0, import_react2.createElement)("path", { d: "M9.6 9.2a2.5 2.5 0 1 1 3.4 2.9c-.7.4-1 1-1 1.9" }), (0, import_react2.createElement)("circle", { cx: 12, cy: 17, r: 1, fill: "currentColor", stroke: "none" }));
var IconDone = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("circle", { cx: 12, cy: 12, r: 9 }), (0, import_react2.createElement)("path", { d: "m8.5 12.3 2.4 2.4 4.6-5" }));
var IconRun = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("circle", { cx: 12, cy: 12, r: 9 }), (0, import_react2.createElement)("path", { d: "M12 7v5l3.5 2" }));
var IconMinimize = (props) => (0, import_react2.createElement)(Icon, props, (0, import_react2.createElement)("path", { d: "M5 12h14" }));
function BeeGlyph(props) {
  const { size = 18 } = props;
  return (0, import_react2.createElement)("img", {
    src: icon_default,
    width: size,
    height: size,
    alt: "",
    "aria-hidden": true,
    style: { display: "block" }
  });
}

// src/client/hud-toasts.js
var import_react3 = require("react");
function CompletionToasts({ notices, t, onOpen, onExpand, pending }) {
  const [now, setNow] = (0, import_react3.useState)(Date.now);
  const active = notices.filter((notice) => notice.expiresAt > now);
  const nextExpiry = Math.min(...active.map((notice) => notice.expiresAt));
  (0, import_react3.useEffect)(() => {
    if (!Number.isFinite(nextExpiry)) return void 0;
    const timer = setTimeout(() => setNow(Date.now()), Math.max(0, nextExpiry - Date.now()));
    return () => clearTimeout(timer);
  }, [nextExpiry]);
  const visible = active.filter((notice) => notice.expiresAt > Date.now());
  if (visible.length > 2) return (0, import_react3.createElement)("button", {
    type: "button",
    className: "bg_hud-flash bg_hud-summary",
    "data-tone": "success",
    onClick: onExpand
  }, t("hudCompletedSummary", { n: visible.length }));
  return visible.map((notice) => {
    const text = t("hudFlash", { status: t("hudDone"), title: notice.title || t("hudUntitled") });
    return (0, import_react3.createElement)("button", {
      key: notice.notificationId,
      type: "button",
      className: "bg_hud-flash",
      "data-tone": "success",
      "data-session-id": notice.id,
      disabled: pending,
      onClick: () => onOpen(notice.id),
      title: `${text}
${t("hudOpenSession")}`
    }, text);
  });
}

// src/client/hud-position.js
var import_react4 = require("react");

// src/client/geometry.js
function readGeometry(key, fields) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    if (!value || fields.some((field) => !Number.isFinite(value[field]) || value[field] < 0 || value[field] > 1e5)) return null;
    if (fields.includes("width") && (!value.width || !value.height)) return null;
    return Object.fromEntries(fields.map((field) => [field, value[field]]));
  } catch {
    return null;
  }
}
function writeGeometry(key, value) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}

// src/client/hud-position.js
function useHudPosition(visible) {
  const rootRef = (0, import_react4.useRef)(null);
  const dragRef = (0, import_react4.useRef)(null);
  const suppressClick = (0, import_react4.useRef)(false);
  const [position, setPosition] = (0, import_react4.useState)(() => readGeometry("dsh-beegame-hud-position", ["left", "top"]));
  const [fitted, setFitted] = (0, import_react4.useState)(null);
  (0, import_react4.useEffect)(() => {
    writeGeometry("dsh-beegame-hud-position", position);
  }, [position]);
  const [dragging, setDragging] = (0, import_react4.useState)(false);
  const clamp = (point) => {
    const root = rootRef.current;
    const stage = root?.parentElement;
    if (root?.closest(".bg_persistent")?.dataset.mode === "away" || !stage || !root.offsetWidth || !stage.clientWidth) return point;
    return {
      left: Math.max(8, Math.min(point.left, stage.clientWidth - root.offsetWidth - 8)),
      top: Math.max(8, Math.min(point.top, stage.clientHeight - root.offsetHeight - 8))
    };
  };
  (0, import_react4.useLayoutEffect)(() => {
    if (!visible || !rootRef.current) return void 0;
    const keepVisible = () => setFitted((current) => {
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
  (0, import_react4.useEffect)(() => {
    if (!visible) {
      dragRef.current = null;
      setDragging(false);
    }
  }, [visible]);
  const finish = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    suppressClick.current = drag.moved;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return {
    rootRef,
    dragging,
    style: position ? { ...fitted ?? position, right: "auto" } : void 0,
    consumeDragClick: (event) => {
      if (!suppressClick.current || event.detail === 0) {
        suppressClick.current = false;
        return false;
      }
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
      return true;
    },
    handlers: {
      onPointerDown: (event) => {
        if (event.button !== 0 || event.isPrimary === false) return;
        const root = rootRef.current;
        const rect = root.getBoundingClientRect();
        const parent = root.parentElement.getBoundingClientRect();
        suppressClick.current = false;
        dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left - parent.left, top: rect.top - parent.top, moved: false };
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      onPointerMove: (event) => {
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
      onKeyDown: (event) => {
        if (event.key === "Home") {
          event.preventDefault();
          setPosition(null);
          return;
        }
        const step = event.shiftKey ? 48 : 16;
        const offset = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
        if (!offset) return;
        event.preventDefault();
        const root = rootRef.current;
        const rect = root.getBoundingClientRect();
        const parent = root.parentElement.getBoundingClientRect();
        setPosition(clamp({ left: rect.left - parent.left + offset[0], top: rect.top - parent.top + offset[1] }));
      }
    }
  };
}

// src/client/hud.js
function hudRowKind(kind, t) {
  if (kind === "question") return t("hudNeedsYou");
  if (kind === "done") return t("hudDone");
  return t("hudRunning");
}
function hudRowIcon(kind) {
  if (kind === "question") return (0, import_react5.createElement)(IconQuestion, { size: 13 });
  if (kind === "done") return (0, import_react5.createElement)(IconDone, { size: 13 });
  return (0, import_react5.createElement)(IconRun, { size: 13 });
}
function TaskHudView({ rows, ready, t, mode }) {
  const [open, setOpen] = (0, import_react5.useState)(false);
  const away = mode === "away";
  const navigation = (0, import_react5.useSyncExternalStore)(
    sharedHudNavigation.subscribe,
    sharedHudNavigation.getSnapshot,
    sharedHudNavigation.getSnapshot
  );
  const notices = (0, import_react5.useSyncExternalStore)(
    sharedHudNotifications.subscribe,
    sharedHudNotifications.getSnapshot,
    sharedHudNotifications.getSnapshot
  );
  const displayRows = mergeHudNotices(rows, notices);
  const floating = useHudPosition(!away && ready && displayRows.length > 0);
  (0, import_react5.useEffect)(() => {
    if (ready) sharedHudNotifications.observe(rows);
  }, [ready, rows]);
  const tone = hudTone(displayRows);
  const counts = { warn: 0, done: 0, live: 0 };
  for (const row of displayRows) counts[row.tone === "warn" ? "warn" : row.tone === "success" ? "done" : "live"] += 1;
  counts.done = notices.filter((notice) => notice.kind === "done").length;
  const openSession = async (sessionId) => {
    if (await sharedHudNavigation.open(sessionId)) setOpen(false);
  };
  if (!ready) return null;
  if (displayRows.length === 0) return null;
  const questions = notices.filter((notice) => notice.kind === "question");
  return (0, import_react5.createElement)(
    "div",
    {
      ref: floating.rootRef,
      className: "bg_hud",
      style: away ? void 0 : floating.style,
      "data-dragging": floating.dragging || void 0,
      "aria-busy": navigation.pending
    },
    questions.length > 0 && (0, import_react5.createElement)(
      "div",
      { className: "bg_hud-questions", role: "status" },
      (0, import_react5.createElement)("button", {
        type: "button",
        className: "bg_hud-flash",
        "data-tone": "warn",
        disabled: navigation.pending,
        onClick: () => openSession(questions[0].id),
        title: t("hudOpenSession")
      }, t("hudFlash", { status: t("hudNeedsYou"), title: questions[0].title || t("hudUntitled") })),
      questions.length > 1 && (0, import_react5.createElement)(
        "button",
        { type: "button", className: "bg_hud-more", onClick: () => setOpen(true) },
        t("hudQuestionsSummary", { n: questions.length })
      )
    ),
    notices.length > 0 && (0, import_react5.createElement)(
      "div",
      {
        className: "bg_hud-notices",
        role: "log",
        "aria-live": "polite",
        "aria-label": t("hudDoneCount", { n: counts.done })
      },
      (0, import_react5.createElement)(CompletionToasts, {
        notices: notices.filter((notice) => notice.kind === "done"),
        t,
        onOpen: openSession,
        onExpand: () => setOpen(true),
        pending: navigation.pending
      })
    ),
    navigation.failed && (0, import_react5.createElement)("p", { className: "bg_hud-error", role: "alert" }, t("hudOpenFailed")),
    (0, import_react5.createElement)(
      "button",
      {
        type: "button",
        className: "bg_hud-pill",
        "aria-expanded": open,
        "aria-label": t("hudToggle"),
        title: away ? t("hudToggle") : t("moveHudHint"),
        ...!away ? floating.handlers : {},
        onClick: (event) => {
          if (away || !floating.consumeDragClick(event)) setOpen((current) => !current);
        }
      },
      (0, import_react5.createElement)("span", { className: "bg_hud-badge", "data-tone": tone }, (0, import_react5.createElement)(IconBell, { size: 13 })),
      counts.warn > 0 && (0, import_react5.createElement)("span", { className: "bg_hud-badge", "data-tone": "warn" }, t("hudNeedsYouCount", { n: counts.warn })),
      counts.done > 0 && (0, import_react5.createElement)("span", { className: "bg_hud-badge", "data-tone": "success" }, t("hudDoneCount", { n: counts.done })),
      counts.live > 0 && (0, import_react5.createElement)("span", { className: "bg_hud-rowkind" }, t("hudRunningShort", { n: String(counts.live) }))
    ),
    open && (0, import_react5.createElement)(
      "div",
      { className: "bg_hud-list", role: "list" },
      displayRows.map((row) => (0, import_react5.createElement)(
        "button",
        {
          key: row.id,
          type: "button",
          className: "bg_hud-row",
          role: "listitem",
          "data-session-id": row.id,
          title: t("hudOpenSession"),
          disabled: navigation.pending,
          onClick: () => openSession(row.id)
        },
        (0, import_react5.createElement)("span", { className: "bg_hud-rowicon", "data-tone": row.tone }, hudRowIcon(row.kind)),
        (0, import_react5.createElement)("span", { className: "bg_hud-rowtitle" }, row.title || t("hudUntitled")),
        (0, import_react5.createElement)("span", { className: "bg_hud-rowkind" }, hudRowKind(row.kind, t))
      ))
    )
  );
}
var TaskHud = (0, import_react5.memo)(TaskHudView);

// src/client/session-hud.js
var adapters = /* @__PURE__ */ new Map();
var warnedContexts = /* @__PURE__ */ new WeakSet();
var missingHook = () => void 0;
var noSubscription = () => () => {
};
function fallbackStore(name2) {
  try {
    return name2 === "status" ? sharedCtx?.get?.("uiSession")?.sessionStatus : sharedCtx?.sessions?.list;
  } catch {
    return void 0;
  }
}
function useStoreSelection(store, select) {
  const usable = typeof store?.getSnapshot === "function" && typeof store?.subscribe === "function";
  const subscribe = (0, import_react6.useCallback)((listener) => usable ? store.subscribe(listener) : noSubscription(), [store, usable]);
  const snapshot = (0, import_react6.useCallback)(() => select(usable ? store.getSnapshot() : void 0), [store, select, usable]);
  return (0, import_react6.useSyncExternalStore)(subscribe, snapshot, snapshot);
}
function adapterFor(useStatus, useSessions) {
  let bySessions = adapters.get(useStatus);
  if (!bySessions) adapters.set(useStatus, bySessions = /* @__PURE__ */ new Map());
  if (bySessions.has(useSessions)) return bySessions.get(useSessions);
  function SessionAdapter({ t, mode }) {
    const selectors = (0, import_react6.useMemo)(createSessionSelectors, []);
    const project = (0, import_react6.useMemo)(createHudProjection, []);
    const hookStatus = useStatus(selectors.status);
    const hookTitles = useSessions(selectors.titles);
    const statusFallback = !Array.isArray(hookStatus?.rows);
    const titlesFallback = !hookTitles || typeof hookTitles !== "object" || Array.isArray(hookTitles) || hookTitles instanceof Map || Object.values(hookTitles).some((value) => typeof value !== "string");
    const fallbackStatus = useStoreSelection(statusFallback ? fallbackStore("status") : void 0, selectors.status);
    const fallbackTitles = useStoreSelection(titlesFallback ? fallbackStore("titles") : void 0, selectors.titles);
    (0, import_react6.useEffect)(() => {
      if (!statusFallback && !titlesFallback || !sharedCtx || warnedContexts.has(sharedCtx)) return;
      warnedContexts.add(sharedCtx);
      console.warn(
        "[beeGames] Session HUD is using service fallback; check host useSessionStatus/useSessions hooks and snapshot shapes.",
        { statusFallback, titlesFallback }
      );
    }, [statusFallback, titlesFallback]);
    const hud = project(statusFallback ? fallbackStatus : hookStatus, titlesFallback ? fallbackTitles : hookTitles);
    return (0, import_react6.createElement)(TaskHud, { ...hud, t, mode });
  }
  bySessions.set(useSessions, SessionAdapter);
  return SessionAdapter;
}
function SessionHud({ useSessionStatus, useSessions, t, mode }) {
  const Adapter = adapterFor(
    typeof useSessionStatus === "function" ? useSessionStatus : missingHook,
    typeof useSessions === "function" ? useSessions : missingHook
  );
  return (0, import_react6.createElement)(Adapter, { t, mode });
}

// src/client/player.js
function Player(props) {
  const { session, bounds, dragHandle, t, useSessionStatus, useSessions } = props;
  const { game, mode, pause, records } = session;
  const full = mode === "full";
  const away = mode === "away";
  const favorite = records.favorites.some((item) => item.id === game.id);
  const [loaded, setLoaded] = (0, import_react7.useState)(false);
  const [showHelp, setShowHelp] = (0, import_react7.useState)(false);
  const [helpHidden, setHelpHidden] = (0, import_react7.useState)(() => {
    try {
      return window.localStorage?.getItem(HELP_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [reload, setReload] = (0, import_react7.useState)(0);
  const [fullscreen, setFullscreen] = (0, import_react7.useState)(false);
  const frameRef = (0, import_react7.useRef)(null);
  const frameLoadedRef = (0, import_react7.useRef)(false);
  const stageRef = (0, import_react7.useRef)(null);
  const pauseRef = (0, import_react7.useRef)(null);
  (0, import_react7.useEffect)(() => {
    const bridge = createPauseBridge(frameRef.current, game.url, (status) => sharedSession.setPause(status));
    pauseRef.current = bridge;
    bridge.setPaused(sharedSession.getSnapshot().mode === "away");
    if (frameLoadedRef.current) bridge.connect();
    return () => {
      pauseRef.current = null;
      bridge.dispose();
    };
  }, [game.url]);
  (0, import_react7.useEffect)(() => {
    pauseRef.current?.setPaused(away);
  }, [away]);
  (0, import_react7.useEffect)(() => {
    const hideTimer = setTimeout(() => setLoaded(true), 7e3);
    return () => clearTimeout(hideTimer);
  }, [game.id, reload]);
  (0, import_react7.useEffect)(() => {
    if (helpHidden) return void 0;
    const helpTimer = setTimeout(() => setShowHelp(true), 16e3);
    return () => clearTimeout(helpTimer);
  }, [game.id, reload, helpHidden]);
  (0, import_react7.useEffect)(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  (0, import_react7.useEffect)(() => {
    if (!full && document.fullscreenElement === stageRef.current) void document.exitFullscreen().catch(() => {
    });
  }, [full]);
  const toggleFullscreen = () => {
    const stage = stageRef.current;
    if (stage === null) return;
    try {
      const request = document.fullscreenElement === stage ? document.exitFullscreen() : stage.requestFullscreen();
      void request?.catch(() => {
      });
    } catch {
    }
  };
  const toggleFavorite = () => sharedSession.updateRecords((current) => ({
    ...current,
    favorites: favorite ? current.favorites.filter((item) => item.id !== game.id) : [game, ...current.favorites]
  }));
  const restart = () => {
    setLoaded(false);
    setShowHelp(false);
    setReload((current) => current + 1);
    frameLoadedRef.current = false;
    if (frameRef.current !== null) frameRef.current.src = game.url;
  };
  const dismissHelp = () => {
    setHelpHidden(true);
    setShowHelp(false);
    try {
      window.localStorage?.setItem(HELP_KEY, "1");
    } catch {
    }
  };
  const pauseLabel = pause === "paused" ? t("gamePaused") : pause === "requesting" ? t("pausePending") : null;
  return (0, import_react7.createElement)(
    "section",
    { className: "bg_page bg_player", style: { height: away ? "auto" : "100%" }, "aria-label": game.name },
    (0, import_react7.createElement)(
      "div",
      { className: "bg_player-toolbar", key: "toolbar" },
      full && (0, import_react7.createElement)("button", { type: "button", className: "bg_iconbtn", title: t("endGame"), "aria-label": t("endGame"), onClick: () => sharedSession.close() }, (0, import_react7.createElement)(IconBack, { size: 16 })),
      (0, import_react7.createElement)(
        "h2",
        { className: "bg_playing-name", ...dragHandle, style: { flex: 1, minWidth: 0 } },
        !full && (0, import_react7.createElement)("span", { className: "bg_drag-grip", "aria-hidden": true }, (0, import_react7.createElement)(
          Icon,
          { size: 12 },
          (0, import_react7.createElement)("path", { d: "M8 4v.01M16 4v.01M8 12v.01M16 12v.01M8 20v.01M16 20v.01", strokeWidth: 3 })
        )),
        game.name
      ),
      !full && (0, import_react7.createElement)("button", { type: "button", className: "bg_btn bg_resume", onClick: () => sharedSession.resume() }, t("resumeGame")),
      !away && (0, import_react7.createElement)("button", { type: "button", className: "bg_btn", title: t("leaveGame"), onClick: () => sharedSession.leave() }, t("leaveGame")),
      full && (0, import_react7.createElement)("button", { type: "button", className: "bg_iconbtn", "aria-label": favorite ? t("unfavorite") : t("favorite"), "aria-pressed": favorite, onClick: toggleFavorite }, (0, import_react7.createElement)(IconHeart, { size: 15, filled: favorite })),
      full && (0, import_react7.createElement)("button", { type: "button", className: "bg_iconbtn", title: t("minimize"), "aria-label": t("minimize"), onClick: () => sharedSession.minimize() }, (0, import_react7.createElement)(IconMinimize, { size: 15 })),
      full && (0, import_react7.createElement)("button", { type: "button", className: "bg_iconbtn", title: t("fullscreen"), "aria-label": t("fullscreen"), "aria-pressed": fullscreen, onClick: toggleFullscreen }, (0, import_react7.createElement)(IconFullscreen, { size: 15, active: fullscreen })),
      !full && (0, import_react7.createElement)("button", { type: "button", className: "bg_iconbtn", title: t("endGame"), "aria-label": t("endGame"), onClick: () => sharedSession.close() }, (0, import_react7.createElement)(IconClose, { size: 14 }))
    ),
    // Stable type, key, parent, and position: never move or replace this
    // iframe during mode changes, even while its main page is unmounted.
    (0, import_react7.createElement)(
      "div",
      { key: "stage", className: "bg_game-area", ref: stageRef },
      (0, import_react7.createElement)(SessionHud, { useSessionStatus, useSessions, t, mode }),
      (0, import_react7.createElement)(
        "div",
        {
          className: "bg_stage",
          "data-layout": game.orientation,
          style: away && bounds ? { width: bounds.width, height: Math.max(120, bounds.height - 120) } : void 0,
          "aria-hidden": away || void 0
        },
        (0, import_react7.createElement)("iframe", {
          ref: frameRef,
          title: game.name,
          src: game.url,
          tabIndex: away ? -1 : 0,
          sandbox: "allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-orientation-lock",
          allow: "autoplay; fullscreen; gamepad; accelerometer; gyroscope",
          referrerPolicy: "strict-origin-when-cross-origin",
          onLoad: () => {
            frameLoadedRef.current = true;
            setLoaded(true);
            pauseRef.current?.connect();
          }
        }),
        !loaded && (0, import_react7.createElement)(
          "div",
          { className: "bg_loading" },
          (0, import_react7.createElement)("span", { className: "bg_spinner", "aria-hidden": true }),
          (0, import_react7.createElement)("p", { style: { margin: 0 } }, t("loadingGame")),
          (0, import_react7.createElement)("small", null, t("loadingGameHint"))
        )
      )
    ),
    (0, import_react7.createElement)(
      "div",
      { key: "actions", className: "bg_actions", hidden: !full, style: !full ? { display: "none" } : void 0 },
      (0, import_react7.createElement)("button", { type: "button", className: "bg_btn", onClick: restart }, (0, import_react7.createElement)(IconRefresh, { size: 13 }), t("restart")),
      (0, import_react7.createElement)("button", { type: "button", className: "bg_btn", onClick: () => sharedSession.leave() }, t("leaveGame")),
      (0, import_react7.createElement)("button", { type: "button", className: "bg_btn", onClick: toggleFullscreen }, (0, import_react7.createElement)(IconFullscreen, { size: 13, active: fullscreen }), t("fullscreen")),
      (0, import_react7.createElement)("button", { type: "button", className: "bg_btn", onClick: () => openExternal(game.url) }, (0, import_react7.createElement)(IconExternal, { size: 13 }), t("openWindow")),
      (0, import_react7.createElement)("button", { type: "button", className: "bg_btn", onClick: () => openExternal(officialGameUrl(game)) }, (0, import_react7.createElement)(IconExternal, { size: 13 }), t("official"))
    ),
    full && showHelp && !helpHidden && (0, import_react7.createElement)(
      "div",
      { key: "help", className: "bg_help", role: "status" },
      (0, import_react7.createElement)("p", null, t("gameHelp")),
      (0, import_react7.createElement)("button", { type: "button", className: "bg_iconbtn", title: t("dismissGameHelp"), "aria-label": t("dismissGameHelp"), onClick: dismissHelp }, (0, import_react7.createElement)(IconClose, { size: 14 }))
    ),
    away && pauseLabel !== null && (0, import_react7.createElement)("p", { key: "note", className: "bg_pause-status", role: "status", "data-paused": pause === "paused" || void 0 }, pauseLabel)
  );
}

// src/client/floating-player.js
function fitFloatingSize(size) {
  return {
    width: Math.max(Math.min(320, window.innerWidth - 16), Math.min(size.width, window.innerWidth - 16)),
    height: Math.max(Math.min(200, window.innerHeight - 16), Math.min(size.height, window.innerHeight - 16))
  };
}
function resizeFloatingRect(rect, edge, dx, dy) {
  const minWidth = Math.min(320, window.innerWidth - 16);
  const minHeight = Math.min(200, window.innerHeight - 16);
  let { left, top, right, bottom } = rect;
  if (edge.includes("e")) right = Math.max(left + minWidth, Math.min(right + dx, window.innerWidth - 8));
  if (edge.includes("s")) bottom = Math.max(top + minHeight, Math.min(bottom + dy, window.innerHeight - 8));
  if (edge.includes("w")) left = Math.max(8, Math.min(left + dx, right - minWidth));
  if (edge.includes("n")) top = Math.max(8, Math.min(top + dy, bottom - minHeight));
  return { left, top, width: right - left, height: bottom - top };
}
function PersistentPlayer(props) {
  const { t, language } = usePluginLocale();
  const session = useGameSession();
  const [bounds, setBounds] = (0, import_react8.useState)(null);
  const [position, setPosition] = (0, import_react8.useState)(() => readGeometry("dsh-beegame-window-position", ["left", "top"]));
  const [size, setSize] = (0, import_react8.useState)(() => readGeometry("dsh-beegame-window-size", ["width", "height"]));
  (0, import_react8.useEffect)(() => {
    writeGeometry("dsh-beegame-window-position", position);
  }, [position]);
  (0, import_react8.useEffect)(() => {
    writeGeometry("dsh-beegame-window-size", size);
  }, [size]);
  const [dragging, setDragging] = (0, import_react8.useState)(false);
  const [resizing, setResizing] = (0, import_react8.useState)(false);
  const rootRef = (0, import_react8.useRef)(null);
  const dragRef = (0, import_react8.useRef)(null);
  const resizeRef = (0, import_react8.useRef)(null);
  const clampPosition = (point) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return point;
    return {
      left: Math.max(8, Math.min(point.left, window.innerWidth - rect.width - 8)),
      top: Math.max(8, Math.min(point.top, window.innerHeight - rect.height - 8))
    };
  };
  (0, import_react8.useEffect)(() => {
    dragRef.current = null;
    resizeRef.current = null;
    setDragging(false);
    setResizing(false);
    if (session.mode === "full" || !rootRef.current) return void 0;
    const keepVisible = () => {
      if (session.mode === "mini") setSize((current) => {
        if (!current) return current;
        const next = fitFloatingSize(current);
        return next.width === current.width && next.height === current.height ? current : next;
      });
      setPosition((current) => {
        if (!current) return current;
        const next = clampPosition(current);
        return next.left === current.left && next.top === current.top ? current : next;
      });
    };
    keepVisible();
    const observer = new ResizeObserver(keepVisible);
    observer.observe(rootRef.current);
    window.addEventListener("resize", keepVisible);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", keepVisible);
    };
  }, [session.mode, session.game]);
  const stopDragging = (event) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const dragHandle = session.mode === "full" ? {} : {
    className: "bg_playing-name bg_drag-handle",
    role: "button",
    tabIndex: 0,
    "aria-label": t("moveWindowLabel", { name: session.game?.name ?? "" }),
    title: t("moveWindowHint"),
    onPointerDown: (event) => {
      if (event.button !== 0 || event.isPrimary === false) return;
      const rect = rootRef.current.getBoundingClientRect();
      dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      event.preventDefault();
    },
    onPointerMove: (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      setPosition(clampPosition({ left: drag.left + event.clientX - drag.x, top: drag.top + event.clientY - drag.y }));
    },
    onPointerUp: stopDragging,
    onPointerCancel: stopDragging,
    onLostPointerCapture: stopDragging,
    onKeyDown: (event) => {
      if (event.key === "Home") {
        event.preventDefault();
        setPosition(null);
        return;
      }
      const step = event.shiftKey ? 48 : 16;
      const offset = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
      if (!offset) return;
      event.preventDefault();
      const rect = rootRef.current.getBoundingClientRect();
      setPosition(clampPosition({ left: rect.left + offset[0], top: rect.top + offset[1] }));
    }
  };
  const applyResize = (rect, edge, dx, dy) => {
    const next = resizeFloatingRect(rect, edge, dx, dy);
    setPosition({ left: next.left, top: next.top });
    setSize({ width: next.width, height: next.height });
  };
  const stopResizing = (event) => {
    if (resizeRef.current?.pointerId !== event.pointerId) return;
    resizeRef.current = null;
    setResizing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const resizeHandle = (edge) => ({
    key: edge,
    className: "bg_resize-handle",
    "data-edge": edge,
    role: "button",
    tabIndex: edge === "se" ? 0 : -1,
    "aria-label": t("resizeWindowLabel", { edge: t(RESIZE_KEYS[edge]) }),
    title: t("resizeWindowHint"),
    onPointerDown: (event) => {
      if (event.button !== 0 || event.isPrimary === false) return;
      resizeRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rect: rootRef.current.getBoundingClientRect(), edge };
      event.currentTarget.setPointerCapture(event.pointerId);
      setResizing(true);
      event.preventDefault();
      event.stopPropagation();
    },
    onPointerMove: (event) => {
      const start = resizeRef.current;
      if (!start || start.pointerId !== event.pointerId) return;
      applyResize(start.rect, start.edge, event.clientX - start.x, event.clientY - start.y);
    },
    onPointerUp: stopResizing,
    onPointerCancel: stopResizing,
    onLostPointerCapture: stopResizing,
    onKeyDown: (event) => {
      const step = event.shiftKey ? 48 : 16;
      const offset = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
      if (!offset) return;
      event.preventDefault();
      applyResize(rootRef.current.getBoundingClientRect(), edge, offset[0], offset[1]);
    }
  });
  (0, import_react8.useEffect)(() => {
    const anchor = session.anchor;
    if (anchor === null) return void 0;
    const measure = () => {
      const rect = anchor.getBoundingClientRect();
      const next = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
      setBounds((old) => old && Object.keys(next).every((key) => old[key] === next[key]) ? old : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(anchor);
    const mutation = new MutationObserver(measure);
    for (let parent = anchor.parentElement; parent; parent = parent.parentElement) {
      mutation.observe(parent, { attributes: true, attributeFilter: ["style", "class"] });
    }
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [session.anchor]);
  if (session.game === null) return null;
  const full = session.mode === "full";
  const style = full ? bounds && session.anchor ? { ...bounds } : { visibility: "hidden" } : { ...position ? { ...position, right: "auto", bottom: "auto" } : {}, ...session.mode === "mini" && size ? size : {} };
  return (0, import_react8.createElement)(
    "div",
    { ref: rootRef, className: "bg_persistent", lang: language, "data-mode": session.mode, "data-dragging": dragging || void 0, "data-resizing": resizing || void 0, style },
    (0, import_react8.createElement)(Player, { ...props, key: `${session.game.id}:${session.game.url}`, session, bounds, dragHandle, t }),
    session.mode === "mini" && ["n", "e", "s", "w", "ne", "nw", "se", "sw"].map((edge) => (0, import_react8.createElement)("div", resizeHandle(edge)))
  );
}

// src/client/use-catalog.js
var import_react9 = require("react");

// src/client/catalog-store.js
var gamesFrom = (payload) => uniqueGames((Array.isArray(payload?.games) ? payload.games : []).map(savedGame));
var errorKey = (error) => error?.name === "TimeoutError" ? "timeout" : "loadFailed";
var cursorFrom = (payload) => typeof payload?.cursor === "string" ? payload.cursor : "";
function createCatalogStore(request, scheduler = {
  setTimeout: (fn, delay) => setTimeout(fn, delay),
  clearTimeout: (id) => clearTimeout(id)
}) {
  let state = {
    homeGames: [],
    homeTotal: 0,
    updatedAt: 0,
    offline: false,
    loading: true,
    loadError: "",
    category: "",
    query: "",
    searching: false,
    searchError: "",
    searchResults: null,
    searchHasMore: false,
    discoverHasMore: false,
    discoverLoadingMore: false,
    discoverError: "",
    categoryResults: null
  };
  const listeners = /* @__PURE__ */ new Set();
  let active = false, locale = "zh-CN", timer;
  let homeGeneration = 0, searchGeneration = 0, discoverGeneration = 0;
  let searchCursor = "", discoverCursor = "", discoverPage = 2, stalledPages = 0;
  const update = (patch) => {
    state = { ...state, ...patch };
    for (const listener of listeners) listener();
  };
  const current = (kind, generation) => active && generation === (kind === "home" ? homeGeneration : kind === "search" ? searchGeneration : discoverGeneration);
  function resetDiscover(category = state.category) {
    discoverGeneration += 1;
    discoverCursor = "";
    discoverPage = category === "" ? 2 : 1;
    stalledPages = 0;
  }
  function cancelSearch() {
    searchGeneration += 1;
    scheduler.clearTimeout(timer);
    timer = void 0;
  }
  async function loadHome(force = false) {
    if (!active) return;
    const generation = ++homeGeneration;
    if (state.category === "") resetDiscover();
    update({ loading: true, loadError: "", ...state.category === "" ? { discoverLoadingMore: false, discoverError: "" } : {} });
    try {
      const payload = await request(`/home?locale=${encodeURIComponent(locale)}`);
      if (!current("home", generation)) return;
      const games = gamesFrom(payload);
      update({
        homeGames: games,
        homeTotal: Number(payload?.total) || games.length,
        updatedAt: Number(payload?.updatedAt) || 0,
        offline: false,
        ...state.category === "" ? { discoverHasMore: games.length > 0 } : {}
      });
    } catch (error) {
      if (!current("home", generation)) return;
      if (!force && state.homeGames.length > 0) {
        update({ loadError: errorKey(error) });
        return;
      }
      try {
        const seed = await request("/seed");
        if (!current("home", generation)) return;
        resetDiscover("");
        const games = gamesFrom(seed);
        update({
          homeGames: games,
          homeTotal: games.length,
          updatedAt: Number(seed?.updatedAt) || 0,
          offline: true,
          loadError: "",
          category: "",
          categoryResults: null,
          discoverHasMore: false,
          discoverLoadingMore: false,
          discoverError: ""
        });
      } catch {
        if (current("home", generation)) update({ homeGames: [], discoverHasMore: false, loadError: errorKey(error) });
      }
    } finally {
      if (current("home", generation)) update({ loading: false });
    }
  }
  async function runSearch(text = state.query.trim(), cursor = "") {
    if (!active || !text || cursor !== "" && state.searching) return;
    cancelSearch();
    const generation = searchGeneration;
    update({ searching: true, searchError: "" });
    try {
      const params = new URLSearchParams({ search: text, locale, page_size: "36" });
      if (cursor) params.set("cursor", cursor);
      const payload = await request(`/games?${params}`, 9e3);
      if (!current("search", generation)) return;
      const games = gamesFrom(payload);
      const nextCursor = cursorFrom(payload);
      searchCursor = nextCursor;
      update({
        searchResults: cursor ? uniqueGames([...state.searchResults ?? [], ...games]) : games,
        searchHasMore: payload?.hasMore === true && nextCursor !== "" && nextCursor !== cursor
      });
    } catch (error) {
      if (current("search", generation)) update({ searchError: errorKey(error), ...cursor ? {} : { searchResults: [] } });
    } finally {
      if (current("search", generation)) update({ searching: false });
    }
  }
  function setQuery(query) {
    cancelSearch();
    searchCursor = "";
    const text = query.trim();
    update({
      query,
      searching: text !== "",
      searchError: "",
      searchHasMore: false,
      searchResults: text ? [] : null
    });
    if (text && active) timer = scheduler.setTimeout(() => {
      void runSearch(text);
    }, 400);
  }
  async function loadMoreGames() {
    if (!active || state.discoverLoadingMore || state.offline || !state.discoverHasMore && !state.discoverError) return;
    const generation = ++discoverGeneration;
    const category = state.category;
    const cursor = discoverCursor;
    update({ discoverLoadingMore: true, discoverError: "" });
    try {
      const params = new URLSearchParams({ locale, page_size: "36" });
      if (category) params.set("categories", category);
      if (cursor) params.set("cursor", cursor);
      else params.set("page", String(discoverPage));
      const payload = await request(`/games?${params}`);
      if (!current("discover", generation)) return;
      const previous = category ? state.categoryResults ?? [] : state.homeGames;
      const games = uniqueGames([...previous, ...gamesFrom(payload)]);
      stalledPages = games.length === previous.length ? stalledPages + 1 : 0;
      discoverCursor = cursorFrom(payload);
      discoverPage += 1;
      update({
        ...category ? { categoryResults: games } : { homeGames: games },
        discoverHasMore: payload?.hasMore === true && stalledPages < 2 && !(cursor && cursor === discoverCursor)
      });
    } catch (error) {
      if (current("discover", generation)) update({ discoverHasMore: false, discoverError: errorKey(error) });
    } finally {
      if (current("discover", generation)) update({ discoverLoadingMore: false });
    }
  }
  function changeCategory(category) {
    resetDiscover(category);
    update({
      category,
      categoryResults: category ? [] : null,
      discoverHasMore: !state.offline && (category !== "" || state.homeGames.length > 0),
      discoverLoadingMore: false,
      discoverError: ""
    });
    return category ? loadMoreGames() : Promise.resolve();
  }
  async function refresh() {
    const work = [loadHome(true)];
    if (state.query.trim()) work.push(runSearch());
    else if (state.category) work.push(changeCategory(state.category));
    await Promise.all(work);
  }
  function deactivate() {
    active = false;
    homeGeneration += 1;
    discoverGeneration += 1;
    cancelSearch();
  }
  function activate(nextLocale) {
    deactivate();
    active = true;
    locale = nextLocale;
    const category = state.category;
    resetDiscover(category);
    update({
      loading: true,
      loadError: "",
      offline: false,
      discoverError: "",
      discoverLoadingMore: false,
      homeGames: [],
      homeTotal: 0,
      updatedAt: 0,
      categoryResults: category ? [] : null,
      discoverHasMore: category !== ""
    });
    const work = [loadHome()];
    if (category) work.push(loadMoreGames());
    setQuery(state.query);
    return Promise.all(work);
  }
  return {
    getSnapshot: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    activate,
    deactivate,
    setQuery,
    changeCategory,
    refresh,
    loadHome,
    runSearch,
    loadMoreGames,
    loadMoreSearch: () => state.searchHasMore ? runSearch(state.query.trim(), searchCursor) : Promise.resolve()
  };
}

// src/client/use-catalog.js
function useCatalog(localeTag) {
  const [catalog] = (0, import_react9.useState)(() => createCatalogStore(api));
  (0, import_react9.useEffect)(() => {
    void catalog.activate(localeTag);
    return catalog.deactivate;
  }, [catalog, localeTag]);
  const state = (0, import_react9.useSyncExternalStore)(catalog.subscribe, catalog.getSnapshot, catalog.getSnapshot);
  return { ...state, catalog };
}

// src/client/games-page.js
var import_react11 = require("react");

// src/client/cards.js
var import_react10 = require("react");
function GameCard({ game, favorite, onPlay, onToggleFavorite, onRemove, removeLabel, t }) {
  const [imageBroken, setImageBroken] = (0, import_react10.useState)(false);
  const cats = game.category.slice(0, 2).map((cat) => {
    const key = CATEGORY_KEYS[cat];
    return key === void 0 ? cat : t(key);
  }).join(" \xB7 ");
  return (0, import_react10.createElement)(
    "div",
    { className: "bg_card", role: "listitem" },
    (0, import_react10.createElement)(
      "button",
      {
        type: "button",
        className: "bg_cover",
        "aria-label": game.name,
        title: game.name,
        onClick: () => onPlay(game)
      },
      game.image !== "" && !imageBroken ? (0, import_react10.createElement)("img", {
        src: game.image,
        alt: "",
        loading: "lazy",
        draggable: false,
        onError: () => setImageBroken(true)
      }) : (0, import_react10.createElement)("span", { className: "bg_cover-fallback" }, (0, import_react10.createElement)(IconGrid, { size: 22 })),
      (0, import_react10.createElement)("span", { className: "bg_play-hint", "aria-hidden": true }, (0, import_react10.createElement)(IconPlay, { size: 30 }))
    ),
    typeof onRemove === "function" && (0, import_react10.createElement)("button", {
      type: "button",
      className: "bg_remove",
      "aria-label": removeLabel,
      title: removeLabel,
      onClick: () => onRemove(game)
    }, (0, import_react10.createElement)(IconClose, { size: 13 })),
    (0, import_react10.createElement)("button", {
      type: "button",
      className: "bg_fav",
      "data-active": favorite === true,
      "aria-label": favorite === true ? t("unfavorite") : t("favorite"),
      "aria-pressed": favorite === true,
      title: favorite === true ? t("unfavorite") : t("favorite"),
      onClick: () => onToggleFavorite(game)
    }, (0, import_react10.createElement)(IconHeart, { size: 14, filled: favorite === true })),
    (0, import_react10.createElement)(
      "button",
      { type: "button", className: "bg_body", title: game.name, onClick: () => onPlay(game) },
      (0, import_react10.createElement)("span", { className: "bg_name" }, game.name),
      (0, import_react10.createElement)("span", { className: "bg_cats" }, cats)
    )
  );
}
function EmptyState({ icon, text }) {
  return (0, import_react10.createElement)("div", { className: "bg_empty" }, (0, import_react10.createElement)("span", null, icon), (0, import_react10.createElement)("p", { style: { margin: 0 } }, text));
}
function SkeletonGrid() {
  return (0, import_react10.createElement)(
    "div",
    { className: "bg_grid bg_skeleton", "aria-hidden": true },
    Array.from({ length: 8 }, (_, index) => (0, import_react10.createElement)(
      "div",
      { key: index, className: "bg_card" },
      (0, import_react10.createElement)("div", { className: "bg_cover" }),
      (0, import_react10.createElement)(
        "div",
        { className: "bg_body" },
        (0, import_react10.createElement)("span", { className: "bg_sk-line", style: { width: "70%" } }),
        (0, import_react10.createElement)("span", { className: "bg_sk-line", style: { width: "45%", height: 10 } })
      )
    ))
  );
}

// src/client/games-page.js
function GamesPage() {
  const { t, language, localeTag } = usePluginLocale();
  const session = useGameSession();
  const [tab, setTab] = (0, import_react11.useState)("discover");
  const {
    homeGames,
    updatedAt,
    offline,
    loading,
    loadError,
    category,
    query,
    searching,
    searchError,
    searchResults,
    searchHasMore,
    discoverHasMore,
    discoverLoadingMore,
    discoverError,
    categoryResults,
    catalog
  } = useCatalog(localeTag);
  const { setQuery, loadMoreGames, loadMoreSearch } = catalog;
  const scrollRef = (0, import_react11.useRef)(null);
  const records = session.records;
  const [promoHidden, setPromoHidden] = (0, import_react11.useState)(() => {
    try {
      return window.localStorage?.getItem(PROMO_KEY) === "1";
    } catch {
      return false;
    }
  });
  const hidePromo = (0, import_react11.useCallback)(() => {
    setPromoHidden(true);
    try {
      window.localStorage?.setItem(PROMO_KEY, "1");
    } catch {
    }
  }, []);
  const playing = session.game !== null && session.mode === "full" ? session.game : null;
  const savedScroll = (0, import_react11.useRef)(0);
  const searchInputRef = (0, import_react11.useRef)(null);
  (0, import_react11.useEffect)(() => {
    sharedSession.show();
  }, []);
  const attachPlayer = (0, import_react11.useCallback)((node) => sharedSession.attach(node), []);
  const persistRecords = (0, import_react11.useCallback)((next) => {
    sharedSession.updateRecords(next);
  }, []);
  const toggleFavorite = (0, import_react11.useCallback)((game) => {
    persistRecords((current) => {
      const exists = current.favorites.some((item) => item.id === game.id);
      return exists ? { ...current, favorites: current.favorites.filter((item) => item.id !== game.id) } : { ...current, favorites: [game, ...current.favorites] };
    });
  }, [persistRecords]);
  const playGame = (0, import_react11.useCallback)((game) => {
    const safe = savedGame(game);
    if (safe === null) return;
    const scroller = scrollRef.current;
    savedScroll.current = scroller === null ? 0 : scroller.scrollTop;
    sharedSession.open(safe);
    persistRecords((current) => ({
      ...current,
      recent: [{ ...safe, lastPlayed: Date.now() }, ...current.recent.filter((item) => item.id !== safe.id)].slice(0, MAX_RECENT)
    }));
  }, [persistRecords]);
  const stopGame = (0, import_react11.useCallback)(() => {
    sharedSession.close();
  }, []);
  const removeRecent = (0, import_react11.useCallback)((game) => {
    persistRecords((current) => ({ ...current, recent: current.recent.filter((item) => item.id !== game.id) }));
  }, [persistRecords]);
  const clearRecent = (0, import_react11.useCallback)(() => {
    persistRecords((current) => ({ ...current, recent: [] }));
  }, [persistRecords]);
  const resetScroll = (0, import_react11.useCallback)(() => {
    const scroller = scrollRef.current;
    if (scroller !== null) scroller.scrollTop = 0;
    savedScroll.current = 0;
  }, []);
  const changeCategory = (0, import_react11.useCallback)((next) => {
    resetScroll();
    void catalog.changeCategory(next);
  }, [catalog, resetScroll]);
  (0, import_react11.useEffect)(() => {
    if (query.trim()) setTab("discover");
  }, [query]);
  const changeTab = (0, import_react11.useCallback)((next) => {
    setTab((current) => current === next ? current : (resetScroll(), next));
  }, [resetScroll]);
  (0, import_react11.useEffect)(() => {
    const scroller = scrollRef.current;
    if (scroller === null) return void 0;
    const onScroll = () => {
      if (tab !== "discover" || query.trim() !== "" || !discoverHasMore) return;
      if (discoverLoadingMore || loading || offline) return;
      const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      if (remaining < 320) void loadMoreGames();
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [tab, query, discoverHasMore, discoverLoadingMore, loading, offline, loadMoreGames]);
  (0, import_react11.useEffect)(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest(".bg_page") === null) return;
      if (playing !== null) {
        stopGame();
        return;
      }
      if (query !== "") setQuery("");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, query, stopGame]);
  const favoriteIds = (0, import_react11.useMemo)(() => new Set(records.favorites.map((item) => item.id)), [records.favorites]);
  const isFavorite = (0, import_react11.useCallback)((game) => favoriteIds.has(game.id), [favoriteIds]);
  const discoverList = (0, import_react11.useMemo)(() => {
    if (searchResults !== null) return searchResults;
    if (categoryResults !== null) return categoryResults;
    return homeGames;
  }, [searchResults, categoryResults, homeGames]);
  const tabList = (0, import_react11.useMemo)(() => {
    if (tab === "favorites") return records.favorites;
    if (tab === "recent") return records.recent;
    return discoverList;
  }, [tab, records, discoverList]);
  const [nowTick, setNowTick] = (0, import_react11.useState)(() => Date.now());
  (0, import_react11.useEffect)(() => {
    const timer = setInterval(() => setNowTick(Date.now()), 6e4);
    return () => clearInterval(timer);
  }, []);
  const cacheAge = (0, import_react11.useMemo)(() => {
    if (!updatedAt) return t("cacheUnknown");
    const minutes = Math.floor(Math.max(0, nowTick - updatedAt) / 6e4);
    if (minutes < 1) return t("cacheJustNow");
    if (minutes < 60) return t("cacheMinutes", { n: String(minutes) });
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return t("cacheHours", { n: String(hours) });
    return t("cacheDays", { n: String(Math.floor(hours / 24)) });
  }, [updatedAt, nowTick, t]);
  (0, import_react11.useEffect)(() => {
    if (playing !== null) return;
    const scroller = scrollRef.current;
    if (scroller !== null && savedScroll.current > 0) scroller.scrollTop = savedScroll.current;
  }, [playing]);
  if (playing !== null) return (0, import_react11.createElement)("div", { className: "bg_player-anchor", ref: attachPlayer, "aria-label": playing.name });
  const statusLine = loading || searching ? t("loading") : tab === "discover" && loadError !== "" ? t(loadError) : tab === "discover" && searchError !== "" ? t(searchError) : "";
  const sourceLabel = offline ? t("offlineSource") : t("source");
  return (0, import_react11.createElement)(
    "div",
    { className: "bg_page", lang: language },
    (0, import_react11.createElement)(
      "div",
      { className: "bg_toolbar" },
      (0, import_react11.createElement)("h1", { className: "bg_title" }, t("title")),
      (0, import_react11.createElement)(
        "label",
        { className: "bg_search" },
        (0, import_react11.createElement)(IconSearch, { size: 14 }),
        (0, import_react11.createElement)("input", {
          ref: searchInputRef,
          type: "search",
          value: query,
          placeholder: t("searchPlaceholder"),
          "aria-label": t("searchLabel"),
          autoComplete: "off",
          onChange: (event) => setQuery(event.target.value)
        }),
        query !== "" && (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_iconbtn bg_search-clear",
          "aria-label": t("clearSearch"),
          title: t("clearSearch"),
          onClick: () => {
            setQuery("");
            searchInputRef.current?.focus();
          }
        }, (0, import_react11.createElement)(IconClose, { size: 12 }))
      ),
      (0, import_react11.createElement)(
        "div",
        { className: "bg_toolbar-actions" },
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_tool",
          title: t("refresh"),
          disabled: loading,
          // A refresh re-reads the data and keeps the user's filters.
          onClick: () => {
            void catalog.refresh();
          }
        }, (0, import_react11.createElement)(IconRefresh, { size: 14 }), t("refresh")),
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_tool",
          title: t("surprise"),
          disabled: tabList.length === 0,
          onClick: () => {
            if (tabList.length === 0) return;
            playGame(tabList[Math.floor(Math.random() * tabList.length)]);
          }
        }, (0, import_react11.createElement)(IconDice, { size: 14 }), t("surprise")),
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_tool",
          "data-primary": "true",
          title: t("createGame"),
          onClick: () => openExternal("https://bee.games/create")
        }, (0, import_react11.createElement)(IconCreate, { size: 14 }), t("createGame")),
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_tool",
          "data-accent": "true",
          title: t("officialWebsite"),
          onClick: () => openExternal(officialHomeUrl(localeTag))
        }, (0, import_react11.createElement)(IconExternal, { size: 14 }), t("official"))
      )
    ),
    (0, import_react11.createElement)(
      "div",
      { className: "bg_scroll", ref: scrollRef },
      (0, import_react11.createElement)(
        "div",
        { className: "bg_tabs", role: "group", "aria-label": t("title") },
        (0, import_react11.createElement)("button", { type: "button", className: "bg_tab", "aria-pressed": tab === "discover", onClick: () => changeTab("discover") }, (0, import_react11.createElement)(IconGrid, { size: 12 }), t("catAll")),
        (0, import_react11.createElement)("button", { type: "button", className: "bg_tab", "aria-pressed": tab === "favorites", onClick: () => changeTab("favorites") }, (0, import_react11.createElement)(IconHeart, { size: 12, filled: tab === "favorites" }), t("favorites")),
        (0, import_react11.createElement)("button", { type: "button", className: "bg_tab", "aria-pressed": tab === "recent", onClick: () => changeTab("recent") }, (0, import_react11.createElement)(IconClock, { size: 12 }), t("recent"))
      ),
      tab === "discover" && (0, import_react11.createElement)(
        "div",
        { className: "bg_chips", role: "group", "aria-label": t("catAll") },
        CHIP_CATEGORIES.map((chip) => (0, import_react11.createElement)("button", {
          key: chip || "all",
          type: "button",
          className: "bg_chip",
          "aria-pressed": category === chip,
          disabled: searchResults !== null || offline,
          onClick: () => changeCategory(chip)
        }, chip === "" ? t("catAll") : CATEGORY_KEYS[chip] === void 0 ? chip : t(CATEGORY_KEYS[chip])))
      ),
      tab === "discover" && !promoHidden && (0, import_react11.createElement)(
        "div",
        { className: "bg_promo", role: "complementary", "aria-label": t("promoTitle") },
        (0, import_react11.createElement)("span", { className: "bg_promo-icon" }, (0, import_react11.createElement)(IconCreate, { size: 18 })),
        (0, import_react11.createElement)(
          "div",
          { className: "bg_promo-body" },
          (0, import_react11.createElement)("span", { className: "bg_promo-title" }, t("promoTitle")),
          (0, import_react11.createElement)("span", { className: "bg_promo-text" }, t("promoText"))
        ),
        (0, import_react11.createElement)(
          "div",
          { className: "bg_promo-actions" },
          (0, import_react11.createElement)("button", {
            type: "button",
            className: "bg_btn",
            "data-primary": "true",
            onClick: () => openExternal("https://bee.games/create")
          }, (0, import_react11.createElement)(IconCreate, { size: 13 }), t("promoCreate")),
          (0, import_react11.createElement)("button", {
            type: "button",
            className: "bg_btn",
            onClick: () => openExternal(officialHomeUrl(localeTag))
          }, (0, import_react11.createElement)(IconExternal, { size: 13 }), t("promoVisit"))
        ),
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_iconbtn bg_promo-close",
          "aria-label": t("promoDismiss"),
          title: t("promoDismiss"),
          onClick: hidePromo
        }, (0, import_react11.createElement)(IconClose, { size: 12 }))
      ),
      (0, import_react11.createElement)(
        "div",
        { className: "bg_meta" },
        (0, import_react11.createElement)(
          "h2",
          null,
          tab === "discover" ? searchResults !== null ? t("searchScope") : category === "" ? t("catAll") : CATEGORY_KEYS[category] === void 0 ? category : t(CATEGORY_KEYS[category]) : tab === "favorites" ? t("favorites") : t("recent")
        ),
        (0, import_react11.createElement)(
          "div",
          { className: "bg_meta-side" },
          tab === "recent" && records.recent.length > 0 && (0, import_react11.createElement)("button", {
            type: "button",
            className: "bg_btn bg_btn-compact",
            onClick: () => {
              clearRecent();
              resetScroll();
            }
          }, t("clearRecent")),
          (0, import_react11.createElement)("span", { className: "bg_count" }, t(tabList.length === 1 ? "countOne" : "count", { n: tabList.length }))
        )
      ),
      statusLine !== "" && (0, import_react11.createElement)("p", { className: "bg_status", role: "status", "data-tone": loadError !== "" || searchError !== "" ? "error" : void 0 }, statusLine),
      loading && tabList.length === 0 ? (0, import_react11.createElement)(SkeletonGrid, null) : !loading && tabList.length === 0 ? tab === "favorites" ? (0, import_react11.createElement)(EmptyState, { icon: (0, import_react11.createElement)(IconHeart, { size: 22 }), text: t("emptyFavorites") }) : tab === "recent" ? (0, import_react11.createElement)(EmptyState, { icon: (0, import_react11.createElement)(IconClock, { size: 22 }), text: t("emptyRecent") }) : (0, import_react11.createElement)(EmptyState, { icon: (0, import_react11.createElement)(IconSearch, { size: 22 }), text: searchError !== "" ? t(searchError) : searchResults !== null ? t("noResults") : t("loadFailed") }) : (0, import_react11.createElement)(
        "div",
        { className: "bg_grid", role: "list" },
        tabList.map((game) => (0, import_react11.createElement)(GameCard, {
          key: game.id,
          game,
          t,
          favorite: isFavorite(game),
          onPlay: playGame,
          onToggleFavorite: toggleFavorite,
          // Recent entries get a delete affordance; favorites use the heart.
          ...tab === "recent" ? {
            onRemove: removeRecent,
            removeLabel: t("removeRecent")
          } : {}
        }))
      ),
      tab === "discover" && searchResults !== null && searchHasMore && (0, import_react11.createElement)(
        "div",
        { style: { display: "flex", justifyContent: "center", marginTop: 14 } },
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_btn",
          disabled: searching,
          onClick: () => {
            void loadMoreSearch();
          }
        }, t("loadMore"))
      ),
      tab === "discover" && searchResults === null && discoverError !== "" && !loading && (0, import_react11.createElement)(
        "div",
        { style: { display: "flex", justifyContent: "center", marginTop: 14 } },
        (0, import_react11.createElement)(
          "button",
          { type: "button", className: "bg_btn", onClick: () => {
            void loadMoreGames();
          } },
          t("retry")
        )
      ),
      tab === "discover" && searchResults === null && discoverError === "" && discoverHasMore && !loading && (0, import_react11.createElement)(
        "div",
        { style: { display: "flex", justifyContent: "center", marginTop: 14 } },
        (0, import_react11.createElement)("button", {
          type: "button",
          className: "bg_btn",
          disabled: discoverLoadingMore,
          onClick: () => {
            void loadMoreGames();
          }
        }, discoverLoadingMore ? t("loadingMore") : t("loadMore"))
      )
    ),
    (0, import_react11.createElement)(
      "div",
      { className: "bg_footer" },
      (0, import_react11.createElement)("span", { className: "bg_dot", "data-offline": offline || void 0 }),
      (0, import_react11.createElement)("span", null, sourceLabel),
      (0, import_react11.createElement)("button", {
        type: "button",
        className: "bg_footer-link",
        title: t("officialWebsite"),
        onClick: () => openExternal(officialHomeUrl(localeTag))
      }, t("official")),
      (0, import_react11.createElement)("span", null, cacheAge),
      session.game !== null && (0, import_react11.createElement)("button", {
        type: "button",
        className: "bg_footer-link",
        title: t("resumeHint"),
        onClick: () => sharedSession.resume()
      }, t("resumeGameLabel", { name: session.game.name }))
    )
  );
}

// src/client/entry.js
var name = "beegame";
var inject = ["slots", "locale", "sessions"];
var { meta: zhMeta, ...zhDict } = zh_default;
var { meta: enMeta, ...enDict } = en_default;
function apply(ctx) {
  const session = createGameSession(readRecords(), writeRecords, (panelId) => {
    try {
      const layout = ctx.get("layout");
      if (typeof layout?.selectPanel !== "function") return false;
      layout.selectPanel(panelId);
      return true;
    } catch {
      return false;
    }
  });
  const t = ctx.locale.bind(NS);
  const hudNotifications = createHudNotifications();
  const hudNavigation = createHudNavigation(ctx, session, hudNotifications);
  configureRuntime(ctx, session, t, hudNotifications, hudNavigation);
  ctx.effect(() => () => hudNavigation.dispose(), "beegame: HUD navigation disposal");
  ctx.effect(() => () => hudNotifications.dispose(), "beegame: HUD notifications disposal");
  ctx.effect(() => ctx.locale.register(NS, { zh: zhDict, en: enDict }), "beegame: dictionaries");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-plugin", "dsh-beegame");
    style.textContent = styles_default;
    document.head.appendChild(style);
    return () => style.remove();
  }, "beegame: styles");
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "beegame.persistent-player",
    order: 90,
    locale: NS
  }, (props) => (0, import_react12.createElement)(PersistentPlayer, props)));
  const playerSession = session;
  ctx.effect(() => () => playerSession.dispose(), "beegame: player session disposal");
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
    name: "sidebar.panellist",
    id: PANEL_ID,
    order: 20,
    label: () => t("panel"),
    locale: NS
  }, (props) => (0, import_react12.createElement)(BeeGlyph, { size: props?.size ?? 18 })));
  ctx.slots.inject("main", () => ctx.slots.register({
    name: "main",
    key: PANEL_ID,
    locale: NS
  }, (props) => (0, import_react12.createElement)(GamesPage, props)));
}
return module.exports;
} });
