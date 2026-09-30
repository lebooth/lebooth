# Le Booth, le-booth.com

Next.js (App Router, TypeScript). Three pages: `/`, `/about`, `/quote`, plus a `/api/quote` endpoint that delivers form leads.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

Requires Node 18.18+ (Node 20 recommended).

## Deploy (Vercel, easiest)

1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo → Deploy.
3. Project → Settings → Domains → add `le-booth.com` and follow the DNS steps.
4. Add the environment variables below, then redeploy.

## Getting quote requests by email

Without setup, submissions are only printed to the server log. To receive them:

1. Make a free account at resend.com and verify `le-booth.com` (they give you DNS records to add).
2. Create an API key.
3. In Vercel → Settings → Environment Variables, add:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | your key |
| `QUOTE_TO_EMAIL` | `info@le-booth.com` |
| `QUOTE_FROM_EMAIL` | `Le Booth <quotes@le-booth.com>` |

Each lead arrives as an email with reply-to set to the client, so you can hit Reply and paste your HoneyBook link.

Optional: `QUOTE_WEBHOOK_URL` also posts each lead as JSON to Zapier or Make, if you want to log leads in a sheet or push them somewhere else.

See `.env.example`.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, founder, business info for Google | `lib/site.ts` |
| FAQ questions and answers | `lib/faqs.ts` |
| Home page copy, packages, gallery photos | `app/page.tsx` |
| Hide the referral section | `SHOW_REFERRAL` at the top of `app/page.tsx` |
| About page and founder story | `app/about/page.tsx` |
| Quote form steps and options | `components/QuoteForm.tsx` |
| Colors, spacing, day and night themes | `app/globals.css` (theme variables at the top) |
| Images and video | `public/images`, `public/media` |
| Fonts (TAY Danny Lasso, Amaya, Misprint) | `app/fonts` |

**Adding gallery photos:** drop the file in `public/images/` and add an entry to the `gallery` list in `app/page.tsx` with its pixel width and height.

**Founder portrait:** the About page has a placeholder. Swap it for `<Image>` using the commented line in `app/about/page.tsx`.

## Fonts

The TAY fonts are licensed. Make sure your license covers web use before going live. Archivo, Archivo Black, and Instrument Serif are loaded from Google Fonts and self-hosted automatically by Next.js.

## Hidden details

- The O's in the BOOK button follow the cursor.
- Tapping the big asterisk on /about five times reveals "ojos".
- There's a note for anyone who inspects the page source.
