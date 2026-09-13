# SMEs.MY

给小团队使用的项目整理、工作流程与轻量工具网站。

当前方向见 [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md)，公开写作与隐私规则见 [docs/SMES_MY_VOICE.md](docs/SMES_MY_VOICE.md)。

## 页面

- `/`：服务入口、工具与近期资料
- `/services`：可以处理的项目范围与合作方式
- `/tools`：免费轻量工具
- `/tools/project-brief`：浏览器端 Project Brief Generator
- `/posts`：项目记录与工作资料
- `/weineetan`：维护者简介
- `/contact`：联系
- `/cases`：旧入口，转到 `/posts`

公开内容不包含当前酒店工作或可以推断雇主的资料。Planurhome 作为独立的装修项目管理实践出现，不与 SMEs.MY 合并为同一品牌。

## 开发与发布

本地开发：`corepack pnpm install`，然后执行 `corepack pnpm dev`。

发布前执行：

```sh
corepack pnpm test
corepack pnpm lint
corepack pnpm build
```

生产由 Vercel 从 GitHub `main` 部署。修改先经独立分支与 PR 验证，再合并到 `main`。
