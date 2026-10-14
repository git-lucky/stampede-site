# Urban Safari — Marketing Site

Static marketing site for Urban Safari, built with [Astro](https://astro.build) and deployed to Cloudflare Pages.

## Stack

- **Framework:** Astro 5 (static output, no SSR)
- **Styling:** Vanilla CSS. `src/styles/site.css` holds the design tokens and the homepage and shared parts; `src/styles/pages.css` holds the supporting pages.
- **Fonts:** Overpass Black (headings) and Geologica (body), self-hosted in `public/fonts/`
- **Hosting:** Cloudflare Pages

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # builds to ./dist
pnpm preview      # serves the built site
```

## Project layout

```
src/
  layouts/Base.astro        # HTML shell, SEO meta, header + footer
  components/               # SiteHeader, SiteFooter, Planner, ExpeditionOptions, LegalPage, Icon
    home/                   # Homepage sections, the practice hunt and the Meet your guide band
  content/                  # Cities, support FAQ, practice challenges, contact details
  pages/                    # Routes: /, /plan, /support, /cities, /cities/[slug], /privacy, /terms, /poster, /404
  scripts/                  # Client scripts: header menu, planner and preview-card highlight
  styles/                   # site.css + pages.css
public/
  img/                      # Approved mascots and photos (web sizes), pattern tiles, poster QR
  fonts/                    # Overpass, Geologica
functions/_middleware.js    # Reveals the WooTown recap invitation on /?recap=wootown
```

## Design system quick reference

The Hybrid 04 design, with Tim's Expedition Passport palette and type.

- Palette: blue `#174F6B`, deep blue `#0E3447`, gold buttons `#E9BE4F`, foil gold text `#E4C77C`, pale paper `#E7EEE9`, light print `#F7F9F7` (tokens in `:root` of `site.css`).
- Rounded squares are the motif (checkpoints, step numbers, icon tiles). Paper sections use the wave pattern; blue "leather" sections add grain.
- Header: the game's geometric elephant left of "Urban Safari". Footer: the gold-and-green Safari Warrior coin and "See you out there."

## Behavior notes

- **Planner** (homepage `#plan` and `/plan/`): four required answers move Atlas along the route. Submitting opens an email draft to mike@urbansafari.app prefilled with the answers; nothing is sent until the visitor sends it. `/plan/` accepts `?city=`, `?style=` (or the older `?package=` slug) and `?occasion=`.
- **Game preview** (homepage): one phone list in the Expedition Passport look, sharing the four detail cards’ titles, pictures, points, kind icons and order. Rows and detail cards are buttons: activating either briefly highlights its counterpart with a rounded gold glow, without scrolling, changing the URL or moving focus. Enter and Space work too; reduced motion uses a steady ring. Without JavaScript the preview stays readable and the buttons do nothing. The four example challenge cards are lossless captures of the real Passport redesign detail screens (PR #186), including each kind’s actual answer controls and bottom action. They use static pictures with descriptive alt text. Mike’s website-only change replaces each picture’s points number with the kind icon on a translucent dark disc; the ring keeps its original size and position. On desktop the phone and four full cards share one viewport at 1440×900 and 1280×800. Phones keep the stacked layout; activation still never scrolls. There are no game dialogs, uploads, answer controls, stamps or reset actions. Content lives in `src/content/practice.ts`; capture provenance is in `docs/passport-detail-captures.md`.
- **City pages** are generated from `src/content/cities.ts` at `/cities/<slug>/`.

## Atlas the mascot

Only the approved images in `public/img/` ship. `MASCOT_SPEC.md` and `MASCOT_PROMPTS.md` are the art-direction notes.

## Deploying to Cloudflare Pages

See `DEPLOY.md`.
