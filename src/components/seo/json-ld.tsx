import Script from 'next/script'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://findyourbalance.net'

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Balance Conference',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Balance Conference organizes motivation and personal development events focused on work-life balance, burnout prevention, and sustainable success.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sarajevo',
      addressCountry: 'BA',
    },
    sameAs: [
      'https://www.facebook.com/balanceconference',
      'https://www.instagram.com/balanceconference',
      'https://www.linkedin.com/company/balanceconference',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@findyourbalance.net',
    },
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

// Event Schema for Get Motivated 2026
export function EventJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Get Motivated 2026',
    description: 'The premier motivation and work-life balance conference in Sarajevo. Join world-class speakers and transform your approach to sustainable success.',
    startDate: '2026-04-16T09:00:00+02:00',
    endDate: '2026-04-16T18:00:00+02:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Sarajevo',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sarajevo',
        addressCountry: 'BA',
      },
    },
    image: `${BASE_URL}/og-image.jpg`,
    organizer: {
      '@type': 'Organization',
      name: 'Balance Conference',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/tickets`,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01',
    },
    performer: {
      '@type': 'PerformingGroup',
      name: 'Get Motivated 2026 Speakers',
    },
  }

  return (
    <Script
      id="event-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

// WebSite Schema
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Balance Conference',
    url: BASE_URL,
    description: 'Balance Conference - motivation and work-life balance events',
    inLanguage: ['en', 'bs'],
    publisher: {
      '@type': 'Organization',
      name: 'Balance Conference',
    },
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

// Blog Post Schema
interface BlogPostJsonLdProps {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
  slug: string
}

export function BlogPostJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  slug,
}: BlogPostJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image || `${BASE_URL}/og-image.jpg`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName || 'Balance Conference',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Balance Conference',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
  }

  return (
    <Script
      id="blogpost-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

// Speaker/Person Schema
interface SpeakerJsonLdProps {
  name: string
  description?: string
  image?: string
  jobTitle?: string
  slug: string
}

export function SpeakerJsonLd({
  name,
  description,
  image,
  jobTitle,
  slug,
}: SpeakerJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    description: description,
    image: image,
    jobTitle: jobTitle,
    url: `${BASE_URL}/speakers/${slug}`,
    performerIn: {
      '@type': 'Event',
      name: 'Get Motivated 2026',
      url: `${BASE_URL}/conferences/get-motivated-2026`,
    },
  }

  return (
    <Script
      id="speaker-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
