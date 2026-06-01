import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { ProductCategoryPage } from '@/components/pages/ProductCategoryPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Face Moisturizers Dubai | Best Hydrating Creams UAE',
    description:
      'Shop premium face moisturizers in Dubai. Lightweight & rich hydrating creams formulated for UAE climate. Dermatologist-tested for all skin types. Free consultation.',
    keywords: [
      'face moisturizer dubai',
      'hydrating cream uae',
      'best moisturizer dubai',
      'luxury face cream dubai',
      'moisturizer for dubai heat',
      'lightweight moisturizer uae',
      'anti aging moisturizer dubai',
      'sensitive skin moisturizer uae',
    ],
    alternates: { canonical: `https://byhayatskin.com/${lang}/products/moisturizers` },
    openGraph: {
      title: 'Luxury Face Moisturizers Dubai | By Hayat Skin',
      description:
        'Premium hydrating creams formulated for Dubai\'s climate. Shop lightweight & rich moisturizers for all skin types.',
      url: `https://byhayatskin.com/${lang}/products/moisturizers`,
      siteName: 'By Hayat Skin',
      type: 'website',
    },
  }
}

export default async function MoisturizersPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <ProductCategoryPage
        locale={lang as Locale}
        title="Face Moisturizers"
        headline="Hydration Engineered for Dubai's Climate"
        subheadline="From featherlight gels to rich barrier creams — every formula designed to thrive in UAE heat, humidity & air conditioning."
        description="Dubai's climate demands more from your moisturizer. The intense heat, UV radiation, and constant transition between outdoor humidity and air-conditioned interiors creates a cycle of dehydration that standard moisturizers cannot address. Our collection features climate-adaptive formulas that lock in moisture without clogging pores, protect the skin barrier, and deliver lasting hydration throughout the day."
        products={[
          {
            name: 'Aqua-Silk Gel Moisturizer',
            desc: 'Ultra-lightweight gel formula with hyaluronic acid & aloe vera. Perfect for Dubai\'s humid summers.',
            price: '225',
            badge: 'Bestseller',
          },
          {
            name: 'Barrier Restore Rich Cream',
            desc: 'Ceramide-rich formula for dry & dehydrated skin. Repairs moisture barrier damaged by AC & desert air.',
            price: '295',
            badge: 'Climate Defense',
          },
          {
            name: 'Peptide Lift Day Cream',
            desc: 'Multi-peptide moisturizer with SPF 15 base. Firms, hydrates & protects against daily UV exposure.',
            price: '345',
            badge: 'Anti-Aging',
          },
          {
            name: 'Calm & Soothe Sensitive Cream',
            desc: 'Fragrance-free formula with centella asiatica & oat extract. Ideal for reactive skin in UAE climate.',
            price: '265',
          },
          {
            name: 'Glow Renewal Night Cream',
            desc: 'Overnight repair cream with retinol, niacinamide & shea butter. Wake up to visibly smoother skin.',
            price: '315',
            badge: 'Night Ritual',
          },
          {
            name: 'Oil Control Mattifying Moisturizer',
            desc: 'Lightweight formula with kaolin clay & niacinamide. Controls shine in Dubai\'s heat without drying.',
            price: '215',
          },
        ]}
        benefits={[
          {
            icon: '💧',
            title: 'Climate-Adaptive Hydration',
            desc: 'Our moisturizers are formulated to maintain optimal skin hydration levels despite Dubai\'s extreme temperature fluctuations, UV intensity, and the dehydrating effects of air conditioning.',
          },
          {
            icon: '🛡️',
            title: 'Barrier Protection',
            desc: 'Every formula reinforces the skin\'s natural moisture barrier with ceramides, fatty acids, and humectants — preventing transepidermal water loss in harsh desert conditions.',
          },
          {
            icon: '🌿',
            title: 'Non-Comedogenic',
            desc: 'All moisturizers are dermatologist-tested and non-comedogenic, ensuring they hydrate without clogging pores — essential in Dubai\'s heat where pores are more prone to congestion.',
          },
        ]}
        faqItems={[
          {
            q: 'Which moisturizer is best for Dubai\'s hot and humid climate?',
            a: 'For Dubai summers, we recommend our Aqua-Silk Gel Moisturizer — its lightweight gel texture provides intense hydration without feeling heavy in the heat. For winter months or air-conditioned environments, our Barrier Restore Rich Cream offers deeper nourishment. Book a free consultation for a personalized recommendation.',
          },
          {
            q: 'Should I use a different moisturizer in summer vs winter in Dubai?',
            a: 'Yes, absolutely. Dubai\'s summer heat and humidity calls for lighter gel-based formulas, while the cooler, drier winter months benefit from richer cream textures. Many of our clients use two moisturizers seasonally. Our consultation service can guide you through a seasonal skincare transition.',
          },
          {
            q: 'Can I skip moisturizer if I have oily skin in Dubai?',
            a: 'No — oily skin still needs hydration. Skipping moisturizer can actually trigger more oil production as your skin compensates for dehydration. Our Oil Control Mattifying Moisturizer is specifically designed for oily skin types in hot climates, providing hydration while controlling shine.',
          },
          {
            q: 'Do your moisturizers contain SPF?',
            a: 'Our Peptide Lift Day Cream contains SPF 15 as a base layer. However, for Dubai\'s intense UV environment, we strongly recommend layering a dedicated SPF 50+ sunscreen over your moisturizer. Browse our SPF Protection collection for the best options.',
          },
          {
            q: 'Are your moisturizers suitable for expats new to Dubai?',
            a: 'Yes, and we especially recommend a consultation for expats new to Dubai. The climate change often causes significant skin reactions — increased oiliness, breakouts, or extreme dryness. Our consultation system is designed to help your skin adapt to UAE conditions quickly.',
          },
        ]}
        keyword="face moisturizers dubai"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Luxury Face Moisturizers Dubai | By Hayat Skin',
            description:
              'Premium hydrating creams formulated for Dubai\'s climate. Shop lightweight & rich moisturizers for all skin types.',
            url: `https://byhayatskin.com/${lang}/products/moisturizers`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `https://byhayatskin.com/${lang}` },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `https://byhayatskin.com/${lang}/products` },
                { '@type': 'ListItem', position: 3, name: 'Moisturizers', item: `https://byhayatskin.com/${lang}/products/moisturizers` },
              ],
            },
          }),
        }}
      />
    </>
  )
}