# SMEs.MY

Malaysia SME service lead generation, initially Accounting/Bookkeeping and Company Secretary. The second path is self-service tools/resources. Current strategy: [SMES_MY_POSITIONING.md](SMES_MY_POSITIONING.md). Operations: [docs/LEAD_OPERATIONS.md](docs/LEAD_OPERATIONS.md).

## Routes
- `/`: find a service or use tools/resources; compact enquiry form.
- `/request`: structured service request. Category links may preselect Accounting or Company Secretary.
- `/request/received`: confirmed receipt, reference and next steps. No personal data in URL; direct visits do not claim success.
- `/tools`: free tools/resources and a small future digital-products entry.
- `/tools/project-brief`: browser-only generator; never redirects to `/request`.
- `/blog`, `/posts`: observations and resources.
- `/weineetan`: operator profile; `/privacy`: collection and referral disclosure.

## Development and release
`corepack pnpm install --frozen-lockfile`, then `corepack pnpm dev`.
Before release: `corepack pnpm test`, `corepack pnpm lint`, `corepack pnpm build`.
Vercel builds GitHub `main`. Use a branch/PR and verify the resulting production URL.

The lead receiver is separately versioned in `docs/google-apps-script.js`. Updating the website does not deploy Apps Script. Update only the verified web-app deployment in project `1Hw_XPoKmp5yKj7IaSNrDm4NrfNBgpnQQenbBdUtfUet_U9p3Z1wLvpJ2`; endpoint stays unchanged in `EnquiryForm.astro`. Preserve unrelated Apps Script draft code and other deployment versions. The public GET health response reports the deployed version, not the editor draft.

No public customer records, current employer information or real lead exports belong in this repository.
