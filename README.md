# dsh-beegame

DSH 插件：把参考项目 `bee-sideplay`（Chrome 侧边栏游戏扩展）移植为 DeepSeek Harness Web GUI 的「游戏」面板。侧边栏多一个蜜蜂入口，点开即是一个完整的游戏库面板：浏览 Bee.games 精选目录、按分类筛选、服务端搜索、收藏与最近游玩记录，点击封面在面板内嵌的沙箱 iframe 里直接游玩。

## 结构

```
dsh-beegame/
  package.json        插件清单：bundle patch、client 声明、导出与展示资源
  cordis.patch.yml    Loader patch：插入 id 为 beegame 的一行
  index.js            Host 半：同源 /api/beegame/* 目录代理（解决 CORS）+ 离线快照兜底
  client.js           自动生成的发布 bundle；安装时直接加载，不手动编辑
  client.build.json   源码、字典与生成文件的校验清单
  src/client/         客户端源码：页面、目录状态、播放器、HUD、拖拽、暂停桥、CSS
  src/host/           上游目录归一、查询及 60 秒内存缓存
  src/shared/         Host 与 Client 共用的 URL 校验
  scripts/            构建、字典、快照及安装包检查；browser/ 为隔离浏览器验证
  tests/              可直接导入源码的 Node 回归测试
  seed.js             内置目录快照（从本包 data/seed.json 生成，含 40 款游戏）
  data/seed.json      内置目录源数据
  locale/en.json      英文文案（meta.title / meta.description 供插件管理页显示）
  locale/zh.json      中文文案
  icon.svg            蜜蜂图标（原创矢量图）
```

## 与参考项目的对应关系

| bee-sideplay（Chrome 扩展） | dsh-beegame（DSH 插件） |
|---|---|
| `background.js` + 工具栏图标 | `sidebar.panellist` 槽位蜜蜂图标 |
| `sidepanel.html` + `app.js` | `main` 键控面板（key `beegame`） |
| `lib/catalog.js`（页面直连 API） | Host 半 `/api/beegame/home`、`/api/beegame/games` 代理 |
| `lib/storage.js`（chrome.storage） | `localStorage`（同字段名 `favorites` / `recent`，同一净化逻辑） |
| `lib/i18n.js`（Chrome i18n） | `ctx.locale` 字典（zh / en，meta + 面板文案） |
| `_locales/*/messages.json` | `locale/*.json` |
| `data/seed.json`（离线快照） | `seed.js`（模块常量，Host 兜底路由 `/api/beegame/seed`） |
| `icons/bee.svg` | `icon.svg`（重绘的原创蜜蜂徽标） |

保留参考项目的分类映射、播放器 sandbox 权限、7s/16s 兜底计时器与 40 条最近记录上限。目录分页、宿主集成和安全校验由本插件独立实现并测试。

## 为什么要 Host 代理

`api.bee.games` 只对 allow-list 来源回 `Access-Control-Allow-Origin`（`bee.games` 在列，其他来源——包括 harness 页面——都没有 CORS 授权），浏览器直连必然失败。Host 进程不受限，因此 Host 半注册 `kind: 'prefix'` 的 `/api/beegame` 路由代为转发两条目录接口；Client 半用同源相对路径 `api/beegame/...` 读取（相对页面 base 解析，反向代理子路径部署同样可用）。

代理上游不可达时返回 502/504，Client 半自动落到 `/api/beegame/seed` 的内置快照并在页脚标注「离线快照」。

Host 对 `/home` 及无搜索词的 `/games` 浏览请求使用 60 秒内存缓存，按归一后的语言、分类与分页参数分别存储，最多 64 项；同一请求并发时合并上游读取。搜索不缓存，失败响应不缓存，插件卸载时清空。缓存命中也先经过准入检查；浏览器响应仍为 `no-store`。因此短时间内点击刷新会复用最新缓存，最长 60 秒后重新读取上游。

## 信任边界

代理前缀比内核 `/api` 长（longest-prefix-wins），所以内核的准入检查不会自动覆盖它。Host 半显式执行同一道围栏：优先调用组合里已挂载的 `connection` 服务的准入决策（`admit` / `requestRejection`），没有该服务时退回结构化围栏——仅接受 loopback Host、拒绝 `sec-fetch-site: cross-site`、Origin/Referer 必须匹配 Host authority。所有响应 `cache-control: no-store`；代理不透传任何 Cookie（上游请求 `credentials: 'omit'`），不接收写入（仅 GET）。

收藏与最近记录保存在浏览器 `localStorage`（键 `dsh-beegame-v1`），只在本机使用，不上传。

无 `connection` 服务时仅允许 loopback 是刻意保留的安全边界。远程或容器部署应配置宿主的认证与准入服务，不能只添加 hostname 就绕过认证。客户端拒绝与当前页面 origin 相同的游戏 URL，网络目录、本地记录及游戏会话入口均执行校验；图片与官网链接继续使用 HTTPS 校验。

## 安装

将分发包 `dsh-beegame-0.3.0.tgz` 复制到目标电脑。在该电脑的 DSH 会话里，用安装包的实际路径安装（下面尖括号内容需替换）：

```
plugin_manager install_bundle target="<安装包的实际路径>/dsh-beegame-0.3.0.tgz"
```

也可以将完整插件目录复制到目标电脑，使用该目录的实际路径作为 `target` 安装。安装后侧边栏出现 `beeGames` 入口，点击进入面板。

运行文件已随包提供，无需在目标电脑构建前端、安装本项目的 npm 依赖或单独启动代理服务。React、语言与界面服务由支持本插件清单及槽位 API 的 DeepSeek Harness Web GUI 提供；插件随宿主启动，API 地址根据当前页面自动解析，不绑定开发电脑的路径、用户名、端口或域名。

宿主及浏览器仍需能够联网访问 Bee.games API 和游戏资源。内置快照仅保存目录信息，不包含游戏本体，不能离线游玩。收藏、最近记录、提示关闭偏好和窗口位置尺寸保存在目标浏览器中，不随安装包迁移。

## 开发与分发验证

开发源码使用标准 ES modules。开发者在源码 checkout 执行 `npm ci` 安装锁定的开发依赖，再执行 `npm run build`：esbuild 将模块、CSS 和 JSON 字典生成一个兼容宿主 ModuleLoader 的 `client.js`，React 仍由宿主提供。目标电脑只使用预构建文件，无需构建工具。

翻译唯一来源为 `locale/*.json`，不再维护源码中的字典副本。修改源码或翻译后执行 `npm run build`（`i18n:sync` 为兼容别名）；修改 `data/seed.json` 后执行 `npm run seed:sync`。`npm run check` 检查字典键与占位符、未使用键、快照同步、bundle 输入校验及自动测试。`client.build.json` 检测漏构建或手改生成文件，兼容 LF/CRLF。

`npm run package:check` 会实际打包，解压到独立的临时目录，清空 `NODE_PATH`，检查必需文件和本机路径泄漏，再运行包内检查及测试；无需第三方测试依赖。测试覆盖不同域名、端口、HTTPS、部署子路径、宿主准入与目录服务断网回退。这不等同于已在每种宿主版本或其他实体电脑上完成安装测试。

运行 `npm pack --pack-destination <输出目录>` 会先构建，再生成可复制的 `.tgz` 安装包。发布白名单排除了本机测试输出、`node_modules` 和工程记录。

`npm run test:browser:serve` 启动隔离模拟宿主，默认由系统分配端口；用 Playwright CLI 打开输出地址，然后通过 `run-code --filename scripts/browser/<场景>.cjs` 执行验证。`verify` 验证游戏生命周期与拖拽缩放，`i18n` 验证语言切换，`help-dismiss` 验证永久关闭提示，`review` 验证 Hook 切换与 HUD 更新，`completion-notices` 验证完成提示常驻与逐条确认，`catalog-review` 验证搜索、分类分页及 HTTPS 同源拦截。不同场景建议使用独立浏览器会话；`output/playwright/` 只保存截图，已加入本项目 `.gitignore`。

## 国际化（i18n）

插件支持简体中文和英文，跟随应用「设置 → 通用 → 语言」实时切换，无需刷新。侧栏入口与游戏库标题始终显示为 `beeGames`。游戏库、搜索、分类、收藏与最近记录、错误提示、时间与数量、播放器、小窗、HUD 和无障碍标签同步更新；切换语言保留当前游戏和小窗尺寸。

在线目录与搜索请求同时使用对应语言（`zh-CN` / `en`）。第三方游戏内部文字由游戏自身控制，插件不改写游戏内容；会话标题与用户数据保持原样。

翻译统一在 `locale/zh.json` 和 `locale/en.json` 维护，构建时导入并嵌入发布 bundle。当前每种语言 102 个运行时键；动态分类和缩放标签使用显式键表，`npm run i18n:check` 检查两种语言的键名、模板参数、缺失及未使用键。不增加运行时翻译文件请求或依赖。

## 暂离游戏与返回

打开游戏后，点击「暂离，去会话」即可返回当前会话。可以处理会话任务，然后点右下角小窗的「返回游戏」继续；直接从侧栏切换会话，或通过游戏内的任务动态打开会话，也会保留当前游戏。

「缩小到悬浮窗」让游戏继续显示在小窗中。小窗和暂离后的返回卡片都可以拖动：按住顶部游戏标题移动；聚焦标题后，也可以用方向键微调、Shift + 方向键加速、Home 恢复右下角默认位置。位置保存在本机 localStorage，刷新后恢复，窗口缩小时会自动收回可见范围。

最小化按钮使用横线图标。游戏小窗支持拖动四边或四角调整宽高，右下角有缩放手柄；聚焦该手柄后可用方向键微调尺寸。最小尺寸为 320 × 200，屏幕更小时随可用空间缩小。尺寸保存在本机 localStorage，刷新后也可恢复；调整大小不会重新加载游戏。播放器底部不再显示暂离与暂停的固定说明。

上述操作使用同一个 iframe，不重新加载游戏。点击「结束游戏」、打开另一款游戏、「重开」、刷新应用页面或重新加载插件会结束或重新创建当前实例。本功能不提供刷新后的游戏存档。

游戏内的 HUD 任务胶囊也支持拖动：按住胶囊移动，短按展开任务列表。方向键微调，Home 恢复右上角默认位置并清除保存的坐标。HUD 位置保存在本机 localStorage；小窗和任务文字变化时仅约束显示位置，不覆盖用户保存的坐标。存储被禁用时仍能正常拖动。

暂离后，返回卡片继续显示 HUD 计数、通知和可展开的任务列表，可直接打开对应会话。待决定事项使用常驻警告条，始终排在完成提示及列表中的完成任务上方，成功打开会话后取消该警告条；宿主确认事项已解决时也会移除。已打开但仍待决定的会话继续保留在列表中。

任务完成后，HUD 上方弹出「已完成：任务标题」，6 秒后自动隐藏；同时有效的完成提示超过两条时合并为摘要，点击摘要展开列表。下方任务列表中的完成记录和胶囊计数继续保留，记录过多时可滚动查看。点击具体任务，成功打开会话后才清除该任务的完成记录并更新计数；打开失败时保留通知和游戏模式，并显示可重试的错误信息。异步打开期间禁用重复跳转，旧请求不会确认该任务后来产生的新通知。宿主清除未读标记、暂离返回、小窗切换和 HUD 重新挂载不会清除未点击的完成记录，重新挂载也不会再次弹出已过期的提示；同一任务再次完成会重新提示。完成记录保存在本次插件运行的内存中，刷新应用或重载插件后不保证恢复。

底部「画面空白或无法操作」提示右侧有关闭按钮。点击后立即隐藏，并在本机记住「不再提示」；重开游戏、更换游戏或刷新应用后也不会自动出现。

**保留游戏与暂停游戏是两件事。** 对于支持并确认暂停协议的游戏，暂离时会请求暂停，返回时请求继续。普通第三方游戏可能没有此接口，需要使用游戏内的暂停按钮；计时、声音和后台逻辑仍可能继续。暂离小窗只在收到暂停确认或正在请求暂停时显示状态，不显示未确认暂停的描述。详见 [播放器生命周期与暂停协议](PLAYER_LIFECYCLE.md)。

## 已知边界

- 第三方游戏可能禁止嵌入或需要登录；面板不移除原站安全限制，提供「独立窗口」与「官网」按钮兜底。
- 跨域 iframe 的 load 事件不保证渲染成功：7 秒后强制隐藏 loading，16 秒后显示提示条。
- 账号会话检测未移植（依赖浏览器扩展的 Cookie 读取），收藏与最近记录均为本机数据。
- 横屏游戏在窄窗口按比例缩放，拉宽窗口或用「独立窗口」体验更好。
