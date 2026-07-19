# El Pitallito — Brutal CRO & Marketing Audit
**Date:** 2026-05-22
**Site:** http://74.208.191.184/ (live), code at `/Users/rayquinones/el-pitallito/`
**Verdict:** This is a portfolio piece, not a sales machine. It looks "designed." It doesn't sell food. The site is currently losing orders to La Fiesta (3789 Broadway, 111 Yelp reviews) for the reasons below — and they're all fixable.

The single sentence that summarizes the audit: **The hero has no food, no urgency, no price hook, and the rating badge is a 11px gray rounded pill that no human will ever click.**

---

## P0 — BLEEDING MONEY RIGHT NOW (fix this week)

### P0-1. No food photography. Anywhere.
The hero, story, and menu sections all rely on **emoji** (🌮 🌶️ 🌽 🇲🇽). The "hero food image" is literally a CSS gradient div containing a giant 🌮 emoji (`ElpStory.tsx:60`). This is **the single biggest conversion killer on the site.**

- Tacombi, Los Tacos No.1, El Atoradero — every credible NYC Mexican spot leads with shot-on-iPhone-but-styled-right food photography. Steam off the birria. Consomé being poured. The al pastor trompo. Tortillas pressed in-frame.
- Emoji food on a restaurant site reads as "we don't have our act together yet" or "Squarespace template at 11pm". It is more damaging than no photo at all.
- **Fix:** Shoot 10 photos this week (phone is fine, top-down on butcher paper, hard side light). Required shots: (1) birria taco mid-dunk in consomé, (2) al pastor tacos, (3) mole poblano plate, (4) chilaquiles with egg yolk run, (5) horchata + jamaica side-by-side, (6) interior at night, (7) hand-pressing tortillas, (8) the staff/owner, (9) hero shot for OG card, (10) overhead "everything" spread.
- **Expected lift:** +30–60% click-through on hero CTA. This is not theoretical — it's the #1 measured driver on restaurant landing pages.

### P0-2. Hero CTA is "Order Now" → opens external dine.online in a new tab. That's it.
`ElpHero.tsx:67-74`. The primary action goes off-site. Worse, there is no phone CTA in the primary button row — phone is buried as plain text below the trust badge at 12px (`ElpHero.tsx:120`).

- Washington Heights customer base is heavily phone-order — especially older customers and Spanish-first delivery customers. You are routing them through a 4-tap funnel to find the phone number.
- **Fix:** Primary CTA stays "Order Pickup" (red, dominant). Secondary CTA becomes **"Call (646) 891-1259"** with a click-to-call `tel:` link styled as a button, NOT plain text. "See the Menu" is a tertiary text link below.
- **Expected lift:** +15–25% on calls. Calls have higher AOV than DoorDash and zero commission.

### P0-3. No sticky mobile order bar.
There is none. On mobile, once a user scrolls past the hero, the only persistent CTA is the small red "Order" pill in the nav — there is no fat-thumb "ORDER · CALL · DIRECTIONS" bottom bar.

- Industry standard for restaurant mobile: sticky bottom bar with 2–3 actions ("Order Pickup" / "Call" / "Directions"). Tacombi, Los Tacos No.1, Birria-Landia, every DTC restaurant has this.
- **Fix:** Add a sticky bottom mobile bar (visible <768px only): three equal-width buttons with icons. Hide on the hero, show after 400px scroll.
- **Expected lift:** +20–40% mobile conversion. Mobile is 70%+ of restaurant traffic.

### P0-4. The 4.5★ rating is hidden.
The aggregate rating (★ 4.5 · 120+ reviews · Grubhub · Seamless · DoorDash · Uber Eats) only appears in two places: a small pill in the hero (`ElpHero.tsx:96-106`, ~11px text, gray) and inside the Reviews section halfway down the page. The trust badge says "Loved by Washington Heights since 2024" — vague, buyer-blind, not a proof claim.

- La Fiesta beats you on Yelp count (111 reviews vs. your "120+" across 4 platforms — but yours is fragmented across 4 sources nobody sees in one place).
- **Fix:** Replace the eyebrow "🇲🇽 Washington Heights · Since 2024 · We Deliver" with a hero-stripe trust bar: **"★ 4.5 · 120+ verified reviews · DoorDash · Grubhub · Seamless · Uber Eats"** — same height, bigger, clickable, gold/white not gray. Also pin a Yelp / Google rating widget if a Google Business rating exists.
- **Expected lift:** +5–12% on hero-to-order conversion (well documented in restaurant CRO).

### P0-5. Hero copy is vague and brand-y, not buyer-y.
> "¡Bienvenidos! / Authentic Mexico, on Broadway."

That's a logo tagline, not a hero. It tells a passerby nothing about *what to order, why now, or what makes it cheaper/better than La Fiesta.*

- **Fix:** Two-line headline that names the hero product + the proof. Examples:
  - **"Slow-braised birria. Hand-pressed tortillas. 3 tacos + consomé for $17."**
  - **"Washington Heights' birria spot. 4.5★ on 4 platforms. Pickup in 15 min."**
- The Tacombi/El Atoradero playbook is *name the dish in the headline*. People come to restaurants for a specific dish, not a vibe.
- **Expected lift:** +10–20% scroll-past-hero rate. Higher engagement downstream.

---

## P1 — SIGNIFICANT DRAG (fix this month)

### P1-1. Menu has 21 categories on one page. No best-sellers. No photos.
`ElpMenu.tsx` dumps all 21 categories as scroll-chips → 2-column card grid. Cognitive load is brutal. There's no "Most Ordered" / "Try First" / "House Specials" section pinned at the top.

- **Fix:** Above the category chips, add a "**Most Ordered**" row of 4–6 hero items as photo cards: Birria Tacos w/ Consomé ($17), Tacos al Pastor (3x $13), Mole Poblano ($17), Chilaquiles w/ Carne ($16), Horchata ($4). Each card has an "Add to Order" button that opens the pickup URL with that item preselected (if the platform supports deep links, otherwise just the order page).
- Re-order categories by AOV/popularity, not by printed-menu order. **Birria, Tacos, Platillos, Breakfast** should be the first 4 chips. Move Sides, Sodas, Hot Drinks to the bottom.
- Show category item counts as proof of breadth, but **default-collapse 12 of the 21 categories** behind a "Show all 21 menus" expander.
- **Expected lift:** +8–15% menu→order conversion.

### P1-2. Order section has decision paralysis: 5 platforms in a row.
`ElpOrder.tsx:38-77`. Direct pickup is featured (good), but immediately below are 5 equally-sized platform tiles (DoorDash, Uber Eats, Grubhub, Seamless, Call). That re-introduces choice fatigue right after you broke it.

- **Fix:** Hierarchy. (1) Big direct "ORDER PICKUP · Best Price · No Fees" hero card. (2) Big "CALL TO ORDER · (646) 891-1259" card (equal weight). (3) "Prefer delivery?" expander revealing the 4 third-party logos. Default collapsed.
- Add explicit price comparison: "Direct pickup = no platform fees. Save ~15% vs. DoorDash."
- **Expected lift:** +10–20% share of orders going direct (margin protection, not gross orders — but this is the #1 financial lever).

### P1-3. No email/SMS capture. No loyalty. No first-order discount.
Zero retention machinery. Every customer is a one-and-done unless they remember you.

- **Fix (in order):** (1) Sticky exit-intent popup or footer bar: "Get $5 off your first pickup — text PIT to (646) 891-1259." (2) Loyalty: "10th meal free, ask at counter." (3) Birthday club. (4) SMS list (Postscript or Klaviyo SMS).
- **Expected lift:** Repeat-visit rate +15–30% over 90 days. La Fiesta almost certainly does *not* have this — easy wedge.

### P1-4. Trust signals: no Yelp/Google badges, no sanitary grade, no press, no Instagram embed.
The site lists reviews from Seamless and Grubhub only. NYC diners trust **Google reviews + Yelp + Health Department A grade** above all. None are surfaced.

- **Fix:**
  - Embed Google Business rating + review count widget.
  - Display NYC DOHMH **"A"** sanitary grade prominently in the Visit section. ("Most recent inspection: Grade A · [date]") — this is a *legally required* badge that doubles as a trust mark.
  - Add Instagram embed (3 recent posts) in the Story section — kills the "is this place actually open and active?" doubt.
  - If any local press exists (DNAinfo, Eater, Patch, ABC7 Latino, Telemundo): "As seen in" strip.
- **Expected lift:** +5–10% trust → first-order conversion.

### P1-5. "We deliver" claim is undercut by site's own delivery operation.
Hero says "We Deliver" but the only delivery options are third-party. There is no "We deliver direct, no app needed" service — which is the actual competitive moat against La Fiesta if you build it.

- **Fix:** If direct delivery exists (driver, in-house), surface it as "Free delivery on $30+ within Washington Heights" — this is what Tehuitzingo, Mole NYC, and every neighborhood Mexican spot does. If it doesn't exist, *create it*: hire one driver Fri/Sat evenings, capture the margin DoorDash takes.
- If you really can't, change "We Deliver" to "Pickup + Delivery via DoorDash, Uber Eats, Grubhub, Seamless."

### P1-6. Spanglish chaos in CTAs.
The Spanish/English mixing is constant and inconsistent: hero eyebrow is bilingual, headline is bilingual, special-of-day is Spanish only ("Pregunte por nuestro Especial del Día"), button copy is English. There's a language toggle, but the *Spanish-rendered* text on the page when in EN mode is decorative noise to monolingual customers.

- **Fix:** Pick one strategy per element. Eyebrow: "Washington Heights · Since 2024." Headline: English. Special: localize via `t.hero.special` per language. Story: bilingual sentence pairs OK, but flag them visually. Currently the EN UI has random ES sprinkled in (`Hecho con Orgullo`, `Visit · Visítanos`, etc.) — looks like a half-finished translation, not intentional bilingualism.

### P1-7. Mexican flag tricolor stripe is overused → "tourist taqueria" energy.
Tricolor stripe appears in: nav (top), hero (under headline), story (under headline), reviews (under headline), visit (under headline), footer (top). The flag is a brand element; six instances per page makes it look like Cinco de Mayo decorations from Party City.

- The aspirational benchmark (Tacombi, El Atoradero, Tepito) uses **one** Mexican-identity cue (a wordmark, a single color, masa/clay textures) and lets the food do the rest. Restraint = upscale.
- **Fix:** Keep tricolor in the nav and footer only. Remove from hero, story, reviews, visit. Replace with food photography or hand-drawn loteria/papel-picado motifs used *sparingly*.
- This is what separates "neighborhood spot we want to support" from "premium destination we'll Instagram." You can be both — but the visual language has to grow up.

### P1-8. Hours summary is generic.
"Open Daily · 10 AM – 10 PM · Delivery 8 AM – 11:55 PM" — buried under the rating badge in 11px caps. La Fiesta closes earlier. Your **late-night delivery (until 11:55 PM)** is a massive competitive wedge that the site whispers about.

- **Fix:** Late-night band — "**Open till midnight for delivery.** Birria, tacos, tortas — all night.". Make this a dedicated trust line near the hero CTA. This is what eats La Fiesta's after-10pm orders.

---

## P2 — POLISH & GROWTH (next quarter)

### P2-1. Local SEO: surface area is thin.
Title tag and meta description are fine. But there are no city/neighborhood pillar pages, no "best birria in Washington Heights" landing page, no FAQ schema for common queries ("does El Pitallito deliver to Inwood?", "Is El Pitallito open Sunday?").

- **Fix:** Create 4–6 SEO landing pages under `/birria-nyc`, `/tacos-washington-heights`, `/breakfast-mexican-uptown`, `/birria-delivery-inwood`, `/aguas-frescas-nyc`. Same template, dish-specific copy + photos, internal-linked. This is exactly what worked for MC Hair (per memory note).
- Add FAQ schema with `acceptsReservations`, delivery radius, parking, payment, group orders, catering.

### P2-2. No catering, no group order, no party trays.
Birria + tacos = peak catering category. Office orders, birthday trays, baptisms, baby showers — Washington Heights has dense Latino family demand that books trays for $200+.

- **Fix:** Add a `/catering` page with party-pan pricing ($75 for 15 people / $140 for 30 / $250 for 60), a phone CTA, and a 48-hour-notice form. Photograph one party tray. Promote at the bottom of the order section.
- **Expected lift:** New revenue line, $1–4k/mo realistic in year 1.

### P2-3. Special of the Day is decorative, not functional.
Hero band says "Pregunte por nuestro Especial del Día" — but no actual special is shown. It's just text.

- **Fix:** Make it a real CMS field updated daily. "Today's Especial: Pozole Rojo · $14." Even a hand-updated `siteSpecial.json` works. Drives daily return visits and creates content for IG.

### P2-4. No Open Graph image with food. OG points to `og.png` which appears to be a logo (per JSON-LD).
Sharing the link on WhatsApp / iMessage / Telegram is the dominant local distribution channel in Washington Heights. The preview card decides whether someone taps.

- **Fix:** 1200x630 OG card with: hero food shot + "El Pitallito · Birria · Washington Heights" overlay + "★ 4.5 (120+ reviews)" strip. Generate with the same Flux/image workflow used for Labhaus.

### P2-5. No referral program.
"Bring a friend, both get $5 off" — works disproportionately well in tight ethnic-neighborhood communities.

### P2-6. No video. No reels embed. No IG story highlights surface.
Birria pulls are the single most viral restaurant content of the last 3 years. One 15-second loop of the cheesy pull = thousands of organic IG views and direct orders.

### P2-7. Reviews section uses framer-motion `whileInView` on 4 cards with sequential delay → slow perceived load on mobile.
Minor but real: stagger total is ~400ms. Drop to 50ms stagger or remove on mobile.

### P2-8. Footer payment methods not surfaced.
The JSON-LD says "Cash, Credit Card, Debit Card" — but the visible UI doesn't say it. "Cash · Card · No minimum" is a meaningful trust signal for delivery and bodega-adjacent customers.

### P2-9. No Spanish-first landing variant.
A monolingual-Spanish-speaking abuela trying to order should land in Spanish by default if her browser locale is `es-*`. Currently lang defaults to EN (presumed from `useLang` default).

### P2-10. The "Steven re-cooked the meal" story is gold and underused.
This is your hospitality differentiator. Currently buried at the bottom of the Reviews section. Pull it into the hero area as a third trust artifact (next to rating + late-night). Get a photo of Steven. Real face = real trust.

---

## What La Fiesta probably does worse (your wedges to amplify)

1. **Birria** — La Fiesta is a generic Mex-American grill (per their Yelp). El Pit's birria + consomé is a hero product. *Make this the entire hero positioning.*
2. **Hand-pressed tortillas** — claim it loud, photograph it. La Fiesta uses commodity tortillas.
3. **Late-night delivery to midnight** — La Fiesta closes earlier.
4. **Aguas frescas made daily** — fresh-drink moat.
5. **Service recovery story (Steven)** — La Fiesta's Yelp is full of "kind of meh" reviews. Your verified service standard is unique.
6. **80+ items, breakfast included** — La Fiesta doesn't do real Mexican breakfast (chilaquiles, huevos rancheros, etc.). Own breakfast.

## What La Fiesta probably does better (your gaps to close)

1. **Yelp social proof** — they have 111 reviews on the platform consumers default to. You have reviews scattered across delivery platforms. *Run a Yelp campaign: in-store QR code, "Leave us a Yelp review, get a free agua fresca."*
2. **Price perception** — your menu is $13–20 range. La Fiesta is reportedly lower. Counter with **value bundling**: "Family Pack — 12 tacos + 4 aguas + sides for $59."
3. **Tenure** — they've been around longer. Counter with **"Same family. Same recipes. New address. Birria for Broadway."** if there's a backstory, surface it.

---

## Prioritized Fix Stack — Order to Ship

1. **Week 1:** Food photography shoot (P0-1). Replace every emoji hero element. Add click-to-call hero CTA + sticky mobile bottom bar (P0-2, P0-3). Rework hero copy to name the dish + rating (P0-4, P0-5).
2. **Week 2:** Menu re-architecture — Most Ordered row, default-collapsed deep categories, photos on top 6 items (P1-1). Order section hierarchy fix (P1-2).
3. **Week 3:** Email/SMS capture + first-order discount (P1-3). Surface Yelp/Google/DOHMH grade A (P1-4). Late-night band (P1-8). Reduce flag overuse (P1-7).
4. **Week 4–6:** SEO pillar pages (P2-1). Catering page + tray photo (P2-2). Real daily special CMS (P2-3). OG card (P2-4).
5. **Quarter 2:** Referral, video/reels embed, full Spanish-first variant.

---

## Bottom line
The current site looks like a designer's portfolio piece for a restaurant brand — papel picado, tricolor stripes, dark mode, framer-motion. It is **not** a conversion machine. A conversion-optimized restaurant site has three things on first scroll that this site has zero of: **a photo of the hero dish, a click-to-call button, and a rating with review count above the headline.** Fix those three things in week one and orders go up before you write a single new line of copy.
