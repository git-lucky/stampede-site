# Atlas · Image Generation Prompts

Copy-paste prompts for **Gemini Nano Banana Pro**, one per pose. Each prompt assumes you attach a **reference image of Atlas** so the model preserves the character's face, proportions, and colorways. These prompts only describe the new action, props, and composition.

The canonical Atlas reference is the approved `atlas-cartographer` illustration at `public/mascot/atlas-cartographer.png` — a cute bipedal chibi elephant with a teal-to-lavender body, dusty rose inner ears, big sparkly eyes, and a small tail tuft. Use that image as the reference attachment whenever possible.

## Universal style rules (baked into every prompt)

These rules repeat across every prompt so the output is visually consistent across 13 poses. If you refine them later, edit the template block below and re-run.

```
STYLE LOCK:
- Cute chibi cartoon elephant, bipedal — Atlas stands upright on two short hind legs in every default pose, not on all fours.
- Proportions: oversized round head, round belly, short stubby arms/legs, trunk drawn as a single expressive curve used like a hand. Small pointed tail with a tiny tuft at the tip.
- Big, expressive round eyes with visible white sparkle catchlights (two small round highlights per eye). No small bead eyes.
- Large, leaf-shaped ears with dusty-rose pink inner fill; ears tilt for expression.
- Smooth body surface with a gentle cool color blend from mint-teal on the head and upper back, into sky-blue-to-lavender on the belly and legs. No hard color bands — just a soft transition. NO geometric, mandala, lattice, honeycomb, tessellated, or line-pattern textures anywhere on the body, ears, or trunk.
- Soft open-mouth smile with a small pink tongue visible; optional very subtle cheek blush.
- Soft cartoon rendering with gentle two-tone cell shading on body, ears, and props (one base tone + one slightly darker cool shadow tone). Small cool highlights on the top of the head/shoulders and along ear edges are okay. No photorealism, no 3D render, no anime, no painterly brushwork.
- Clean dark outline (~1.5–2px equivalent) in deep plum-ink #2A2239 around all major forms. Outline is consistent but not thick-stamp heavy.
- One soft, slightly offset drop shadow under the figure (4px right + 4px down, blurred lightly, cool dark neutral). A single shadow only.
- Square 1024x1024 canvas. Transparent background (PNG, alpha). Figure occupies ~82% of canvas, centered, with breathing room on every edge so props never clip.

PALETTE (use these as the core; lean on them when in doubt):
- Outline:               #2A2239   (deep plum-ink)
- Body mint-teal (top):  #8CC9C4   (head, upper back, shoulders)
- Body sky-blue (mid):   #A3BDD9   (belly, cheeks, arms)
- Body lavender (lower): #A89BCC   (lower body, legs, trunk tip)
- Body shadow tone:      #7B6FA3   (cool purple, used sparingly for cell shading)
- Cool highlight:        #E8F1EC   (subtle lit edges on head/shoulders)
- Belly fill:            #D9E2E8   (a touch cooler than the body, soft)
- Inner ear pink:        #E6A4B0   (dusty rose)
- Cheek blush:           #EBB8B8   (optional, very subtle)
- Tongue / mouth:        #E89BA4
- Eye iris:              #3F6E7C   (soft teal — keeps the cool palette consistent)
- Eye pupil:             #1A1014
- Eye sparkle:           #FFFFFF
- Gold accent:           #EAB72D   (props — pushpins, compasses, trophies, flags)
- Sunset accent:         #F2A93B   (props, details)
- Forest accent:         #1F3A2B   (prop outlines, map grid, clapperboard, binoculars)
- Moss accent:           #6B7A35   (props)
- Cream fill:            #FAF5E9   (paper, maps, polaroid)
- Sand accent:           #EDDFC3   (hats, rocks, dust puffs)

NEGATIVE (explicitly exclude):
- ABSOLUTELY NO geometric, mandala, lattice, honeycomb, tessellated, line-pattern, or filigree textures on the body, ears, or trunk. The skin is smooth with only soft cell shading — reject any drift toward ornamental detail.
- No hard color bands — the teal→blue→lavender transition must be a gentle blend, not striped sections.
- No four-legged elephant stance — Atlas is bipedal by default. Sitting/crouching is only allowed when the specific pose asks for it.
- No small bead/dot-only eyes. Eyes must be large and expressive with catchlights.
- No text or lettering on the image unless the pose explicitly calls for it.
- No additional characters, no human figures, no other animals.
- No heart eyes, winking, thumbs-up, peace signs, anime blush lines, or anime sweat drops (unless a sweat drop is explicitly called for).
- No sparkles, stars, motion lines unless the pose explicitly calls for them.
- No background scenery, gradient skies, or city silhouettes. Transparent background only.
- No heavy rim-light glow, no glossy plastic sheen, no airbrushed gradients, no 3D turntable render.
- No tusks, or at most tiny childlike tusks — Atlas reads young and friendly.
```

When you paste a per-pose prompt below, prepend the **STYLE LOCK**, **PALETTE**, and **NEGATIVE** blocks above so Nano Banana has the full guardrails.

---

## Pose prompts

Each entry:
- **Description:** what the viewer should see at a glance.
- **Prompt:** paste this after the style/palette/negative blocks.

### 1. `atlas-cartographer` · Hero art

**Description:** Atlas standing upright on two feet holding an unfurled city map between both front feet, head tilted curiously toward the map, one ear forward. The brand's anchor pose. **This pose is already generated and saved at `public/mascot/atlas-cartographer.png`** — use it as the reference for every other pose.

**Prompt:**

```
Using the provided Atlas reference image as the exact character design — matching its cool teal-to-lavender body blend, dusty-rose inner ears, and smooth unpatterned skin — generate Atlas standing upright on his two short hind legs, holding an unfurled paper city map between both stubby front feet. The map is held vertically in front of his round belly, facing the viewer, with a simple cartoon street grid in forest #1F3A2B lines on cream #FAF5E9 paper and a single gold #EAB72D pushpin near the center. Atlas's head tilts slightly toward the map; his mouth is a soft open smile with a small pink tongue visible. One ear points forward in curiosity, the other sits relaxed. His trunk curves gently to one side of the map. Big sparkly eyes with clear white catchlights. Short legs peek out just below the map. Body skin is smooth cell-shaded color only, no surface patterns of any kind.
```

---

### 2. `atlas-booking` · How It Works step 01

**Description:** Atlas in a three-quarter view holding a clipboard against his belly, trunk curled around a pencil, marking a checkbox with a gold check.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal in a relaxed three-quarter view facing slightly right, holding a small wooden clipboard against his belly with one front foot. His trunk is curled around a short pencil, its tip touching the top checkbox on the clipboard, which is marked with a bold gold #EAB72D checkmark. The clipboard paper is cream #FAF5E9 with three horizontal lines in forest #1F3A2B. Atlas's expression is cheerful and efficient: soft open-mouth smile with a small pink tongue just visible, subtle cheek blush, both ears in a relaxed neutral position. Big sparkly eyes with catchlights. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 3. `atlas-wrench` · How It Works step 02

**Description:** Atlas in a canvas tool belt tightening a comically large bolt mid-air with an oversized wrench held in his trunk.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal, wearing a simple soft canvas tool belt in sand #EDDFC3 with two small dark forest #1F3A2B pockets slung across his chest. One stubby front arm is raised and gripping a comically oversized round-headed wrench in gold #EAB72D with a forest #1F3A2B outline — held out to the side as if tightening an invisible bolt mid-air. His trunk hangs in a relaxed natural curve in front of his belly, not holding anything. The other stubby arm rests at his side. One ear is forward, the other slightly back. Expression: focused, slightly amused, mouth in a small determined smile with a hint of pink tongue. Big sparkly eyes. Smooth unpatterned body in the canonical teal→lavender blend. EXCLUDE: no sweat drop, no sweat mark, no effort lines, no stress marks anywhere on the face or body.
```

---

### 4. `atlas-running` · How It Works step 03

**Description:** Atlas mid-stride, front leg forward, compass held aloft in his trunk like a relay baton. Dust puff at the back foot.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas in a dynamic bipedal mid-running pose, viewed from a three-quarter side angle. One short stubby leg extends forward, the other pushes off the ground behind him. His trunk curls upward and raised above his head, gripping a small round brass pocket compass (gold #EAB72D casing with a forest #1F3A2B needle) held up like a relay baton. Three short outlined motion streaks trail behind his shoulder. A small soft dust puff in sand #EDDFC3 billows at his rear foot. Ears swept back with the motion. Expression: determined and excited, mouth open in a happy effort-grin with pink tongue visible, big sparkly eyes forward. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 5. `atlas-trophy` · How It Works step 04

**Description:** Atlas hoisting a small trophy overhead, arms up, confetti falling in brand colors.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal with both stubby front arms raised triumphantly overhead. His trunk is curled around a small stubby two-handled trophy (gold #EAB72D cup on a forest #1F3A2B base) lifted high above his head. Around and behind him, six to eight small confetti rectangles fall at varied angles in gold #EAB72D, sunset #F2A93B, and moss #6B7A35 (no other colors). Ears forward and perky, big open-mouth grin of joy showing a small pink tongue, eyes scrunched slightly upward in a happy curve but still showing sparkle catchlights. Confetti pieces are outlined, flat, and stay clear of his body. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 6. `atlas-binoculars` · Scout tier card

**Description:** Atlas standing upright, binoculars raised to his eyes by his trunk, leaning forward slightly as if spotting something exciting in the distance.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing fully upright on his two short hind legs in a confident explorer stance. His trunk is raised and curled firmly around a pair of compact round binoculars (forest #1F3A2B body, two circular cream #FAF5E9 lenses with thin gold #EAB72D rings) and pressing them up to his eyes so the lenses frame his face. His round belly faces the viewer. He leans very slightly forward at the waist with subtle eager energy, as if he just spotted something interesting. One big dusty-rose-lined ear is perked straight up in excitement, the other is angled slightly back. Both stubby front feet are relaxed at his sides. No rock, no props other than the binoculars. Expression: alert, thrilled, focused — eyes wide and sparkly behind the binoculars, eyebrows slightly raised, mouth in a small excited grin with a hint of pink tongue. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 7. `atlas-headset` · Remote Expedition tier card

**Description:** Atlas seated, wearing an over-ear headset with a boom mic, face lit by subtle screen glow, one front foot mid-gesture.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas in a seated front-facing pose on the ground (legs tucked forward, belly visible), wearing a compact over-ear headset. The headset band and cups are forest #1F3A2B with a small gold #EAB72D accent dot on each ear cup and a short boom microphone extending in front of his mouth. A very subtle cool cream tint (low opacity) sits on the front of his face from below, suggesting screen glow — keep it minimal, not a gradient wash. One stubby front foot is raised in a mid-air gesture, as if making a point on a video call. Ears relaxed, trunk lowered in a gentle curve. Expression: warm, engaged, mid-sentence with a soft open smile showing a small pink tongue, big sparkly eyes. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 8. `atlas-flag` · Guided Expedition tier card

**Description:** Atlas in a safari hat leading with a small gold flag on a staff held in his trunk.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal in three-quarter view, wearing a soft-brimmed canvas safari hat in sand #EDDFC3 with a forest #1F3A2B hatband. The hat is sized for his big round head. His trunk is raised diagonally upward, holding a short wooden staff with a small rectangular flag at the top. The flag is gold #EAB72D with a single simple moss #6B7A35 arrow silhouette in the center. The flag curves softly as if mid-wave. Ears forward, chest slightly puffed out, little stubby feet planted confidently. Expression: proud, steady, friendly leader energy, soft open-mouth smile with a hint of pink tongue, big sparkly eyes. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 9. `atlas-clapper` · Stampede tier card

**Description:** Atlas as a film director holding a clapperboard open, optional beret for flair.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal in three-quarter view with a slight lean forward, wearing a small outlined beret tilted jauntily to one side (beret fill: forest #1F3A2B). His trunk holds an open film clapperboard in front of his belly. The clapperboard has a forest #1F3A2B body, a cream #FAF5E9 write-on area with the forest-ink text "STAMPEDE" on the first line and "TAKE 1" on the second line in a bold sans display font, and gold #EAB72D diagonal stripes along the clapper arm. Expression: confident grin with teeth and a little pink tongue just barely showing, one eyebrow raised, big sparkly eyes. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 10. `atlas-polaroid` · Photo mosaic section

**Description:** Atlas peeking out from behind a large instant-photo frame, trunk pointing toward the photo area.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas positioned behind a large blank instant-photo frame (classic Polaroid proportions with thicker bottom border) that occupies about 60% of the canvas, with Atlas's head, one big dusty-rose-lined ear, and one eye peeking out from the upper-right corner of the frame. His trunk curls around the top of the frame and extends to point at the blank photo area (pure cream #FAF5E9, no image inside). The photo frame is white with a soft outline, tilted 4 degrees counter-clockwise. Expression: delighted, mouth open in a happy laugh showing a small pink tongue, ear that's visible stands up cheerfully. Big sparkly eyes with strong white catchlights. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 11. `atlas-phone` · Contact band and Support page

**Description:** Atlas seated, trunk curled around a retro corded handset held to one ear, warm inviting face.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas seated front-facing on the ground with legs tucked forward, with his trunk curled elegantly upward and around the earpiece of a retro corded telephone handset. The handset body is gold #EAB72D with a short spiraling forest #1F3A2B cord trailing off the bottom of the canvas. The handset is pressed gently against one of his big dusty-rose-lined ears. The other ear is perked up and tilted slightly forward. Head tilted a touch to the side, warm closed-mouth smile with just a suggestion of pink tongue at the corner, soft cheek blush. Expression: welcoming, approachable, mid-conversation. Big sparkly eyes. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 12. `atlas-waving` · Footer

**Description:** A small, compact Atlas in three-quarter view with one front foot raised in a wave and trunk curled in a friendly loop.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal in a compact three-quarter view, slightly smaller in the frame than the other poses (figure occupies ~70% of canvas, leaving extra breathing room). One stubby front foot is raised and tilted outward in a mid-wave (a gentle curved shape, no individual fingers). The trunk is curled into a friendly loose loop in front of his chest, not holding anything. Both ears are slightly forward. Expression: warm open-mouth smile with a small pink tongue, big sparkly eyes. Critically, this pose must read clearly at 48×48 pixels — keep the silhouette strong, features bold and simple, outlines clean. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 13. `atlas-lost` · 404 page

**Description:** Atlas sitting on the ground with a crumpled upside-down map, looking off-frame with a puzzled ear droop.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas seated on the ground with his short legs tucked forward, holding a crumpled, partially torn paper map in one stubby front foot. The map is upside-down and covered in visible creases (forest #1F3A2B fold lines on cream #FAF5E9 paper). Atlas's head is turned to look off to the upper-right corner of the canvas, not at the map. One big dusty-rose-lined ear droops downward, the other stands up at a confused angle. Trunk hangs limply in a small curl. Expression: puzzled and lightly embarrassed, mouth in a small flat line with a tiny bit of pink tongue poking out, eyebrows gently raised in confusion, big eyes still sparkly. No background scenery; the ground is implied, not drawn. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 14. `atlas-celebrate` · Outcomes row 3

**Description:** Atlas mid-celebration — both arms thrown up, trunk raised and curled in excitement, big open laugh, confetti raining down.

**Prompt:**

```
Using the provided Atlas reference, generate Atlas standing bipedal in a full-body celebration pose. Both stubby front arms are thrown upward and outward in a triumphant cheer, slightly asymmetric so it feels natural rather than posed. His trunk curls upward above his head in excitement. His mouth is wide open in a huge joyful laugh with a small pink tongue visible. Eyes are wide and sparkly with strong white catchlights — pure elation. Both ears are perked forward and slightly splayed with excitement. Optional very subtle cheek blush. Around him, six to eight small confetti rectangles fall at varied angles in gold #EAB72D, sunset #F2A93B, and moss #6B7A35 — no other colors. Confetti pieces are flat, outlined, and clear of his face. No jacket, no props in hand — the celebration IS the pose. Smooth unpatterned body in the canonical teal→lavender blend.
```

---

### 15. `atlas-laughing-together` · Outcomes row 2

**Description:** Two Atlas figures side by side, mid-laugh, leaning slightly toward each other — the moment of genuine connection after a shared adventure.

**Prompt:**

```
Using the provided Atlas reference, generate TWO identical Atlas figures standing bipedal side by side, close together, both mid-laugh. This pose requires two characters — override the single-character rule for this pose only. Both figures must match the reference exactly in proportions, palette, and style: oversized round heads, smooth teal-to-lavender bodies, dusty-rose inner ears, big sparkly eyes, small tail tuft. Left Atlas leans slightly right, right Atlas leans slightly left — their bodies angling toward each other as if sharing a joke. Both mouths are wide open in a genuine laugh, small pink tongues visible. Eyes are slightly scrunched upward from laughing but still show white catchlights. One ear on each figure angles toward the other as if turning in delight. Trunks curve loosely downward — relaxed, not holding props. A small cluster of three confetti rectangles in gold #EAB72D and sunset #F2A93B floats above them (no other confetti colors). Both figures are the same size. Compose them within the square 1024×1024 canvas with enough breathing room that neither figure is clipped — reduce figure scale so both fit comfortably. Smooth unpatterned bodies in the canonical teal→lavender blend on both. No text, no background, transparent PNG.
```

---

## Workflow tip

When iterating on a single pose, keep everything in the **STYLE LOCK / PALETTE / NEGATIVE** blocks identical across generations. Only vary the specific pose prompt. This is what keeps character identity consistent across the 13 poses so they feel like one cast, not thirteen stock illustrations.

If Nano Banana drifts on palette, proportions, or tries to add mandala-style body patterns, re-paste the **STYLE LOCK** and **NEGATIVE** blocks as their own turn before re-running the pose prompt. Pay particular attention to flagging the "no geometric body patterns" and "bipedal stance" rules — they are the most common drifts.

## After generation

1. Export each result as a square PNG with transparent background.
2. Save to `website/public/mascot/{slug}.png`.
3. Add the slug to the `RENDERED_POSES` set in `src/components/Mascot.astro`. Placeholder flips to the real image automatically.
