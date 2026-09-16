# Archived lead operations — Accounting／Company Secretary test

This is the historical 2026-09-16 service-referral workflow. It is not the current SMEs.MY public intake. Current operation is in [TALENT_INTAKE_OPERATIONS.md](TALENT_INTAKE_OPERATIONS.md). Do not reuse the old submissions or provider fields for talent/marketing outreach.

## Commercial test

The revenue hypothesis is a provider-paid qualified enquiry or agreed successful referral. No provider, fee, conversion or income is established by launching the website. Do not sell a broad contact list or promise quotations.

Start with one Accounting/Bookkeeping partner and one Company Secretary partner. Agree service scope, geography, acceptable client type, what constitutes a qualified enquiry, any fee trigger, rejected/duplicate lead handling and payment timing before a chargeable introduction. Obtain actual professional/firm credentials where appropriate; record evidence, never invent a verified badge. Visitor chooses whether to accept a quote.

Workflow consulting is not the primary offer. Digital products remain a small future resource entry until demand is observed. No checkout, catalogue expansion or consultancy packaging is required now.

## System of record

Existing private spreadsheet: https://docs.google.com/spreadsheets/d/1PIxhw0LVdEjQJa5nTdXzcM10aQsYUV7UeQU9aSOfShE/edit

New submissions use `Service Leads v1`. Old `Quote Requests` and `Provider Listings` are retained without migration: the former has an eight-column header over twelve-column records, so do not treat those header labels as a reliable schema. The new tab is not an automatic qualification decision.

A: created; B: reference; C:G: request; H:I: consent version/time; J: page without query; K: entry source; L:N: UTM attribution; O: referrer origin; P: status; Q: provider; R: next action; S: follow-up date; T: outcome; U: agreed fee; V: money received; W: notification; X: updated at. Keep these headers and column order stable.

## Daily handling when enquiries arrive

1. Review `new` entries and notification `pending` or `failed` entries. Email notification goes to `weineetan@smes.com.my` and contains only the reference and private Sheet link. `sent` means the mail service accepted sending, not proof of inbox delivery.
2. Set obvious spam to `spam`, synthetic checks to `test`. Exclude both from commercial counts.
3. Set incomplete but relevant requests to `needs_info`; record one concrete next action and follow-up date. Only contact the visitor for the submitted request.
4. Use `qualified` only when the contact, category, scope and provider relevance have been checked. Set `no_match` if no suitable provider is available; do not leave the visitor expecting a guaranteed match.
5. Before introduction, check consent and the provider arrangement; record the provider and move to `introduced`. No automatic forwarding is enabled.
6. Track `quoted`, then `won` / `lost` with a short factual outcome. An introduction is not a sale. An agreed fee is not received money. Fill U only when agreed, V only when actually received.
7. On every manual status change, update R/S/X. Review or delete personal data when no longer needed for the request; honour deletion requests sent to the published email. Do not export raw leads to the public repository.

## Reliability and boundaries

- Backend validates category/contact/consent, rejects link/HTML spam and honeypot entries, imposes basic per-contact rate friction, escapes spreadsheet formula prefixes, and locks duplicate detection plus append.
- Browser sends a stable random ID for retries of the same request. Success requires `{ok:true,saved:true,lead_id}`; HTTP 200 alone is insufficient. Save errors retain the form; notification failure retains the saved lead and is visible in W.
- Confirmed receipt is kept only in session storage. Personal form fields are not stored there. A hashed payload fingerprint is kept to distinguish a changed request from a retry.
- These checks reduce simple spam; they are not strong bot protection. If abuse resumes, add managed rate/bot protection only with observed need.
- Apps Script/Google outages and mail quotas remain external dependencies. Check the private sheet even when no notification arrives. No provider response time is promised.
- No automatic lead distribution, mass outreach, paid ads or fee collection is enabled.

## Release verification

Run all local checks. Verify the Apps Script public health version. On production, submit a clearly labelled synthetic request using `example.com`; compare reference, consent, source, state and notification in the private sheet. Mark it `test`. Repeat its request ID and confirm no additional row or email. Keep the old deployment version available for rollback. Never restore the unrelated editor draft as a live lead deployment.
