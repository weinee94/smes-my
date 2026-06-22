# SMEs.MY Project Status

Last updated: 2026-06-22 11:30 Asia/Singapore, Johor Bahru area content seed

## Current Objective

Build `SMEs.MY` as an independent Malaysia proper supplier, contractor, and service provider directory. SME use cases remain important, but the platform should also serve mass-market buyers, homeowners, consumers, and businesses looking for proper providers. Keep the public brand display as `SMEs.MY`; keep URLs/canonical links on the lowercase `smes.my` domain.

Current content-growth direction: do not wait for Wei Nee to manually provide provider names. Start from practical area/category combinations, beginning with Johor Bahru, and turn public company websites into structured public-source research pages and later profile-completion queues.

## Current Repo

- Local path: `C:\Users\Wynne\Documents\Codex\smes-my`
- GitHub: `https://github.com/weinee94/smes-my.git`
- Branch: `main`
- Latest local commit at this check: `804b6b9 Refactor styles and HTML structure for improved visual consistency; add icons to categories and update tests for homepage elements`
- Git state at last check: dirty; Johor Bahru area page and related index/sitemap/llms/test/status updates are local and not committed or pushed yet.

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
- On 2026-06-15, added the first invoice-backed seed provider/category structure for electrical wiring contractors, then tightened the public boundary:
  - `electrical-wiring-contractors-malaysia/` exists as a category page and seed profile test surface.
  - Invoice-backed seed now uses professional display casing: `Urban Reno Empire` as display name, with `URBAN RENO EMPIRE` and `URBANRENO` retained only as source/invoice fields.
  - Direct email/phone from invoice are withheld from the public seed profile; buyer action routes through SMEs.MY.
  - Homepage provider area now presents `Profile formats`, `Sample format`, and `Invoice-backed seed` instead of implying live/verified providers.
  - Homepage language switch was removed for now; the public site is English-first until category pages have full bilingual coverage.
  - Added `tests/provider-content.test.mjs` to guard against verification overclaiming, public direct-contact leakage, and accidental half-bilingual UI.
- On 2026-06-22, added the first Johor Bahru area content seed:
  - New static page: `johor-bahru-suppliers-services/`.
  - Page covers JB-area public-source research signals for packaging suppliers, electrical/M&E contractors, company secretary, payroll, accounting, and compliance providers.
  - Public-source examples include PLL Packaging, Khoo Packaging, Smart Pack, CSY Electric, JUTA M&E, C&G Corporate Services, DTL, TJW Group, and YCS Accounting.
  - The page explicitly avoids presenting these companies as independently checked SMEs.MY listings; it is a research queue and comparison guide.
  - Homepage city link, homepage service guide list, `sitemap.xml`, and `llms.txt` now link to the JB area page.
  - Tightened old electrical page wording from `SMEs.MY-verified` phrasing to `independently checked SMEs.MY listing`.
  - Added test coverage for the JB page and broadened overclaim guards to catch `SMEs.MY-verified`.
- On 2026-06-22, converted the first JB public-source examples into individual profiles:
  - `providers/pll-packaging-sdn-bhd/`
  - `providers/csy-electric-sdn-bhd/`
  - `providers/cg-corporate-services/`
  - Added `Public-source profile` as a homepage provider-card label.
  - Added the three profiles to homepage provider data, JB area page links, `sitemap.xml`, `llms.txt`, and tests.
  - Each page avoids publishing copied phone/email details and keeps the status as public-source / not independently checked.
- On 2026-06-22, corrected the homepage provider browsing hierarchy:
  - Provider section now says `Provider records` instead of `Profile formats`.
  - Public-source and invoice-backed records are sorted before sample-format cards.
  - Sample formats remain only as fallback examples for categories that do not yet have public profiles.
  - Added regression coverage so sample profiles do not drift back ahead of real records.
- On 2026-06-22, improved provider-card readability:
  - Removed unclear `Not confirmed` / `Not shown on invoice` signal text.
  - Provider cards now show labelled signals such as `Area`, `Source`, `Access`, and `Open item`.
  - Public-source and invoice-backed cards use `Needs direct check` for missing confirmation instead of unexplained internal status wording.
- On 2026-06-22, fixed public copy leakage from internal profile-building terminology:
  - Homepage provider section now uses buyer-facing copy: compare service scope, location, source notes, and details to confirm before enquiry.
  - Provider-card labels now show `Source listed`, `Invoice source noted`, and `Example profile` instead of internal source-type wording.
  - JB area page, individual provider pages, electrical contractor page, and `llms.txt` no longer expose `public-source`, `sample format(s)`, or `invoice-backed seed` wording.
  - Added regression coverage to keep internal profile-building terms out of public-facing pages.

## Open Issues

- Site still needs real provider volume; current public provider cards include early example profiles plus one invoice-source record, not a mature provider marketplace.
- Johor Bahru page now has the first three source-listed individual profiles, but the directory is still early. The next step is to build enough profile volume and then use the profiles for provider-claim outreach.
- Service and supplier detail pages are English-only for now; homepage is intentionally English-first until bilingual coverage can be done consistently.
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
- Positioning refined again on 2026-06-04: SMEs.MY should not claim to serve only SMEs. SME scenarios are a strong starting point, but mass-market buyers, homeowners, consumers, and ordinary business buyers can also use the platform to find proper providers.
- Avoid overclaiming verification. Use wording like "registration/licence details where applicable" and "proper provider signals" unless SMEs.MY has actually verified a provider through a documented process.
- Do not let available renovation/electrical invoices pull `smes.my` into a home-renovation domain. Renovation-related contractors can fit only as SME/business-premises suppliers or service providers where relevant.
- User is not interested in building more SME tools right now and does not want to sell time. Preserve the broader possibility of SMEs.MY empowering SMEs, but only revisit when there is a scalable, non-time-selling model or new knowledge worth considering.
- Public group links are not recommended. If request routing is tested later, use a controlled provider-pool/status workflow in Google Sheets instead of public WhatsApp/FB groups.

## Next Steps

1. Review the new `johor-bahru-suppliers-services/` page locally, then decide whether to commit and push.
2. Add another 7 JB public-source profiles so the first outreach batch has 10 companies, prioritising packaging, electrical/M&E, payroll/accounting, and company secretary.
3. Draft a provider-claim outreach message and offer: free correction, optional RM99-RM199 founding claimed profile.
4. For each profile, keep status as public-source until independent checks or provider claim exists; do not imply SMEs.MY verification.
5. If provider routing is tested, add provider-pool status fields to Google Sheets instead of creating public groups.

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
