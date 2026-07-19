'use client'

import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

export default function ElpFooter() {
  const { t } = useLang()
  return (
    <footer className="relative border-t border-[var(--brand-ink)]/15 bg-[var(--brand-paper-deep)] text-[var(--brand-ink)]">
      <div className="flag-stripe h-1 w-full" aria-hidden="true" />
      <div className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative h-16 w-44 sm:h-20 sm:w-52">
              <Image
                src="/logo.webp"
                alt="Taco Inn — Comida Mexicana"
                fill
                quality={88}
                sizes="(max-width: 640px) 160px, 192px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-3 max-w-md text-sm text-[var(--brand-ink-soft)]">{t.footer.tagline}</p>
            <p className="mt-3 text-xs italic text-[var(--brand-gold)]">
              Hecho con orgullo en Washington Heights
            </p>
          </div>

          <div className="text-sm text-[var(--brand-ink-soft)]">
            <p className="text-xs uppercase tracking-wider text-[var(--brand-gold)]">Visit</p>
            <p className="mt-2">{site.contact.address}</p>
            <p className="text-[var(--brand-ink-soft)]">{site.contact.addressLine2}</p>
            <p>
              {site.contact.city}, {site.contact.state} {site.contact.zip}
            </p>
            <p className="mt-2">
              <a
                href={`tel:${site.contact.phoneOrdersE164}`}
                className="font-semibold text-[var(--brand-ink)] hover:text-[var(--brand-primary)]"
              >
                {site.contact.phoneOrders}
              </a>
              <span className="ml-1 text-xs uppercase tracking-wider text-[var(--brand-gold)]/80">
                · Orders
              </span>
            </p>
            <p className="mt-2 text-xs text-[var(--brand-ink-soft)]">{site.hoursSummary}</p>
            <p className="text-xs text-[var(--brand-ink-soft)]">{site.deliveryHoursSummary}</p>
          </div>

          <div className="text-sm text-[var(--brand-ink-soft)]">
            <p className="text-xs uppercase tracking-wider text-[var(--brand-gold)]">Order & Connect</p>
            <div className="mt-2 space-y-1">
              <a
                href={site.ordering.pickup}
                className="block font-semibold text-[var(--brand-ink)] hover:text-[var(--brand-primary)]"
              >
                Order Online
              </a>
              <a href="#menu" className="block hover:text-[var(--brand-primary)]">
                Menu
              </a>
              <a href="#visit" className="block hover:text-[var(--brand-primary)]">
                Visit
              </a>
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[var(--brand-primary)]"
                >
                  Instagram
                </a>
              )}
              {site.social.tiktok && (
                <a
                  href={site.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[var(--brand-primary)]"
                >
                  TikTok
                </a>
              )}
              {site.social.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-[var(--brand-primary)]"
                >
                  Facebook
                </a>
              )}
              <a
                href={site.ordering.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[var(--brand-primary)]"
              >
                Yelp
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--brand-ink)]/15 pt-6 text-center text-xs text-[var(--brand-ink-soft)]">
          {t.footer.copy}
        </div>
      </div>
    </footer>
  )
}
