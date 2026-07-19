'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

export default function ElpHero() {
  const { t } = useLang()
  return (
    <section className="grain section-cream relative isolate overflow-hidden">
      {/* Sunburst flair behind logo — radial gold gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 30%, rgba(201,152,69,0.18) 0%, rgba(252,240,224,0) 55%)',
        }}
      />

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:gap-7 sm:px-6 sm:py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative h-36 w-60 sm:h-44 sm:w-72 md:h-52 md:w-[22rem]"
        >
          <Image
            src="/logo.webp"
            alt="Taco Inn — Comida Mexicana"
            fill
            priority
            quality={92}
            sizes="(max-width: 768px) 224px, 320px"
            className="object-contain"
          />
        </motion.div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 rounded-full border border-[var(--brand-ink)]/15 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-ink)] shadow-sm backdrop-blur-md sm:text-sm"
        >
          {t.hero.trustBadge}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-editorial text-base italic text-[var(--brand-accent)] sm:text-lg"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
          className="text-balance whitespace-pre-line text-4xl font-black uppercase leading-[0.92] tracking-tight text-[var(--brand-primary)] sm:text-6xl md:text-7xl"
        >
          {t.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-editorial max-w-2xl text-pretty text-lg italic text-[var(--brand-ink-soft)] sm:text-xl md:text-2xl"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-2 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <a
            href={site.ordering.pickup}
            className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--brand-primary)] px-9 text-base font-extrabold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(122,26,42,0.35)] transition hover:bg-[var(--brand-primary-dark)]"
          >
            {t.hero.ctaPrimary} →
          </a>
          <a
            href={`tel:${site.contact.phoneOrdersE164}`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-[var(--brand-accent)] bg-white/60 px-9 text-base font-extrabold uppercase tracking-wider text-[var(--brand-accent)] backdrop-blur transition hover:bg-[var(--brand-accent)] hover:text-white"
          >
            {site.contact.phoneOrders}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-editorial mt-2 inline-flex items-center rounded-full border border-[var(--brand-gold-dark)]/40 bg-[var(--brand-gold)]/15 px-5 py-1.5 text-sm italic text-[var(--brand-gold-dark)] sm:text-base"
        >
          {t.hero.special}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs uppercase tracking-[0.18em] text-[var(--brand-ink-soft)] sm:tracking-[0.2em]"
        >
          <span>{site.hoursSummary}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--brand-ink)]/35 sm:inline-block" aria-hidden />
          <span className="text-[var(--brand-accent)]">{site.deliveryHoursSummary}</span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--brand-ink)]/35 sm:inline-block" aria-hidden />
          <span>{site.contact.address}</span>
        </motion.div>
      </div>
    </section>
  )
}
