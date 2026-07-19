'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

/**
 * Signature spotlight. At Taco Inn that's the taco itself — tortillas pressed
 * by hand and eleven meats to choose from. Bilingual inline.
 */
export default function ElpBirria() {
  const { lang } = useLang()
  const es = lang === 'es'
  return (
    <section
      id="tacos"
      className="relative overflow-hidden bg-[#13100A] px-4 py-20 text-white sm:px-6 sm:py-28"
      aria-label={es ? 'Los tacos' : 'The tacos'}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative order-2 md:order-1"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={site.images.tacoTrioOverhead}
              alt={es ? 'Tacos en tortilla hecha a mano con cilantro y cebolla' : 'Tacos on handmade tortillas with cilantro and onion'}
              fill
              quality={86}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          {/* Floating tortilla chip */}
          <div className="absolute -bottom-5 right-5 max-w-[200px] rounded-2xl border border-[var(--brand-gold)]/30 bg-[#0E0A05]/95 px-5 py-3 backdrop-blur">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              {es ? 'Tortilla de la casa' : 'House tortilla'}
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-[var(--brand-ink)]">
              {es ? 'Prensada a mano, todos los días.' : 'Pressed by hand, every single day.'}
            </p>
          </div>
        </motion.div>

        {/* Copy */}
        <div className="order-1 md:order-2">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]"
          >
            {es ? 'El Platillo de la Casa' : 'The Dish We’re Known For'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-3 text-balance text-3xl font-black leading-[1.05] sm:text-4xl md:text-5xl"
          >
            {es ? 'El taco como debe ser: tortilla a mano, once carnes' : 'The taco, done right: handmade tortilla, eleven meats'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 text-pretty text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {es
              ? 'Del trompo de pastor a la lengua, el suadero y el buche — cada taco sale en una tortilla prensada a mano al momento, con cilantro y cebolla. Desde $3.25. Así de simple, así de bueno.'
              : 'From al pastor off the trompo to lengua, suadero and buche — every taco lands on a tortilla pressed by hand to order, topped with cilantro and onion. From $3.25. That simple, that good.'}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 grid gap-2 text-sm text-white/80 sm:text-base"
          >
            {(es
              ? ['Tortillas prensadas al momento', 'Once carnes a elegir', 'Estilo mexicano o americano', 'Barbacoa los fines de semana']
              : ['Tortillas pressed to order', 'Eleven meats to choose from', 'Mexican or American style', 'Barbacoa on weekends']
            ).map((line) => (
              <li key={line} className="flex items-center gap-2.5">
                <span className="text-[var(--brand-gold)]" aria-hidden>
                  ✶
                </span>
                {line}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8"
          >
            <a
              href={`tel:${site.contact.phoneOrdersE164}`}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--brand-gold)] px-9 text-base font-extrabold uppercase tracking-wider text-[#13100A] shadow-xl transition hover:bg-[var(--brand-gold-dark)] hover:text-white"
            >
              {es ? 'Llama y ordena tus tacos' : 'Call in your taco order'} →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
