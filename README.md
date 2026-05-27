# smes.my

Independent Malaysia SME services directory and lead platform.

## MVP scope

- SEO-first homepage
- Brand assets based on the existing 商記 SMEs.MY identity
- Launch service categories
- Example provider listings
- Quote request form
- Provider onboarding form
- Pricing model and 30-day execution plan

## Deployment

This is a static site. Deploy the folder to Vercel or any static host.

Corporate email and official identity can remain on `smes.com.my`; the public directory should use `smes.my`.

## Lead Capture With Google Sheets

The current lead forms are wired to this Google Apps Script endpoint:

`https://script.google.com/macros/s/AKfycbyhmVYdJH6wudAYJ42yHcgLG21yODRuXqWFOVzaApE27z_XVpu2lB-OVYfm-To46cFDyg/exec`

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

The script writes submissions into a `Leads` sheet and sends an email notification.
