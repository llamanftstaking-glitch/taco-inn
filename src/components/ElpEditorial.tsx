'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

/**
 * Editorial quiet section.
 * Cream/paper background = "breathing" contrast to the cinematic dark.
 * Asymmetric grid. Serif accent. Brand mythology.
 */
export default function ElpEditorial() {
  const { t } = useLang()
  return (
    <section
      id="editorial"
      className="section-quiet grain-light grain relative px-4 py-24 text-[var(--brand-ink)] sm:px-6 sm:py-32"
      aria-label={t.editorial.title}
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Asymmetric grid */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* LEFT — large kitchen image (offset down for asymmetry) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-7 md:mt-16"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={site.images.tortillaFire}
                alt="Tortilla being toasted over open flame"
                fill
                quality={88}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 max-w-md font-editorial text-sm italic text-[var(--brand-ink)]/65">
              {/* Photo caption — editorial cadence */}
              Fire-toasted before plating. Every order.
            </p>
          </motion.div>

          {/* RIGHT — title + quote + body (top-aligned for offset) */}
          <div className="md:col-span-5 md:pt-4">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]"
            >
              {t.editorial.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-editorial mt-4 text-balance text-4xl font-medium leading-[1.05] text-[var(--brand-ink)] sm:text-5xl md:text-6xl"
            >
              {t.editorial.title}
            </motion.h2>

            <motion.blockquote
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-editorial mt-8 border-l-2 border-[var(--brand-primary)] pl-5 text-xl italic leading-relaxed text-[var(--brand-ink)]/90 sm:text-2xl"
            >
              {t.editorial.quote}
              <footer className="mt-3 font-sans text-[11px] not-italic font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                — {t.editorial.attribution}
              </footer>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-base leading-relaxed text-[var(--brand-ink)]/80 sm:text-lg"
            >
              {t.editorial.body}
            </motion.p>

            {/* Stats row — minimal, editorial */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--brand-ink)]/15 pt-6"
            >
              {t.editorial.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-editorial text-3xl font-medium text-[var(--brand-primary)] sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-ink)]/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
