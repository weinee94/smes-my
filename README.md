# SMEs.MY

**由 Wei Nee 主理的马来西亚小生意运营实验室。**

把散乱的生意资料、流程和行动，整理成可以真正使用的系统。

The single source of truth for this project's direction is [`SMES_MY_POSITIONING.md`](SMES_MY_POSITIONING.md).

## Current state

The first editorial version of SMEs.MY is implemented as an Astro site.

Core routes:

- `/` — SMEs.MY platform homepage
- `/posts` — 经营笔记
- `/cases` — 匿名化实战案例
- `/lab` — 实验室
- `/weineetan` — Wei Nee 的个人专业页
- `/now` — 目前关注与联系方式

## Local development

```powershell
corepack pnpm install
corepack pnpm dev
```

Before publishing:

```powershell
corepack pnpm test
corepack pnpm lint
corepack pnpm build
```

Production is hosted by Vercel and deployed from the GitHub `main` branch.
