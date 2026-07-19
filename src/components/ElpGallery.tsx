'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

/** Craving + community gallery. Dish bento on top, social band below. */
const DISHES = [
  { src: site.images.quesabirriaPull, en: 'Quesabirria', es: 'Quesabirria' },
  { src: site.images.tacoTrioOverhead, en: 'Street Tacos', es: 'Tacos' },
  { src: site.images.carneAsada, en: 'Carne Asada', es: 'Carne Asada' },
  { src: site.images.loadedNachos, en: 'Loaded Nachos', es: 'Nachos' },
  { src: site.images.seafood, en: 'Camarones', es: 'Camarones' },
  { src: site.images.tamales, en: 'Tamales', es: 'Tamales' },
  { src: site.images.burritoCross, en: 'Burritos', es: 'Burritos' },
  { src: site.images.salsaTrio, en: 'Salsas de la Casa', es: 'Salsas de la Casa' },
]

const SOCIAL = [
  { src: site.images.friendsNight, en: 'Late-night in the Heights', es: 'Noches en the Heights' },
  { src: site.images.familyDining, en: 'Family table', es: 'Mesa familiar' },
  { src: site.images.cheersDrinks, en: 'Horchata & jarritos', es: 'Horchata y jarritos' },
  { src: site.images.firstBite, en: 'That first bite', es: 'La primera mordida' },
  { src: site.images.busyInterior, en: 'Weekend rush', es: 'Lleno de fin de semana' },
  { src: site.images.exteriorNight, en: 'On St. Nicholas Ave', es: 'En St. Nicholas Ave' },
  { src: site.images.openLate, en: 'Open late', es: 'Abierto hasta tarde' },
  { src: site.images.deliveryBag, en: 'We deliver', es: 'Entregamos a domicilio' },
]

export default function ElpGallery() {
  const { lang } = useLang()
  return (
    <section
      id="gallery"
      className="section-quiet grain-light grain relative px-4 py-20 text-[var(--brand-ink)] sm:px-6 sm:py-28"
      aria-label={lang === 'es' ? 'Galería' : 'Gallery'}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
            {lang === 'es' ? 'La Mesa' : 'The Spread'}
          </p>
          <h2 className="font-editorial mt-3 text-balance text-4xl font-medium leading-[1.05] sm:text-5xl">
            {lang === 'es' ? 'Una probada de la casa' : 'A taste of the house'}
          </h2>
        </motion.div>

        {/* Featured wide */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="group relative mt-8 overflow-hidden rounded-2xl shadow-2xl"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={site.images.tableSpread}
              alt={lang === 'es' ? 'Banquete mexicano completo' : 'A full Mexican feast'}
              fill
              quality={84}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 text-lg font-bold text-white drop-shadow sm:text-xl">
              {lang === 'es' ? 'Para compartir' : 'Made for sharing'}
            </p>
          </div>
        </motion.div>

        {/* Dish bento */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {DISHES.map((d, i) => (
            <motion.figure
              key={d.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={d.src}
                  alt={lang === 'es' ? d.es : d.en}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 p-3 text-sm font-semibold text-white drop-shadow">
                {lang === 'es' ? d.es : d.en}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Social band */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {SOCIAL.map((s, i) => (
            <motion.figure
              key={s.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={s.src}
                  alt={lang === 'es' ? s.es : s.en}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 left-0 p-3 text-xs font-semibold uppercase tracking-wide text-white drop-shadow">
                {lang === 'es' ? s.es : s.en}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
