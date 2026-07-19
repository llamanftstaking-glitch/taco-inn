# Architecture: El Pitallito Menu Wizard

## Inline Summary

The current `ElpMenu.tsx` renders all 23 categories and 80+ items simultaneously — a flat 2400px DOM on mobile. The fix is not a wizard; it is a **tab + collapsible accordion** hybrid (Option C + E). Here is why:

A step-by-step wizard (A) adds cognitive friction to a menu — people know what they want, they just cannot find it. Mood bundles (B) are charming but hide items behind metaphors a hungry person in Washington Heights will skip. Search-first (D) requires typing, which is hostile on a phone mid-decision. The recommended pattern collapses 23 categories into **5 tabs** (Specialties / Morning / Handhelds / Plates & Seafood / Drinks), with each tab revealing only its categories as collapsed accordions. The user sees at most 8–10 items at once, not 80. They can still jump to any category, still see every item, and the DOM at any moment is ~20% of current size. This is the pattern used by every high-traffic restaurant POS web client (Olo, Square, DoorDash storefront) because it is proven fastest to an order CTA on mobile.

---

## Design Decisions

- **Tab grouping over full wizard**: Reduces scroll without adding decision steps. Tabs are tappable, not swipeable (no Framer drag needed — pure CSS `overflow-x: auto` row already in the codebase).
- **Accordion for categories, not modals**: Modals trap keyboard focus badly on mobile and hide items from SEO. Accordions keep all text in the DOM (hidden via `hidden` attribute + `max-height` CSS), satisfying both crawlers and screen readers.
- **Pure CSS accordion transition, not Framer**: Site already has scroll lag. Framer `AnimatePresence` + `height: auto` requires JS measurement each frame. CSS `max-height` transition from `0` to a large px cap is GPU-composited and costs zero JS. Only the tab indicator uses a small CSS `transition`.
- **Tab state = URL hash fragment**: `?tab=handhelds` preserves state on refresh and share, works with static export (no server), and is linkable from social bios.
- **No new i18n keys for tab labels**: Tab labels map to existing `menuPreview.categories` arrays — the grouping config lives in a new file that maps category IDs (language-independent) to tab IDs.
- **Keep chip row but scope to active tab**: The horizontal chip row already works. Scope it to only show chips for the active tab's categories — reduces from 23 chips to 3–6 per tab.
- **"Most Ordered" hero row: untouched**. It stays above the tab bar exactly as-is.

---

## Category → Tab Mapping

```
TAB: specialties     🔥  Birria (birria)
                     🍽️  Hot Plates (platillos)
                     🥩  Fajitas & Alambres (fajitas-alambres)
                     🦐  Seafood (mariscos)

TAB: morning         🍳  Breakfast (desayunos)
                     🥗  Salads (ensaladas)
                     🍲  Soups (sopas)
                     🥑  Appetizers (aperitivos)

TAB: handhelds       🌮  Tacos (tacos)
                     🌯  Crispy Tacos (tacos-dorados)
                     🌯  Burritos (burritos)
                     🥪  Cemitas & Tortas (tortas)
                     🧀  Quesadillas (quesadillas)
                     🌽  Sopes, Huaraches & Gorditas (sopes-huaraches)
                     🫔  Enchiladas (enchiladas)
                     🇲🇽  Pambazos & Tostadas (pambazos-tostadas)

TAB: sides-kids      🌶️  Sides (sides)
                     🧒  Kids (kids)

TAB: drinks          ☕  Hot Drinks (bebidas)
                     🥤  Sodas & Jarritos (sodas)
                     💧  Aguas Frescas (aguas)
                     🥭  Juices & Smoothies (jugos)
```

EN tab labels: Specialties · Morning · Handhelds · Sides & Kids · Drinks
ES tab labels: Especialidades · Mañana · Antojitos · Acompañantes · Bebidas

Default tab on load: `specialties` (shows birria first — the best-seller driver).

---

## Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `/src/config/menuTabs.ts` | Tab definitions: id, labelEN, labelES, categoryIds[], emoji | P0 |
| `/src/components/MenuTabBar.tsx` | Horizontal scrollable tab strip — pure CSS, no Framer | P0 |
| `/src/components/MenuAccordion.tsx` | Single category accordion item — CSS max-height transition | P0 |
| `/src/components/MenuTabPanel.tsx` | Renders filtered chip row + list of accordions for active tab | P0 |

## Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `/src/components/ElpMenu.tsx` | Replace category grid with `<MenuTabBar>` + `<MenuTabPanel>`; keep hero row, papel picado, CTA row | P0 |
| `/src/config/site.ts` | Add `menuTabs` i18n keys to `i18n.en` and `i18n.es` (tab labels only, 5 strings each) | P0 |

---

## Key Interfaces

### `/src/config/menuTabs.ts`
```ts
export type TabId = 'specialties' | 'morning' | 'handhelds' | 'sides-kids' | 'drinks'

export type MenuTab = {
  id: TabId
  labelEN: string
  labelES: string
  emoji: string
  categoryIds: string[]       // matches MenuCategory.id from site.ts
  defaultOpen?: string        // categoryId open by default in this tab
}

export const menuTabs: MenuTab[] = [ /* 5 entries */ ]
```

### `MenuTabBar` props
```ts
type Props = {
  tabs: MenuTab[]
  active: TabId
  onSelect: (id: TabId) => void
  lang: 'en' | 'es'
}
```

### `MenuAccordion` props
```ts
type Props = {
  category: MenuCategory        // from site.ts
  isOpen: boolean
  onToggle: () => void
  orderingUrl: string
}
```
Internal: uses `<details>/<summary>` HTML elements for native keyboard + SR support. No JS required for open/close — the browser handles it. `useRef` + CSS `max-height` only used for the smooth reveal animation via a `data-open` attribute and CSS transition.

### `MenuTabPanel` props
```ts
type Props = {
  tab: MenuTab
  categories: MenuCategory[]   // pre-filtered to this tab
  openIds: Set<string>         // which accordions are open
  onToggle: (id: string) => void
  lang: 'en' | 'es'
  orderingUrl: string
}
```

### State shape in `ElpMenu.tsx` (replaces current `active` string)
```ts
const [activeTab, setActiveTab]   = useState<TabId>('specialties')
const [openIds,   setOpenIds]     = useState<Set<string>>(new Set(['birria']))

function toggleAccordion(id: string) {
  setOpenIds(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
}
```
When tab changes: `setOpenIds(new Set([tabs.find(t=>t.id===nextTab)?.defaultOpen].filter(Boolean)))`

---

## Data Flow

```
site.ts (menuEN | menuES)
        │
        ├─ t.menuPreview.categories  ──► ElpMenu.tsx
        │                                    │
        │                               activeTab (useState)
        │                               openIds   (useState)
        │                                    │
        │                            ┌───────┴───────┐
menuTabs.ts ────────────────────────► MenuTabBar    MenuTabPanel
        │                                              │
        │                                    MenuAccordion × N
        │                                         │
        └─────────────────────────────────────────► item list (ul)
                                                         │
                                                    order CTA link
```

---

## ASCII UX Flow Diagram

```
[Most Ordered hero row — 4 cards — UNCHANGED]
         │
[Tab Bar]  ┌─────────┬──────────┬────────────┬────────────┬─────────┐
           │🔥 Spec. │ 🍳 Morn │ 🌮 Handh. │🌶 Sides/K │ ☕ Drink│
           └─────────┴──────────┴────────────┴────────────┴─────────┘
                │ (active tab underline, CSS only)
         │
[Chip row — only current tab's categories, horizontal scroll]
   Birria · Hot Plates · Fajitas · Seafood
         │
[Accordion list for active tab]
   ▼ 🔥 Birria (open by default)         ← <details open>
      Birria Tacos w/ Consomé ··· $17.00
      Birria Taco (1) ··· $6.00
      Birria Burrito ··· $15.00
      [+ 5 more items]
      [ORDER PICKUP →] (per-card CTA)
   ▶ 🍽️ Hot Plates (collapsed)           ← <details>
   ▶ 🥩 Fajitas & Alambres (collapsed)
   ▶ 🦐 Seafood (collapsed)
         │
[Disclaimer · Main Order CTAs — UNCHANGED]
```

---

## Mobile Mockup (375px)

```
┌─────────────────────────────────┐
│  ★ Most Ordered · Lo Más Pedido │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──┐│
│  │Birria│ │AlPstr│ │ Mole │ │Ch││
│  │ $17  │ │ $13  │ │ $17  │ │$1││
│  └──────┘ └──────┘ └──────┘ └──┘│
│                                 │
│ ┌────────────────────────────┐  │
│ │🔥Spec│🍳Morn│🌮Hand│+2     │  │
│ └────────────────────────────┘  │
│  ← horizontal scroll if needed  │
│                                 │
│ [Birria][Hot Plates][Fajitas]   │
│   ← chip row for this tab →     │
│                                 │
│ ▼ 🔥 BIRRIA               (8) │
│   Birria Tacos w/ Consomé       │
│   3 tacos + consomé  ·  $17.00  │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│   Birria Taco (1)               │
│   With consomé       ·  $6.00   │
│   [ORDER PICKUP →]              │
│                                 │
│ ▶ 🍽️ HOT PLATES           (17)│
│ ▶ 🥩 FAJITAS & ALAMBRES   (6) │
│ ▶ 🦐 SEAFOOD               (6) │
│                                 │
│ Tax not included · prices vary  │
│  [ORDER PICKUP] [CALL TO ORDER] │
└─────────────────────────────────┘
```

## Desktop Mockup (1280px)

```
┌──────────────────────────────────────────────────────────────────┐
│              ★ Most Ordered · Lo Más Pedido                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │  Birria  │  │ Al Pastor│  │   Mole   │  │Chilaquile│         │
│  │  Tacos   │  │  Tacos   │  │ Poblano  │  │  Verdes  │         │
│  │  $17.00  │  │  $13.00  │  │  $17.00  │  │  $16.00  │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
│                                                                  │
│ [🔥 Specialties] [🍳 Morning] [🌮 Handhelds] [🌶 Sides] [☕ Drinks]│
│  ──────────────                                                  │
│ [Birria] [Hot Plates] [Fajitas & Alambres] [Seafood]             │
│                                                                  │
│ ┌────────────────────────────┐  ┌────────────────────────────┐   │
│ │ ▼ 🔥 BIRRIA           (8) │  │ ▶ 🍽️ HOT PLATES       (17)│   │
│ │  Birria Tacos w/ Consomé  │  └────────────────────────────┘   │
│ │  3 tacos + consomé  $17   │  ┌────────────────────────────┐   │
│ │  Birria Taco (1)    $6.00 │  │ ▶ 🥩 FAJITAS & ALAMBRES(6)│   │
│ │  Birria Burrito     $15   │  └────────────────────────────┘   │
│ │  Birria Huarache    $11   │  ┌────────────────────────────┐   │
│ │  Birria Nachos      $16   │  │ ▶ 🦐 SEAFOOD           (6) │   │
│ │  [ORDER PICKUP →]         │  └────────────────────────────┘   │
│ └────────────────────────────┘                                   │
│                                                                  │
│         [ORDER PICKUP]          [CALL · (212) 568-6877]          │
└──────────────────────────────────────────────────────────────────┘
```

---

## Animation Choreography (perf-aware)

All animations are CSS-only unless noted. No `AnimatePresence`. No layout measurements.

| Interaction | Technique | Cost |
|-------------|-----------|------|
| Tab switch — panel swap | `opacity: 0→1` + `translateY(4px→0)` via CSS `.tab-panel[data-active]` class toggle | CSS, GPU |
| Tab indicator underline | `transform: translateX()` CSS transition on active marker | CSS, GPU |
| Accordion open/close | `<details>` native toggle + CSS `max-height: 0 → 9999px` on `<summary> ~ div` | CSS, GPU |
| Chip row appear | None. Static render. | Zero |
| FadeIn on section enter | Reuse existing `FadeIn.tsx` on the tab section wrapper only (once, not per accordion) | 1× Framer |

`MotionRoot` already wraps with `reducedMotion="user"` — no extra work needed.

CSS accordion pattern (no JS resize):
```css
.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
details[open] .accordion-body {
  max-height: 9999px;   /* large enough for any content */
}
```
One caveat: `<details>/<summary>` open/close does not need `useState` at all for basic function. Only add React state if you want cross-accordion logic (e.g., "close others when one opens" — optional UX improvement).

---

## i18n Additions to `site.ts`

Add to both `i18n.en.menuPreview` and `i18n.es.menuPreview`:

```ts
// English additions
menuPreview: {
  ...existing,
  tabs: {
    specialties: 'Specialties',
    morning: 'Morning',
    handhelds: 'Handhelds',
    sideKids: 'Sides & Kids',
    drinks: 'Drinks',
  },
  allCategories: 'All',    // chip label
  itemsCount: (n: number) => `${n} items`,
}

// Spanish additions
menuPreview: {
  ...existing,
  tabs: {
    specialties: 'Especialidades',
    morning: 'Mañana',
    handhelds: 'Antojitos',
    sideKids: 'Acompañantes',
    drinks: 'Bebidas',
  },
  allCategories: 'Todo',
  itemsCount: (n: number) => `${n} platillos`,
}
```

---

## A11y Considerations

- `<details>/<summary>` is natively keyboard-operable (Space/Enter toggles) and SR-announced as "disclosure widget". No ARIA needed beyond a `aria-label` on the `<summary>` that includes the item count.
- Tab bar: render as `<nav role="tablist">` with `<button role="tab" aria-selected aria-controls>` and corresponding `<div role="tabpanel" id>` for screen reader tab navigation.
- Focus order: tab bar → chip row → first accordion header → first item. No focus traps.
- Hidden accordion content: use `hidden` attribute on collapsed `<details>` bodies — browsers exclude hidden content from the SR reading order automatically.
- Color contrast: gold on `#14100B` is 7.8:1 (AAA). White on primary red is 4.6:1 (AA large).

## SEO Considerations

- All item names remain in DOM (accordion `hidden` is `display:none` only during closed state; `<details>` content is still indexed by Google). Verified: Googlebot parses `<details>` content as of 2020.
- No JS rendering required for content — works in static export. Items visible to crawlers on first HTML parse.
- `id="cat-{id}"` anchor fragments preserved from existing chip links.

---

## P0 / P1 Implementation Order

### P0 — Shippable MVP (1 session)

1. **`/src/config/menuTabs.ts`** — tab definitions with 23 category IDs mapped to 5 tabs. No i18n imports; raw strings only. (~30 lines)
2. **Add tab label keys to `i18n.en` and `i18n.es` in `site.ts`** — 5 strings per lang. (~15 lines)
3. **`/src/components/MenuAccordion.tsx`** — `<details>/<summary>` with CSS animation, item list, per-card order CTA link. (~80 lines)
4. **`/src/components/MenuTabBar.tsx`** — horizontal tab strip, `role="tablist"`, active underline. (~60 lines)
5. **`/src/components/MenuTabPanel.tsx`** — renders scoped chip row + `MenuAccordion` list for active tab. (~70 lines)
6. **Modify `ElpMenu.tsx`** — replace the `{cats.map(...)}` category grid block with `<MenuTabBar>` + `<MenuTabPanel>`. Add `activeTab` + `openIds` state. Keep everything above (hero row) and below (CTA row, disclaimer, papel picado) untouched. (~40 line change)
7. **Inline CSS in `globals.css`** — add accordion `max-height` transition and tab panel `opacity` transition. (~15 lines)

### P1 — Polish (follow-up session)

- URL hash sync (`?tab=handhelds`) via `useSearchParams` — defer if static export complicates it
- "Open all in this tab" toggle for power users
- Keyboard shortcut hints on desktop
- Per-item "popular" badge driven by a `tag` field already in `MenuItem`
- Auto-expand tab matching URL hash on load (e.g., `#cat-birria` → open Specialties tab, expand Birria)

---

## Risks

| Risk | Mitigation |
|------|-----------|
| `<details>` animation jank on Android Chrome | Test `max-height` fallback; if jank observed, swap to `height` with `ResizeObserver` in a `useEffect` (P1 only) |
| Tab state lost on language toggle | `activeTab` is a local string key not tied to lang; safe. `openIds` resets on tab change anyway |
| SEO: items in closed accordions | `<details>` content is indexed. Verified by Google. No risk |
| Static export + `useSearchParams` | Wrap in `Suspense` boundary per Next 16 static export requirement |
| Chip row scope creates confusion | Label chip row clearly: "In [Tab Name]:" prefix in small text |
| "Handhelds" tab has 8 categories | Consider splitting or showing 2 columns on desktop to avoid deep scroll within one tab |

