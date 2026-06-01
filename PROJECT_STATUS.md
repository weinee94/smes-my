# SMEs.MY Project Status

Last updated: 2026-06-01 17:45 Asia/Singapore

## Current Objective

Build `SMEs.MY` as an independent Malaysia SME services directory and lead platform. Keep the public brand display as `SMEs.MY`; keep URLs/canonical links on the lowercase `smes.my` domain.

## Current Repo

- Local path: `C:\Users\Wynne\Documents\Codex\smes-my`
- GitHub: `https://github.com/weinee94/smes-my.git`
- Branch: `main`
- Latest commit: `264bdfa Add IndexNow key`
- Git state at last check: clean

## Site Structure

- `index.html` - static homepage
- `css/styles.css` - site styling
- `js/app.js` - categories, provider cards, filtering, Google Sheets form submit
- `assets/` - 商記 SMEs.MY brand assets
- `docs/google-apps-script.js` - Google Apps Script backend for lead capture
- `vercel.json` - clean URL configuration
- `accounting-services-malaysia/`, `company-secretary-services-malaysia/`, `payroll-services-malaysia/`, `website-design-services-malaysia/`, `digital-marketing-agency-malaysia/` - first SEO service pages

## Deployment

- GitHub push is working.
- Vercel should be connected to `weinee94/smes-my`.
- Static deploy settings: no build command; output directory root / `.`
- Latest pushed changes include GEO/AI discovery metadata and an IndexNow verification key.
- Search Console has verified `https://smes.my/`; sitemap submission is successful.

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
- Added first 5 SEO service pages and linked them from the homepage and sitemap.
- Removed internal/project-planning copy from public pages so visitors see a clearer service-finder experience.
- Reworked homepage layout, spacing, and responsive behavior.
- Recolored the site to better match the 商記 SMEs.MY logo: purple brand accents, green primary buttons, pink/gold highlights.
- Added EN / 中文 language switching on the homepage, including hero, forms, service cards, provider cards, and key sections.
- Updated public brand display from `smes.my` to `SMEs.MY` while keeping lowercase URLs.
- Added `llms.txt` and exposed it from `robots.txt` via `LLMS: https://smes.my/llms.txt`.
- Re-submitted `https://smes.my/sitemap.xml` in Google Search Console on 2026-06-01; Search Console showed same-day read success.
- Search Console status on 2026-06-01: 2 Google Search clicks, 2 indexed pages, 13 not indexed.
- Confirmed indexed: homepage and `https://smes.my/payroll-services-malaysia`.
- Requested indexing for accounting, company secretary, website design, and digital marketing service pages.
- Added IndexNow key file `https://smes.my/5de411d1-21fb-490e-8c74-bcc229039a59.txt` and submitted a URL batch to IndexNow; API returned HTTP 202.

## Open Issues

- Site still needs real provider data; current providers are placeholder examples.
- Service detail pages are English-only for now; homepage supports EN / 中文.
- Need to prepare Chinese versions for the 5 SEO service pages.
- Need to create legal/support pages: `privacy-notice/`, `terms-of-use/`, and `disclaimer/`.
- SEO indexing is in progress; do not treat low traffic as a form/backend issue until Search Console has had time to process indexing requests.
- Visual polish can continue, but content depth and real listings are the main path out of “half-finished” feel.

## Next Steps

1. Check Search Console again after Google processes the 2026-06-01 indexing requests.
2. Add first 20-50 real provider profiles; content depth and trust signals are the main growth bottleneck.
3. Add Chinese content/version support for the 5 SEO service pages.
4. Continue legal/support page polish if needed: `privacy-notice/`, `terms-of-use/`, and `disclaimer/`.
5. Build external trust signals: social profiles, credible mentions, provider backlinks, and business directory citations.

## Useful Commands

```bash
cd C:\Users\Wynne\Documents\Codex\smes-my
git status
git pull --ff-only
git add .
git commit -m "Update SMEs.MY homepage and SEO pages"
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
