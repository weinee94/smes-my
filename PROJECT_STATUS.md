# SMEs.MY Project Status

Last updated: 2026-06-04 Asia/Singapore, homepage cleanup session

## Current Objective

Build `SMEs.MY` as an independent Malaysia SME supplier, contractor, and proper provider directory. Keep the public brand display as `SMEs.MY`; keep URLs/canonical links on the lowercase `smes.my` domain.

## Current Repo

- Local path: `C:\Users\Wynne\Documents\Codex\smes-my`
- GitHub: `https://github.com/weinee94/smes-my.git`
- Branch: `main`
- Latest commit: `b2af7c4 Improve SMEs.MY visual system`
- Git state at last check: clean

## Site Structure

- `index.html` - static homepage
- `css/styles.css` - site styling
- `js/app.js` - categories, provider cards, filtering, Google Sheets form submit
- `assets/` - 商記 SMEs.MY brand assets
- `docs/google-apps-script.js` - Google Apps Script backend for lead capture
- `vercel.json` - clean URL configuration
- `accounting-services-malaysia/`, `company-secretary-services-malaysia/`, `payroll-services-malaysia/`, `website-design-services-malaysia/`, `digital-marketing-agency-malaysia/` - first SEO service pages
- `packaging-suppliers-malaysia/` - first supplier/category page outside the pure service-provider lane

## Deployment

- GitHub push is working.
- Vercel should be connected to `weinee94/smes-my`.
- Static deploy settings: no build command; output directory root / `.`
- Latest pushed changes include GEO/AI discovery metadata and an IndexNow verification key.
- Latest pushed changes are live on `https://smes.my/`; homepage and CSS returned 200 after the `b2af7c4` push.
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
- Added `packaging-suppliers-malaysia/` to widen SMEs.MY from pure business services into a supplier + service directory.
- Updated homepage metadata, JSON-LD, search shortcuts, quote form, category cards, provider cards, sitemap, and `llms.txt` to include packaging suppliers.
- Added generated, compressed website photography for the homepage supplier comparison section and packaging supplier page:
  - `assets/sme-supplier-comparison.jpg`
  - `assets/packaging-suppliers-malaysia.jpg`
- Created reusable Codex skill `design-taste-audit` at `C:\Users\Wynne\.codex\skills\design-taste-audit`; validation passed with `Skill is valid!`.
- Used `design-taste-audit` to improve SMEs.MY visual quality: calmer color system, stronger first viewport hierarchy, more consistent cards/buttons/forms, improved visual feature section, sticky-header scroll padding, and mobile layout fixes.
- Commits pushed after the IndexNow work:
  - `fba580c Add packaging supplier category`
  - `cf3eb93 Add SME directory photography`
  - `b2af7c4 Improve SMEs.MY visual system`

## Open Issues

- Site still needs real provider data; current providers are placeholder examples.
- Service and supplier detail pages are English-only for now; homepage supports EN / 中文.
- Need to prepare Chinese versions for the 5 SEO service pages.
- Legal/support pages exist: `privacy-notice/`, `terms-of-use/`, and `disclaimer/`; continue polishing if needed.
- SEO indexing is in progress; do not treat low traffic as a form/backend issue until Search Console has had time to process indexing requests.
- Visual polish is improved; content depth and real listings are now the main path out of “half-finished” feel.
- On 2026-06-04, user said the website still felt messy, so the next step changed from adding provider candidates to cleaning the homepage structure first.
- Simplified homepage flow: removed duplicated explanatory sections, removed decorative visual band, reduced hero CTA noise, shortened the quote form, and added CSS/JS cache-busting query strings.
- Verified local homepage at `http://127.0.0.1:4173/` in desktop and mobile viewports; first screen renders, mobile text does not overlap, and the quote-form placeholder no longer uses stale cached copy.
- After review, user clarified the cleaned page felt too plain and lacked design/product signal. Added a marketplace-style directory preview with sample provider cards and reframed provider signup as early/founding listings with clearer benefits.
- Business assumption clarified: merchants are unlikely to register naturally from a cold empty directory. The site needs seeded profiles, visible category pages, SEO value, and a specific early-listing offer before provider signup is realistic.
- Positioning clarified on 2026-06-04: SMEs.MY should not be limited to "business services". It should encourage proper companies across SME supplier/provider categories, including registration-sensitive fields such as renovation contractors with CIDB details where applicable, accountants/tax providers with MIA or tax licence details where applicable, and company secretaries with SSM practising certificate details where applicable.
- Avoid overclaiming verification. Use wording like "registration/licence details where applicable" and "proper provider signals" unless SMEs.MY has actually verified a provider through a documented process.

## Next Steps

1. Check Search Console again after Google processes the 2026-06-01 indexing requests.
2. Review the cleaner homepage with the new directory-preview section and decide whether it now has enough product/design signal.
3. Add or seed the first 20-50 real provider/supplier profiles once the homepage feels credible enough to show merchants.
4. Add Chinese content/version support for the 5 SEO service pages and `packaging-suppliers-malaysia/`.
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
