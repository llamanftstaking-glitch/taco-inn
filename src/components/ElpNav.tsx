'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'
import LangToggle from './LangToggle'

export default function ElpNav() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const links = [
    { href: '#menu', label: t.nav.menu },
    { href: '#editorial', label: t.nav.story },
    { href: '#visit', label: t.nav.visit },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[var(--brand-ink)]/10 bg-[var(--brand-cream)]/90 backdrop-blur-md">
        <div className="flag-stripe h-0.5 w-full" aria-hidden="true" />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex min-h-[44px] items-center gap-2" aria-label="Taco Inn home">
            <div className="relative h-10 w-16 sm:h-12 sm:w-20">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-sm.webp`}
                alt="Taco Inn"
                fill
                priority
                quality={92}
                sizes="64px"
                className="object-contain"
              />
            </div>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--brand-ink)] md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="min-h-[44px] inline-flex items-center transition hover:text-[var(--brand-primary)]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangToggle />
            <a
              href={`tel:${site.contact.phoneOrdersE164}`}
              aria-label={`Call ${site.contact.phoneOrders}`}
              className="hidden h-10 items-center gap-1.5 rounded-full border border-[var(--brand-accent)] bg-white/60 px-3 text-xs font-extrabold uppercase tracking-wider text-[var(--brand-accent)] transition hover:bg-[var(--brand-accent)] hover:text-white md:inline-flex"
            >
              <span className="hidden lg:inline">{site.contact.phoneOrders}</span>
            </a>
            <a
              href={site.ordering.pickup}
              className="inline-flex h-10 items-center rounded-full bg-[var(--brand-primary)] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(122,26,42,0.3)] transition hover:bg-[var(--brand-primary-dark)]"
            >
              {t.nav.order}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-ink)]/20 bg-white/60 text-[var(--brand-ink)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-[var(--brand-ink)]/55 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`absolute right-0 top-0 flex h-full w-[88vw] max-w-[360px] flex-col overflow-y-auto border-l border-[var(--brand-ink)]/10 bg-[var(--brand-cream)] shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-[var(--brand-ink)]/10 px-5">
            <div className="relative h-10 w-16">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-sm.webp`}
                alt="Taco Inn"
                fill
                quality={92}
                sizes="64px"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-ink)]/20 bg-white/60 text-[var(--brand-ink)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="min-h-[52px] flex items-center rounded-xl border border-[var(--brand-ink)]/10 bg-white/60 px-4 text-base font-extrabold uppercase tracking-wider text-[var(--brand-ink)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-[var(--brand-ink)]/10 p-5">
            <a
              href={site.ordering.pickup}
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-2xl bg-[var(--brand-primary)] text-base font-extrabold uppercase tracking-wider text-white shadow-xl"
            >
              {t.nav.order} →
            </a>
            <a
              href={`tel:${site.contact.phoneOrdersE164}`}
              className="mt-3 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[var(--brand-accent)] bg-[var(--brand-accent)]/10 text-base font-extrabold uppercase tracking-wider text-[var(--brand-accent)]"
            >
              {site.contact.phoneOrders}
            </a>
            <p className="mt-4 text-center text-xs uppercase tracking-wider text-[var(--brand-ink-soft)]">
              {site.hoursSummary} · {site.deliveryHoursSummary}
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
