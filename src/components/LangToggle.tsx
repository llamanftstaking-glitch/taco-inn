'use client'

import { useLang } from '@/context/LangContext'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button
      type="button"
      aria-label="Toggle language"
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      className="inline-flex h-9 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-bold uppercase tracking-wider text-white/85 backdrop-blur transition hover:border-white/30 hover:text-white"
    >
      <span className={lang === 'en' ? 'text-[var(--brand-primary)]' : ''}>EN</span>
      <span className="text-white/30">/</span>
      <span className={lang === 'es' ? 'text-[var(--brand-primary)]' : ''}>ES</span>
    </button>
  )
}
