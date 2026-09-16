# SMEs.MY Project Status

Last verified: 2026-09-17, Asia/Singapore

## Current direction

SMEs.MY focuses on one Malaysian small-business problem: marketing creates customer enquiries, but team ownership and follow-up break down. Wei Nee's BeforeTax 省税会计 is earlier background, not a current tax/accounting service. [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md) is the authority.

## Live public site

PR #9 merged as `1b93b0b`; Vercel reported success. On `https://smes.my`, homepage, /contact, /weineetan and /blog returned the new content. /request and /tools/project-brief returned 404. Old provider matching and Project Brief Generator are no longer public. Only the discussed talent-management article remains published.

## Google-only backend

Current public intake is a dedicated Google Form linked from /contact, with a private Google response Sheet, Gmail notification and manual tracking columns. Form publication, link access, sheet linkage and notification setting were verified. A synthetic `TEST ONLY` submission was recorded in row 2; Gmail received the notification; row 2 is marked `test` and excluded from business counts. See [docs/TALENT_INTAKE_OPERATIONS.md](docs/TALENT_INTAKE_OPERATIONS.md) for exact links and daily handling. The old Google Apps Script and service-lead Sheet remain for historic enquiries only.

## Still unverified

- Website deployment of the Google Form link and updated privacy copy after this change merges.
- A real unknown visitor completing the form and a genuine owner discussion. Only one synthetic test exists.
- A priced pilot, a paying customer or revenue. Keep proposed price and actual money received separate.

## Next revenue step

Review the first real enquiry in the Google Sheet, speak with its owner about where enquiries are lost, and offer one fixed-scope paid pilot with a clear deliverable and price. Do not build broad tools, content or marketing before that signal.

## Deployment

GitHub main deploys to Vercel. The original local main checkout has pre-existing uncommitted changes and should not be overwritten; work from isolated worktrees.
