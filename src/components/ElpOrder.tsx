'use client'

import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

export default function ElpOrder() {
  const { t } = useLang()
  return (
    <section
      id="order"
      className="relative bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-primary-dark)] to-[#13100A] px-4 py-20 text-white sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-black sm:text-4xl md:text-5xl">
          {t.order.title}
        </h2>
        <p className="mt-3 text-base text-white/85 sm:text-lg">{t.order.sub}</p>

        {/* Direct order — featured (in-house pickup via POS) */}
        <div className="mx-auto mt-8 max-w-3xl">
          <a
            href={site.ordering.pickup}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-20 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-6 text-[var(--brand-primary)] shadow-2xl transition hover:scale-[1.01]"
          >
            <span className="absolute -top-px left-4 inline-flex items-center rounded-b-md bg-[var(--brand-gold)] px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider text-[#13100A]">
              {t.order.pickupBadge}
            </span>
            <span className="text-base font-black uppercase tracking-wider sm:text-lg">
              {t.order.pickup}
            </span>
            <span aria-hidden className="text-xl transition group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Third-party platforms — rendered only once the client provides links */}
        <div className="mx-auto mt-4 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {site.ordering.delivery && (
            <a
              href={site.ordering.delivery}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/90 px-4 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-primary)] transition hover:bg-white/70"
            >
              {t.order.delivery}
            </a>
          )}
          {site.ordering.uberEats && (
            <a
              href={site.ordering.uberEats}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/90 px-4 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-primary)] transition hover:bg-white/70"
            >
              {t.order.uberEats}
            </a>
          )}
          {site.ordering.grubhub && (
            <a
              href={site.ordering.grubhub}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/90 px-4 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-primary)] transition hover:bg-white/70"
            >
              {t.order.grubhub}
            </a>
          )}
          {site.ordering.seamless && (
            <a
              href={site.ordering.seamless}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/90 px-4 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-primary)] transition hover:bg-white/70"
            >
              {t.order.seamless}
            </a>
          )}
          <a
            href={site.ordering.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/90 px-4 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-primary)] transition hover:bg-white/70"
          >
            Yelp
          </a>
          <a
            href={`tel:${site.contact.phoneOrdersE164}`}
            className="flex h-14 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/90 px-4 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-primary)] transition hover:bg-white/70"
          >
            {t.order.callIn}
          </a>
        </div>

        {/* Delivery hours band */}
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          {t.order.deliveryHours}
        </p>

        {/* Phone line */}
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold uppercase tracking-wider text-white">
          <a
            href={`tel:${site.contact.phoneOrdersE164}`}
            className="inline-flex items-center gap-2 hover:text-[var(--brand-primary)]"
          >
            {site.contact.phoneOrders}
          </a>
        </div>

        {/* Allergy callout */}
        <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/10 px-4 py-3 text-xs text-white/90 sm:text-sm">
          
          {t.order.allergyNote}
        </div>
      </div>
    </section>
  )
}
