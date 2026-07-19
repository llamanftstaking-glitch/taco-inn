'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'
import type { GoogleReviewsData } from '@/lib/googleReviews'

type ReviewCard = { author: string; rating: number; quote: string; source: string; cuisine: string }

export default function ElpReviews({ google = null }: { google?: GoogleReviewsData | null }) {
  const { t } = useLang()

  // Prefer live Google reviews; fall back to the curated static set.
  const usingGoogle = !!(google && google.reviews.length > 0)
  const cards: ReviewCard[] = usingGoogle
    ? google!.reviews.slice(0, 4).map((r) => ({
        author: r.author,
        rating: r.rating,
        quote: r.quote.length > 220 ? `${r.quote.slice(0, 217)}…` : r.quote,
        source: 'Google',
        cuisine: r.relativeTime,
      }))
    : (site.reviews as ReviewCard[])

  const ratingValue = usingGoogle ? google!.rating : site.aggregateRating.ratingValue
  const reviewCount = usingGoogle ? google!.total : site.aggregateRating.reviewCount
  const sources = usingGoogle ? ['Google'] : site.aggregateRating.sources
  const mapsUri = google?.mapsUri || ''

  return (
    <section id="reviews" className="relative overflow-hidden bg-[var(--brand-cream)] px-4 py-20 text-white sm:px-6 sm:py-28">
      {/* Background flair — no filter:blur. blur-[120px] forces a new compositing
          layer AND a rasterized blur pass on every scroll frame (GPU texture read-back).
          Replaced with a pre-blurred radial-gradient that costs zero per-frame. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,162,59,0.10) 0%, transparent 70%)' }} />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,104,71,0.15) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-ink)]/20 bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
            <span aria-hidden>⭐</span>
            {t.reviews.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black sm:text-4xl md:text-5xl">
            {t.reviews.title}
          </h2>
          <p className="mt-3 text-base text-[var(--brand-ink)] sm:text-lg">{t.reviews.sub}</p>

          {/* Aggregate rating — pulled prominent */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-[var(--brand-gold)]/40 bg-black/40 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur">
            <span className="text-[var(--brand-gold)]">
              ★ {ratingValue.toFixed(1)}
            </span>
            <span className="text-[var(--brand-ink)]/55" aria-hidden>·</span>
            <span>{reviewCount}+ reviews</span>
            <span className="text-[var(--brand-ink)]/55" aria-hidden>·</span>
            <span className="text-[var(--brand-ink)]">
              {sources.join(' · ')}
            </span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((r, i) => (
            <motion.figure
              key={r.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl border border-[var(--brand-ink)]/15 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-5 transition hover:border-[var(--brand-gold)]/40"
            >
              <div className="mb-3 flex items-center gap-1 text-sm text-[var(--brand-gold)]">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} aria-hidden>★</span>
                ))}
              </div>

              <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-[var(--brand-ink)] sm:text-[15px]">
                <span className="text-[var(--brand-gold)]" aria-hidden>“</span>
                {r.quote}
                <span className="text-[var(--brand-gold)]" aria-hidden>”</span>
              </blockquote>

              <figcaption className="mt-4 border-t border-[var(--brand-ink)]/15 pt-3 text-xs">
                <p className="font-extrabold uppercase tracking-wider text-[var(--brand-ink)]">
                  {r.author}
                </p>
                <p className="mt-0.5 flex items-center gap-2 text-[var(--brand-ink-soft)]">
                  <span>{r.source}</span>
                  <span aria-hidden>·</span>
                  <span className="italic text-[var(--brand-gold)]/85">{r.cuisine}</span>
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {usingGoogle && mapsUri && (
          <div className="mt-8 text-center">
            <a
              href={mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/40 bg-black/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--brand-gold)] transition hover:bg-black/50"
            >
              See all reviews on Google
            </a>
          </div>
        )}

        {/* Service standard callout — Steven/Amy story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-3xl border border-[var(--brand-gold-dark)]/30 bg-gradient-to-br from-[var(--brand-paper)] via-[var(--brand-cream)] to-[var(--brand-paper-deep)] p-6 sm:p-8 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-white shadow-xl md:h-24 md:w-24" aria-hidden>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
                {t.reviews.standardEyebrow}
              </p>
              <h3 className="mt-2 text-balance text-xl font-black leading-tight sm:text-2xl md:text-3xl">
                {t.reviews.standardTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--brand-ink)] sm:text-base">
                {site.serviceStandard.summary}
              </p>
              <p className="mt-3 text-xs italic text-[var(--brand-ink-soft)]">
                — Verified guest experience · Steven, General Manager
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
