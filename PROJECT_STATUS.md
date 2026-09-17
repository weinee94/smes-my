# SMEs.MY Project Status

Last verified: 2026-09-17, Asia/Singapore

## Current direction

SMEs.MY focuses on one Malaysian small-business problem: marketing creates customer enquiries, but team ownership and follow-up break down. Wei Nee's BeforeTax 省税会计 is earlier background, not a current tax/accounting service. [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md) is the authority.

2026-09-17 funnel correction: visitors should get immediate practical value before being asked to fill a form. The new /follow-up-check page gives an on-device four-point check and copyable action list without collecting answers. Homepage and navigation lead there; the existing Google Form is a later, optional route for a scoped pilot discussion. Public copy should sound useful to owners, not like internal business planning.

## Live public site

PR #12 merged as `7ea99eb`; the free /follow-up-check route was live-verified. On `https://smes.my`, homepage, /contact, /weineetan and /blog return the current content. /request and /tools/project-brief return 404. Old provider matching and Project Brief Generator are no longer public. This branch expands the discussed talent-management observations from one article to four; confirm production after deployment.

## Google-only backend

Current public intake is a dedicated Google Form linked from /contact, with a private Google response Sheet, Gmail notification and manual tracking columns. Form publication, link access, sheet linkage and notification setting were verified. A synthetic `TEST ONLY` submission was recorded in row 2; Gmail received the notification; row 2 is marked `test` and excluded from business counts. See [docs/TALENT_INTAKE_OPERATIONS.md](docs/TALENT_INTAKE_OPERATIONS.md) for exact links and daily handling. The old Google Apps Script and service-lead Sheet remain for historic enquiries only.

## Still unverified

- The legal-identity and bilingual-privacy update from PR #11 was live-verified on /contact and /privacy on 2026-09-17.
- A real unknown visitor completing the form and a genuine owner discussion. Only one synthetic test exists.
- A priced pilot, a paying customer or revenue. Keep proposed price and actual money received separate.

## Legal identity and data notice (2026-09-17)

The SSM LLP registration certificate identifies **WYNNE CONSULTANCY GROUP PLT**, **202204002416 (LLP0032703-LGN)**. Section 20(3) of the Limited Liability Partnerships Act 2012 requires an LLP's name and registration number on its website. The site footer, About and contact pages now show them; /privacy has Bahasa Melayu and English notices, with a Chinese summary. The Google Form description shows the operator and links to /privacy. Confirm the live deployment after merge and keep the private Sheet's monthly retention review in operation. The certificate proves registration on 1 September 2022, not live 2026 SSM status. No public claim of current good standing is made.

## Next revenue step

Get a real relevant visitor to use the free check, then seek one qualified enquiry and test a tightly scoped paid pilot. Record actual price agreed and money received separately. Do not expand generic tools or content without a demand signal.

Internal 2026-09-17 delivery design: an Enquiry Handoff Kit is scoped to one channel, a customer-owned Google Sheet, responsibility rules and a seven-day adoption check. It is not yet sold or proven delegable. A second operator must complete setup without Wei Nee within 60–90 minutes before calling it repeatable; payment, support and distribution remain separate from template replication. See the private revenue blueprint in the active Codex workspace for the SOP and unit-economics gate.

## Deployment

GitHub main deploys to Vercel. The original local main checkout has pre-existing uncommitted changes and should not be overwritten; work from isolated worktrees.
