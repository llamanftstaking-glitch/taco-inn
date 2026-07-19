import { MetadataRoute } from 'next'
import { site } from '@/config/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: site.url,
          es: `${site.url}/?lang=es`,
        },
      },
    },
  ]
}
