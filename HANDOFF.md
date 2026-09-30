# Handoff to Claude Code: Le Booth site

## Overview

The site is already written as a Next.js project (this folder). It was built in a design tool that **could not run commands**, so it has **never been installed, built, or run**. Your job is to get it running, fix anything that breaks, put it under git, and help the owner deploy it.

The owner is a small business owner, not a developer. Explain what you're doing in plain language, and ask before anything that touches their accounts (GitHub, Vercel, Resend, DNS).

Read `CLAUDE.md` first. It covers the stack, structure, theming, and the owner's settled preferences.

## Fidelity

The HTML prototypes in `design-reference/` are **high fidelity and approved**. The Next.js pages should match them in layout, copy, colors, type, spacing, and interactions. Where the two differ, the prototype wins, except for these intentional upgrades in the Next.js build:
- The quote form actually submits to `/api/quote` (the prototype only faked it).
- FAQ items are real `<button>`s with `aria-expanded`, the compact nav uses `inert` while hidden, and form inputs have labels.
- Day/night choice is remembered in `localStorage`.
- `sitemap.xml`, `robots.txt`, and per-page metadata come from Next.js.

To view a prototype, open it in a browser from inside `design-reference/`. It loads `support.js` from the same folder. Images won't resolve (they point at `assets/`); the same files are in `public/images`.

## Tasks, in order

### 1. Install and build
```bash
npm install
npm run build
```
Fix every type or build error. Likely spots, since none of this has been compiled yet:
- `inert={!navShown}` in `components/HomeShell.tsx`: React 19 types accept a boolean. If your installed types disagree, adjust rather than remove it.
- `next/font/local` paths in `app/layout.tsx` are relative to that file (`./fonts/...`).
- `package.json` uses caret ranges (`next ^15.3.0`, `react ^19.1.0`). If the latest Next.js major has changed APIs, pin to the newest 15.x rather than rewriting.

Don't add dependencies (Tailwind, UI kits, form libraries) to fix things.

### 2. Run it and compare against the prototypes
`npm run dev`, then check `/`, `/about`, `/quote` side by side with `design-reference/`. Verify:
- **Home hero:** announcement bar, transparent header over the photo, LE ✳ BOOTH wordmark in TAY Danny Lasso with SAN DIEGO in TAY Amaya under the right edge.
- **Top-left logo** twitches between 3 positions.
- **BOOK button:** pupils follow the cursor.
- **Sunrise toggle** switches night and day with a slow 2.6s crossfade. Check every section in **both** themes, especially:
  - The "popular" package card and both callout bands, which invert.
  - The bottom CTA band, which is always paper colored.
  - The footer.
- **Compact nav** slides in after scrolling past the hero. Section links hide under 720px.
- **Scroll reveal:** blocks fade up as they enter the viewport. Nothing should stay invisible.
- **Scroll progress bar** is visible in both themes.
- **Video** autoplays muted and loops, and has no controls.
- **Gallery** works with mouse drag, arrow buttons, and keyboard arrows, and snaps to each photo.
- **About page:** pure black background. The big asterisk rotates on scroll, and five taps on it fade in "ojos" in Misprint.
- **Quote page:**
  - The intent chips change the labels and options in steps 3 and 4.
  - Name and email are validated: a missing name focuses the name field, and a bad email focuses the email field.
  - Submitting shows the "Got it, thanks." confirmation with a recap.
  - Without env vars set, the lead is logged in the terminal.
- **Responsive:** at 375px wide, nothing overflows horizontally and all tap targets are at least 44px.

Fix discrepancies in `globals.css` or the page files. Keep colors in the theme variables.

### 3. Git
```bash
git init
git add .
git commit -m "Initial commit: Le Booth site (Next.js)"
git branch -M main
```
Confirm `.gitignore` excludes `node_modules`, `.next`, and `.env*`. Never commit keys.

Ask the owner before creating the GitHub repo. With the `gh` CLI installed:
```bash
gh repo create le-booth --private --source=. --push
```
Otherwise, walk them through creating an empty repo on github.com, then run `git remote add origin …` and `git push -u origin main`.

### 4. Deploy (with the owner)
Vercel is the intended host:
1. Import the GitHub repo on vercel.com.
2. Add the domain `le-booth.com` and walk the owner through the DNS records Vercel shows. Their current site is on another builder, so warn them that changing DNS takes the old site down.

### 5. Lead email (with the owner)
1. Create a Resend account at resend.com.
2. Verify `le-booth.com` in Resend (this means adding DNS records).
3. In Vercel, set the environment variables listed in `.env.example`:
   - `RESEND_API_KEY`
   - `QUOTE_TO_EMAIL=info@le-booth.com`
   - `QUOTE_FROM_EMAIL=Le Booth <quotes@le-booth.com>`
4. Redeploy, submit a test lead, and confirm it arrives with reply-to set to the client's address. The owner replies with their HoneyBook link.

## Known gaps (not bugs, need the owner)

- **Founder portrait** on /about is a striped placeholder. There's a commented `<Image>` line in `app/about/page.tsx`, ready to swap in once the owner has a photo.
- **Package lengths** ("3 hours", "4+ hours") were never confirmed by the owner. Check with them.
- **TAY font license:** confirm with the owner that it covers web use before launch.
- **Gallery** has 4 photos. To add more, put the file in `public/images` and add an entry with its real pixel width and height to the `gallery` array in `app/page.tsx`.

## Files

| Path | What |
|---|---|
| `CLAUDE.md` | Project context and owner preferences |
| `README.md` | Owner-facing setup and editing guide |
| `app/` | Pages, layout, global CSS, API route, sitemap, robots, favicon, fonts |
| `components/` | Shared UI and client interactivity |
| `lib/` | Site info, FAQ content, structured data |
| `public/images`, `public/media` | Photos, logo, video |
| `design-reference/` | Approved HTML prototypes (Home, About Us, Get a Quote) |
