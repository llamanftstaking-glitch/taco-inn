# El Pitallito — Catering + Private Events + Blog + POS Inquiry Inbox

**Date:** 2026-05-30
**Status:** Approved (verbal), building.

## Goal
Add three new public pages to elpitallito.com and route their communication into the Gizer POS, with a WhatsApp alert to staff on every new inquiry.

1. `/catering/` — catering landing page + inquiry form
2. `/private-events/` — private events landing page + inquiry form
3. `/blog/` + `/blog/[slug]/` — file-based MDX/markdown blog for SEO
4. POS side: store inquiries + WhatsApp alert to staff

## Architecture

Two repos (unchanged split):
- **`~/el-pitallito`** — Next 16 static export (`output: export`), nginx at `/opt/el-pitallito/site`. Tailwind 4, framer-motion. Brand config in `src/config/site.ts` (Mexican flag tricolor + masa/cream/gold).
- **`~/gizer-pos`** — Next 16 + libsql/Drizzle, `pos.elpitallito.com`. APIs under `src/app/api/*` with `corsHeaders(origin)`.

### Data flow (inquiries)
```
catering / private-events page
  → <InquiryForm type="catering|private_event">
  → POST https://pos.elpitallito.com/api/inquiries  (CORS)
  → reprice nothing; validate; insert row into `inquiries`
  → fire-and-forget notifyTeam() WhatsApp via Las Americas bridge
  → 201 { ok: true }
Form shows success state. WhatsApp failure never blocks the 201.
```

### WhatsApp
- Reuse existing `smart-move-wa` bridge (`whatsapp-web.js`, `POST /sendText {args:{to,content}}`, `api-key` header).
- gizer-pos gets `src/lib/whatsapp.ts` (cloned from smart-move, El Pitallito branding).
- Env: `WA_BRIDGE_URL=http://smart-move-wa:8002`, `WA_API_KEY=…`, `TEAM_GROUP=""` (Ray fills the group chatId later — until then notifyTeam no-ops gracefully so forms still work).
- Network: attach gizer-pos to `smart-move_smartmove-internal` (added to gizer-pos compose so it survives recreate; keeps `w2w_web` too).

### Blog (file-based, best SEO)
- Posts: `src/content/blog/*.md` with frontmatter (title, description, date, author, keywords, ogImage).
- `src/lib/blog.ts` reads files at build (node:fs), parses with `gray-matter`, renders body with `marked`.
- Routes: `/blog/` index lists posts; `/blog/[slug]/` renders one (`generateStaticParams` from filenames). Static HTML baked at build → real SEO.
- Each post emits `Article` JSON-LD + per-page `<title>`/meta/canonical.
- 3 SEO seed posts targeting catering/events/neighborhood keywords.

## Schema addition (gizer-pos `src/lib/schema.ts`)
```
inquiries:
  id (pk), type ('catering'|'private_event'), name, email, phone,
  eventDate (text), guests (int), budget (text), message (text),
  status ('NEW'|'CONTACTED'|'CLOSED' default NEW), source (text),
  createdAt (text default datetime())
```
Migration via drizzle-kit (`pnpm db:generate`); entrypoint applies on boot.

## Components / units
- `gizer-pos/src/lib/whatsapp.ts` — bridge client + `formatInquiryMessage()`.
- `gizer-pos/src/app/api/inquiries/route.ts` — POST + OPTIONS, CORS, validate, insert, notify.
- `el-pitallito/src/components/InquiryForm.tsx` — client form, posts to POS, success/error states. Props: `type`, accent.
- `el-pitallito/src/app/catering/page.tsx`, `private-events/page.tsx` — landing pages reusing brand tokens, hero + offerings + form.
- `el-pitallito/src/lib/blog.ts`, `src/content/blog/*.md`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`.
- `ElpNav.tsx` + `ElpFooter.tsx` — add Catering / Private Events / Blog links.
- `sitemap.ts` — add new routes.

## Error handling
- Inquiry POST validates required (name + email or phone). 400 on missing.
- WhatsApp send wrapped; failure logged, never affects the 201.
- Form: disabled while submitting, inline error, success confirmation. No PII in URL.

## Out of scope (YAGNI now)
- POS admin "Inquiries" tab UI (data stored; can add a read view later).
- Deposit/payment on inquiries.
- Admin-editable blog CMS.
- i18n of new pages (English first; can mirror to ES later).
```
