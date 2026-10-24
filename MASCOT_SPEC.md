# Atlas — Mascot Spec

Atlas is the Stampede elephant. A cute, round, bipedal little expedition buddy who shows up across the site in different poses, each tied to a specific moment in the customer journey. Inspiration reference: the way PostHog uses their hedgehog — a recurring cast member, not wallpaper.

This doc is the source of truth for every Atlas pose the site expects. The site already renders placeholders (dashed-circle boxes with the pose slug baked in). When real illustrations are ready, drop a file at `website/public/mascot/{slug}.svg` (or `.png`) and update `src/components/Mascot.astro` to swap the placeholder for an `<img>` tag.

**Generating the art:** copy-paste-ready Nano Banana Pro prompts for each pose live in `MASCOT_PROMPTS.md`. Use those with a reference image of Atlas to get consistent output across all 13 poses.

## Style guide

The canonical reference for Atlas's look is `public/mascot/atlas-cartographer.png` — every other pose should match its proportions, palette, and render style.

- **Character:** a cute bipedal cartoon elephant — Atlas stands upright on two short legs in every default pose, not on all fours. Chibi proportions: oversized round head, round belly, short stubby arms/legs, a single expressive trunk used like a hand, small pointed tail with a tiny tuft.
- **Face:** big round expressive eyes with visible white sparkle catchlights (no small bead eyes), warm open-mouth smile with a small pink tongue usually visible, optional subtle cheek blush.
- **Ears:** large, leaf-shaped, with a dusty-rose pink inner fill. Ears are the primary expression tool — one up = curious, both forward = excited, one drooped = unsure.
- **Body surface:** smooth — **no geometric, mandala, lattice, or patterned textures anywhere on the body or ears**. That direction belonged to the old branding and is retired. The body reads as solid cell-shaded color.
- **Body color:** a gentle cool blend — mint-teal (`#8CC9C4`) on head and upper back, sky-blue (`#A3BDD9`) through the middle, lavender (`#A89BCC`) on the lower body, legs, and trunk tip. Cool purple (`#7B6FA3`) is used sparingly as the shadow tone. Belly reads slightly cooler/paler than the body. No hard bands — the transition is a soft blend.
- **Render:** soft cartoon illustration with gentle two-tone cell shading (one base + one slightly darker cool shadow tone per form), plus small cool highlights on top of head and shoulders. Not flat-only, not 3D, not photorealistic, not anime.
- **Outline:** clean deep plum-ink outline (~1.5–2px equivalent) in `#2A2239`. Consistent but not a thick stamp.
- **Shadow:** one soft, slightly offset drop shadow under the figure (4px right + 4px down, lightly blurred, cool dark neutral).
- **Props:** rendered with the same outline weight as the body, same cell-shading treatment. Brand-palette accents (gold, forest, sunset, moss, cream, sand) so Atlas stays visually tied to the site.
- **Whitespace:** each pose is composed to fit within a square aspect ratio with breathing room around the figure. The site crops to circle/square frames — we don't want props clipped.
- **Keep them flexible:** every pose should read at 48×48 px (nav/footer) all the way up to 500×500 px (hero).

Avoid: four-legged stances, small bead eyes, mandala/geometric body patterns, hard color bands, over-rendered 3D, airbrush gradients, stock mascot clichés (thumbs-up, peace signs, winking, heart eyes).

---

## Outfit system

Atlas has a **tan safari jacket** as a signature piece — not a uniform worn on every pose, but a signal that he's in full Safari mode. Think of it the way PostHog uses accessories on their hedgehog: a recognizable identity layer that appears when it fits the moment.

The jacket is a short, slightly oversized field/safari jacket in sand `#EDDFC3` with a forest `#1F3A2B` outline and small flap chest pockets. Collar open, sleeves rolled to the elbow. Cell-shaded to match the body treatment.

**Wear the jacket:**

| Pose | Reason |
|------|--------|
| `atlas-cartographer` / `atlas-cartographer-outfit` | Hero anchor — this is the definitive dressed Atlas |
| `atlas-flag` | Guide/leader role fits the jacket |
| `atlas-clapper` | Director energy — jacket + beret works |
| `atlas-binoculars` | Explorer mode |
| `atlas-lost` | Jacket disheveled for humor — optional |

**No jacket:**

| Pose | Reason |
|------|--------|
| `atlas-running` | Movement reads cleaner without it |
| `atlas-trophy` | Celebratory — prop is the whole costume |
| `atlas-waving` | Footer/nav tiny size — detail disappears |
| `atlas-headset` | The headset IS the costume |
| `atlas-phone` | Casual, warm, everyday |
| `atlas-booking` | Functional — prop tells the story |
| `atlas-wrench` | Tool belt is the costume |
| `atlas-laughing-together` | Spontaneous warmth — no outfit needed |

---

## Pose catalogue

Every pose used on the site must appear here. If a new location needs a pose, add it to both this spec and to the site.

### `atlas-cartographer`
- **Where:** Home hero (hero art panel, size `xl`)
- **Description:** Atlas standing upright on two feet with a rolled-open city map held between both front feet. Head tilted down toward the map, one ear forward in curiosity. Small compass or pushpin detail on the map.
- **Prop:** folded/unfolding city map, optional compass icon.
- **Vibe:** "I know where we're going." Anchors the whole brand — if we ever need a single hero pose, this is it.
- **Aspect:** 1:1 (square), figure occupies ~85% vertical.

### `atlas-booking`
- **Where:** How It Works, step 01 (size `md`)
- **Description:** Atlas at slight three-quarter angle, holding a clipboard against belly with trunk curled around a pencil. One checkbox visibly ticked with a gold checkmark.
- **Prop:** clipboard + pencil.
- **Vibe:** "Got it — we'll handle it from here." Organized and competent.
- **Aspect:** 1:1.

### `atlas-wrench`
- **Where:** How It Works, step 02 (size `md`)
- **Description:** Atlas wearing a simple canvas tool belt across his chest, holding a comically oversized wrench in his trunk, tightening an invisible bolt mid-air. Small outlined sweat drop optional.
- **Prop:** tool belt + wrench.
- **Vibe:** "We're putting it together so you don't have to." Builder energy.
- **Aspect:** 1:1.

### `atlas-running`
- **Where:** How It Works, step 03 (size `md`)
- **Description:** Atlas mid-stride on two feet, one stubby leg forward, the other back. Trunk raised holding a compass like a relay baton. Motion lines behind, small puff of dust at rear foot.
- **Prop:** compass.
- **Vibe:** "The game is on." Kinetic, fun, urgent.
- **Aspect:** 1:1.

### `atlas-trophy`
- **Where:** How It Works, step 04 (size `md`)
- **Description:** Atlas standing bipedal with both stubby front arms raised, trunk coiled around a small stubby trophy lifted overhead. Confetti bits falling around in the brand palette.
- **Prop:** trophy + confetti.
- **Vibe:** "We did the thing." Triumphant, a little silly.
- **Aspect:** 1:1.

### `atlas-binoculars`
- **Where:** Tiers → **Scout** card (size `md`); also small appearance allowed in Outcomes if needed later.
- **Description:** Atlas standing fully upright, binoculars raised to his eyes with his trunk, leaning slightly forward in explorer mode. One ear up, full body visible.
- **Prop:** binoculars only — no rock.
- **Vibe:** "Let's see what's out there." Self-directed explorer.
- **Aspect:** 1:1.

### `atlas-headset`
- **Where:** Tiers → **Remote Expedition** card (size `md`).
- **Description:** Atlas seated on the ground, wearing an over-ear headset with visible boom mic. Subtle cool cream light on his face suggesting a video call. Trunk lowered, one stubby foot mid-gesture.
- **Prop:** headset + subtle screen glow.
- **Vibe:** "I'm right here with you, even from far away." Warm, guiding, connected.
- **Aspect:** 1:1.

### `atlas-flag`
- **Where:** Tiers → **Guided Expedition** card (size `md`); also appears in Outcomes row 1.
- **Description:** Atlas in a safari hat, standing bipedal and confidently, holding a small flag on a staff with his trunk. Flag is gold with a moss arrow.
- **Prop:** safari hat + flag.
- **Vibe:** "Follow me." Leader-of-the-pack energy, warm authority.
- **Aspect:** 1:1.

### `atlas-clapper`
- **Where:** Tiers → **Stampede** card (size `md`); also appears in Outcomes row 3.
- **Description:** Atlas in director-style posture with a film clapperboard held open in his trunk. Optional beret for flair.
- **Prop:** clapperboard (`"STAMPEDE — TAKE 1"`), optional beret.
- **Vibe:** "Roll camera, this is the big one." Cinematic, signature tier.
- **Aspect:** 1:1.

### `atlas-polaroid`
- **Where:** Photo mosaic section (size `lg`); Outcomes row 2.
- **Description:** Atlas peeking out from behind a large instant-photo/Polaroid frame, trunk pointing toward the photo. The photo itself is a blank placeholder — the real photo can be overlaid in art direction later.
- **Prop:** blank Polaroid frame.
- **Vibe:** "Look at this moment." Nostalgic, communal.
- **Aspect:** 1:1 with photo frame slightly offset.

### `atlas-celebrate`
- **Where:** Outcomes row 3 (size `lg`)
- **Description:** Atlas mid-celebration — arms raised, trunk curled up, big grin, confetti falling. The "you nailed it" moment.
- **Prop:** confetti in brand palette.
- **Vibe:** "You look like a genius right now." Pure win energy.
- **Aspect:** 1:1.
- **Outfit:** No jacket — celebratory, spontaneous.

### `atlas-laughing-together`
- **Where:** Outcomes row 2 (size `lg`)
- **Description:** Two Atlas figures standing bipedal side by side, both mid-laugh, leaning slightly toward each other. A small cluster of confetti floats above. No props.
- **Prop:** small confetti burst in gold and sunset only.
- **Vibe:** "This is the connection you actually came for." Genuine, warm, the payoff moment.
- **Aspect:** 1:1 — both figures scaled down to fit comfortably within the square canvas.
- **Note:** This is the only pose with two characters. Both must match the canonical Atlas design exactly.

### `atlas-phone`
- **Where:** Contact band (size `xl`); Support hero (size `lg`).
- **Description:** Atlas seated, smiling warmly, trunk curled around an old-school telephone handset held to one ear. Other ear perked up. Slight head tilt.
- **Prop:** retro corded handset.
- **Vibe:** "We're actually here, and we actually answer." Approachable, human.
- **Aspect:** 1:1.

### `atlas-waving`
- **Where:** Footer (size `sm`).
- **Description:** Small, compact pose — Atlas in three-quarter view standing bipedal, one stubby front foot raised in a wave, trunk curled in a friendly loop.
- **Prop:** none.
- **Vibe:** "See you out there." Warm sign-off.
- **Aspect:** 1:1, readable at 48 px.

### `atlas-lost`
- **Where:** 404 page (size `xl`).
- **Description:** Atlas sitting on the ground with legs tucked forward and a crumpled, upside-down map in one foot. Looking off-frame with a puzzled ear droop.
- **Prop:** crumpled map.
- **Vibe:** "Hmm, this isn't it." Self-aware, charming.
- **Aspect:** 1:1.

---

## Adding a new pose

1. Add an entry to this file (slug + description + where it's used + vibe).
2. Use it in a component via `<Mascot pose="atlas-newpose" size="md" />`.
3. When the illustration arrives, drop it at `public/mascot/atlas-newpose.svg` and update `src/components/Mascot.astro` to map the slug to the asset.

## Audit

Run this from `website/` to confirm every `Mascot` usage in the codebase has a corresponding entry here:

```sh
grep -rEoh 'pose="[a-z0-9-]+"' src | sort -u
```

Compare that list to the slugs in this document.
