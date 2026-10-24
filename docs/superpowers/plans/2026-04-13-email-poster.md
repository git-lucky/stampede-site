# Email Poster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/poster` page — a print-to-PDF promotional flyer with QR code and demo URL, matching the Stampede brand system.

**Architecture:** Minimal `Poster.astro` layout (no nav/footer, just global CSS + fonts) used by a single `poster.astro` page. Static asset (QR image) moved from `src/components/emailPoster/` to `public/emailPoster/`. All print styles scoped inside the page's `<style>` block with `@media print` as the primary output target.

**Tech Stack:** Astro 5.7, vanilla CSS (design tokens from `src/styles/global.css`), existing `Mascot.astro` component, FontShare (Cabinet Grotesk, Satoshi, JetBrains Mono)

---

### Task 1: Move QR code asset to public/

**Files:**
- Move: `src/components/emailPoster/https:::hunt.urbansafari.app:join:demo123.png` → `public/emailPoster/qr-demo.png`
- Remove: `src/components/emailPoster/` directory (now empty)

- [ ] **Step 1: Move the file**

```bash
mkdir -p public/emailPoster
mv "src/components/emailPoster/https:::hunt.urbansafari.app:join:demo123.png" public/emailPoster/qr-demo.png
rmdir src/components/emailPoster
```

- [ ] **Step 2: Verify the file is in place**

```bash
ls public/emailPoster/
```

Expected output: `qr-demo.png`

- [ ] **Step 3: Commit**

```bash
git add public/emailPoster/qr-demo.png
git add -u src/components/emailPoster/
git commit -m "move QR code asset to public/emailPoster/qr-demo.png"
```

---

### Task 2: Create Poster layout

**Files:**
- Create: `src/layouts/Poster.astro`

The layout must: load global CSS + fonts, set the page title, apply `grain` to `<body>`, and render `<slot />` with no nav or footer. The body background must be `var(--cream)` and must force background-color printing.

- [ ] **Step 1: Create `src/layouts/Poster.astro`**

```astro
---
import '@/styles/global.css';

interface Props {
  title?: string;
}

const { title = 'Try Stampede Free — Demo' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>{title}</title>
    <link rel="icon" href="/stampede-logo.png" />
    <link rel="preconnect" href="https://api.fontshare.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&f[]=satoshi@500,700&f[]=jetbrains-mono@500,700&display=swap"
    />
  </head>
  <body class="grain">
    <slot />

    <style>
      body {
        background: var(--cream);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--gutter);
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    </style>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Poster.astro
git commit -m "add Poster layout — no nav/footer, print color forced"
```

---

### Task 3: Create poster page with content and print styles

**Files:**
- Create: `src/pages/poster.astro`

The page renders the full flyer: logo → eyebrow → headline → subhead → Atlas mascot → QR card → demo URL → footer line. All styles are scoped. The `@media print` block is the primary target.

- [ ] **Step 1: Create `src/pages/poster.astro`**

```astro
---
import Poster from '@/layouts/Poster.astro';
import Mascot from '@/components/Mascot.astro';
---

<Poster>
  <div class="poster-wrap">

    <!-- Accent blob -->
    <div class="blob" aria-hidden="true"></div>

    <!-- Logo -->
    <img
      class="logo rise rise-1"
      src="/stampede-logo.png"
      alt="Stampede"
      width="140"
      height="140"
    />

    <!-- Eyebrow -->
    <p class="eyebrow rise rise-2">Demo Experience</p>

    <!-- Headline -->
    <h1 class="headline rise rise-3">Try Stampede Free</h1>

    <!-- Subhead -->
    <p class="subhead rise rise-4">
      City-wide team building your crew will actually talk about.
    </p>

    <!-- Mascot -->
    <div class="mascot-wrap rise rise-5">
      <Mascot pose="atlas-celebrate" size="lg" drift />
    </div>

    <!-- QR code card -->
    <div class="qr-card rise rise-5">
      <img
        src="/emailPoster/qr-demo.png"
        alt="QR code — scan to join the Stampede demo"
        width="220"
        height="220"
        class="qr-img"
      />
    </div>

    <!-- Demo URL -->
    <p class="demo-url">hunt.urbansafari.app/join/demo123</p>

    <!-- Footer note -->
    <p class="poster-footer">No app download required · Works on any device</p>

  </div>
</Poster>

<style>
  /* ── wrapper ── */
  .poster-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    width: min(100%, 520px);
    padding: 2.5rem 2rem 2rem;
    background: var(--cream);
  }

  /* ── accent blob ── */
  .blob {
    position: absolute;
    top: 30%;
    left: 50%;
    translate: -50% -50%;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--gold-soft) 0%, transparent 70%);
    opacity: 0.45;
    pointer-events: none;
    z-index: 0;
  }

  /* ── all children above blob ── */
  .poster-wrap > * { position: relative; z-index: 1; }

  /* ── logo ── */
  .logo {
    width: 100px;
    height: auto;
    object-fit: contain;
  }

  /* ── eyebrow (inherits global .eyebrow) ── */
  .eyebrow { margin-block: 0; }

  /* ── headline ── */
  .headline {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: var(--step-4);
    color: var(--forest);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-block: 0;
    max-width: 14ch;
  }

  /* ── subhead ── */
  .subhead {
    font-family: var(--font-body);
    font-size: var(--step-0);
    color: var(--forest-soft);
    line-height: 1.45;
    max-width: 36ch;
    margin-block: 0;
  }

  /* ── mascot ── */
  .mascot-wrap {
    margin-block: 0.25rem;
  }

  /* ── QR card ── */
  .qr-card {
    padding: 1rem;
    background: var(--paper);
    border: var(--stamp-border);
    border-radius: var(--radius-md);
    box-shadow: var(--stamp-shadow);
    display: inline-flex;
  }

  .qr-img {
    display: block;
    width: 220px;
    height: 220px;
    object-fit: contain;
  }

  /* ── demo URL ── */
  .demo-url {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--forest);
    letter-spacing: 0.02em;
    margin-block: 0;
  }

  /* ── footer note ── */
  .poster-footer {
    font-family: var(--font-body);
    font-size: 0.78rem;
    color: var(--forest-soft);
    margin-block: 0.5rem 0;
    opacity: 0.8;
  }

  /* ──────────────────────────────────────────────── */
  /*  PRINT STYLES — primary output target            */
  /* ──────────────────────────────────────────────── */
  @media print {
    @page {
      size: letter;
      margin: 0.5in;
    }

    /* Kill all animations */
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }

    /* Hide grain overlay */
    .grain::before { display: none !important; }

    /* Lock the layout to the printed page */
    body {
      display: block;
      padding: 0;
      background: var(--cream) !important;
    }

    .poster-wrap {
      width: 100%;
      max-width: none;
      padding: 0;
      gap: 0.75rem;
    }

    /* Use absolute pt units for reliable cross-browser print sizing */
    .headline {
      font-size: 36pt;
    }

    .subhead {
      font-size: 12pt;
    }

    .demo-url {
      font-size: 10pt;
    }

    .poster-footer {
      font-size: 9pt;
    }

    .logo {
      width: 80px;
    }

    /* Preserve box-shadow and border on QR card */
    .qr-card {
      border: 2.5px solid #0F2419 !important;
      box-shadow: 5px 5px 0 0 #0F2419 !important;
      background: #FFFDF7 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Preserve cream background */
    .poster-wrap,
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
```

- [ ] **Step 2: Start dev server and verify in browser**

```bash
npm run dev
```

Visit `http://localhost:3000/poster`

Expected: Cream page, logo at top, eyebrow, large green headline, subhead, Atlas elephant (celebrate pose, drifting), stamp-bordered QR code card, URL text in mono font, footer note.

- [ ] **Step 3: Verify print preview**

In Chrome/Safari: Cmd+P

Expected:
- One clean page (letter size)
- Cream background renders (not white)
- QR code clearly visible with border and shadow
- Headline readable at ~36pt
- URL `hunt.urbansafari.app/join/demo123` readable below QR code
- No nav/footer/browser chrome in output

- [ ] **Step 4: Commit**

```bash
git add src/pages/poster.astro
git commit -m "add /poster page — print-to-PDF demo flyer with QR code"
```

---

## Verification Summary

1. `npm run dev` → `http://localhost:3000/poster` — page renders correctly
2. QR image loads from `/emailPoster/qr-demo.png`
3. Atlas `atlas-celebrate` pose renders (not placeholder)
4. Stamp border and shadow on QR card
5. Cmd+P print preview → one letter-sized page, cream bg prints, all text legible
6. Save as PDF → open file, confirm it looks like a polished flyer
