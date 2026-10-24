# Email Poster — Design Spec
**Date:** 2026-04-13

## Context

Stampede needs a promotional flyer to promote the demo experience at `hunt.urbansafari.app/join/demo123`. The flyer will be **exported as a PDF and sent as an email attachment**. The workflow: user visits `/poster` → browser print (Cmd+P) → Save as PDF → attach to email. Print fidelity is the top priority; the web experience is secondary. The flyer contains a QR code and the demo URL written out below it so recipients can scan or type the link.

---

## Outcome

A new page at `/poster` that renders as a single-column, centered promotional flyer. No nav or footer. Designed to look great when printed to PDF at letter size (8.5×11in). Cream background, brand fonts, Atlas mascot, QR code, and demo URL. The `@media print` stylesheet is the primary output target.

---

## Assets

| Current location | New location | Notes |
|---|---|---|
| `src/components/emailPoster/https:::hunt.urbansafari.app:join:demo123.png` | `public/emailPoster/qr-demo.png` | Rename for cleanliness; public/ is correct for static assets in Astro |

---

## Layout (top to bottom)

1. **Logo** — `stampede-logo.png`, centered, ~140px wide
2. **Eyebrow** — `DEMO EXPERIENCE` in `.eyebrow` style (JetBrains Mono, moss green, small caps)
3. **Headline** — `Try Stampede Free` — Cabinet Grotesk 800, `--forest`, ~`--step-4`
4. **Subhead** — `City-wide team building your crew will actually talk about.` — Satoshi, `--forest-soft`, `--step-0`
5. **Atlas mascot** — `atlas-celebrate` pose, `lg` size (240px), centered, `drift` animation
6. **QR code card** — stamp-bordered card (`--stamp-border`, `--stamp-shadow`), centered, QR image ~220px square, white background inside card
7. **Demo URL** — `hunt.urbansafari.app/join/demo123` in JetBrains Mono, `--forest`, `0.875rem` (smaller than `--step-0`), centered below QR card
8. **Footer line** — `No app download required · Works on any device` — Satoshi, `--forest-soft`, small, centered

No CTA button — the QR code and written URL are the only call to action. This is a print artifact, not a web page.

---

## Visual Treatment

- **Background:** `--cream` (`#FAF5E9`) with `.grain` overlay
- **Accent blob:** One subtle radial gold/sunset gradient behind the mascot for warmth (matches hero pattern)
- **QR card:** White interior (`--paper`), `--stamp-border` (2.5px ink), `--stamp-shadow` (5px offset), `--radius-md` corners
- **Animations:** Atlas drifts (`drift` keyframe); entrance elements use `.rise-1`/`.rise-2` stagger. All animations respect `prefers-reduced-motion`.
- **Print styles (`@media print`) — primary target:**
  - `@page { size: letter; margin: 0.5in; }`
  - Remove all animations and transitions
  - Force background colors to print (`-webkit-print-color-adjust: exact; print-color-adjust: exact`) so cream, gold, and forest colors render
  - Stamp shadows and borders preserved
  - Grain overlay hidden (doesn't print well)
  - Font sizes use absolute units (`pt`) in print stylesheet so they're predictable across browsers

---

## Layout File

New minimal layout: `src/layouts/Poster.astro`
- Loads global CSS (fonts, tokens, grain) 
- No Nav, no Footer
- Sets `<title>Try Stampede Free — Demo`
- `<body>` has `background: var(--cream)` and centers the `.poster-wrap` column

New page: `src/pages/poster.astro`
- Uses `Poster.astro` layout
- Imports `Mascot.astro` component
- All styles scoped in `<style>`

---

## Mascot Component Usage

```astro
<Mascot pose="atlas-celebrate" size="lg" drift />
```

(`drift` is a boolean prop — confirmed in `src/components/Mascot.astro:17`)

---

## Verification

1. `npm run dev` — visit `http://localhost:3000/poster`
2. Confirm QR image loads at correct path
3. Confirm all brand fonts render (Cabinet Grotesk headline, JetBrains Mono URL)
4. Confirm Atlas mascot appears in celebrate pose
5. Confirm stamp border on QR card
6. **Browser print preview (primary check):** Cmd+P → verify one clean page, cream background prints, no nav/footer chrome, QR code and URL clearly legible, fonts correct
7. Save as PDF and confirm output looks like a polished flyer
