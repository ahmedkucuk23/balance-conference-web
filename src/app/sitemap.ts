import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://findyourbalance.net'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'bs']
  const defaultLocale = 'en'

  // Static pages
  const staticPages = [
    '',
    '/about-us',
    '/speakers',
    '/tickets',
    '/contact',
    '/reviews',
    '/blog',
    '/gallery',
    '/video-gallery',
    '/sponsorships',
    '/excellence-awards',
    '/conferences/get-motivated-2026',
    '/conferences/find-your-balance-2025',
  ]

  // Generate sitemap entries for all static pages in all locales
  const staticEntries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of staticPages) {
      const url = locale === defaultLocale
        ? `${BASE_URL}${page}`
        : `${BASE_URL}/${locale}${page}`

      staticEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page.includes('tickets') ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}${page}`,
            bs: `${BASE_URL}/bs${page}`,
          },
        },
      })
    }
  }

  // Fetch dynamic speaker pages
  let speakerEntries: MetadataRoute.Sitemap = []
  try {
    const response = await fetch(`${BASE_URL}/api/speakers`, {
      next: { revalidate: 3600 }
    })
    if (response.ok) {
      const speakers = await response.json()
      if (Array.isArray(speakers)) {
        for (const speaker of speakers) {
          for (const locale of locales) {
            const url = locale === defaultLocale
              ? `${BASE_URL}/speakers/${speaker.slug}`
              : `${BASE_URL}/${locale}/speakers/${speaker.slug}`

            speakerEntries.push({
              url,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.7,
              alternates: {
                languages: {
                  en: `${BASE_URL}/speakers/${speaker.slug}`,
                  bs: `${BASE_URL}/bs/speakers/${speaker.slug}`,
                },
              },
            })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching speakers for sitemap:', error)
  }

  // Fetch dynamic blog pages
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const response = await fetch(`${BASE_URL}/api/blog`, {
      next: { revalidate: 3600 }
    })
    if (response.ok) {
      const posts = await response.json()
      if (Array.isArray(posts)) {
        for (const post of posts) {
          for (const locale of locales) {
            const url = locale === defaultLocale
              ? `${BASE_URL}/blog/${post.slug}`
              : `${BASE_URL}/${locale}/blog/${post.slug}`

            blogEntries.push({
              url,
              lastModified: new Date(post.updatedAt || post.createdAt),
              changeFrequency: 'monthly',
              priority: 0.6,
              alternates: {
                languages: {
                  en: `${BASE_URL}/blog/${post.slug}`,
                  bs: `${BASE_URL}/bs/blog/${post.slug}`,
                },
              },
            })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  return [...staticEntries, ...speakerEntries, ...blogEntries]
}
