# SMEs.MY Project Status

Last updated: 2026-09-13 Asia/Singapore

## 当前方向

SMEs.MY 是面向小团队的 service/conversion website，主要提供项目资料整理、tracker 与工作流程，以及范围明确的轻量工具。网站不再以个人博客或工作记录为主体；资料用于说明实际做法和建立可信度。

Planurhome 是独立的装修项目管理实践，可以作为项目出现，但两个品牌不合并。

## 隐私与文字

- 不公开 Wei Nee 当前的酒店工作，也不保留可以推断雇主的相关页面或内容。
- 标题直接说明主题，不使用悬念、反差或短剧式句型。
- 正文使用完整、连续的句子，不故意断句，也不在结尾添加能力证明或感悟。
- 公开资料继续移除客户身份、敏感金额与内部信息。

## 2026-09-13 第二轮改版

- 首页改为服务入口，说明适合处理的实际问题、三类项目范围和免费工具。
- 新增 `/services`、`/tools` 与浏览器端 `/tools/project-brief`。
- 导航改为可以帮什么／工具／资料／关于／联系。
- 移除六篇与酒店工作有关或由酒店情境抽象出来的内容；保留六篇装修、Planurhome、SMEs.MY 与通用流程资料。
- 重写全部保留文章的标题、摘要和正文，取消短剧式断句与感悟式收尾。
- About 不再提 Sales & Marketing 或酒店，只保留装修项目、网站和内部工作系统背景。
- 视觉改为 light-only、sans-serif、卡片式的现代服务网站，移除黑底金字与宋体博客风格。

## 验证

`corepack pnpm test`、`corepack pnpm lint`、Astro check 与完整 build 均通过。本轮建立 26 个静态页面，Pagefind 索引六篇公开资料。

PR #2 已经合并，Vercel production 部署成功。正式域名已用真实浏览器检查首页、服务、工具、资料、About 与联系页；公开页面没有酒店或可推断当前雇主的内容。Project Brief Generator 已实际填写并确认输出正常。

本轮源码、正式网站与 Google Drive 主项目已完成同步。
