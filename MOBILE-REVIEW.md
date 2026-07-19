# El Pitallito — Mobile-First UX Audit

**Audited:** 2026-05-22
**Live URL:** http://74.208.191.184/
**Viewports tested:** 390×844 (iPhone 13), 360×800 (Android mid), 414×896 (iPhone Plus), 844×390 (landscape)
**Tool:** Playwright (Chromium 1223, iPhone 13 device emulation)
**Page height:** 18,992 px = **23.71 viewports of scroll** on a 390×844 screen
**Horizontal overflow:** None detected (clean)

---

## Pillar Scores

| Pillar | Score | Brutal one-liner |
|--------|------:|------------------|
| 1. Touch UX | **1 / 4** | 21 category chips at 30px tall, hamburger 40×40, lang toggle 36px tall — half the nav fails 44×44. |
| 2. Legibility | **2 / 4** | 11–12px text used for hours, address, rating count, "$17 · 3 tacos" — below mobile minimum. |
| 3. Performance & weight | **2 / 4** | Hero is 92vh + 220vh cinematic + 8 framer-motion components + 15+ Next/Image fills. No `loading=lazy` on hero, no WebP/AVIF declared. |
| 4. Choreography | **1 / 4** | Cinematic 220vh stage = ~3 locked viewports of scroll-jacking with no skip-link. Adds zero conversion. |
| 5. Accessibility | **2 / 4** | Drawer width `max-w-sm` (384px) bleeds off 360px Android. Map iframe has no `title`-driven landmark grouping. Many decorative emoji not flagged. |
| 6. Conversion / thumb zone | **2 / 4** | Sticky bar covers content (Visit hours, Order grid CTAs). Hero stacks 14 elements before fold-2 — phone CTA pushed into lower thumb arc only after 700px scroll. |

**Overall: 10 / 24** — **REJECTED for mobile.** Ships as a desktop site that happens to render on a phone.

---

## Top 5 Priority Fixes (in order of conversion bleed)

1. **Sticky bar covers paid CTAs and hours.** Order section's "Grubhub / Seamless / Call In" tiles and Visit's hours table get visually clipped by the sticky bar (see `sec-10-order.png`, `sec-11-visit.png`). Hours of operation are critical for restaurant conversion. **Fix:** add `padding-bottom: calc(72px + env(safe-area-inset-bottom))` to `<main>` or each scroll section in `src/app/page.tsx`, OR auto-hide the sticky bar inside `#order` and `#visit` via IntersectionObserver in `ElpStickyBar.tsx:12`.
2. **Cinematic 220vh = scroll prison.** `ElpConsomePour.tsx:97` locks the user inside ~3 viewport-heights of sticky pour animation with no visible "Skip to menu" affordance. On a 390×844 phone that's 1,860px of "I can't get to the menu". The taco is centered but the CTA only fades in at scroll progress 0.78 (`ctaOpacity` line 82). Most users will swipe-away. **Fix:** drop the height to `120vh` on mobile, render the final-state CTA immediately on mobile, and add a "Skip to menu →" link pinned to the top-right of the section. Cinematic moments belong on desktop or as a 4-second autoplay video.
3. **Mobile drawer overflows the viewport.** `ElpNav.tsx:108` uses `w-full max-w-sm` (384px). On 360px Android, `max-w-sm` would clip — but worse, the drawer also has the flag stripe `<div className="flag-stripe h-0.5 w-full">` at line 112 inside a `flex-col` that overlaps the close X. The captured `sec-12-drawer.png` shows the "ORDER ONLINE →" CTA cut off at the right edge. **Fix:** change to `w-[88vw] max-w-[360px]` and remove the close-button-blocking flag stripe inside the drawer (or move it below the header row).
4. **Category chips: 21 chips, 30px tall, horizontal-scroll trap.** `ElpMenu.tsx:84` renders `py-1.5` chips = effective height ~30px (Playwright measured 30px on every chip). Below the 44×44 WCAG target. Users have to horizontally scrub through 21 chips to find a category. **Fix:** raise to `py-2.5 text-sm` (gets ~40px) + add `min-h-[44px]`. Better: collapse to a `<select>` on mobile OR render a 3-column grid below 768px.
5. **Hero is over-stuffed → CTAs not thumb-reachable.** `ElpHero.tsx` stacks 7 stagger-animated elements (rating pill, eyebrow, headline, subline, dual CTA, especial, hours strip, scroll hint) inside `min-h-[92vh]`. The Order CTA lands at roughly 60% page height on iPhone 13 — still reachable, but only after the user scrolls past the rating pill. Tested screenshot `iphone13-atf.png` shows the primary CTA exactly at vertical mid — below the natural thumb arc. **Fix:** above the fold should be headline + sub + single primary CTA. Move "rating pill" to a smaller line below the headline. Move "especial del día" + hours strip into a sub-fold band.

---

## Detailed Findings

### 1. Touch UX — 1 / 4

Playwright crawl found **30+ interactive elements under 44×44 px**. Highlights from `SMALL_TARGETS` JSON:

| Element | File:Line | Measured | WCAG min |
|---|---|---|---|
| Logo link (`EP` badge area) | `ElpNav.tsx:39` | 36 × 44 | 44 × 44 |
| Lang toggle button | `LangToggle.tsx` | 73 × **36** | 44 × 44 |
| Order Online (header pill) | `ElpNav.tsx:74` | 128 × **40** | 44 × 44 |
| Hamburger button | `ElpNav.tsx:78` | **40 × 40** | 44 × 44 |
| Close (drawer X) | `ElpNav.tsx:117` | **40 × 40** | 44 × 44 |
| Rating pill (anchor `#reviews`) | `ElpHero.tsx:30` | 344 × **34** | min height fail |
| All 21 category chips | `ElpMenu.tsx:79` | varies × **30** | huge fail |
| Phone link in hero footer | `ElpHero.tsx:118` (via inline strip) | 142 × **20** | catastrophic |
| Hours footer phone links | `ElpFooter.tsx:46-54` | 116 × **20** | catastrophic |

**Action:** Add a global `min-h-[44px] inline-flex items-center` to every `<a>` and `<button>` that's a tappable target. The codebase already uses this pattern in `ElpNav.tsx:39` and `:53` — extend it system-wide. Don't rely on the visible padding — rely on the touch target.

### 2. Legibility — 2 / 4

`SMALL_FONTS` scan returned 20+ elements at 11–12px on mobile. Critical offenders:

| Text | Size | Where |
|---|---|---|
| `Open Daily · 10 AM – 10 PM` | **11 px** | `ElpHero.tsx:112` (`text-[11px]`) |
| `Delivery 8 AM – 11:55 PM` | **11 px** | `ElpHero.tsx:112` |
| `3854 Broadway` | **11 px** | `ElpHero.tsx:112` |
| Hours summary (footer) | **12 px** (`text-xs`) | `ElpFooter.tsx:56` |
| `★ 4.5  120+ verified reviews` rating pill | **12 px** | `ElpHero.tsx:35` `text-xs` |
| `$17 · 3 tacos + consomé` (signature subline) | **12 px** | `ElpConsomePour.tsx:270` |
| `Birria Braise / Tortillas Pressed` editorial stats labels | **11 px** | `ElpEditorial.tsx:106` |
| All category eyebrow lines | **12 px** uppercase 0.25em tracking | repeated |
| Footer phone-number labels | **10–12 px** | `ElpFooter.tsx:42, 56` |

Mobile baseline should be **14px for body**, **12px floor for caption** (and only when it's truly metadata). The site uses 11–12px for things a customer needs to read: hours, address, price line. The 0.25em tracking on tiny uppercase makes them visually thinner still.

**Action:** Raise `text-[11px]` → `text-xs`, `text-xs` → `text-sm` everywhere below 768px. Use the `sm:text-xs` pattern to keep desktop typography lean but mobile readable. Specifically fix hero footer strip (`ElpHero.tsx:112`) — that's the address strip a delivery customer needs.

### 3. Performance & weight — 2 / 4

- **Hero image is `priority` + `quality=88`** (`ElpHero.tsx:18,19`) — fine for LCP but no `loading=lazy` strategy for the steam background of the cinematic section, which is rendered at `quality=75` `sizes="100vw"` (`ElpConsomePour.tsx:107`) even though it's offscreen until the hero exits.
- **5 simultaneous full-bleed Next/Image fills** in the cinematic stage: steamDark, macroTaco, pourStream, brothBowl, dipImpact. All are `q=75–82`, all fight for memory during the sticky stage. Mobile will allocate ~20MB of decoded pixel buffers for one section.
- **No explicit `srcset` for low-DPI Android.** Next/Image generates responsive sources, but `sizes="(max-width:768px) 70vw, 50vh"` (`ElpConsomePour.tsx:160`) mixes viewport and vh units — Next.js can't optimally pick.
- **Framer-motion is loaded on initial render** for `ElpHero`, `ElpConsomePour`, `ElpEditorial`, `ElpReviews` — four `'use client'` components, four motion bundles. Tree-shaken but still adds parse cost.
- **Total document is 18,992px tall** on mobile — that's a lot of layout/paint for a single page.
- **No `priority={false}` discipline:** every Image in the cinematic section is lazy by default but eagerly fetched once the user starts scrolling — there's no `loading="lazy"` to verify since Next handles it; OK in practice, but no Service Worker.

**Action:** add `<link rel="preload" as="image" imageSrcSet>` only for the hero; downgrade cinematic images to `q=68` on mobile; lazy-defer `ElpConsomePour` behind a viewport intersection (already half-implemented at line 41–50; but the `<Image>` tags still render eagerly).

### 4. Choreography — 1 / 4

- **220vh sticky cinematic = ~1,860px lock on iPhone 13.** Test screenshots `sec-02` through `sec-04` show the user is held in this scene for 3 viewport scrolls. There is no "skip" link. A first-time mobile visitor is forced through the entire pour animation before reaching `#editorial`. Conversion-killer.
- **Scroll cue says "Scroll"** (`ElpHero.tsx:129`) but it pulses inside the hero — once the user actually scrolls, they enter another scroll-jacked stage. The cue is unintentionally a warning.
- **Stagger animations on `whileInView`** are present in `ElpEditorial`, `ElpReviews`, `ElpMenu best-sellers` — these can compound jank on mid-tier Android. Each motion node subscribes to scroll progress.
- **`prefers-reduced-motion` IS respected** (`ElpConsomePour.tsx:29, 89` + `globals.css:84`). Good. But the 220vh height is still rendered — reduced-motion users still scroll through 3 viewports of mostly-static frame.
- **Two layered scroll behaviors on the same axis:** the sticky cinematic + the framer `whileInView` triggers. This means the page does meaningful work on essentially every scroll tick from y=900 to y=2200.

**Action:**
- On `< md`, set `height: 120vh` on `ElpConsomePour` (saves ~700px of forced scroll).
- Add `<a href="#editorial" className="absolute top-3 right-3 text-xs underline">Skip ↓</a>` to the cinematic section.
- Replace `whileInView` with a single `fade-up` CSS class triggered by IntersectionObserver to cut framer-motion subscribers in half.

### 5. Accessibility — 2 / 4

- **Drawer width `max-w-sm` (384px) > Android viewport (360px).** `ElpNav.tsx:108`. The screenshot `sec-12-drawer.png` shows the right edge of the "ORDER ONLINE →" CTA bleeding off the visible area at 390 width — and on 360px Android it would be worse. Combined with `w-full` it currently covers the full screen, which means the **backdrop is invisible** — the user can't see the page underneath and can't tap-outside to dismiss except by Esc (which doesn't exist on touch). Tap-to-dismiss does work because the backdrop is still in the DOM, but visually the user has no signal.
- **No focus trap inside drawer.** Tab will escape the drawer behind the modal. The `aria-modal="true"` is set (`ElpNav.tsx:106`) but no `inert` on the rest of the document.
- **Map iframe lacks `loading="lazy"` is present (good)** but no `aria-label` beyond `title`, and no fallback for users who can't load Google Maps (CSP / privacy-mode blocking is common).
- **`-webkit-tap-highlight-color: transparent`** (`globals.css:34`) removes the default mobile tap flash. Combined with hover-only states (`:hover` on most links/buttons), iOS users get **zero feedback on tap** unless the page navigates. Need explicit `:active` styles.
- **Decorative emoji are NOT aria-hidden in many places** — `ElpFooter` "★", `ElpMenu` "★ Most Ordered" line `ElpMenu.tsx:34`, every category emoji inside the heading at `ElpMenu.tsx:108`. Screen readers will announce "tortilla star authentic Mexican birria" — confusing.
- **Landscape orientation: hero renders OK** at 844×390 — `min-h-[92vh]` collapses to ~358px, the headline truncates to "SLOW-BRAISED BIRRIA. HAND-PRESSED TORTILLAS…" with the third line "REAL MEXICO, REAL BROADWAY" cut off behind the rating pill stack. See `iphone13-landscape.png`.
- **Safe-area-inset** is correctly applied in the sticky bar (`ElpStickyBar.tsx:24`). But **not** applied to the bottom of the hero, footer, or main page — iPhone notch users get content slightly clipped.

### 6. Conversion / thumb zone — 2 / 4

- **Sticky bar is the only persistent CTA**, which is correct — but its three tiles are equally weighted (Order, Call, Map). For a restaurant pitch site, "Order" should be 60% width and "Call/Map" should be icon-tiles. Current layout (`ElpStickyBar.tsx:29` `flex-1` × 3) gives equal real estate to all three.
- **"Call" and "Map" tiles in sticky bar have border `border-2 border-[var(--brand-gold)]`** while Order has solid red. Visually competitive — Call is almost as loud as Order. Reduce border weight on secondary tiles.
- **The sticky bar appearance delay** triggers at `scrollY > 600` (`ElpStickyBar.tsx:13`). On a 92vh hero (~775px on iPhone 13), the bar appears before the user has finished reading the hero. Fine, but it then **immediately overlaps the hero phone-number link** at the bottom of the hero (`ElpHero.tsx:90`). Two CTAs to call the restaurant, vertically stacked, occluding each other.
- **Order section's "Order Direct" tile is 80px tall** (`ElpOrder.tsx:25` `h-20`) with a `transition hover:scale-[1.01]` — but hover isn't usable on touch. On mobile, this is a flat 80px white block with no perceived affordance beyond the `→` arrow.
- **Phone-number copy is inconsistent:** hero shows `(646) 891-1259`, footer shows three different phone numbers (`phone`, `phoneOrders`, `phoneAlt`), sticky bar says "Call" with no number. Customers calling will see three numbers and get confused.

**Action:**
- Make sticky bar Order tile `flex-[2]`, Call/Map `flex-1`.
- Remove hero phone CTA once `ElpStickyBar` is visible (both call the same number).
- Standardize on a single ordering phone number throughout.

---

## Visual Evidence

Captures stored under `.planning/ui-reviews/mobile-20260522-100240/` (gitignored):

- `iphone13-atf.png` — above-fold @ 390×844 (rating pill, headline, sub, dual CTA all crammed)
- `iphone13-full.png` — full 18,992px page (visualizes scroll fatigue)
- `iphone13-landscape.png` — 844×390 (hero overflow)
- `android-full.png` — 360×800 (drawer-width risk viewport)
- `sec-02..04-sticky-*.png` — cinematic scroll-jack stages
- `sec-05-editorial.png` — sticky bar already covering editorial transition
- `sec-08-menu-chips.png` — chip overflow + sticky bar over "Birria Tacos (1)" price
- `sec-10-order.png` — sticky bar covering Grubhub tile
- `sec-11-visit.png` — sticky bar covering hours rows + Saturday cut
- `sec-12-drawer.png` — drawer right-edge bleed, close X hidden by flag stripe

---

## Files Audited

- `src/components/ElpNav.tsx`
- `src/components/ElpHero.tsx`
- `src/components/ElpConsomePour.tsx`
- `src/components/ElpEditorial.tsx`
- `src/components/ElpStory.tsx`
- `src/components/ElpReviews.tsx`
- `src/components/ElpMenu.tsx`
- `src/components/ElpOrder.tsx`
- `src/components/ElpVisit.tsx`
- `src/components/ElpStickyBar.tsx`
- `src/components/ElpFooter.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
