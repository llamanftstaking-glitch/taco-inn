'use client'

import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

const DAY_KEYS = [
  ['monday', 'Mon', 'Lun'],
  ['tuesday', 'Tue', 'Mar'],
  ['wednesday', 'Wed', 'Mié'],
  ['thursday', 'Thu', 'Jue'],
  ['friday', 'Fri', 'Vie'],
  ['saturday', 'Sat', 'Sáb'],
  ['sunday', 'Sun', 'Dom'],
] as const

export default function ElpVisit() {
  const { t, lang } = useLang()
  return (
    <section id="visit" className="relative bg-[var(--brand-paper)] px-4 py-20 text-[var(--brand-ink)] sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
            Visit · Visítanos
          </p>
          <h2 className="mt-3 text-balance text-3xl font-black sm:text-4xl md:text-5xl">
            {t.visit.title}
          </h2>
          <div className="mt-4 flex items-center gap-1.5">
            <span className="h-1 w-10 rounded-full bg-[var(--flag-green)]" />
            <span className="h-1 w-10 rounded-full bg-white" />
            <span className="h-1 w-10 rounded-full bg-[var(--flag-red)]" />
          </div>

          <div className="mt-6 space-y-4 text-base text-[var(--brand-ink)]">
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--brand-ink-soft)]">Address</p>
              <p className="mt-1 text-lg font-semibold">{t.visit.address}</p>
              <p className="text-sm text-[var(--brand-ink-soft)]">{site.contact.addressLine2} · {site.contact.neighborhood}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--brand-ink-soft)]">Hours</p>
              <ul className="mt-1 space-y-0.5 text-sm">
                {DAY_KEYS.map(([key, en, es]) => (
                  <li
                    key={key}
                    className="flex justify-between gap-4 border-b border-white/5 py-1 last:border-b-0"
                  >
                    <span className="text-[var(--brand-ink-soft)]">{lang === 'es' ? es : en}</span>
                    <span className="font-semibold">{site.hours[key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full bg-[var(--brand-accent)] px-5 text-sm font-extrabold uppercase tracking-wider text-white transition hover:bg-[var(--brand-accent-dark)]"
            >
              {t.visit.directions}
            </a>
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="inline-flex h-11 items-center rounded-full border border-[var(--brand-ink)]/25 bg-white/60 px-5 text-sm font-extrabold uppercase tracking-wider text-[var(--brand-ink)] backdrop-blur transition hover:border-white/40 hover:bg-white/65"
            >
              {t.visit.callUs}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[var(--brand-ink)]/15 shadow-2xl">
          <iframe
            title="Map to Taco Inn"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              site.contact.address +
                ', ' +
                site.contact.city +
                ', ' +
                site.contact.state +
                ' ' +
                site.contact.zip,
            )}&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
            className="h-[400px] w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
