'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { i18n, type Lang } from '@/config/site'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (typeof i18n)['en']
}

const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = (document.cookie
      .split('; ')
      .find((c) => c.startsWith('elp_lang='))
      ?.split('=')[1] || '') as Lang
    if (saved === 'en' || saved === 'es') {
      setLangState(saved)
      document.documentElement.lang = saved
    }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    document.documentElement.lang = l
    document.cookie = `elp_lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: i18n[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
