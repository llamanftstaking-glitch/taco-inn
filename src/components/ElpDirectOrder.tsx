'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

/**
 * Direct-order persuasion. Orders placed here go straight to our own POS — no
 * third-party markup. Honest value props (price, freshness, supporting local)
 * to nudge users off UberEats/DoorDash. Sits right before the order section.
 */
export default function ElpDirectOrder() {
  const { lang } = useLang()
  const es = lang === 'es'
  const props = es
    ? [
        { t: 'Mejor precio', d: 'Sin el recargo de las apps de delivery. Lo que ves es lo que pagas.' },
        { t: 'Más fresca', d: 'Va directo a nuestra cocina y se hace al momento — sin intermediarios.' },
        { t: 'Apoya al barrio', d: 'Ordenar directo apoya a una cocina local, no a una app gigante.' },
      ]
    : [
        { t: 'Better price', d: 'No delivery-app markup tacked on. What you see is what you pay.' },
        { t: 'Fresher food', d: 'Goes straight to our kitchen and gets made to order — no middleman.' },
        { t: 'Supports the block', d: 'Ordering direct backs a local kitchen, not a billion-dollar app.' },
      ]
  return (
    <section
      id="why-direct"
      className="section-quiet grain-light grain relative px-4 py-16 text-[var(--brand-ink)] sm:px-6 sm:py-20"
      aria-label={es ? 'Por qué ordenar directo' : 'Why order direct'}
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]"
        >
          {es ? 'Ordena Directo' : 'Order Direct'}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-editorial mt-3 text-balance text-3xl font-medium leading-[1.05] sm:text-4xl md:text-5xl"
        >
          {es ? 'Salta los recargos de las apps' : 'Skip the delivery-app markups'}
        </motion.h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {props.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-[var(--brand-ink)]/12 bg-white/60 p-6 text-left backdrop-blur-sm"
            >
              <p className="font-editorial text-xl font-medium text-[var(--brand-primary)]">{p.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--brand-ink)]/80">{p.d}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href={site.ordering.direct}
            className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--brand-primary)] px-10 text-base font-extrabold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(122,26,42,0.3)] transition hover:bg-[var(--brand-primary-dark)]"
          >
            {es ? 'Ordenar directo' : 'Order direct'} →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
