# SMEs.MY

SMEs.MY is being rebuilt as a practical operating lab for Malaysian small businesses.

The current public reset page introduces the new direction: turning scattered customer enquiries, sales information, prices, FAQs, proof, and follow-up work into clearer reusable systems.

## Current scope

- Static reset homepage
- Chinese-first positioning with necessary English business terms
- No provider directory, matching, listing claim, lead form, AI demo, or account system
- No personal Wei Nee website content

## Local preview

From the repository root:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Verification

```powershell
node --test tests/reset-site.test.mjs
```

## Deployment

The repository remains configured as a static Vercel site. Deployment is not part of the reset unless Wei Nee confirms it separately.
