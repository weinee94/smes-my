# smes.my

Independent Malaysia SME supplier, contractor, and proper provider directory.

## MVP scope

- SEO-first homepage
- Brand assets based on the existing 商記 SMEs.MY identity
- Launch service categories
- Example provider listings
- Quote request form
- Provider onboarding form
- Provider review, enquiry routing, and legal/support pages

## Deployment

This is a static site. Deploy the folder to Vercel or any static host.

Corporate email and official identity can remain on `smes.com.my`; the public directory should use `smes.my`.

## Lead Capture With Google Sheets

The current lead forms are wired to this Google Apps Script endpoint:

`https://script.google.com/macros/s/AKfycbw66TcCNpD1fXsv0YRV5j9hhzS0LPNd8ojxogAmqQzYkZt0qZkvzOD9aygpl1-xUtkRcw/exec`

Setup:

1. Create a Google Sheet named `smes.my Leads`.
2. In the Sheet, open `Extensions` -> `Apps Script`.
3. Paste the contents of `docs/google-apps-script.js` into the Apps Script editor.
4. Change `NOTIFY_EMAIL` if needed.
5. Click `Deploy` -> `New deployment`.
6. Choose type `Web app`.
7. Set `Execute as` to `Me`.
8. Set `Who has access` to `Anyone`.
9. Deploy, authorize, then copy the Web App URL ending in `/exec`.
10. If you redeploy Apps Script and receive a new Web App URL, replace both form actions in `index.html` with the new URL.

The script writes quote requests into `Quote Requests`, provider onboarding requests into
`Provider Listings`, and any unknown form type into `Other Submissions`. It also sends an
email notification for each submission.

Operational fields now support the matching loop:

- Quote requests include service, location, business type, contact, budget / urgency, details, lead status, and matched providers.
- Provider listings include company, main service, location, website / profile, languages, contact, service scope, and review status.
- Default statuses are added by Apps Script as `new`; use the Sheet to update follow-up states such as `reviewed`, `matched`, `provider contacted`, `replied`, or `closed`.
