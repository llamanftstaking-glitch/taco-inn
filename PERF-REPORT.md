# El Pitallito — Performance Audit Report

**Date:** 2026-05-22  
**Environment:** Playwright headless Chrome, mobile UA (SM-A536B Android 12), 390×844px 3x DPR, 4x CPU throttle, Fast 3G (1.6 Mbps / 150ms RTT)  
**Live target:** http://74.208.191.184/  
**Stack:** Next.js 16 static export, React 19, Framer Motion v12, Tailwind v4

---

## Measured Baselines (Before Patches)

| Metric | Measured | Target |
|--------|----------|--------|
| Total load (networkidle, 4G sim) | 10,956ms | <5,000ms |
| DOM Interactive | 832ms | <1,000ms |
| FCP | 1,280ms | <1,800ms |
| backdrop-filter elements | **40** | <5 |
| JS bundle (decoded) | 722KB | <400KB |
| Hero image load time | 10,187ms (dip-impact.jpg 590KB) | <2,000ms |
| Cinematic section will-change layers | 7 (desktop) | fine |
| Mobile will-change layers | 7 (same — unfixed) | 0 |

## Measured After Patches

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Load time (networkidle, 4G) | 10,956ms | 6,262ms | -43% |
| FCP | 1,280ms | 1,092ms | -15% |
| backdrop-filter elements | 40 | 9 | -78% |
| Mobile will-change layers | 7 | 0 | -100% |
| Hero image (dip-impact) | 590KB JPG | 304KB WebP | -48% |
| Cinematic images total | 1,481KB | 725KB | -51% |

---

## Root Causes — Ordered by Impact

### P0: images: { unoptimized: true } — Static Export Disables Next.js Image Optimization

**File:** `next.config.ts:5`  
**Impact:** CRITICAL — all images served as raw JPGs, no WebP, no resize

Static export (`output: "export"`) forces `images: { unoptimized: true }`, which completely disables the Next.js Image Optimization API. Every `<Image>` component on the page serves the raw file you put in `/public`. There is no WebP conversion, no srcset generation, no size negotiation. The 5 cinematic images in `ElpConsomePour` totalled 1,481KB over the wire. On Fast 3G at 150ms RTT, that is a 7-second decode pipeline for images that animate on scroll — meaning the user scrolls into the cinematic section before the images even finish loading.

**Fix applied:** Pre-converted all 16 food images to WebP via sharp (quality 82). Average savings: 52%. Total cinematic images: 1,481KB → 725KB. Updated all image references in `site.ts`. Added `<link rel="preload">` for `dip-impact.webp` and `steam-dark.webp` in `layout.tsx`.

---

### P0: 40 Elements with backdrop-filter — Sitewide GPU Killer

**Files:** `ElpMenu.tsx:103`, `ElpReviews.tsx:52`, `ElpOrder.tsx:43–73`  
**Impact:** CRITICAL on mobile GPU — each `backdrop-filter: blur()` element requires an isolated compositing layer, a texture sample of everything behind it, and a blur pass. On mid-tier Android, a single `backdrop-filter` element can cost 3–8ms of GPU time per frame. 40 of them stacked during scroll means the GPU is permanently saturated.

The 22 menu category `<article>` cards each had `backdrop-blur` applied. These are static cards fully opaque dark background — the blur was rendering on top of a solid `#14100B` surface, achieving exactly zero visual effect while destroying scroll performance.

The 4 review `<figure>` cards: same issue.  
The 5 delivery platform `<a>` buttons in `ElpOrder`: same.  
The reviews `blur-[120px]` decorative glow divs: these triggered full rasterized blur passes on two 288×288px elements per scroll frame.

**Fix applied:**
- Removed `backdrop-blur` from all 22 menu cards (`ElpMenu.tsx`)
- Removed `backdrop-blur` from all 4 review cards (`ElpReviews.tsx`)
- Removed `backdrop-blur` from all 5 delivery buttons (`ElpOrder.tsx`)
- Replaced `blur-[120px]` decorative glow divs with equivalent `radial-gradient()` CSS (zero GPU cost, same visual)
- Result: 40 → 9 backdrop-filter elements (the 9 remaining are UI-critical: nav, mobile drawer overlay, hero trust badges)

---

### P0: Mobile Scroll Transforms Not Gated by isMobile

**File:** `ElpConsomePour.tsx:89` (the `motionEnabled` condition)  
**Impact:** HIGH — on mobile the section was running all 12 useTransform subscribers while scrolling

The original `motionEnabled = active && !reduced` only checked the IntersectionObserver gate and prefers-reduced-motion. It did not check `isMobile`. So on every mobile scroll event through the cinematic section, Framer Motion was running 12 MotionValue transforms (tacoY, tacoRotate, tacoScale, brothY, brothOpacity, pourScaleY, pourOpacity, impactOpacity, impactScale, steamOpacity, steamScale, dimOpacity, tensionOpacity, tensionY, ctaOpacity, ctaY) and writing 7 sets of inline styles. The IntersectionObserver does NOT prevent MotionValue subscription — it prevents the `scrollYProgress` subscriber from being active. But `useScroll` itself still registers its scroll listener while the section is in the observer margin (200px). On a Snapdragon 7-series doing simultaneous image decode, this is enough to push past 16ms.

**Fix applied:** Changed `motionEnabled = active && !reduced && !isMobile`. Mobile users get a static frame composition. The static fallbacks (taco at -4% y/scale 1, bowl at 8% y/opacity 1, impact at opacity 0, headlines visible) look correct.

Confirmed via Playwright: `will-change` elements in the cinematic section drops from 7 to 0 on mobile UA.

---

### P1: Infinite rAF Loop in Hero (Scroll Hint)

**File:** `ElpHero.tsx:123-130`  
**Impact:** MEDIUM — permanently active rAF subscription on the main thread

The scroll hint used `repeat: Infinity`. This keeps a Framer Motion animation tick alive for the entire session, even after the user has scrolled past the hero. Each tick is cheap (one opacity tween) but it competes with scroll event processing and adds to the main thread workload during the cinematic section.

**Fix applied:** Changed to `repeat: 3`. The animation fires 3 times (covers ~14 seconds of first load), then self-terminates. The scroll hint has done its job by then.

---

### P1: ElpStickyBar Scroll Listener — setState on Every Scroll Event

**File:** `ElpStickyBar.tsx:12-16`  
**Impact:** MEDIUM — unbounced setState triggers potential React reconciliation per scroll pixel

The listener called `setVisible(window.scrollY > 600)` directly in the scroll handler. Passive listener ensures it doesn't block scrolling, but the setState call can trigger React work mid-scroll frame. During the cinematic section, this compounds with Framer Motion's own scroll work.

**Fix applied:** Wrapped in rAF throttle — `setState` is deferred to the next animation frame, ensuring it never fires more than once per frame and never mid-composite.

---

### P1: blur-2xl Filter on Steam Bloom

**File:** `ElpConsomePour.tsx:245`  
**Impact:** MEDIUM on desktop — `filter: blur(40px)` on a 60vh element

The steam bloom div used `blur-2xl` (Tailwind's `filter: blur(24px)`). This creates a new stacking context and forces an isolated compositing layer. On desktop this is gated by `!isMobile`, but the blur still runs during the ramp-up period before `isMobile` resolves.

**Fix applied:** Replaced `blur-2xl` + flat gradient with a multi-stop `radial-gradient` that replicates the visual effect (soft center glow fading to transparent) at zero filter cost.

---

### P2: Cormorant Garamond — 4 Weights Including Italic

**File:** `layout.tsx:19-24`  
**Impact:** LOW-MEDIUM — font download cost on first load

Loading `weight: ['400', '500', '600'], style: ['normal', 'italic']` means 6 font variants (3 weights × italic + 3 normal). Each is a separate network request. On 4G with 150ms RTT, this adds ~300-450ms of blocking FOUT risk before the editorial serif renders.

**Not patched** — requires design decision. Recommendation: drop weight 500, keep 400 normal + 400 italic + 600 normal (3 files instead of 6).

---

### P2: content-visibility Not Set on Heavy Below-Fold Sections

**Impact:** LOW — browser paints all menu items on initial load even if user never scrolls there

The menu section renders ~22 category cards with hundreds of DOM nodes. Without `content-visibility: auto`, the browser lays out and paints all of this on initial load.

**Fix applied:** Added `content-visibility: auto; contain-intrinsic-size: 0 2000px` to `#menu` and `content-visibility: auto; contain-intrinsic-size: 0 600px` to `#order` in `globals.css`.

---

## Should We Ditch Scroll-Linked Transforms? CSS Scroll-Driven Animations? Video?

**CSS scroll-driven animations (`animation-timeline: scroll()`):** Not yet viable. Safari 17.2+ supports it, but Android WebView still has incomplete implementation as of late 2025. You'd need a polyfill that is heavier than Framer Motion. Skip for now.

**Convert to scroll-scrubbed video:** A 10-second 390px-wide VP9/AV1 video of the cinematic sequence would be ~200KB and offload all animation work to the video decode pipeline (hardware-accelerated on every device). Best long-term option. Requires creating the video asset. Not coded yet — depends on having the animation defined first.

**Reduce layer count:** Done via the mobile bail-out. Desktop keeps the cinematic effect. Mobile gets the static frame.

**Canvas:** Not appropriate here — the content is image compositing, not generative. Canvas would be more code for the same or worse result.

**Verdict for cinematic section:** Keep Framer Motion on desktop. The architecture (IntersectionObserver + motionEnabled gate + will-change hints) is sound. The mobile bail-out is the correct call. The scroll transforms run clean in headless testing once images load fast enough.

---

## Files Modified

- `/Users/rayquinones/el-pitallito/next.config.ts` — documentation comment only
- `/Users/rayquinones/el-pitallito/src/config/site.ts` — all image references `.jpg` → `.webp`, bestSellers images updated
- `/Users/rayquinones/el-pitallito/src/app/layout.tsx` — added `<link rel="preload">` for hero + cinematic backdrop
- `/Users/rayquinones/el-pitallito/src/app/globals.css` — added `content-visibility: auto` for `#menu` and `#order`
- `/Users/rayquinones/el-pitallito/src/components/ElpConsomePour.tsx` — `motionEnabled` now includes `&& !isMobile`; `blur-2xl` replaced with radial-gradient
- `/Users/rayquinones/el-pitallito/src/components/ElpHero.tsx` — scroll hint `repeat: Infinity` → `repeat: 3`
- `/Users/rayquinones/el-pitallito/src/components/ElpStickyBar.tsx` — scroll listener rAF-throttled
- `/Users/rayquinones/el-pitallito/src/components/ElpReviews.tsx` — `blur-[120px]` glows replaced with radial-gradient; `backdrop-blur` removed from review cards
- `/Users/rayquinones/el-pitallito/src/components/ElpMenu.tsx` — `backdrop-blur` removed from all 22 category cards
- `/Users/rayquinones/el-pitallito/src/components/ElpOrder.tsx` — `backdrop-blur` removed from 5 platform buttons

## Assets Generated

16 WebP files in `/Users/rayquinones/el-pitallito/public/food/*.webp`  
Total savings: ~2,400KB → ~1,170KB across all food images (51% reduction)

## Deploy

Build passes clean (`next build` no errors/warnings). Static export in `/out`. Deploy to nginx as before. Original `.jpg` files preserved for fallback reference but no longer referenced in code.
