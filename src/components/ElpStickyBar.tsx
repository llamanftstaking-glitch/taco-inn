'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

export default function ElpStickyBar() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)
  const [suppressed, setSuppressed] = useState(false)

  // rAF-throttled scroll listener for visibility (~600px threshold)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 600)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Suppress while user is inside #order or #visit (redundant CTAs there).
  useEffect(() => {
    const targets = ['#order', '#visit']
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => el !== null)
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting)
        setSuppressed(anyVisible)
      },
      { threshold: 0.25 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const show = visible && !suppressed

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="region"
      aria-label="Quick actions"
      aria-hidden={!show}
    >
      <div className="border-t border-[var(--brand-ink)]/15 bg-[var(--brand-cream)]/95 px-3 py-2.5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <a
            href={site.ordering.pickup}
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--brand-primary)] text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(0,0,0,0.4)]"
            aria-label={t.hero.ctaPrimary}
          >
            {t.nav.order}
          </a>
          <a
            href={`tel:${site.contact.phoneOrdersE164}`}
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-[var(--brand-gold)] bg-[var(--brand-gold)]/15 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-ink)]"
            aria-label={`Call ${site.contact.phoneOrders}`}
          >
            Call
          </a>
          <a
            href={site.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-[var(--brand-ink)]/25 bg-white/5 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-ink)]"
            aria-label="Get directions"
          >
            Map
          </a>
        </div>
      </div>
    </div>
  )
}
