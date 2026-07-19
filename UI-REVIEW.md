# El Pitallito — UI Review

**Audited:** 2026-05-22
**URL:** http://74.208.191.184/
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md present)
**Screenshots:** captured (desktop 1440, mobile 375, tablet 768, plus section captures)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Bilingual copy is strong, but "🇲🇽 Hecho con Orgullo" eyebrow is hardcoded Spanish in EN mode and "Pregunte por nuestro Especial del Día" is Spanish-only in the hero. |
| 2. Visuals | 1/4 | Zero food photography. Story section uses one giant emoji taco inside a flag-gradient rectangle. Hero relies on three blurred radial blobs and emoji fire. Embarrassing to ship for a restaurant. |
| 3. Color | 2/4 | Mexican-flag tricolor stripe appears in 5+ separate places (nav, hero, story, reviews, menu, footer), creating costume-shop overload. Gold accent applied to too many elements, weakening hierarchy. |
| 4. Typography | 2/4 | 11 distinct text sizes in use (xs through 7xl). Three competing bold-style weights (`font-bold`, `font-extrabold`, `font-black`) used 48 times across small components. Bebas Neue is the only display weight, then everything uppercase + tracked — visually monotonous. |
| 5. Spacing | 3/4 | Tailwind scale mostly consistent. Several `text-[10px]` and `text-[15px]` arbitrary one-offs in stats and reviews. Section vertical rhythm (py-20/py-28) is OK. |
| 6. Experience Design | 1/4 | **No mobile navigation menu.** Nav links are `hidden md:flex` with no hamburger fallback (ElpNav.tsx:23). Mobile users cannot jump to Menu/Story/Reviews/Visit. No loading or error states for the embedded Google Map iframe. No skip-link. Only one `aria-label` in the entire codebase. |

**Overall: 12/24** — Not shippable in current state.

---

## Top 3 Priority Fixes

1. **BLOCKER — Add a working mobile nav.** ElpNav.tsx:23 hides all section links on mobile with no hamburger. Mobile users land on the hero and have only "ORDER ONLINE" — they cannot reach Menu, Story, Reviews, or Visit without scrolling the entire page. **Fix:** add a hamburger button that toggles a sheet/drawer with the same 4 links + phone numbers.

2. **BLOCKER — Replace the emoji-as-imagery in Story and Hero with real food photos.** ElpStory.tsx:58-68 renders a 4:5 gradient rectangle with a single 🌮 emoji as the "hero image," plus floating 🌽 and 🌶️ in colored squares — looks like a placeholder a developer forgot to swap. ElpHero.tsx has no imagery at all (only blurred color blobs). For a restaurant client this reads as "the photo never arrived." **Fix:** ship at least 3 real photos — exterior, birria/tacos hero shot, hand-pressed tortillas. Add to `/public` and use `next/image` with `priority` on the hero.

3. **WARNING — Cut the flag-tricolor repetition from 5+ instances to 1.** `flag-stripe`/papel-picado/tricolor dot rows appear in ElpNav (line 12), ElpHero (47-49), ElpStory (20-22), ElpReviews (31-33), ElpMenu (top + bottom papel-picado lines 15, 142, dots 31-33), and ElpFooter (10). Visiting the page feels like a Cinco-de-Mayo party-supply store, not a restaurant. **Fix:** keep papel-picado only once (top of menu) and the 0.5px flag stripe in the nav. Remove the tricolor dot rows from Hero, Story, Reviews, and Menu. Let the brand red CTA do the work.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**Strengths:**
- "Authentic Mexico, on Broadway." headline (translations in site.ts) is strong and specific.
- Review quotes are concrete and not generic ("It feels like having a Mexican neighbor that cooks for you" — Brehona).
- CTA labels are direct: "Order Now," "See the Menu," "Get Directions."

**Defects:**
- **WARNING** ElpStory.tsx:13-15 — `"Hecho con Orgullo"` eyebrow is hardcoded Spanish even in English mode. Same problem at ElpFooter.tsx:24 (`"🇲🇽 Hecho con orgullo en Washington Heights"`).
- **WARNING** ElpHero.tsx:91 — `t.hero.special` is Spanish-only ("Pregunte por nuestro Especial del Día") in both languages per the rendered desktop screenshot. If intended as bilingual flavor, it should be obvious; if a translation bug, fix the EN string.
- **WARNING** ElpMenu.tsx:22 — eyebrow `"Menú · {cats.length} categorías"` is hardcoded Spanish; should switch with `t`.
- **WARNING** ElpVisit.tsx:23-25 — `"Visit · Visítanos"` is fine as bilingual decoration but inconsistent with the rest of the eyebrow system which uses `t.`.
- **WARNING** ElpReviews.tsx:110 — `"— Verified guest experience · Steven, General Manager"` is hardcoded English, not translated.
- **WARNING** ElpStory.tsx:31,35,41,47 — Stat labels "Platillos," "Since," "Auténtico" mix Spanish and English in the same row in EN mode. Pick a language per locale.
- **WARNING** ElpStory.tsx:53 — `"Delivery:"` label is hardcoded English even in Spanish locale.

### Pillar 2: Visuals (1/4)

**The single most embarrassing thing on this site is ElpStory.tsx:57-68.** The "story image" is a `bg-gradient-to-br` rectangle in flag colors with one `🌮` emoji at `text-7xl`, plus floating `🌽` and `🌶️` emojis in colored squares pinned to the corners. No photograph. A restaurant client will see this and assume the dev abandoned the project. **Hard requirement:** this must be a real photo before launch.

**Hero has the same problem.** ElpHero.tsx renders only blurred color blobs (lines 15-19) — no food, no interior, no people. The "trust badge" star and "Especial del Día" gold pill carry all the visual weight after the headline. For a 60/30/10 restaurant landing page, you need at least one strong food image above the fold.

**Other visual problems:**
- **BLOCKER** Zero `<img>` or `<Image>` tags in the entire `src/components` tree. The product is a restaurant. Ship without imagery is a non-starter.
- **WARNING** ElpStory.tsx:63-66 — emoji-on-colored-square decorations (🌽 in gold square, 🌶️ in cream square) read as Microsoft-Word-clipart in 2026.
- **WARNING** ElpHero.tsx:90-92 — `🔥 ... 🔥` flanking the special-of-the-day text. Twin-fire-emoji styling is amateur-tier.
- **WARNING** ElpReviews.tsx:97 — Service-standard story leads with a 🤝 emoji in a gold square. Same pattern. Replace with a small headshot of Steven or a real food photo from the dish in the story.

### Pillar 3: Color (2/4)

**60/30/10 audit:** Brand red is being asked to do too much (Order pill, Story image gradient, full Order section background gradient, footer accent, menu category active state). Brand gold is the second loudest color and shows up on every section's eyebrow, the trust pill, the stat numbers, the chili pepper-corn decorations, the service-standard card border, and the review quotation marks. That's not 10% accent — that's a second primary.

**Defects:**
- **WARNING** Tricolor patterns rendered in 6 places:
  - ElpNav.tsx:12 (`flag-stripe`)
  - ElpHero.tsx:47-49 (tricolor dot row)
  - ElpStory.tsx:20-22 (tricolor dot row)
  - ElpReviews.tsx:31-33 (tricolor dot row)
  - ElpMenu.tsx:15, 142 (papel-picado top + bottom) + 31-33 (tricolor dot row)
  - ElpFooter.tsx:10 (`flag-stripe`)
  Plus the `flag-stripe` is loaded globally with hard tricolor. Decorative-overload.
- **WARNING** ElpOrder.tsx:11 — Full red-to-darker-red-to-night gradient over the entire Order section makes the section feel like an emergency banner rather than a primary conversion zone.
- **WARNING** ElpStory.tsx:58 — `bg-gradient-to-br from-[var(--flag-green)] via-[#13100A] to-[var(--flag-red)]` is the laziest possible "Mexican" visual cue. Drop it.
- **WARNING** Hardcoded hex `#9a0820` at ElpOrder.tsx:11 — already exists as `--brand-primary-dark` (#9A0820). Use the token.
- **WARNING** Hardcoded `#13100A`, `#0a0703`, `#0E0A05` appear inline in Nav, Order, Footer, Hero. Centralize as `--surface-1`, `--surface-2`, etc.

### Pillar 4: Typography (2/4)

**Distribution from grep:**
```
text-xs(28) text-sm(27) text-base(14) text-3xl(8) text-lg(7)
text-5xl(6) text-4xl(6) text-2xl(6) text-xl(4) text-7xl(2) text-6xl(2)
font-extrabold(17) font-bold(17) font-black(14) font-semibold(7) font-medium(1)
```

**Defects:**
- **WARNING** Eleven distinct text sizes is too many for a single landing page. A restaurant page needs ~5: display, h2, body, small, micro.
- **WARNING** Three indistinguishable "very bold" weights are used interchangeably: `font-bold` (17×), `font-extrabold` (17×), `font-black` (14×). Pick two: regular (400) and black (900). Drop bold and extrabold.
- **WARNING** ElpStory.tsx:31, 35, 41, 47 — `text-[10px]` arbitrary stat labels. At 10px on retina/non-retina these will not pass WCAG 1.4.4 (resize to 200%) cleanly. Use `text-xs` (12px) minimum.
- **WARNING** Uppercase + `tracking-[0.25em]` + bold appears in 8+ eyebrows. Differentiate eyebrow vs. label vs. caption — right now they all look identical.
- **WARNING** ElpHero.tsx:88 — `script` font class defined in globals.css:89-92 (`Brush Script MT`, `Lucida Handwriting`) but never used. Dead CSS, or unfinished intent. Remove or apply.
- **WARNING** `--font-display: var(--font-display)` self-reference at globals.css:4 is a no-op alias chain; works only because `layout.tsx` already injects `--font-display`. Confusing.

### Pillar 5: Spacing (3/4)

**Distribution:**
- `px-4` (21×), `gap-2` (13×), `gap-3` (12×), `px-6` (9×) — healthy reuse of the 4/6 horizontal rhythm.
- Section vertical: `py-20 sm:py-28` is consistent across Story, Reviews, Visit, Order. Good.

**Defects:**
- **WARNING** Six instances of `text-[10px]` arbitrary value across Story, Order, Footer, Menu — convert to `text-xs` or define a `text-2xs` token.
- **WARNING** ElpReviews.tsx:67 — `sm:text-[15px]` arbitrary 15px. Use `sm:text-sm` or `sm:text-base`.
- **WARNING** Hero is `pt-12 sm:pt-20 md:pt-24` then an extra `pt-12 sm:pt-16` on the inner flex (ElpHero.tsx:10, 21). Two stacked top-paddings reading 24px + 48px = 72px feels arbitrary. Pick one.
- **WARNING** ElpVisit.tsx:91 — `h-[400px]` fixed iframe height won't scale gracefully on tall mobile; use `min-h-[300px] aspect-[4/5]` or similar responsive pattern.

### Pillar 6: Experience Design (1/4)

**Defects:**
- **BLOCKER** ElpNav.tsx:23 — Mobile nav is missing. The desktop link cluster is `hidden md:flex`. There is no `<button>` hamburger, no Sheet, no drawer. On mobile <768px the user sees only the EP logo, language toggle, and ORDER ONLINE pill. They cannot navigate to Menu, Story, Reviews, or Visit from the nav. **Confirmed in mobile screenshot.**
- **BLOCKER** ElpMenu.tsx — 21 category chips in a horizontal scroller (lines 38-56). On mobile this is essentially a wall of pills the user has to swipe through. No "jump to top" affordance after entering a long category. No category icon legend. No search.
- **BLOCKER** Menu category cards display 80+ items inline at once (lines 60-114). Page is multiple thousands of pixels tall on mobile. No collapse/expand per category. Combined with iframe map and reviews this is a punishing scroll.
- **WARNING** ElpVisit.tsx:77-93 — Google Maps iframe has no loading skeleton and no error/fallback for browsers/extensions that block third-party iframes. Add a `<noscript>` or fallback link to Apple/Google Maps.
- **WARNING** ElpOrder.tsx:39-77 — Five "delivery platform" buttons rendered as identical white-outlined pills with text-only labels (DoorDash, Uber Eats, Grubhub, Seamless, Call Us In). No logos. Lower trust + lower click-through than branded pills. Real users scan for the orange DoorDash logo or the green Grubhub mark.
- **WARNING** No `aria-label` on the EP logo link in ElpNav.tsx:14, no `aria-label` on the order CTA, no `aria-current="page"` on active category chip, no `aria-expanded` on (missing) mobile menu. Only `aria-label` in the codebase is on `LangToggle` (LangToggle.tsx:10).
- **WARNING** No skip-to-content link. Sticky nav (`top-0 z-50`) blocks scroll-anchor offset on smaller screens.
- **WARNING** Smooth scroll + `scroll-padding-top: 80px` (globals.css:28) — but the nav is 64px tall (`h-16`). Off by 16px; sections will sit too far down after anchor jump.
- **WARNING** ElpReviews.tsx:108-111 — `"— Verified guest experience · Steven, General Manager"` claims authenticity but the reviews have no review-platform link or screenshot. For a restaurant page legal review: either link to the live Seamless/Grubhub review or remove "Verified."
- **WARNING** No 404 page, no error boundary, no loading state for the language toggle.

---

## Specific "Amateur-Hour" List

These are the things a paying restaurant client will spot in 30 seconds and lose confidence:

1. Emoji taco as the story image (ElpStory.tsx:60). Looks like a placeholder.
2. Floating emoji corn and chili pepper in colored squares (ElpStory.tsx:63-66). Clip-art aesthetic.
3. `🔥 Pregunte por nuestro Especial del Día 🔥` (ElpHero.tsx:89-92). Twin fire emojis flanking text is a 2014 Tumblr pattern.
4. `🤝` emoji as the GM Steven story icon (ElpReviews.tsx:97). For a "real hospitality" story, this undercuts the message.
5. Tricolor dot row repeated four times in a single scroll. Reads as a flag-themed party site, not a Mexican restaurant.
6. Mobile nav vanishes. Mobile is >70% of restaurant traffic.
7. "ORDER ONLINE" pill in the nav AND "ORDER NOW" CTA in the hero AND a giant 80px white pill in the Order section AND a CTA at the bottom of Menu — same action labeled three different ways.
8. Three phone numbers shown in three places (hero, order, footer) with no clear "this is the one to call." Looks like the dev didn't know which to use.
9. Identical-looking white outline pills for DoorDash/Uber/Grubhub/Seamless — no brand recognition.
10. `Brush Script MT` declared but never applied. Either commit to the flair or remove.

---

## Files Audited

- `/Users/rayquinones/el-pitallito/src/components/ElpNav.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpHero.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpStory.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpReviews.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpMenu.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpOrder.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpVisit.tsx`
- `/Users/rayquinones/el-pitallito/src/components/ElpFooter.tsx`
- `/Users/rayquinones/el-pitallito/src/components/LangToggle.tsx`
- `/Users/rayquinones/el-pitallito/src/app/globals.css`
- `/Users/rayquinones/el-pitallito/src/app/layout.tsx`
- `/Users/rayquinones/el-pitallito/src/app/page.tsx`
- `/Users/rayquinones/el-pitallito/src/config/site.ts`

**Screenshots:** `/Users/rayquinones/el-pitallito/.planning/ui-reviews/audit-20260522-012055/`
