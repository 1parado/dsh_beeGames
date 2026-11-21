# beeGames 0.3.0 架构与验证

开发源码位于 `src/`；根目录 `client.js` 是交付给 Harness 的生成文件。安装时不需要 esbuild、React npm 包或本机工程目录。开发依赖仅用于构建和隔离浏览器验证。

## 模块职责

| 模块 | 职责 |
|---|---|
| `src/client/entry.js`、`runtime.js` | 槽位注册、宿主上下文、语言与游戏会话订阅 |
| `games-page.js`、`cards.js`、`styles.css`、`icons.js` | 页面、卡片、样式与图标 |
| `catalog-store.js`、`use-catalog.js`、`api.js` | 搜索去抖、分类分页、请求竞态、同源 API |
| `player.js`、`floating-player.js`、`pause-bridge.js`、`game-session.js` | 稳定 iframe、浮窗位置尺寸、暂停协议、游戏生命周期 |
| `hud.js`、`hud-position.js`、`hud-model.js`、`hud-notifications.js`、`hud-toasts.js`、`hud-navigation.js`、`session-hud.js` | HUD 展示、拖动、稳定 selector、通知收件箱、合并提示、串行导航与宿主 Hook 适配 |
| `geometry.js` | 安全读取/保存本机位置尺寸，拒绝损坏或无效的存储数据 |
| `records.js`、`src/shared/urls.js` | 本机记录与 URL 安全边界 |
| `index.js`、`src/host/catalog.js`、`catalog-cache.js` | 请求准入、上游归一及有界内存缓存 |

## 评审处理

1. 用标准 ESM 源码与锁定的 esbuild 生成单个 ModuleLoader bundle，避免依赖宿主加载多个入口的顺序。
2. 字典仅维护 JSON，删除 16 个未使用键；HUD flash 与计数键确认仍有使用并保留。
3. 每种宿主 Hook 函数组合对应独立 HUD adapter，组合变化只重挂 adapter；游戏 Player 与 iframe 不受影响。缺失或错误快照使用服务 fallback，并按宿主上下文仅警告一次。
4. 主页与无搜索词浏览缓存 60 秒、最多 64 项，合并并发读取；搜索及失败不缓存。
5. 保留 loopback fallback。远程与容器应使用宿主准入服务，不能通过 hostname 白名单绕开认证。
6. 游戏 URL 在数据归一、本机记录读取及 session.open 时拒绝当前页面同源地址。保留跨域游戏运行所需的 sandbox 权限。
7. 只对 HUD 显示字段生成稳定 selector 结果，显示未变时保留 rows 引用；TaskHud 使用 memo。完成记录由插件级内存收件箱保留至用户点击并成功打开任务，宿主未读重置及 HUD 重挂不清除。上方完成提示按首次出现时间 6 秒后隐藏，标题变化和重挂不会延长；到期不确认任务。待决定警告条持续显示至打开或问题解决；警告在提示和列表中均优先于完成消息。
8. 卡片使用 content-visibility 和 intrinsic size，保持原有懒加载图片。
9. 测试直接导入源码，覆盖目录竞态、分页、归一、缓存、同源隔离与游戏生命周期；另验证实际发布 bundle 的宿主导出。
10. 浏览器验证脚本进入 `scripts/browser/`；截图留在忽略的 `output/playwright/`，插件根目录具备独立 `.gitignore`。

## 验证范围

`npm run check`：50 项 Node 测试、102 键/语言检查、40 条内置目录同步及生成 bundle 校验。

`npm run package:check`：真实 npm 包在含中文与空格的新临时目录解压，无 node_modules、清空 NODE_PATH 后通过完整检查。

Chromium：游戏生命周期、拖拽缩放、i18n、HUD fallback 与订阅清理、50 次无关状态更新零额外 HUD 渲染，以及 HTTPS 模拟宿主下的搜索去抖、分类竞态/分页和同源游戏过滤。

`completion-notices` 场景验证上方提示自动隐藏、下方多条完成记录超过一分钟仍保留、逐条点击确认、宿主未读重置、导航拒绝、HUD adapter 重挂、暂离及小窗往返、同一任务再次完成和实时语言切换；12 条完成记录可在窄小窗内滚动，待决定警告条不会自动到期。完成记录不跨页面刷新持久化；仍使用同一游戏 iframe。

0.3.0 的 `notification-design` 验证暂离卡片通知、警告优先、五条完成提示合并摘要、异步打开时禁止重复跳转、失败保留游戏、刷新恢复 HUD 与小窗位置尺寸，以及缩小视口后的边界约束。通知层位于 `.bg_game-area`，与隐藏的 `.bg_stage` 平级，保留在全屏元素内。HUD 的持久坐标与当前显示坐标分离，避免暂离卡片、窄小窗及内容变化破坏用户偏好。

导航由插件级 `hud-navigation` 串行管理：等待宿主 `openSession` 成功后再切换 away；不调用清空 shell 选择的 leave。失败不确认通知；成功只确认发起时的通知序号，并检查当前游戏与模式，避免旧请求覆盖用户的新操作。

这些结果来自源码测试与隔离模拟宿主，并非已在所有 Harness 版本或另一台实体电脑上实装。
