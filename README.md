# SMEs.MY

Wei Nee 留下工作记录、商业观察和自己做过的项目的地方。

当前方向见 [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md)，公开写作规则见 [docs/SMES_MY_VOICE.md](docs/SMES_MY_VOICE.md)。

## 当前云端源文件

Astro 页面在 src/pages，About 正文在 src/content/pages/about.md，记录在 src/content/posts。site.config.ts 提供站点信息，src/components 提供导航、页脚和记录卡片。

- /：首页与最近的记录
- /posts：所有公开记录，包含原来的笔记和案例
- /cases：旧索引入口，转到 /posts
- /weineetan：关于
- /contact：联系

保留原文章路径、事件日期和发布时间。目前十篇记录公开，两篇草稿隐藏。旧 handover、dist、.astro、node_modules 及旧目录站点文件不是页面编辑源。

## 开发与发布

本地开发：corepack pnpm install，然后 corepack pnpm dev。

发布前执行 corepack pnpm test、corepack pnpm lint、corepack pnpm build。

生产由 Vercel 从 GitHub main 部署。当前合并结果见 PROJECT_STATUS.md；上线前先推送独立分支、检查 PR，再合并到 main。
