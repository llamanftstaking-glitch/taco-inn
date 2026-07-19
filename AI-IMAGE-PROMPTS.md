# El Pitallito — AI Image Generation Prompts

Style locked: Chef's Table / A24 cinematic food photography.
Generate in this order. Reuse first good output as style ref for the rest (MJ `--sref` or Flux IP-Adapter) to keep consistency.

---

## STYLE PREAMBLE (paste BEFORE each prompt)

```
Cinematic editorial food photography, Chef's Table aesthetic, A24 color grading,
warm amber and deep umber tones, dramatic single-source warm rim lighting from
upper-left, deep shadow falloff, ultra-shallow depth of field, 85mm lens look,
fine film grain, slight motion blur on steam, natural imperfect texture, real
kitchen energy, photorealistic, hyper-detailed, 8k.
```

## NEGATIVE PROMPT (use everywhere)

```
no cartoon, no illustration, no neon colors, no oversaturation, no plastic
glossy look, no extra fingers, no text, no watermark, no studio backdrop,
no commercial product styling, no perfect symmetry, no bright daylight,
no flat lighting, no AI-typical food artifacts.
```

---

# REQUIRED — Signature Consommé Pour Section (3 images)

These three power THE DIP scroll moment. Most important.

## 1. `steam-dark.jpg` — Atmospheric Backdrop  (AR 16:9)

```
Tight dark restaurant kitchen scene at night, dense rolling volumetric steam
clouds drifting horizontally across frame, single warm amber rim light from
upper-left, pitch-black negative space dominating right two-thirds, faint hint
of orange grill flames out of focus bottom-left, suspended oil and water
particles glowing in air, NO subject — just mood and atmosphere, cinematic
depth, dark dramatic mood lighting.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 16:9
```

Save as: `/public/food/steam-dark.jpg`

---

## 2. `macro-taco.jpg` — THE Hero Birria Taco (centerpiece)  (AR 1:1 square)

```
Single hyper-macro birria taco shot from 35° hero angle, slow-braised shredded
beef glistening in deep red consomé-stained corn tortilla, melted Oaxaca cheese
pulling in thick golden strings, charred edges crisped from comal toasting,
glistening grease droplets and oil sheen across surface, fresh cilantro and
finely diced white onion crowning the top, half lime wedge resting beside,
isolated against pitch-black void background with NO plate visible, NO props,
just the taco floating, subject fills 80% of frame, perfect for circular crop
(round geometry implied), dramatic top-left warm rim lighting carving texture.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 1:1
```

Save as: `/public/food/macro-taco.jpg`

---

## 3. `broth-bowl.jpg` — The Consommé Catch Bowl  (AR 1:1 square)

```
Top-down 3/4 angle shot of a rustic small clay bowl (talavera or terracotta)
filled to the rim with rich amber-red birria consomé, broth surface shimmering
with golden oil droplets, two dried guajillo chile pieces and a single bay
leaf floating, gentle visible steam rising vertically from surface, NO spoon,
NO garnish, NO other props, deep pitch-black void surrounding bowl, dramatic
chiaroscuro lighting from upper-left, bowl casts long warm shadow, subject
fills 75% of frame, perfect for circular crop.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 1:1
```

Save as: `/public/food/broth-bowl.jpg`

---

# OPTIONAL CINEMATIC EXTRAS (4 images)

If you want to elevate the section even more.

## 4. `pour-stream.jpg` — Ladle Pour (vertical strip)  (AR 9:16)

```
Slow-motion side view of a wooden ladle tilted at 60°, thick viscous birria
consomé pouring in a single continuous amber-red translucent stream from upper
frame to lower frame, mid-stream individual droplets suspended in air mid-fall,
deep red translucent broth catching warm amber rim light, pitch-black background,
NO bowl visible, NO subject other than ladle edge top-right and the pour stream
running vertically down center, frozen moment in slow motion.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 9:16
```

Save as: `/public/food/pour-stream.jpg`

(Use this to replace the CSS gradient pour beam in `ElpConsomePour.tsx` for realism.)

---

## 5. `steam-overlay.png` — Transparent Steam (for layering)  (AR 9:16)

```
Multiple dense white-gray volumetric steam wisps rising vertically from bottom
of frame to top, varying heights and densities, isolated against pure pitch-
black background (will be blended with screen mode), soft warm amber light
catching steam edges, NO subject, just textured volumetric vapor.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 9:16
```

Save as: `/public/food/steam-overlay.png`

(After generating, remove black bg in Photoshop/Photopea OR use CSS `mix-blend-mode: screen` to drop the black.)

---

## 6. `dip-impact.jpg` — Dunk Impact Moment  (AR 16:9)

```
Hyper-macro frozen slow-motion shot of a folded birria taco mid-dip plunging
into a bowl of amber consomé, broth droplets exploding outward in a corona,
oil sheen flying, deep amber liquid wave splashing the tortilla edge,
suspended droplet halo, pitch-black background, golden warm rim light from
upper-left, single moment frozen.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 16:9
```

Save as: `/public/food/dip-impact.jpg`

(Bonus: could become a second cinematic scroll moment AFTER the pour.)

---

# SUPPORTING IMAGES (replace current Unsplash placeholders)

## 7. `tortillas-hands.jpg` — Masa Press (for Editorial section)  (AR 4:5)

```
Close-up of worn weathered brown hands pressing raw white masa dough between
two squares of clear plastic on an old well-used wooden tortilla press, fine
flour dust suspended in warm window light streaming from left side, masa
texture visible, deep shadow background, NO face visible, NO body, just hands
and the craft, vertical editorial composition, documentary feel, real and
imperfect.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 4:5
```

Save as: `/public/food/tortillas-hands.jpg` (overwrites placeholder)

---

## 8. `tortilla-fire.jpg` — Tortilla on Comal (Editorial detail)  (AR 4:5)

```
Close-up of a hand-pressed white corn tortilla blistering on a hot black
seasoned comal griddle, dark brown char spots forming in real-time on
surface, one edge curling upward, blue and orange gas flames visible
underneath the comal, warm copper-amber light bouncing up, faint smoke
rising, pitch-dark kitchen surround.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 4:5
```

Save as: `/public/food/tortilla-fire.jpg` (overwrites placeholder)

---

## 9. `birria-hero.jpg` — Main Hero Background  (AR 16:9)

```
Cinematic wide overhead shot of a rustic dark wooden table with a single bowl
of birria consomé center-left, three folded birria tacos on a small ceramic
plate center-right, scattered limes and a small bowl of diced onion-cilantro,
all illuminated by warm amber overhead pendant light creating dramatic falloff,
deep pitch-black negative space surrounding, food fills lower-center band of
composition leaving top 40% dark for headline typography, intimate restaurant
table feel.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 16:9
```

Save as: `/public/food/birria-hero.jpg` (overwrites placeholder)

---

## 10. `kitchen-wide.jpg` — Behind-the-scenes Kitchen Energy  (AR 16:9)

```
Documentary wide shot of a tight tiled-floor Mexican restaurant kitchen at
peak dinner service, two cooks in slight motion blur stirring large copper
pots of bubbling red birria, dense steam rising thick into overhead rafters,
warm sodium-vapor overhead lights, splatters of red consomé on white subway
tile wall, intimate cluttered real working kitchen, NO faces visible (heads
cropped or turned away), documentary energy, real and unstaged.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 16:9
```

Save as: `/public/food/kitchen-wide.jpg`

---

## 11. `trompo.jpg` — Al Pastor Trompo Fire  (AR 4:5)

```
Vertical rotating trompo of marinated red al pastor pork in front of glowing
red ember coals, ripe pineapple crowning the top, rendered fat dripping into
flames creating small fire bursts and smoke, deep black kitchen background,
warm orange ember light bathing meat surface, cinematic macro detail, slight
motion blur on flame.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 4:5
```

Save as: `/public/food/trompo.jpg` (use in menu best-sellers)

---

## 12. `chilaquiles.jpg` — Real Chilaquiles Detail  (AR 4:5)

```
Top-down macro shot of chilaquiles verdes — crispy tortilla chips coated in
bright tomatillo green salsa, crema drizzle, crumbled queso fresco, sliced
red onion, half avocado, sunny-side egg with bright runny yolk just broken,
served on dark ceramic plate, dramatic warm rim light, pitch-dark background
edges, real plating not styled.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 4:5
```

Save as: `/public/food/chilaquiles.jpg` (overwrites placeholder)

---

# OPTIONAL — Humanity / Story

## 13. `founder.jpg` — Steven (or actual GM)  (AR 4:5)

```
Editorial portrait of a Mexican-American restaurant general manager in his
early 40s, short black hair, slight stubble, plain dark gray t-shirt, leaning
on a stainless steel prep counter in a dim kitchen, looking off-camera with
quiet confident intensity, warm amber rim light from right side carving face,
deep falloff to shadow on left, no styling, real and weathered, 85mm lens
shallow depth of field, kitchen blurred behind.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 4:5
```

Save as: `/public/food/founder.jpg`

(REPLACE WITH REAL PHOTO when client provides — AI portrait is placeholder only.)

---

## 14. `exterior-night.jpg` — Restaurant at Night  (AR 16:9)

```
Night exterior of a small intimate Mexican restaurant on Broadway in
Washington Heights NYC, warm yellow window light spilling onto wet sidewalk,
hand-painted signage suggested above door reading "El Pitallito", slight rain
reflection on sidewalk, blurred silhouettes of late-night passersby walking
past, no neon, no chain branding, intimate cinematic mood, slight grain.
[STYLE PREAMBLE]
[NEGATIVE]
--ar 16:9
```

Save as: `/public/food/exterior-night.jpg`

(Stand-in only — replace with actual storefront shoot when possible.)

---

# RECOMMENDED MODELS / SETTINGS

- **Flux 1.1 Pro** (fal.ai) — best photorealism, $0.04/image
- **Midjourney v6+** — best cinematic mood, use `--style raw --ar X:Y --s 100`
- **Imagen 3 / Reve** — also good for food

## Settings tips

- Generate each prompt 4x, pick best
- Once you have a hero "look" you love (probably #2 macro-taco), use it as
  `style reference` for #1, #3, #6 to lock consistency
- Aspect ratios MATTER for the consomé section — square for circular crops,
  16:9 for backdrops, 9:16 for vertical pour
- Render at max resolution available (Flux 2K, MJ 2048+) then resize for web

## Post-processing (after generation)

1. Mild color grade pass — warm shadows, cool highlights, slight teal-orange
2. Add subtle film grain (Photoshop noise filter ~3%)
3. Crop precisely — for round-cropped images make sure subject is centered
4. Optimize: convert to JPG quality 82-88, WebP if pipeline supports
5. Drop into `/Users/rayquinones/el-pitallito/public/food/` with exact names above
6. Rebuild: `npm run build && rsync -avz --delete out/ root@74.208.191.184:/opt/el-pitallito/site/`

---

# PRIORITY ORDER (if generating in batches)

**Batch 1 (REQUIRED — THE DIP works without anything else):**
1. macro-taco.jpg (the hero object)
2. broth-bowl.jpg (the catch bowl)
3. steam-dark.jpg (the backdrop)

**Batch 2 (POLISH the cinematic moment):**
4. pour-stream.jpg
5. steam-overlay.png
6. dip-impact.jpg

**Batch 3 (REPLACE placeholders):**
7. tortillas-hands.jpg
8. tortilla-fire.jpg
9. birria-hero.jpg
10. chilaquiles.jpg
11. trompo.jpg

**Batch 4 (HUMANITY — when ready):**
12. founder.jpg (or real photo)
13. kitchen-wide.jpg (or real shoot)
14. exterior-night.jpg (or real shoot)

---

Generate. Drop files in `/public/food/`. Tell me when ready — I'll rebuild and deploy.
