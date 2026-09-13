# SMEs.MY Project Status

Last updated: 2026-09-13 Asia/Singapore

## 当前方向

按 SMES_MY_POSITIONING.md 与 docs/SMES_MY_VOICE.md：长期留下真实工作与项目记录；不规定文章证明能力，不使用“现场／系统／判断”策展，不以固定模板或金句建立作者人设。

## 本次 source of truth 核对

Google Drive 主项目为 smes-my（文件夹 ID 1f1_0lTJ8w6tKu39IjElYqxx6odfXbckC）。根目录 README 和此前状态说明这是 Astro 项目。

- 首页源文件：src/pages/index.astro
- About 页面：src/pages/weineetan.astro，正文来自 src/content/pages/about.md
- 记录索引：src/pages/posts/[...page].astro
- 原案例索引：src/pages/cases.astro
- 内容：src/content/posts/*.md
- 通用界面：src/components 与 src/i18n/lang/zh-Hans.ts
- 站点信息：site.config.ts
- 方向：根目录 SMES_MY_POSITIONING.md 与 docs/SMES_MY_VOICE.md

核对时这些当前文件的修改时间主要为 2026-08-14。云端首页实际还是笔记／案例分栏，不含对话中提到的后续“现场／系统／判断”版。不能据此认定 Drive 已与家里的最新 repo 或线上完全一致。

未修改 smes-my-reset、smes-my-workbuddy-handover-2026-08-14、dist、.astro、node_modules、.git 或旧目录站点产物。

## 2026-09-13 云端改动

- 重写定位与语气指南，取消能力证明、固定 lesson、统一口头禅和策展框架。
- 首页改为简短介绍、最近六篇以内的实际公开记录及网站说明。
- About 缩短到背景和留下记录的原因。
- /posts 合并原笔记和案例；/cases 转到 /posts；导航使用记录／关于／联系。
- 四篇公开记录仅调整为轻量主题 tag，取消 featured 标记；正文、原文章文件名、发布时间、事件日期不改。
- `note-clear-states` 与 `note-service-is-not-the-asset` 已按新语气重写并公开；另外两篇抽象案例继续隐藏。目前共十篇公开记录、两篇草稿。
- 同步调整记录卡片、页脚、中文界面、站点描述和 README。

## 同步与发布状态

已与 GitHub main 的较新源码合并。分支 `update/natural-records-20260913` 经 PR #1 合并到 main；合并 commit 为 `89b27f923bd8441050ae8d7d2ff5f54c2b4faa38`。Vercel production 部署成功，正式域名 https://smes.my 已回读确认。

测试、lint、Astro check、build 与主要页面访问检查均通过。线上确认首页与 About 已更新，记录索引包含十篇公开记录，两篇新公开文章可访问，`/cases` 转至 `/posts`，另外两篇草稿 URL 返回 404。

本次源码、Google Drive 主项目与线上网站已完成同步。
