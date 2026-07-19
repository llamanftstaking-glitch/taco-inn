'use client'

import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { site } from '@/config/site'

export default function ElpStory() {
  const { t } = useLang()
  return (
    <section id="story" className="relative bg-[#13100A] px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold)]">
            Hecho con Orgullo · Made with Pride
          </p>
          <h2 className="mt-3 text-balance text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {t.story.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            {t.story.body}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-black text-[var(--brand-gold)]">80+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/75">Platillos</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-black text-[var(--brand-gold)]">{site.foundingYear}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/75">Since</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-black text-[var(--brand-gold)]">
                ★ {site.aggregateRating.ratingValue.toFixed(1)}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/75">
                {site.aggregateRating.reviewCount}+ Reviews
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-black text-[var(--brand-gold)]">100%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/75">Auténtico</p>
            </div>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/70">
            <span className="text-[var(--brand-gold)]">Delivery:</span>{' '}
            {site.deliveryZone}
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={site.images.storyKitchen}
              alt="Hand-pressed tortillas being made fresh in our kitchen"
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#0E0A05]/95 px-5 py-3 backdrop-blur sm:left-auto sm:right-5 sm:max-w-[220px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              Daily
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-[var(--brand-ink)]">
              Hand-pressed tortillas, every morning before service.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
