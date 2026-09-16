# SMEs.MY Project Status

Last updated: 2026-09-17, Asia/Singapore

## Current direction

Wei Nee directed a reset toward talent management and marketing, focused on one problem: customer enquiries arrive but a small team does not consistently own and follow them up. BeforeTax 省税会计 is an earlier brand and credible background, not a current tax/accounting service. See [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md).

## Previously live

As checked on 2026-09-17 before this change, smes.my still led with Accounting／Bookkeeping and Company Secretary referrals. The request form, receipt page and Google Sheet/App Script lead flow were live from the previous test. Project Brief Generator existed and worked as a browser tool, but Wei Nee judged it unnecessary. The old lead backend holds internal test records, not proven revenue or current provider coverage.

## This change

Homepage, navigation, about, blog and contact now follow the new focus. The first screen identifies Wei Nee and explains her BeforeTax background with a clear current-service boundary. Public request and tool routes are removed; historic lead data and backend files are retained. Unrelated posts are drafts and do not appear in blog or RSS. Contact uses email with a short problem prompt so there is a real reply trail, but no claim that an automated CRM exists.

## Remaining dependencies

- Verify the site deployment and the live route set after merge.
- Confirm the mailbox receives a real external message. A mailto click alone is not a verified received lead.
- Get an actual non-test owner conversation about the enquiry-to-follow-up gap; record whether a scoped paid pilot is wanted. No customer demand, paid offer or revenue is verified yet.
- If inbound volume justifies it, replace email with a consented, trackable form dedicated to this problem. Do not repurpose old Accounting／Company Secretary form data.

## Nearest revenue step

Use one real owner conversation to define a fixed-scope paid pilot around enquiry ownership and follow-up. Agree the price, deliverable and success measure before claiming a product or launching broad marketing.

## Deployment

GitHub main deploys to Vercel. The original main checkout has pre-existing uncommitted changes; this work was made in an isolated worktree. Do not overwrite the main checkout.
