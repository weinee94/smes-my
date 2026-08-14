# SMEs.MY

**商业运营、系统与执行的工作笔记。**

把散乱的信息、决定和行动，整理成可以执行的结构。

The single source of truth for this project's direction is [`SMES_MY_POSITIONING.md`](SMES_MY_POSITIONING.md).

## Current state

The first editorial version of SMEs.MY is implemented as an Astro site.

Core routes:

- `/` — SMEs.MY platform homepage
- `/posts` — 经营笔记
- `/cases` — 匿名化实战案例
- `/weineetan` — 关于 / How I Work
- `/contact` — 联系

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
