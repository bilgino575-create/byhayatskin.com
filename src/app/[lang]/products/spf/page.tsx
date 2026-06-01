import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { ProductCategoryPage } from '@/components/pages/ProductCategoryPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Best SPF Sunscreen Dubai | Luxury Sun Protection UAE | By Hayat Skin',
    description:
      'Shop premium SPF sunscreens in Dubai. SPF 50+ broad-spectrum protection formulated for UAE\'s extreme UV index. Lightweight, non-greasy & reef-safe. Free consultation.',
    keywords: [
      'spf sunscreen dubai',
      'best sunscreen uae',
      'spf 50 dubai',
      'sun protection dubai',
      'luxury sunscreen uae',
      'tinted sunscreen dubai',
      'mineral sunscreen uae',
      'sunscreen for dubai heat',
      'uv protection dubai',
    ],
    alternates: { canonical: `https://byhayatskin.com/${lang}/products/spf` },
    openGraph: {
      title: 'Best SPF Sunscreen Dubai | By Hayat Skin',
      description:
        'Premium SPF 50+ sunscreens formulated for Dubai\'s extreme UV index. Lightweight, non-greasy protection for all skin types.',
      url: `https://byhayatskin.com/${lang}/products/spf`,
      siteName: 'By Hayat Skin',
      type: 'website',
    },
  }
}

export default async function SPFPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <ProductCategoryPage
        locale={lang as Locale}
        title="SPF Protection"
        headline="SPF Protection Built for Dubai's UV Intensity"
        subheadline="Dubai's UV index regularly reaches 11+ — the highest risk level. Our SPF collection is engineered for this reality, not a beach holiday."
        description="Living in Dubai means facing one of the world's highest UV indexes year-round. Standard sunscreens designed for occasional beach use simply cannot provide adequate protection for daily life in the UAE. Our SPF collection features broad-spectrum UVA/UVB protection with SPF 50+ ratings, formulated to remain stable and effective in extreme heat, resist sweat and humidity, and feel comfortable enough for daily wear under makeup or alone."
        products={[
          {
            name: 'Invisible Shield SPF 50+',
            desc: 'Ultra-lightweight fluid with no white cast. Broad-spectrum UVA/UVB protection for daily Dubai life.',
            price: '195',
            badge: 'Bestseller',
          },
          {
            name: 'Tinted Glow SPF 50+',
            desc: 'Sheer tint with SPF 50+ protection. Evens skin tone while shielding from Dubai\'s intense UV rays.',
            price: '225',
            badge: 'Most Loved',
          },
          {
            name: 'Mineral Calm SPF 50',
            desc: 'Zinc oxide-based mineral sunscreen for sensitive skin. Reef-safe & free from chemical filters.',
            price: '245',
            badge: 'Sensitive Skin',
          },
          {
            name: 'Matte Control SPF 50+',
            desc: 'Oil-control sunscreen with kaolin clay. Prevents shine in Dubai\'s heat while providing full UV protection.',
            price: '185',
          },
          {
            name: 'Anti-Aging SPF 50+ Serum',
            desc: 'SPF 50+ combined with vitamin C & niacinamide. Protects and brightens simultaneously.',
            price: '295',
            badge: 'Multi-Action',
          },
          {
            name: 'After-Sun Repair Gel',
            desc: 'Aloe vera & centella asiatica cooling gel. Soothes, repairs & rehydrates sun-exposed skin.',
            price: '155',
          },
        ]}
        benefits={[
          {
            icon: '🌞',
            title: 'Dubai UV Index Rated',
            desc: 'Dubai\'s UV index regularly exceeds 11 — the extreme risk category. Our SPF formulas are tested and rated for this intensity, providing genuine protection that standard sunscreens cannot match.',
          },
          {
            icon: '💨',
            title: 'Heat-Stable Formula',
            desc: 'Chemical sunscreen filters can degrade in extreme heat. Our formulas use heat-stable UV filters that maintain full efficacy even in 45°C+ temperatures, ensuring consistent protection throughout the day.',
          },
          {
            icon: '🎨',
            title: 'Wearable Every Day',
            desc: 'No white cast, no greasy residue, no pilling under makeup. Our SPF collection is designed for daily wear in Dubai — comfortable enough that you\'ll actually use it consistently.',
          },
        ]}
        faqItems={[
          {
            q: 'What SPF level do I need in Dubai?',
            a: 'In Dubai, SPF 50+ is the minimum recommendation. Dubai\'s UV index regularly reaches 11–12 (extreme risk), especially from April to October. Even in winter months, the UV index rarely drops below 6 (high risk). We recommend SPF 50+ broad-spectrum protection applied every 2 hours when outdoors.',
          },
          {
            q: 'Should I use mineral or chemical sunscreen in Dubai?',
            a: 'Both can be effective in Dubai. Chemical sunscreens tend to be more cosmetically elegant (no white cast) and are suitable for most skin types. Mineral sunscreens (zinc oxide/titanium dioxide) are better for sensitive or reactive skin. Our Mineral Calm SPF 50 is ideal for sensitive skin, while our Invisible Shield SPF 50+ suits most skin types.',
          },
          {
            q: 'How often should I reapply sunscreen in Dubai?',
            a: 'Reapply every 2 hours when outdoors, and immediately after swimming or excessive sweating. In Dubai\'s heat, sweating can reduce sunscreen efficacy faster than in cooler climates. If you\'re primarily indoors with air conditioning, morning application with a midday reapply is generally sufficient.',
          },
          {
            q: 'Can I use SPF as my only moisturizer in Dubai?',
            a: 'We don\'t recommend relying on SPF alone for hydration. Apply your moisturizer first, allow it to absorb for 2–3 minutes, then apply your SPF as the final step in your morning routine. This ensures both optimal hydration and maximum UV protection.',
          },
          {
            q: 'Is sunscreen necessary indoors in Dubai?',
            a: 'Yes. UVA rays penetrate glass windows and can cause skin aging and pigmentation even indoors. If you sit near windows or spend time in a car, daily SPF application is essential. UVA rays are present year-round, regardless of cloud cover.',
          },
        ]}
        keyword="spf sunscreen dubai"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Best SPF Sunscreen Dubai | By Hayat Skin',
            description:
              'Premium SPF 50+ sunscreens formulated for Dubai\'s extreme UV index. Lightweight, non-greasy protection for all skin types.',
            url: `https://byhayatskin.com/${lang}/products/spf`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `https://byhayatskin.com/${lang}` },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `https://byhayatskin.com/${lang}/products` },
                { '@type': 'ListItem', position: 3, name: 'SPF Protection', item: `https://byhayatskin.com/${lang}/products/spf` },
              ],
            },
          }),
        }}
      />
    </>
  )
}