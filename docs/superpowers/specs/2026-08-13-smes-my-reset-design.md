# SMEs.MY Reset Design

Date: 2026-08-13

## Decision

SMEs.MY will stop being a supplier and service-provider directory. It will become a practical operating lab for Malaysian small businesses: turning scattered enquiries, service information, prices, FAQs, proof, and follow-up work into reusable systems that owners can actually use.

The existing directory is not an archive to maintain. Its public pages, provider records, forms, lead-capture code, directory SEO content, and supporting tests will be removed from the active repository. Git history remains the only recovery path.

## Product Position

SMEs.MY exists to help a small business move from messy communication to clearer execution. It will not begin as another WhatsApp CRM, generic AI chatbot, provider marketplace, or broad collection of free tools.

The first product lane is a `Business Sales Kit`: a structured package that turns a business's existing knowledge into reusable customer-facing and internal assets, including service descriptions, price or package explanations, FAQs, proof, required customer information, quotation context, and follow-up sequences.

Supporting content will explain real Malaysian SME operating problems and show how to structure them. Content builds trust and demand for the operating assets; it is not the product by itself.

## Public First Version

Until the first Business Sales Kit is ready, the public replacement will be a small, honest holding page rather than a fake product demo.

It will contain:

- SMEs.MY name and a concise repositioning statement.
- The problem: important business knowledge is scattered across chats, documents, price lists, and memory.
- The promise: turn that knowledge into clearer sales and operating assets.
- Three focus areas: enquiries, sales information, and follow-up.
- A short "being rebuilt" status with no launch-date promise.
- A simple contact link only if an existing safe business contact route is confirmed during implementation.

The holding page will not include provider cards, search filters, quote matching, profile claims, unimplemented AI interactions, pricing, testimonials, or lead forms.

## Removal Boundary

Delete from the active repository:

- All 15 `providers/` pages.
- All directory category and location pages.
- The English and Chinese directory homepages.
- Provider browsing, filtering, quote-request, and listing/claim code.
- Google Apps Script lead-capture code.
- Directory-specific tests.
- Directory-specific sitemap, llms file, robots rules, IndexNow key, social preview, and supplier photography.
- Old directory legal/support pages because their wording describes flows that will no longer exist.

Preserve:

- `.git/` and full Git history.
- `.gitignore`.
- `vercel.json`, rewritten only if the new build requires it.
- Core SMEs.MY brand logo/icon assets for evaluation during the rebuild; unused files will be removed before the new site ships.
- `docs/tool-app-ideas.md`, because it contains internal product directions rather than listing data.

Rewrite:

- `README.md` to describe the new operating-lab direction.
- `PROJECT_STATUS.md` to record the reset, removed scope, current holding-page state, and next product-validation step.

## Architecture

The reset version will stay static and dependency-light. It will use one homepage, one focused stylesheet, and no client-side application code unless required for basic navigation. A content framework will be chosen only when real notes or product pages need repeatable publishing.

The personal Wei Nee website is a separate project and domain. It will not share routes, identity, content storage, or deployment with SMEs.MY.

## Data and Privacy

No provider, invoice-derived, quote-request, or provider-listing data will be migrated into the new public site. Deleting repository files does not alter existing Google Sheets or external services; those remain untouched unless separately authorized.

The replacement page will collect no personal data in its first version. If a contact link is added, it will use an already-approved business channel and will not create a new database.

## Failure and Fallback Behaviour

- With no forms or dynamic data, the holding page has no submission failure state.
- If brand assets are unsuitable after the reset, the page will fall back to a text wordmark.
- Existing removed URLs may return `404` locally. Redirects or `410 Gone` responses will be considered before deployment, based on current search traffic and whether any URLs still deserve preservation.
- No live deployment or external account change is included in the reset without Wei Nee's confirmation.

## Verification

Before completion:

- Confirm no provider names, listing terminology, claim forms, quote forms, or directory routes remain in the active files.
- Confirm only the explicitly preserved brand/internal files survive from the old site.
- Run static link and HTML checks on the replacement page.
- Inspect desktop and mobile layouts locally.
- Confirm Git status and review the deletion list before any commit or deployment.

## Out of Scope

- Choosing or purchasing Wei Nee's personal domain.
- Building the personal website from AstroPaper.
- Building the full Business Sales Kit product.
- WhatsApp API, CRM, automation, payments, accounts, or subscriptions.
- Editing or deleting Google Sheets data, Vercel projects, DNS, email, Search Console, Facebook, or other external systems.
