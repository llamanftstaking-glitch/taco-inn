'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

/**
 * "From our kitchen" — process / authenticity strip.
 * Proves real hands, real fire, real masa. Dark band, editorial captions.
 * Bilingual copy is local (not menu data) so it stays out of the i18n dict.
 */
const STEPS = [
  { src: site.images.tortillasPress, en: 'Masa pressed by hand', es: 'Masa prensada a mano' },
  { src: site.images.grillFlames, en: 'Over open flame', es: 'Sobre fuego abierto' },
  { src: site.images.consommePot, en: 'Consomé, slow-simmered', es: 'Consomé, a fuego lento' },
  { src: site.images.cilantroPrep, en: 'Cut fresh, all day', es: 'Cortado fresco, todo el día' },
  { src: site.images.cookPlating, en: 'Plated to order', es: 'Emplatado al momento' },
]

export default function ElpKitchen() {
  const { lang } = useLang()
  return (
    <section
      id="kitchen"
      className="relative bg-[#13100A] px-4 py-20 text-white sm:px-6 sm:py-28"
      aria-label={lang === 'es' ? 'De nuestra cocina' : 'From our kitchen'}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
            {lang === 'es' ? 'Sin Atajos · No Shortcuts' : 'No Shortcuts · Sin Atajos'}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {lang === 'es' ? 'De nuestra cocina' : 'Straight from our kitchen'}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            {lang === 'es'
              ? 'Cada platillo se hace a mano, todos los días. Nada congelado, nada de prisa.'
              : 'Every plate is made by hand, every day. Nothing frozen, nothing rushed.'}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <motion.figure
              key={s.en}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`group relative overflow-hidden rounded-xl shadow-xl ${
                i === 0 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={s.src}
                  alt={lang === 'es' ? s.es : s.en}
                  fill
                  quality={82}
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--brand-gold)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-0.5 text-sm font-semibold leading-snug text-white">
                  {lang === 'es' ? s.es : s.en}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
