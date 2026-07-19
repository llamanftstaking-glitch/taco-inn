# El Pitallito Frontend Code Review

src/components/ElpNav.tsx:19: Hardcoded emoji. Move "🇲🇽" to i18n config instead of inlined string.
src/components/ElpNav.tsx:31: Hardcoded "★ Reviews" string should use i18n key (e.g., `t.nav.reviews`).

src/components/ElpHero.tsx:90: Hardcoded emoji "🔥" in special badge. Move to i18n for consistency.
src/components/ElpHero.tsx:92: Hardcoded emoji "🔥" in special badge. Move to i18n for consistency.

src/components/ElpStory.tsx:14: Hardcoded string "Hecho con Orgullo" should be in i18n, not inline.
src/components/ElpStory.tsx:30: Magic string "80+" should be in config or derived from menu data. Breaks if menu grows.
src/components/ElpStory.tsx:35: Hardcoded "Since" label. Use i18n key.
src/components/ElpStory.tsx:47: Hardcoded "Auténtico" should be in i18n.

src/components/ElpReviews.tsx:21: Emoji "⭐" hardcoded; should be in i18n.
src/components/ElpReviews.tsx:110: Hardcoded "Verified guest experience · Steven, General Manager" string not in i18n.

src/components/ElpMenu.tsx:22: Hardcoded template literal "Menú · {cats.length} categorías" mixes i18n and code. Use i18n message with placeholder.
src/components/ElpMenu.tsx:118: Hardcoded "Tax not included · Prices subject to change without notice" should be in i18n.

src/components/ElpOrder.tsx:28: Hardcoded icon "★" inside text. Use i18n.
src/components/ElpOrder.tsx:90: Hardcoded emoji "📞" not in i18n.

src/components/ElpVisit.tsx:24: Hardcoded "Visit · Visítanos" mixed inline instead of in i18n.
src/components/ElpVisit.tsx:37: Hardcoded "Address" label. Use i18n.
src/components/ElpVisit.tsx:43: Hardcoded "Hours" label. Use i18n.

src/components/ElpFooter.tsx:19: Hardcoded "El Pitallito · Mexican Restaurant" instead of using `site.name` or i18n.
src/components/ElpFooter.tsx:29: Hardcoded "Visit" section label. Use i18n.
src/components/ElpFooter.tsx:61: Hardcoded "Order & Connect" section label. Use i18n.

src/components/ElpNav.tsx:15: Color inline `bg-[var(--brand-primary)]` repeated in multiple button styles across ElpNav, ElpHero, ElpOrder, ElpMenu. Extract to CSS class or component.
src/components/ElpHero.tsx:71: Inline `bg-[var(--brand-primary)]` shadow/style duplicated. Create reusable `PrimaryButton` component.
src/components/ElpMenu.tsx:127: Inline `bg-[var(--brand-primary)]` shadow/style. Use shared button component.
src/components/ElpOrder.tsx:25: Button styling repeated across Order section. Consolidate to component.

src/components/ElpHero.tsx:35: Arbitrary `text-5xl sm:text-6xl md:text-7xl` font sizes. Consider using standardized scale (e.g., `text-h1-mobile`, `text-h1-tablet`).
src/components/ElpStory.tsx:16: `text-3xl sm:text-4xl md:text-5xl` heading scale differs from Hero. Inconsistent Tailwind spacing/sizing.

src/components/FadeIn.tsx:11: Unused prop type `direction` accepts "down", "left", "right" but only applied to initial state; `animate` always resets to `{ x: 0, y: 0 }` regardless. Direction change on animate is broken.

src/components/ElpReviews.tsx:59: CSS class string `from-white/[0.06] to-white/[0.01]` uses opacity values outside standard Tailwind scale. Use predefined opacity vars.
src/components/ElpMenu.tsx:64: Same pattern `from-white/[0.04] to-white/[0.01]`. Not in Tailwind defaults, reduces maintainability.

src/components/ElpNav.tsx:11: Inline color values `border-white/5 bg-[#0E0A05]`. Use CSS var fallback or create `--nav-bg` in globals.css.
src/components/ElpHero.tsx:10: Hardcoded `bg-[#0E0A05]` instead of `bg-[var(--brand-night)]` for consistency.
src/components/ElpStory.tsx:9: `bg-[#13100A]` different shade from Hero's `#0E0A05`. Create CSS vars for section backgrounds to maintain consistency.

src/components/ElpJsonLd.tsx:41: Hardcoded `acceptsReservations: 'False'` as string literal. Should be boolean `false`.
src/components/ElpJsonLd.tsx:42: Hardcoded founding date `"${site.foundingYear}-07"` assumes July. Should be configurable in site.ts.
src/components/ElpJsonLd.tsx:79-80: Hardcoded hours `opens: '10:00', closes: '22:00'` don't match `site.hours` object. Will diverge if hours change — use site.hours instead.

src/components/ElpHero.tsx:103: Hardcoded delay timings (0.4, 0.5, 0.6, etc.) scattered throughout animations. No constants define animation rhythm — fragile to tweak.

src/components/ElpReviews.tsx:52-84: Review card key uses `r.author` which may not be unique. Risk of React key collision if two reviews share same author name. Use array index or add `id` field to review object.

src/context/LangContext.tsx:20-24: Cookie parsing with manual split/find is fragile. No error handling if cookie is malformed. Use library or add try-catch.

src/app/layout.tsx:66: Hardcoded Spanish URL slug `/?lang=es`. Use dynamic route prefix or canonical alternate link for ES version.

src/components/ElpMenu.tsx:10: State `active` initialized but click handler uses `onClick` with `setActive` — no validation that `c.id` exists. If data changes, state becomes stale.

src/components/ElpOrder.tsx:38-77: 5 duplicate `.flex h-14 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 px-4 text-sm font-extrabold uppercase tracking-wider text-white backdrop-blur transition hover:bg-white/15` button blocks. Extract to component or loop.

src/components/ElpVisit.tsx:76: `<iframe>` missing `allow="geolocation"` or `allow="fullscreen"` — modern best practice for embedded maps. Add explicit permissions.

src/components/ElpReviews.tsx:62-64: Star rating render using `Array.from({ length: r.rating })` with empty unused element in destructure. Cleaner: `Array.from({ length: r.rating }, (_, j) =>`.

src/app/globals.css:53: Scrollbar color `#3a1a1f` hardcoded instead of using CSS var like `var(--flag-red-dark)`.

src/components/ElpHero.tsx:103: `.toFixed(1)` magic number 1. If display changes to 2 decimals, must hunt code. Add `const RATING_DECIMALS = 1` to config.

src/components/ElpStory.tsx:39: Same `.toFixed(1)` repeated without constant.

src/components/ElpNav.tsx:11: `z-50` uses arbitrary z-value without scale. Consider adding `--z-nav: 50` to globals.css for consistency with modals/dropdowns elsewhere.

src/components/ElpFooter.tsx:9: `text-white` applied to footer; no dark-mode alternative. If dark mode added later, orphaned styling.

src/components/ElpOrder.tsx:105: Emoji "⚠️" in allergy callout not wrapped in `aria-hidden`. Affects screen reader flow.

src/components/ElpStory.tsx:58-68: Emoji placeholders (🌮, 🌽, 🌶️) render without alt/aria-label. Decorative but could add `aria-hidden="true"` for clarity.

src/components/ElpNav.tsx:42: Link `rel="noopener noreferrer"` correct but link opens in same tab. Restaurant ordering typically wants new tab — consider `target="_blank"` on order links for consistency.

src/app/globals.css:46: Media query `max-width: 768px` targets input font size to prevent zoom on iOS. Good practice but not documented. Add comment.

src/app/globals.css:94-102: `.masa-bg` background pattern uses hardcoded colors `rgba(230, 178, 41, 0.06)` instead of CSS vars. If brand colors change, pattern breaks.

src/components/ElpHero.tsx:16: Blur `blur-[120px]` and `blur-[100px]` — hardcoded blur values without pattern. Use Tailwind blur scale consistently.

src/context/LangContext.tsx:32: Cookie `max-age=${60 * 60 * 24 * 365}` hardcoded calculation. Use constant `const COOKIE_MAX_AGE_SECONDS = 365 * 24 * 60 * 60`.

src/components/ElpNav.tsx:1: `'use client'` directive at top — component works but Framer Motion in ElpHero also client-side. Ensure hydration stable; no SSR mismatch on initial mount.

src/components/ElpReviews.tsx:56: `viewport={{ once: true, margin: '-80px' }}` magic number `-80px` — same as nav sticky height 80px (from globals.css line 28). Use CSS var to sync.

src/components/ElpMenu.tsx:5: Importing `useState` but exported component is async-compatible. Verify no Next.js 15+ Server Component warnings if wrapped.

src/app/page.tsx:16: `<main>` wraps section components but no `role="main"` — implicit but HTML5 `<main>` element is better than generic div with role.

src/components/ElpHero.tsx:10-19: 3 background blur divs with `-z-10` stacked — no z-index values between them. If reordered, visual hierarchy breaks silently.

src/config/site.ts:123-142: Color duplicates: `brand` object redefines flag colors already in CSS. If CSS var changes, site.ts stays stale. Consider single source in CSS or move all to site.ts.

src/components/ElpVisit.tsx:50-54: Day abbreviations hardcoded in DAY_KEYS array. No sync with `site.hours` keys. If hours data structure changes, must update both.

src/components/ElpHero.tsx:38: `text-balance` class (Tailwind v4) — ensure next/font Google font subsets include required glyphs. No error if missing but text reflow broken.

src/components/ElpFooter.tsx:10: `flag-stripe h-1 w-full` — height `h-1` (4px) differs from ElpNav `h-0.5` (2px). Inconsistent flag stripe sizing.

src/app/globals.css:26-30: `scroll-behavior: smooth` + `scroll-padding-top: 80px` works but no media query for `prefers-reduced-motion`. Add `@media (prefers-reduced-motion) { scroll-behavior: auto }`.

src/components/ElpOrder.tsx:27: Absolute positioned badge `span` uses `-top-px` (1px offset) — fragile. If parent padding changes, badge misaligns. Use `inset-y-0` + flexbox instead.

src/components/LangToggle.tsx:14-16: Language toggle uses ternary for color but no focus/keyboard nav visual. Button lacks `focus:outline-none focus:ring-2` — accessibility gap.

src/components/ElpMenu.tsx:86: `key={it.name}` in list — if menu has duplicate dish names across categories, React key collision. Use `key={`${cat.id}-${it.name}`}` or add id to MenuItem type.
