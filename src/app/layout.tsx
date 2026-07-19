import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter, Cormorant_Garamond } from 'next/font/google'
import { site } from '@/config/site'
import { LangProvider } from '@/context/LangContext'
import MotionRoot from '@/components/MotionRoot'
import './globals.css'

const display = Bebas_Neue({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400'],
})

const body = Inter({
  variable: '--font-body',
  subsets: ['latin'],
})

const editorial = Cormorant_Garamond({
  variable: '--font-editorial',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0E0A05',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Tacos & Mexican Food in Washington Heights, NYC`,
    template: `%s | ${site.name} NYC`,
  },
  description: site.shortDescription,
  keywords: site.seo.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: 'Restaurant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Tacos & Mexican Food in Washington Heights, NYC`,
    description: site.shortDescription,
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · Tacos & Mexican Food in Washington Heights, NYC`,
    description: site.shortDescription,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: site.url,
    languages: {
      en: site.url,
      es: `${site.url}/?lang=es`,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${editorial.variable}`}>
      <head>
        {/* Logo + hero splash bg = above-the-fold LCP candidates */}
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.webp`} fetchPriority="high" />
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/food/tacos-spread.webp`} fetchPriority="high" />
        <link rel="preload" as="image" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-sm.webp`} />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <LangProvider>
          <MotionRoot>{children}</MotionRoot>
        </LangProvider>
      </body>
    </html>
  )
}
