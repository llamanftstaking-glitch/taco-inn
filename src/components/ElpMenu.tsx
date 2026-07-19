'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'
import { MENU_TABS, DEFAULT_TAB, type MenuTabId } from '@/config/menuTabs'

export default function ElpMenu() {
  const { t, lang } = useLang()
  const cats = t.menuPreview.categories
  const [activeTab, setActiveTab] = useState<MenuTabId>(DEFAULT_TAB)

  // Build categories scoped to active tab (preserves order from menuTabs.ts).
  const activeCats = useMemo(() => {
    const tab = MENU_TABS.find((x) => x.id === activeTab)
    if (!tab) return []
    return tab.categoryIds
      .map((cid) => cats.find((c) => c.id === cid))
      .filter(<T,>(x: T | undefined): x is T => x !== undefined)
  }, [activeTab, cats])

  const totalItems = useMemo(
    () => cats.reduce((sum, c) => sum + c.items.length, 0),
    [cats],
  )

  return (
    <section id="menu" className="relative masa-bg text-[var(--brand-ink)]">
      <div className="papel-picado" aria-hidden="true" />

      <div className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-ink)]/20 bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
              Menú · {totalItems}+ items · {site.bestSellers.length} best-sellers
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black sm:text-5xl md:text-6xl">
              {t.menuPreview.title}
            </h2>
            <p className="mt-3 text-base text-[var(--brand-ink)] sm:text-lg">
              {t.menuPreview.sub}
            </p>
          </div>

          {/* Best-sellers / Most Ordered hero row */}
          <div className="mb-12">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
              Most Ordered · Lo Más Pedido
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {site.bestSellers.map((b) => (
                <a
                  key={b.name}
                  href={site.ordering.pickup}
                  className="group relative overflow-hidden rounded-sm border border-[var(--brand-ink)]/15 bg-[var(--brand-cream)] shadow-[0_8px_28px_rgba(0,0,0,0.5)] transition duration-500 hover:border-[var(--brand-gold)]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={82}
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-ink)]/90 via-[var(--brand-ink)]/35 to-transparent transition-opacity duration-500 group-hover:from-[var(--brand-ink)]/70" />
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[var(--brand-gold)] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--brand-ink)]">
                      {lang === 'es' ? b.tagES : b.tagEN}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="font-editorial text-xs italic text-[var(--brand-ink-soft)]">
                        {lang === 'es' ? 'Más Pedido' : 'Most Ordered'}
                      </p>
                      <p className="mt-1 text-base font-extrabold leading-snug text-white drop-shadow sm:text-lg">
                        {b.name}
                      </p>
                      <p className="mt-1 font-editorial text-2xl font-medium text-[var(--brand-gold)] sm:text-3xl">
                        {b.price}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 5-TAB WIZARD */}
          <div
            role="tablist"
            aria-label={lang === 'es' ? 'Categorías de menú' : 'Menu categories'}
            className="mx-auto mb-8 grid max-w-3xl grid-cols-5 gap-1 rounded-2xl border border-[var(--brand-ink)]/15 bg-white/5 p-1.5"
          >
            {MENU_TABS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[48px] inline-flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-[10px] font-extrabold uppercase tracking-wider transition sm:flex-row sm:gap-2 sm:text-xs ${
                    isActive
                      ? 'bg-[var(--brand-primary)] text-white shadow-[0_4px_14px_rgba(184,16,32,0.35)]'
                      : 'text-[var(--brand-ink)] hover:bg-white/65'
                  }`}
                >
                  <span aria-hidden className="text-base sm:text-sm">{tab.emoji}</span>
                  <span className="leading-tight">
                    {lang === 'es' ? tab.labelES : tab.labelEN}
                  </span>
                </button>
              )
            })}
          </div>

          {/* TAB PANEL — accordions */}
          <div
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="space-y-3"
          >
            {activeCats.length === 0 ? (
              <p className="text-center text-sm text-[var(--brand-ink-soft)]">No items in this category yet.</p>
            ) : (
              activeCats.map((cat, i) => (
                <details
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  open={i === 0}
                  className="group scroll-mt-24 rounded-2xl border border-[var(--brand-ink)]/15 bg-white/[0.04] transition open:border-[var(--brand-gold)]/40 open:bg-white/[0.06]"
                >
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <div className="min-w-0 flex-1">
                      <h3 className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-[var(--brand-gold)] sm:text-lg">
                        {cat.emoji && <span aria-hidden>{cat.emoji}</span>}
                        <span className="truncate">{cat.name}</span>
                      </h3>
                      {cat.blurb && (
                        <p className="mt-0.5 truncate text-xs italic text-[var(--brand-ink-soft)] sm:text-sm">
                          {cat.blurb}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="inline-flex h-7 items-center rounded-full border border-[var(--brand-ink)]/15 bg-white/5 px-2.5 text-xs font-bold text-[var(--brand-ink)]">
                        {cat.items.length}
                      </span>
                      <svg
                        aria-hidden
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="text-[var(--brand-ink-soft)] transition-transform duration-300 group-open:rotate-180"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </summary>

                  <ul className="space-y-2.5 px-5 pb-5">
                    {cat.items.map((it) => (
                      <li
                        key={it.name}
                        className="flex items-baseline justify-between gap-3 border-b border-dotted border-white/8 pb-2 last:border-b-0 last:pb-0"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-[var(--brand-ink)] sm:text-base">
                            {it.name}
                          </p>
                          {it.desc && (
                            <p className="mt-0.5 text-xs text-[var(--brand-ink-soft)] sm:text-sm">
                              {it.desc}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="block whitespace-nowrap text-sm font-extrabold text-[var(--brand-gold)] sm:text-base">
                            {it.price || 'Mkt.'}
                          </span>
                          {it.tag && (
                            <span className="block whitespace-nowrap text-xs text-[var(--brand-ink-soft)]">
                              {it.tag}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              ))
            )}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs italic text-[var(--brand-ink-soft)]">
            Tax not included · Prices subject to change without notice
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.ordering.pickup}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--brand-primary)] px-8 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition hover:bg-[var(--brand-primary-dark)]"
            >
              {t.menuPreview.ctaFull} →
            </a>
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--brand-accent)] bg-[var(--brand-accent)]/10 px-8 text-sm font-extrabold uppercase tracking-wider text-white transition hover:bg-[var(--brand-accent)]/20"
            >
              {t.menuPreview.ctaCall} · {site.contact.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="papel-picado flipped" aria-hidden="true" />
    </section>
  )
}
