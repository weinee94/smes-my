# smes.my Project Status

Last updated: 2026-05-27 end of session Asia/Singapore

## Current Objective

Build `smes.my` as an independent Malaysia SME services directory and lead platform. Keep it separate from PlanurHome. Keep `smes.com.my` reserved for corporate email / official identity.

## Current Repo

- Local path: `C:\Users\Wynne\Documents\Codex\smes-my`
- GitHub: `https://github.com/weinee94/smes-my.git`
- Branch: `main`
- Latest commit: `070a5b0 Add Apps Script version marker`
- Git state at last check: clean and pushed to `origin/main` before this status update

## Site Structure

- `index.html` - static homepage
- `css/styles.css` - site styling
- `js/app.js` - categories, provider cards, filtering, Google Sheets form submit
- `assets/` - 商記 SMEs.MY brand assets
- `docs/google-apps-script.js` - Google Apps Script backend for lead capture
- `vercel.json` - clean URL configuration

## Deployment

- GitHub push is working.
- Vercel should be connected to `weinee94/smes-my`.
- Static deploy settings: no build command; output directory root / `.`
- Latest pushed changes include stronger form feedback and shorter Apps Script source.
- Next verification needed: confirm `smes.my` is deploying from this repo and branch.

## Lead Capture

- Method: Google Sheets + Google Apps Script
- Current endpoint is configured in both forms in `index.html`.
- Apps Script source is in `docs/google-apps-script.js`.
- Quote request submissions have been verified entering the `Quote Requests` sheet.
- Provider listing submissions have been verified entering the `Provider Listings` sheet.
- The older `Leads` sheet may still contain earlier test submissions.

## Completed Recently

- Moved active project to `C:\Users\Wynne\Documents\Codex\smes-my`.
- Initialized Git and pushed to existing GitHub repo.
- Resolved remote history conflict with existing initial static site.
- Removed public-facing MVP / internal planning language.
- Improved homepage toward real directory platform positioning.
- Added provider comparison signals, request flow, categories, city coverage, and provider onboarding.
- Added Google Sheets lead form integration.
- Improved frontend form feedback so users see submitting, success, validation, and timeout states.
- Split Google Sheets lead capture by `form_type`: quote requests and provider listings now land in separate sheets.
- Shortened Apps Script to stay under the user's paste limit and added a script version marker in repo source.

## Open Issues

- Site still needs real provider data; current providers are placeholder examples.
- Needs category pages for SEO, starting with accounting, company secretary, payroll, website design, and digital marketing.
- Needs Vercel deployment verification.
- Visual polish can continue, but content depth and real listings are the main path out of “half-finished” feel.

## Next Steps

1. Verify Vercel is connected to `weinee94/smes-my` on branch `main`.
2. Confirm deployed site has the latest frontend form feedback after Vercel deployment.
3. Add first 20-50 real provider profiles.
4. Create SEO category pages for top 5 services.
5. Continue UI polish after real content structure is in place.

## Useful Commands

```bash
cd C:\Users\Wynne\Documents\Codex\smes-my
git status
git pull --ff-only
git add .
git commit -m "Update smes.my status"
git push
```

## Resume Instruction

In a new Codex conversation, say:

```text
继续 smes.my，请读取 PROJECT_STATUS.md。
```

For end-of-session wrap-up, say:

```text
收尾，更新 PROJECT_STATUS.md。
```
