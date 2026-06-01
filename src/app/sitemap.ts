import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n/config'

const baseUrl = 'https://byhayatskin.com'

const staticRoutes = [
  '',
  '/products',
  '/consultation',
  '/blog',
  '/about',
  '/contact',
]

const productRoutes = [
  '/products/serums',
  '/products/moisturizers',
  '/products/cleansers',
  '/products/masks',
  '/products/spf',
  '/products/eye-care',
  '/products/anti-aging',
  '/products/acne',
  '/products/pigmentation',
  '/products/barrier',
  '/products/kits',
]

const geoRoutes = [
  '/skincare-dubai',
  '/skincare-abu-dhabi',
  '/skincare-sharjah',
  '/skincare-ajman',
  '/skincare-alain',
  '/skincare-ras-al-khaimah',
  '/skincare-fujairah',
  '/luxury-skincare-dubai',
  '/best-skincare-dubai',
  '/acne-treatment-dubai',
  '/anti-aging-skincare-dubai',
  '/pigmentation-treatment-dubai',
  '/sensitive-skin-dubai',
  '/dry-skin-treatment-dubai',
  '/oily-skin-care-dubai',
  '/skincare-consultation-dubai',
]

const blogSlugs = [
  '/blog/skincare-routine-dubai-summer',
  '/blog/hyaluronic-acid-guide',
  '/blog/anti-aging-routine-uae',
  '/blog/best-skincare-routine-dry-skin-dubai',
  '/blog/best-skincare-routine-oily-skin-dubai',
  '/blog/skincare-dubai-summer-heat',
  '/blog/skincare-expats-uae',
  '/blog/anti-aging-skincare-routine-uae',
  '/blog/acne-treatment-routine-dubai',
  '/blog/skin-barrier-repair-dubai-climate',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Static routes for all locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      })
    }

    // Product routes
    for (const route of productRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // Blog routes
    for (const route of blogSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  // Geo SEO pages (English only for now)
  for (const route of geoRoutes) {
    entries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  return entries
}