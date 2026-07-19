# El Pitallito — Accessibility Audit (WCAG 2.2 AA)

**Auditor**: Senior Accessibility Architect
**Date**: 2026-05-22
**Live**: http://74.208.191.184/
**Stack**: Next.js 16 + Tailwind v4 + Framer Motion
**Standard**: WCAG 2.2 Level AA

Severity legend:
- **CRITICAL** — blocks users with disabilities from completing core tasks (ordering, finding location, reading menu). Ship-blocker.
- **HIGH** — measurable WCAG 2.2 AA failure, fix before client review.
- **MEDIUM** — degrades experience for assistive-tech users, fix in next sprint.
- **LOW** — polish / best practice.

---

## SUMMARY SCORECARD

| Category | Status | Notes |
|---|---|---|
| Perceivable | FAIL | Multiple contrast failures on white/55, white/45, white/40 text; gold (#E6B229) on cream/gold tints; red-on-red gradients |
| Operable | FAIL | No skip link; no visible focus ring (Tailwind's default removed by `outline-none`-equivalent and never re-added); LangToggle has no state announcement; menu category chips behave as links but maintain `active` visual state — semantic mismatch |
| Understandable | FAIL | `<html lang="en">` is hardcoded but content switches to Spanish; no `lang` updates; Spanish words inside English context not marked with `lang="es"` |
| Robust | PARTIAL | iframe titled, structured-data present, but motion ignores `prefers-reduced-motion`; LangToggle button lacks `aria-pressed`/`aria-label` reflecting state |

**Overall verdict**: NOT WCAG 2.2 AA conformant. ~22 blocking issues. Estimated fix time: 4–6 hours.

---

## CRITICAL FINDINGS

### C1. `<html lang="en">` hardcoded while content is bilingual
**File**: `src/app/layout.tsx:73`
**WCAG**: 3.1.1 Language of Page (Level A), 3.1.2 Language of Parts (Level AA)
**Why fail**: Screen readers (NVDA, VoiceOver, JAWS) use `lang` to pick the speech synthesizer. Spanish text read with English phonetics is unintelligible. The site has a fully translated UI and even Spanish-mixed strings ("Visit · Visítanos", "Hecho con Orgullo").

**Fix**:
1. Move `<html>` rendering into a client wrapper or use Next.js metadata hook to set `lang` from cookie/state.
2. At minimum, surface `lang` on the `<body>` from `LangProvider`:

```tsx
// LangContext.tsx
useEffect(() => {
  document.documentElement.lang = lang
}, [lang])
```

3. Wrap Spanish phrases inside English context with `<span lang="es">…</span>`. Example:
```tsx
<p>Visit · <span lang="es">Visítanos</span></p>
```

---

### C2. No skip-to-main-content link
**File**: `src/app/page.tsx` (entire page)
**WCAG**: 2.4.1 Bypass Blocks (Level A)
**Why fail**: Keyboard and screen-reader users must tab through every nav link, language toggle, and order button on every page reload. The nav has 6 focusable items before reaching `<main>`.

**Fix**: Add at the top of `<body>` (before `<ElpNav>`):
```tsx
// page.tsx or layout.tsx body
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-xl focus:outline focus:outline-2 focus:outline-[var(--brand-primary)]"
>
  Skip to main content
</a>
```
Then add `id="main"` to the `<main>` in `page.tsx:16`. Add a `.sr-only` utility in `globals.css` (not provided by Tailwind v4 by default).

---

### C3. Color contrast — `text-white/55` on dark
**Files**: `ElpHero.tsx:112`, `ElpStory.tsx:31, 47, 52`, `ElpVisit.tsx:37, 43`, `ElpReviews.tsx:44, 77, 109`, `ElpMenu.tsx:94, 104`
**WCAG**: 1.4.3 Contrast (Minimum) (Level AA — 4.5:1 normal text, 3:1 large ≥18.66px bold or ≥24px)
**Measurement**: `#f5f1e6` at 55% over `#0E0A05` ≈ `#867d6f` → contrast ratio **3.86:1 against #0E0A05**. Fails AA for normal text. Most uses are `text-xs` (12px) or `text-[10px]` — categorically **fails**.

`text-white/45` (used in ElpMenu, ElpFooter) → ratio ~3.1:1 → fails both AA normal AND AA large.
`text-white/40` (footer copy) → ratio ~2.8:1 → fails.

**Fix**: Raise minimum opacity to `/70` for body, `/75` for small text. Replace all instances:
```bash
# pattern fix
text-white/55  → text-white/75
text-white/45  → text-white/70
text-white/40  → text-white/65
text-white/65  → text-white/80  (in red gradient sections; see C4)
```
Then re-verify with axe DevTools or `pa11y`.

---

### C4. Gold (`#E6B229`) on gold-tint chips fails contrast
**File**: `ElpHero.tsx:88` — gold text on `bg-[var(--brand-gold)]/10`
**Measurement**: `#E6B229` on `#0E0A05` over 10% gold tint ≈ effective bg `#241D11`. Foreground `#E6B229` → ratio **5.4:1** — actually passes AA normal but **fails AA large enhanced (4.5:1 OK for normal but the same chip uses `text-sm` italic on a busy gradient; safe but borderline).**
However: `text-[var(--brand-gold)]/85` (`ElpReviews.tsx:80`, `ElpStory.tsx:53`) on dark cards drops below 4.5:1.

**Fix**: Remove `/85` opacity wrappers on gold accents — they already work as full gold (`#E6B229` on `#0E0A05` = 9.4:1, passes AAA).

---

### C5. Red CTA on red gradient — `ElpOrder` section
**File**: `ElpOrder.tsx:11` and child anchors (`:43, 51, 59, 67, 73`)
**WCAG**: 1.4.11 Non-text Contrast (Level AA — 3:1 for UI components against adjacent colors)
**Why fail**: The `<a>` chips have `border-2 border-white/30 bg-white/10` over a `linear-gradient(... var(--brand-primary), #9a0820, #13100A)`. Where the gradient is darkest (#13100A), white/30 border = ~3.1:1 (passes). Where it's brightest red (#CE1126), white/30 border = **1.9:1 — fails**. The visual boundary of the button disappears against red background.

**Fix**: Bump border to `border-white/60` or use a solid border:
```tsx
className="... border-2 border-white bg-white/15 ..."
```
Or add a `ring-1 ring-black/20` to give a contrast against any background tone.

---

### C6. No focus-visible styles anywhere
**Files**: all interactive elements (ElpNav, ElpHero CTAs, ElpMenu chips, ElpOrder buttons, LangToggle, ElpVisit, ElpFooter)
**WCAG**: 2.4.7 Focus Visible (Level AA), 2.4.11 Focus Not Obscured (Min) (Level AA — new in 2.2), 2.4.13 Focus Appearance (Level AAA but recommended)
**Why fail**: Tailwind preflight removes default `outline` on focus for buttons in many browsers. None of the components add `focus-visible:ring-…` or `focus-visible:outline-…`. Keyboard users see no indication of where focus is.

**Fix**: Add a global focus style in `globals.css`:
```css
/* Add to globals.css */
:focus-visible {
  outline: 3px solid var(--brand-gold);
  outline-offset: 2px;
  border-radius: 4px;
}

/* And for elements that already have rounded corners, let outline-offset handle it */
a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible {
  outline: 3px solid var(--brand-gold);
  outline-offset: 3px;
}
```
This addresses WCAG 2.2 SC 2.4.11 (focus must not be obscured by sticky nav — `scroll-padding-top: 80px` already helps; verify with keyboard tabbing).

---

### C7. Framer Motion ignores `prefers-reduced-motion`
**Files**: `ElpHero.tsx` (8 `motion.*` animations), `ElpReviews.tsx` (cards stagger + standard callout), `FadeIn.tsx`
**WCAG**: 2.3.3 Animation from Interactions (Level AAA, but 2.3.1 Three Flashes is A and the wider intent — Reduced Motion preference is industry standard)
**Why fail**: Users with vestibular disorders, ADHD, or motion sensitivity get nausea/distraction from the entrance/scroll animations. Framer Motion ships a `useReducedMotion()` hook but it isn't used.

**Fix**: Wrap motion in `<MotionConfig>` at the root, or gate each animation:
```tsx
// In layout.tsx or a top-level client provider
import { MotionConfig } from 'framer-motion'
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```
This single line makes Framer Motion respect the OS preference. Verify with `prefers-reduced-motion: reduce` DevTools emulation.

---

## HIGH SEVERITY

### H1. Decorative emoji in headings/labels read aloud to screen readers
**Files**:
- `ElpNav.tsx:19` — "El Pitallito 🇲🇽" (flag emoji read as "Mexico flag")
- `ElpFooter.tsx:24` — "🇲🇽 Hecho con orgullo en Washington Heights"
- `ElpStory.tsx:60-67` — taco/corn/chili emoji as decorative content
- `ElpReviews.tsx:97` — handshake emoji as graphic
- `ElpMenu.tsx:51, 69` — category emoji NOT wrapped in `aria-hidden` (most others are)
- `ElpOrder.tsx:90, 105` — phone / warning emoji — `aria-hidden` IS applied (good)
- `ElpHero.tsx:90-92` — fire emoji wrapped (good)

**WCAG**: 1.1.1 Non-text Content (Level A), 1.3.1 Info and Relationships
**Issue**: Inconsistent treatment. Some emoji have `aria-hidden`, some don't. The decorative 🌮🌽🌶️ in ElpStory are large hero-graphics that screen readers will announce as "taco emoji, corn emoji, hot pepper emoji" inside an `<h2>` story section, polluting the announcement.

**Fix**:
```tsx
// ElpNav.tsx:19 — option A: drop the flag inside the brand name
<span ...>El Pitallito</span>

// option B: hide emoji from AT, expose as decoration
El Pitallito <span aria-hidden>🇲🇽</span>

// ElpStory.tsx:60 — the giant decorative taco div
<div role="img" aria-label="Taco illustration" className="...">
  <span aria-hidden>🌮</span>
</div>
// OR replace with real food photography (preferred for production)

// ElpMenu.tsx:51 — wrap category emoji
{c.emoji && <span aria-hidden>{c.emoji}</span>}  // already done ✓
// ElpMenu.tsx:69 — same in <h3>
{cat.emoji && <span aria-hidden>{cat.emoji}</span>}  // already done ✓ — good
```
Audit pass: ElpMenu is actually compliant on emoji; ElpNav, ElpFooter, ElpStory are not.

---

### H2. LangToggle button — missing state announcement
**File**: `src/components/LangToggle.tsx:8-18`
**WCAG**: 4.1.2 Name, Role, Value (Level A)
**Issue**: The button toggles between two states (EN active vs ES active) but only has a static `aria-label="Toggle language"`. Screen reader users don't hear which language is currently active, nor what will happen when activated. The visual cue (red color on active) is color-only — fails 1.4.1 Use of Color (Level A).

**Fix**:
```tsx
<button
  type="button"
  aria-label={lang === 'en'
    ? 'Switch to Spanish, currently English'
    : 'Cambiar a inglés, actualmente español'}
  aria-pressed={lang === 'es'}
  lang={lang}
  onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
  ...
>
  <span aria-hidden className={lang === 'en' ? 'text-[var(--brand-primary)] font-extrabold' : ''}>EN</span>
  <span aria-hidden className="text-white/30">/</span>
  <span aria-hidden className={lang === 'es' ? 'text-[var(--brand-primary)] font-extrabold' : ''}>ES</span>
</button>
```
Adding `font-extrabold` to the active state addresses 1.4.1 (color + weight, not color alone).

---

### H3. Sticky nav obscures focus on anchor jumps (WCAG 2.2 new SC)
**File**: `src/components/ElpNav.tsx:11` (sticky `top-0` z-50, ~64px tall + 2px stripe)
**WCAG**: 2.4.11 Focus Not Obscured (Minimum) (Level AA — **new in WCAG 2.2**)
**Status**: `globals.css:28` has `scroll-padding-top: 80px` which IS the right pattern. Verify it actually works when tabbing forward through `<a href="#menu">` etc. Manual test required.

**Fix (if testing shows the focused element is partially under nav)**: increase scroll-padding to 96px to leave a visible gap, or add `scroll-margin-top: 96px` on all `<section id>` targets.

---

### H4. Iframe map — `title` present (good) but lazy + no fallback
**File**: `src/components/ElpVisit.tsx:77-93`
**WCAG**: 2.4.1 Bypass Blocks, 4.1.2
**Status**:
- `title="Map to El Pitallito"` ✓
- `loading="lazy"` ✓
- BUT: keyboard tab into iframe = trap (Google Maps' own controls). Provide a text alternative link adjacent to it.
- Also: iframe focus is part of tab order. WCAG requires the iframe to be skippable, but Google Maps embedded is its own keyboard environment.

**Fix**: Add a non-iframe sibling link styled visually equal:
```tsx
<a
  href={site.contact.googleMapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="sr-only focus:not-sr-only ..."
>
  Open map in new tab (skip embedded map)
</a>
<iframe title="Map showing El Pitallito at 4467 Broadway, Washington Heights" ... />
```
Also: enrich the title with actual address — generic "Map to El Pitallito" is uninformative.

---

### H5. Menu category chips: anchor semantics + active state mismatch
**File**: `src/components/ElpMenu.tsx:40-55`
**WCAG**: 4.1.2 Name, Role, Value; 1.3.1 Info and Relationships
**Issue**: These are `<a href="#cat-…">` (correct — navigation to section) BUT they have an `active` state set via `useState` and `onClick`. The active state has no programmatic meaning — screen reader users hear identical chips and don't know which is "selected" (and conceptually, none should be — they're jump links, not filters).

**Fix**: Drop the `active` state visual entirely (or make it a real filter, which would then need `role="tablist"`/`tab`/`tabpanel`). Simplest:
```tsx
<a
  key={c.id}
  href={`#cat-${c.id}`}
  className="inline-flex ... border-white/15 bg-white/5 text-white/85 hover:border-[var(--brand-gold)] focus-visible:..."
>
  {c.emoji && <span aria-hidden>{c.emoji}</span>}
  {c.name}
</a>
```
Remove `useState`/`active`/`setActive`. If you want a true tab pattern, ask for a follow-up — that's a full ARIA tabs implementation.

---

### H6. Touch target sizes — language toggle and nav links too small
**Files**: `ElpNav.tsx:24-35` (nav links — no explicit height), `LangToggle.tsx:8` (h-9 = 36px, fails 44px)
**WCAG**: 2.5.8 Target Size (Minimum) (Level AA — **new in WCAG 2.2**, requires **24×24 CSS px** as minimum; 44×44 is AAA)
**Status**:
- `LangToggle` h-9 (36px) × ~80px wide → **passes WCAG 2.2 AA (24px min)**, but fails AAA (44px) and iOS HIG (44pt).
- Nav links (no explicit h) inside h-16 container → effective hit area = entire 64px height? No, only the text. Estimate 18px tall × ~60px wide. **Vertical fails 24px AA minimum.**
- Hero `<a>` tel link `:120` — inline text inside small text-xs row, way below 24px target.

**Fix**:
```tsx
// ElpNav.tsx — wrap each nav link with padding
<a href="#menu" className="inline-flex h-11 items-center px-2 transition hover:text-white">
  {t.nav.menu}
</a>
// LangToggle — bump to h-11 (44px) for AAA + iOS HIG
className="inline-flex h-11 items-center gap-1 ..."
// Hero tel link — wrap with focus-visible target zone:
<a href={`tel:...`} className="inline-flex min-h-[44px] items-center px-2 hover:text-white">
```

---

### H7. Heading hierarchy — missing `<h1>` semantics check + skipped levels
**Files**: `ElpHero.tsx:31` (h1), `ElpStory.tsx:16` (h2), `ElpReviews.tsx:24, 103` (h2 + h3), `ElpMenu.tsx:24, 68` (h2 + h3), `ElpOrder.tsx:14` (h2), `ElpVisit.tsx:26` (h2), `ElpFooter.tsx` — **no headings at all in footer columns** ("Visit", "Order & Connect" are `<p>`)
**WCAG**: 1.3.1 Info and Relationships, 2.4.6 Headings and Labels (Level AA), 2.4.10 Section Headings
**Issue**: Footer column titles ("Visit", "Order & Connect") are `<p>` — should be `<h2>` or `<h3>` to allow heading navigation.

**Fix**:
```tsx
// ElpFooter.tsx:29 + :61
<h2 className="text-xs uppercase tracking-wider text-[var(--brand-gold)]">Visit</h2>
// (h2 is fine; or use h3 if you want strict hierarchy under main's structure)
```

---

### H8. `<a>` used for in-page section jump with `onClick` side-effect
**File**: `src/components/ElpMenu.tsx:41-54`
**Status**: Currently the `onClick` only sets local state. If you keep H5's fix (drop the active state), this issue resolves itself. If you want a tab-style filter, change to `<button>` + `aria-controls`.

---

## MEDIUM SEVERITY

### M1. `text-[10px]` font size used in 6+ places
**Files**: `ElpStory.tsx:31, 35, 41, 47`, `ElpMenu.tsx:78, 104`, `ElpFooter.tsx:42`
**WCAG**: 1.4.4 Resize Text (Level AA — text must be resizable to 200%)
**Issue**: 10px text in bold uppercase is hard for low-vision users. WCAG doesn't mandate a minimum size, but combined with letter-spacing and uppercase, readability tanks.

**Fix**: Promote to `text-xs` (12px) minimum. Use color/weight contrast instead of small size.

---

### M2. Phone links — `tel:` is good, but no `aria-label` clarifying use
**Files**: `ElpHero.tsx:120`, `ElpOrder.tsx:86-100`, `ElpVisit.tsx:67`, `ElpFooter.tsx:36-54`
**WCAG**: 2.4.4 Link Purpose (In Context) (Level A)
**Issue**: Three phone numbers in footer with no distinguishing context — screen reader user hears "212-928-0700 link, 212-555-0123 link, 212-555-0124 link". No idea which is for orders vs general vs alt.

**Fix**:
```tsx
// ElpFooter.tsx — already labels orders, but extend
<a href={`tel:${site.contact.phoneOrdersE164}`} aria-label={`Call orders line ${site.contact.phoneOrders}`}>
  {site.contact.phoneOrders}
</a>
<a href={`tel:${site.contact.phoneE164}`} aria-label={`Call main line ${site.contact.phone}`}>
  {site.contact.phone}
</a>
```

---

### M3. Decorative bunting / papel picado / flag stripes — semantics OK
**Files**: `ElpNav.tsx:12`, `ElpHero.tsx:12`, `ElpMenu.tsx:15, 142`, `ElpFooter.tsx:10`, tricolor stripe spans in Hero/Story/Reviews/Visit
**Status**: All major decorative elements have `aria-hidden="true"` ✓. The tricolor `<span>` triplets in Hero/Story/Reviews/Visit/Menu are NOT individually aria-hidden — screen readers will read them as empty spans (likely silent, but lint-worthy).

**Fix (polish)**:
```tsx
// Wrap the tricolor row in a single aria-hidden parent
<div aria-hidden="true" className="flex items-center gap-1.5">
  <span className="h-1.5 w-16 rounded-full bg-[var(--flag-green)]" />
  <span className="h-1.5 w-16 rounded-full bg-white" />
  <span className="h-1.5 w-16 rounded-full bg-[var(--flag-red)]" />
</div>
```

---

### M4. Quote characters as decoration vs content
**File**: `ElpReviews.tsx:68, 70`
**Status**: Curly quotes wrapped in `aria-hidden` — but then the blockquote loses the visual cue programmatically. Better: leave quotes as plain text and let CSS `::before`/`::after` render decorative quotes. Or accept current — minimal impact since `<blockquote>` semantics already convey "this is a quote".

---

### M5. ElpOrder allergy callout — warning emoji with `aria-hidden`
**File**: `src/components/ElpOrder.tsx:104-107`
**Status**: Warning emoji is `aria-hidden` — but the visual warning intent is lost to screen reader users. Either expose with `role="img" aria-label="Warning"` OR convert the whole callout to:
```tsx
<div role="alert" aria-live="polite" className="...">
  <strong>Allergy notice:</strong> {t.order.allergyNote}
</div>
```
Using `role="alert"` is heavy here — the message is static, not dynamic. Better: add a `<strong>Allergy notice:</strong>` prefix so the semantic weight is in text, not emoji.

---

### M6. Hours table — not a real `<table>`
**File**: `src/components/ElpVisit.tsx:44-54`
**Status**: Days/hours rendered as `<ul><li><span>day</span><span>hours</span></li></ul>`. Acceptable for short data, but screen reader users navigating by table won't find this. Consider `<dl>` (description list):
```tsx
<dl className="mt-1 space-y-0.5 text-sm">
  {DAY_KEYS.map(([key, en, es]) => (
    <div key={key} className="flex justify-between gap-4 border-b border-white/5 py-1 last:border-b-0">
      <dt className="text-white/75">{lang === 'es' ? es : en}</dt>
      <dd className="font-semibold">{site.hours[key]}</dd>
    </div>
  ))}
</dl>
```

---

### M7. Maximum-scale: 5 in viewport — passes, but be aware
**File**: `src/app/layout.tsx:21`
**Status**: `maximumScale: 5` allows zoom — good. WCAG 1.4.4 requires support for 200%; capping at 500% is fine. If you ever lower this, you'll fail.

---

## LOW / POLISH

### L1. `:focus-visible` outline interaction with `-webkit-tap-highlight-color: transparent`
**File**: `globals.css:29`
Removing tap highlight is fine on mobile but compounds the lack of focus styles (C6). Once C6 is fixed, this is OK.

### L2. Scrollbar styling (webkit-only)
**File**: `globals.css:51-53`
Fine on Chromium/Safari. Firefox shows default. Not an a11y issue.

### L3. `::selection` color — verify contrast
`background: #CE1126; color: #fff` → 5.07:1 → passes AA. Good.

### L4. `overflow-x: hidden` on body
**File**: `globals.css:35`
Can interfere with sticky positioning + reflow at 400% zoom. Test at 400% zoom (WCAG 1.4.10 Reflow, Level AA). If horizontal scroll appears, you'll need to fix the offending element, not mask with `overflow-x: hidden`.

### L5. ElpNav brand link has no label
**File**: `ElpNav.tsx:14`
`<Link href="/">` containing the EP badge and brand text — accessible name is "EP El Pitallito 🇲🇽" (verbose). Cleaner:
```tsx
<Link href="/" aria-label="El Pitallito — home" className="flex items-center gap-2">
  <span aria-hidden ...>EP</span>
  <span aria-hidden className="hidden ... sm:inline">El Pitallito</span>
</Link>
```

### L6. JSON-LD — verify `ElpJsonLd.tsx` matches actual content
Not reviewed in detail — out of a11y scope but feeds SEO.

---

## WCAG 2.2 NEW CRITERIA — STATUS

| SC | Title | Level | Status |
|---|---|---|---|
| 2.4.11 | Focus Not Obscured (Minimum) | AA | NEEDS MANUAL TEST (sticky nav + anchor jumps) |
| 2.4.12 | Focus Not Obscured (Enhanced) | AAA | N/A for AA target |
| 2.4.13 | Focus Appearance | AAA | FAIL (no focus rings at all) |
| 2.5.7 | Dragging Movements | AA | PASS (no drag interactions) |
| 2.5.8 | Target Size (Minimum) | AA | FAIL (nav links, tel links) |
| 3.2.6 | Consistent Help | A | N/A (no help mechanism) |
| 3.3.7 | Redundant Entry | A | N/A (no forms) |
| 3.3.8 | Accessible Authentication (Minimum) | AA | N/A (no auth) |

---

## PRIORITIZED FIX ORDER (suggested sprint)

1. **C2** skip link (5 min)
2. **C6** global `:focus-visible` styles (10 min)
3. **C1** dynamic lang attribute (20 min)
4. **C7** MotionConfig reducedMotion (5 min)
5. **C3, C5** contrast pass — find/replace opacities (30 min)
6. **H1** emoji aria-hidden audit (15 min)
7. **H2** LangToggle aria-pressed (5 min)
8. **H5, H6** menu chip semantics + touch targets (30 min)
9. **H4** map link sibling (10 min)
10. **H7** footer headings (5 min)
11. **M1–M7** polish pass (45 min)

**Total**: ~3.5 hours coding + 1 hour QA with NVDA/VoiceOver + axe DevTools.

---

## TESTING CHECKLIST POST-FIX

- [ ] Run `axe DevTools` on http://74.208.191.184 — target 0 critical, 0 serious
- [ ] Run Lighthouse Accessibility — target ≥ 95
- [ ] Keyboard-only walkthrough: tab from URL bar through every interactive element, confirm focus visible on each
- [ ] VoiceOver (Mac) walkthrough: read entire page with VO+A, verify no "blank" or duplicated announcements
- [ ] NVDA (Windows) — same
- [ ] Zoom to 400% in Chrome (1280×1024 → effective 320×256) — verify no horizontal scroll except on the map iframe
- [ ] Toggle `prefers-reduced-motion: reduce` in Chrome DevTools — confirm Framer Motion animations are disabled
- [ ] Switch language EN ↔ ES — verify VoiceOver picks Spanish voice for Spanish content
- [ ] Verify all CTAs work via keyboard Enter/Space

---

*End of report. Re-audit recommended after fixes land.*
