import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { ProductCategoryPage } from '@/components/pages/ProductCategoryPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Anti-Aging Skincare Dubai | Best Anti-Wrinkle Products UAE | By Hayat Skin',
    description:
      'Shop luxury anti-aging skincare in Dubai. Retinol, peptides & collagen-boosting formulas designed for UAE climate. Clinically proven to reduce wrinkles & fine lines. Free consultation.',
    keywords: [
      'anti aging skincare dubai',
      'anti wrinkle cream uae',
      'best anti aging products dubai',
      'retinol cream dubai',
      'collagen serum uae',
      'peptide cream dubai',
      'luxury anti aging dubai',
      'wrinkle treatment uae',
      'skin firming dubai',
    ],
    alternates: { canonical: `https://byhayatskin.com/${lang}/products/anti-aging` },
    openGraph: {
      title: 'Anti-Aging Skincare Dubai | By Hayat Skin',
      description:
        'Luxury anti-aging formulas with retinol, peptides & collagen boosters. Clinically proven results for UAE skin.',
      url: `https://byhayatskin.com/${lang}/products/anti-aging`,
      siteName: 'By Hayat Skin',
      type: 'website',
    },
  }
}

export default async function AntiAgingPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <ProductCategoryPage
        locale={lang as Locale}
        title="Anti-Aging Skincare"
        headline="Age Gracefully in Dubai's Demanding Climate"
        subheadline="Dubai's UV intensity accelerates skin aging 2–3x faster than temperate climates. Our anti-aging collection is engineered to reverse and prevent this accelerated damage."
        description="The combination of intense UV radiation, extreme heat, and the dehydrating effects of air conditioning makes Dubai one of the most challenging environments for skin aging. Photoaging — premature aging caused by UV exposure — is significantly more prevalent in UAE residents. Our anti-aging collection addresses this with clinically proven actives: retinol for cell renewal, peptides for collagen stimulation, antioxidants for UV damage repair, and hyaluronic acid for deep hydration. Every formula is designed to deliver visible results in Dubai's unique conditions."
        products={[
          {
            name: 'Retinol Renewal Serum 0.5%',
            desc: 'Encapsulated retinol with time-release technology. Reduces fine lines & accelerates cell turnover overnight.',
            price: '320',
            badge: 'Bestseller',
          },
          {
            name: 'Peptide Lift Eye Cream',
            desc: 'Tri-peptide complex targeting crow\'s feet, dark circles & puffiness. Visible lifting in 4 weeks.',
            price: '285',
            badge: 'Eye Care',
          },
          {
            name: 'Collagen Boost Day Cream SPF 30',
            desc: 'Marine collagen + peptides with SPF 30 protection. Firms skin while defending against Dubai\'s UV.',
            price: '365',
            badge: 'Multi-Action',
          },
          {
            name: 'Vitamin C Brightening Serum 20%',
            desc: 'Stabilized L-ascorbic acid repairs UV-induced pigmentation & stimulates collagen synthesis.',
            price: '285',
            badge: 'Photoaging Repair',
          },
          {
            name: 'Resveratrol Night Recovery Cream',
            desc: 'Antioxidant-rich overnight treatment with resveratrol, CoQ10 & bakuchiol. Repairs daily UV damage.',
            price: '395',
            badge: 'Luxury',
          },
          {
            name: 'Hyaluronic Plumping Mask',
            desc: 'Intensive weekly treatment with 5 types of hyaluronic acid. Restores volume & plumpness lost to dehydration.',
            price: '175',
          },
        ]}
        benefits={[
          {
            icon: '⏳',
            title: 'Reverse Photoaging',
            desc: 'Dubai\'s UV index causes photoaging at an accelerated rate. Our retinol and vitamin C formulas are clinically proven to reverse UV-induced damage — reducing fine lines, hyperpigmentation, and loss of elasticity.',
          },
          {
            icon: '🧬',
            title: 'Collagen Stimulation',
            desc: 'After age 25, collagen production decreases by 1% annually. Our peptide and retinol formulas actively stimulate new collagen synthesis, restoring firmness and reducing the appearance of wrinkles.',
          },
          {
            icon: '🌙',
            title: 'Overnight Repair System',
            desc: 'Skin repairs itself most effectively during sleep. Our night collection maximizes this window with concentrated actives that work in harmony with your skin\'s natural regeneration cycle.',
          },
        ]}
        faqItems={[
          {
            q: 'At what age should I start anti-aging skincare in Dubai?',
            a: 'In Dubai\'s UV-intense environment, we recommend starting preventive anti-aging skincare from age 25. This includes daily SPF 50+, vitamin C serum, and a good moisturizer. Active anti-aging treatments like retinol are typically introduced from age 28–30. Our consultation service provides age-specific recommendations.',
          },
          {
            q: 'Is retinol safe to use in Dubai\'s sunny climate?',
            a: 'Yes, with proper precautions. Retinol increases photosensitivity, so it must always be used at night and followed by SPF 50+ in the morning. In Dubai\'s intense UV environment, this is non-negotiable. Our Retinol Renewal Serum uses encapsulated retinol that releases gradually, minimizing irritation while maximizing efficacy.',
          },
          {
            q: 'How long before I see anti-aging results?',
            a: 'With consistent use, most clients notice improved skin texture and hydration within 2–4 weeks. Visible reduction in fine lines typically appears at 8–12 weeks. Significant improvement in deeper wrinkles and skin firmness is usually evident at 3–6 months. Results are accelerated when combined with our personalized consultation plan.',
          },
          {
            q: 'Can I use multiple anti-aging products together?',
            a: 'Yes, but layering must be done correctly. Avoid combining retinol with vitamin C in the same routine — use vitamin C in the morning and retinol at night. Peptides can be used with both. Our consultation service provides a precise routine schedule to maximize results without causing irritation.',
          },
          {
            q: 'Does Dubai\'s climate accelerate skin aging?',
            a: 'Yes, significantly. Dubai\'s UV index regularly reaches 11–12 (extreme), causing photoaging at 2–3x the rate of temperate climates. Additionally, the constant shift between outdoor heat and air-conditioned interiors creates chronic dehydration, which accelerates the appearance of fine lines. A Dubai-specific anti-aging routine is essential.',
          },
        ]}
        keyword="anti aging skincare dubai"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Anti-Aging Skincare Dubai | By Hayat Skin',
            description:
              'Luxury anti-aging formulas with retinol, peptides & collagen boosters. Clinically proven results for UAE skin.',
            url: `https://byhayatskin.com/${lang}/products/anti-aging`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `https://byhayatskin.com/${lang}` },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `https://byhayatskin.com/${lang}/products` },
                { '@type': 'ListItem', position: 3, name: 'Anti-Aging', item: `https://byhayatskin.com/${lang}/products/anti-aging` },
              ],
            },
          }),
        }}
      />
    </>
  )
}