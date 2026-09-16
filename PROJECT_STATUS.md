# SMEs.MY Project Status

Last verified: 2026-09-16, Asia/Singapore

## 当前方向

SMEs.MY v1 的收入测试是 Accounting／Bookkeeping 与 Company Secretary 的 SME 服务需求收集、人工核对和独立 provider 介绍。商业假设是 provider 支付合格需求费或已约定的成功介绍费；目前不能声称已有 provider 付费协议、收入或保证报价。自助工具／资料是首页第二条路径，workflow consulting 不作为主推服务。Digital products 仅保留未来入口。长期决策以 [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md) 为准。

## 已在正式网站验证

- GitHub PR #7 已合并到 `main`（merge commit `a7fd790`），Vercel 对该 commit 回报 success。正式域名 `https://smes.my` 的 `/tools` 与 `/tools/project-brief` 已用浏览器核对，不再跳转 `/request`。生成器已在浏览器内实际生成 brief，页面提供复制功能。
- 首页、导航、页脚已分开“找服务”与“自己解决／工具”。首页和分类 CTA 可进入相应服务需求表；资源页保留小型 digital products 未来入口。
- 正式网站 `/request` 的 Company Secretary 测试需求已到达 `/request/received`，显示的编号与私有 Google Sheet `Service Leads v1` 第 3 行一致。接收端公开 GET 回报 `2026-09-16 money-v1`；Apps Script 同一部署 ID 更新至版本 5。旧 Quote Requests 与 Provider Listings 保留。
- 新表两个内部测试记录均标记为 `test`，不联系或介绍 provider；通知栏是 `sent`，表示 Apps Script 已接受发信，尚未核对实际收件箱送达。两条测试记录不得计入商机、转化或收入。
- 新表记录类别、联系方式、需求、同意版本／时间、页面与来源参数、处理状态、provider、后续动作、结果、约定费用与实际收款。表格列宽已调整并在 Google Sheets UI 查看。
- 代码验证：19 项测试通过、ESLint 通过、Astro check 无错误或警告、完整 build 成功。项目视觉品牌未重设计。

## 尚有依赖

- 需要实际 Accounting／Bookkeeping 和 Company Secretary provider，并确认资质、服务范围、地区、收费触发条件、重复或不合格 lead 的处理与结算方式。尚未自动分发 lead，也不应在合作条款成立前声称有覆盖网络。
- 真正陌生访客的转化与有效 lead 数量仍待观察；现在只有两条内部测试数据。
- 邮件通知的收件箱到达率未独立验证。定期查看 Sheet 的 `new` 与 `failed` 状态，不能只依赖邮件。Apps Script/Google 服务与邮件配额是外部依赖。
- 旧 Quote Requests 表头与历史数据错位，且含垃圾提交；不要将其直接用于收入统计。不要批量删除历史记录。
- 本机 `C:\Users\Wynne\Documents\Codex\smes-my` 主检出仍有大量既有未提交内容并落后于远端；本次在 `.worktrees/money-architecture` 隔离完成，没有覆盖那些改动。将来整理主检出需先逐项审查。

## 最接近收入的下一步

从一个经核对的 Accounting／Bookkeeping provider 和一个 Company Secretary provider 开始，分别确认愿意接收的需求类型、地区、回复方式及真实付费条件，再获取第一条非测试且具备联系方式／范围的需求并人工匹配。按 [docs/LEAD_OPERATIONS.md](docs/LEAD_OPERATIONS.md) 记录 qualified → introduced → quoted → outcome → fee received。未实际收到款项之前不要把“介绍”记为收入。

## 发布与操作

- GitHub `main` 自动部署 Vercel；上线后以正式域名和 Vercel commit 状态核对。
- Apps Script 源码在 `docs/google-apps-script.js`；网站发布不会自动更新 Apps Script。新部署务必核对原 deployment ID 和公开 GET 版本。
- 私有 lead 工作表：`https://docs.google.com/spreadsheets/d/1PIxhw0LVdEjQJa5nTdXzcM10aQsYUV7UeQU9aSOfShE/edit#gid=1319357901`。
- 公开内容继续不透露 Wei Nee 当前酒店工作、客户身份、内部资料或敏感金额；Planurhome 保持独立品牌。

