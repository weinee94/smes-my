# Money architecture v1 — 2026-09-16

Scope authorized in the current request: two homepage paths; restore the local-only Project Brief Generator; Accounting/Bookkeeping and Company Secretary lead generation; no consulting-led positioning or brand redesign; future digital products are a small resource entry only.

Audit: production matches origin/main 8f0a6bd with successful Vercel status. Tool routes redirect to /request. The form treats HTTP 200 as persistence, loses consent and has no receipt. Existing Apps Script reports complete-loop-v3; Quote Requests headers are misaligned with data and contain spam. Local main is 25 commits behind and dirty, so preserve it and implement in an ignored worktree. Baseline: 9/10 tests pass; positioning document is stale.

Design: keep the existing Astro static site and existing Google spreadsheet. Restore self-service tools. Submit validated requests to Apps Script with a stable UUID, consent version and bounded source tags. Persist before acknowledging success. Use a separate Service Leads v1 tab in the same spreadsheet, preserving old data. Retry deduplication under a lock. Notification errors must never erase a saved lead or cause duplicate submissions. A receipt page shows the confirmed reference with no personal data in the URL. No automatic provider forwarding.

Revenue: provider-paid qualified enquiry or agreed referral outcome, conditional on an actual provider agreement. Track qualification, introduction, quote, outcome and fee/payment separately. Do not invent partners, prices, response time or earnings.
