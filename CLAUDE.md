# CLAUDE.md, Le Booth site

Marketing site for **Le Booth**, a San Diego photo booth company (founded 2025 by Leonardo Amezcua). Three services: photo booth rentals (weddings first, also corporate/private events), custom built booths, and free venue installs on a profit share.

Stack: **Next.js App Router, TypeScript, React 19, plain CSS** (`app/globals.css`, no Tailwind), **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) for storing form submissions. No other dependencies. Keep it that way unless there's a clear reason.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass with zero type errors before any push
```

## Structure

- `app/page.tsx`: home (server component). Chrome lives in `components/HomeShell.tsx` (client).
- `app/about/page.tsx`, `app/quote/page.tsx`: inner pages.
- `app/api/quote/route.ts`: receives the quote form. Saves to Supabase `quote_requests` if the `NEXT_PUBLIC_SUPABASE_*` vars are set, emails via Resend if `RESEND_API_KEY` is set, POSTs JSON to `QUOTE_WEBHOOK_URL` if set, otherwise logs.
- `lib/supabase/server.ts`: server-side Supabase client (publishable key, no auth). Supabase project "Le Booth Website" (`roaysljhksexcadthdfj`).
- **Supabase security model (no auth yet):** `quote_requests` has RLS on; the public `anon` role may only INSERT (no select/update/delete), because rows hold customer PII and the publishable key is public. Length/email checks live in the table itself since anyone can call the API with that key. Read leads in the Supabase dashboard. Don't add a public SELECT policy.
- `lib/site.ts`: contact info + LocalBusiness JSON-LD. `lib/faqs.ts`: FAQ copy + FAQPage JSON-LD.
- `components/`: client components are only the interactive bits (theme, eyes, gallery, FAQ, video, form, reveal, progress).
- `design-reference/`: the approved HTML prototypes the site was built from. Visual source of truth. Their image paths point at `assets/` and won't resolve here; the same images live in `public/images`.

## Theming

Colors are CSS variables keyed on `[data-theme="night"|"day"]` at the top of `globals.css`. Any element can set `data-theme` to re-theme its subtree (the quote form panel is night inside a day page). `.invert` flips a surface to the opposite palette. Don't hardcode colors in components; add or reuse a variable.

Palette: brown `#2A211A`, deep brown `#221A14`, card `#332921`, cream `#F7F1E6`, paper `#FDF3E3`, tan hover `#C9B79E`. About page is pure black (`.about-theme`).

Fonts: Archivo (body), Archivo Black (headings, buttons, nav), Instrument Serif (accents, italics) from `next/font/google`. Licensed TAY faces in `app/fonts`: Danny Lasso (LE BOOTH wordmark only), Amaya (SAN DIEGO under the wordmark only), Misprint ("ojos" only). Don't spread the TAY fonts elsewhere; the owner tried that and reverted it.

## Owner preferences (settled, don't relitigate)

- **No pricing anywhere.** Everything routes to the quote form; the owner replies with a HoneyBook link.
- **No em dashes in site copy.** Use commas, colons, or full stops.
- **No invented facts.** No fake testimonials, stats, venue names, or phone numbers. Only offer what's real: enclosed booths only, no road case, no props/backdrop/scrapbook.
- Weddings lead, but businesses (buying booths, profit share) must stay clearly visible.
- Home hero stays clean: wordmark over the photo, no centered CTA button, no centered logo.
- Top-left logo "twitches" between 3 positions (`lb-twitch`, 1.95s, `steps(3)`). Keep it subtle.
- The O's in the BOOK button are eyes that follow the cursor. The owner's artist name is **ojos** (Spanish for eyes). It's hidden on purpose: the About page signature, 5 taps on the big asterisk, and a comment in the DOM. Keep it subtle; don't add it anywhere else unless asked.
- Day/night toggle is a small sunrise icon. Crossfade is deliberately slow (2.6s) and only runs while switching.
- Video is always silent, loops, never shows controls.

## Contact

info@le-booth.com · (619) 438-0163 · serves San Diego and Los Angeles, further for a fee.
