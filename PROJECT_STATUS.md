# SMEs.MY Project Status

Last updated: 2026-08-13 Asia/Singapore

## Current Direction

SMEs.MY is being reset as a practical operating lab for Malaysian small businesses.

Its purpose is to help owners turn scattered customer enquiries, service information, prices, FAQs, proof, and follow-up work into clearer reusable operating assets. It is not another generic AI chatbot, WhatsApp CRM, or supplier directory.

The first product lane is the `Business Sales Kit`: a structured package that turns what a business already knows into service descriptions, price or package explanations, FAQs, proof, customer-information requirements, quotation context, and follow-up sequences.

## Reset Decision

- Reset approved by Wei Nee on 2026-08-13.
- The old provider directory and listing product has been removed from active repository files.
- Removed scope includes provider profiles, category and location pages, quote and listing forms, provider claim flows, Google Apps Script lead capture, directory tests, directory SEO files, directory imagery, and directory-specific legal pages.
- Old directory content is recoverable only through Git history; it is not retained as an active archive.
- The three core SMEs.MY logo/icon assets and `docs/tool-app-ideas.md` remain for the new direction.

## Current Public Surface

- One static Chinese-first reset homepage.
- Positioning: `把散乱的生意资料，整理成可以使用的系统。`
- Focus areas: customer enquiries, sales information, and follow-up actions.
- No forms, accounts, AI demo, pricing, testimonials, directory search, or provider data.
- The reset homepage is local-only until Wei Nee separately approves deployment.

## External Systems

This reset did not change or delete data in:

- Google Sheets
- Google Apps Script deployments
- Vercel projects or production deployment
- DNS or business email
- Search Console or indexing tools
- Facebook or other social accounts

These systems must be reviewed separately if the reset is later deployed publicly.

## Next Product Decision

Before building the full product, validate one specific Business Sales Kit buyer and problem:

1. Identify a real Malaysian small business whose customer information is scattered.
2. Gather the actual service, pricing, FAQ, proof, quotation, and follow-up inputs.
3. Produce one complete kit manually and observe whether it reduces repeated explanation or missed follow-up.
4. Only then decide which parts deserve a reusable workflow, paid package, or software layer.

## Personal Website Boundary

Wei Nee's personal professional website is a separate project and will use a separate domain. It will not be hosted under SMEs.MY or share this repository's identity, content, or deployment.

## Local Verification

```powershell
node --test tests/reset-site.test.mjs
python -m http.server 4173
```

The current work is prepared on an isolated local branch. Do not push or deploy without Wei Nee's confirmation.
