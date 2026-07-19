import { site, menuEN } from '@/config/site'

export default function ElpJsonLd() {
  // Flatten menu into MenuItem nodes for hasMenu
  const menuSections = menuEN.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.name,
    description: cat.blurb,
    hasMenuItem: cat.items.map((it) => ({
      '@type': 'MenuItem',
      name: it.name,
      description: it.desc,
      offers: {
        '@type': 'Offer',
        price: it.price.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
      },
    })),
  }))

  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${site.url}#restaurant`,
    name: site.name,
    alternateName: 'Taco Inn Mexican Restaurant',
    description: site.shortDescription,
    url: site.url,
    image: [`${site.url}/og.png`],
    logo: `${site.url}/og.png`,
    telephone: site.contact.phoneOrdersE164,
    servesCuisine: ['Mexican', 'Latin American'],
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'USD',
    acceptsReservations: 'False',
    menu: `${site.url}/#menu`,
    hasMenu: {
      '@type': 'Menu',
      name: 'Taco Inn Full Menu',
      inLanguage: ['en', 'es'],
      hasMenuSection: menuSections,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressLocality: site.contact.city,
      addressRegion: site.contact.state,
      postalCode: site.contact.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // 1495 St. Nicholas Ave, NY 10033
      latitude: 40.8511,
      longitude: -73.9319,
    },
    areaServed: site.areasServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:00',
        closes: '02:00',
      },
    ],
    hasDeliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'],
    sameAs: [
      site.social.instagram,
      site.social.tiktok,
      site.social.facebook,
      site.ordering.yelp,
    ].filter(Boolean),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mexican Restaurant Washington Heights',
        item: site.url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
