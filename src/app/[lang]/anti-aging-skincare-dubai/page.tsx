import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Anti-Aging Skincare Dubai | Expert Anti-Aging Solutions UAE | By Hayat Skin',
    description: 'Combat premature aging caused by Dubai\'s UV and heat. Expert anti-aging skincare consultations and premium products designed for UAE\'s climate.',
    keywords: ['anti aging skincare dubai', 'anti aging products uae', 'anti wrinkle dubai', 'retinol dubai', 'anti aging consultation dubai'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/anti-aging-skincare-dubai` },
  }
}

export default async function AntiAgingSkincareDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Anti-Aging Skincare Dubai"
      headline="Anti-Aging Skincare Dubai"
      subheadline="Dubai's UV and heat accelerate skin aging. Our expert anti-aging protocols protect and reverse the signs of aging for UAE residents."
      keyword="anti aging skincare dubai"
      sections={[
        { heading: 'Why Dubai Accelerates Skin Aging', body: 'Dubai\'s intense UV radiation is the primary driver of premature skin aging — causing wrinkles, pigmentation, and loss of elasticity. Combined with heat-induced dehydration and AC-caused barrier damage, Dubai residents face accelerated photoaging. Our anti-aging protocols are specifically designed to combat these UAE-specific aging factors.' },
        { heading: 'Our Anti-Aging Ingredient Arsenal', body: 'We use clinically proven anti-aging actives: retinol (0.025%–1% depending on skin tolerance), vitamin C (stabilized 15–20%), peptides, niacinamide, and hyaluronic acid. Each ingredient is selected for its evidence base and compatibility with Dubai\'s climate.' },
        { heading: 'Anti-Aging Routine for Dubai\'s Climate', body: 'An effective anti-aging routine for Dubai must include: morning antioxidant protection (vitamin C + SPF 50+), evening retinol or peptide treatment, and intensive hydration to counteract AC dehydration. Our consultation creates a personalized anti-aging plan for your age group and skin type.' },
      ]}
      products={[
        { name: 'Retinol Night Serum', desc: 'Encapsulated retinol for visible anti-aging results', price: '380', slug: 'retinol-serum' },
        { name: 'Vitamin C Brightening Serum', desc: 'Stabilized 20% Vitamin C with ferulic acid', price: '320', slug: 'vitamin-c-serum' },
        { name: 'Calming Eye Cream', desc: 'Peptide-rich eye cream for fine lines & dark circles', price: '245', slug: 'eye-cream' },
      ]}
      faqItems={[
        { q: 'Does Dubai\'s climate cause premature aging?', a: 'Yes. Dubai\'s intense UV radiation is the leading cause of premature skin aging (photoaging). UV exposure causes wrinkles, pigmentation, and collagen breakdown. Daily SPF 50+ and antioxidant serums are essential for anti-aging in Dubai.' },
        { q: 'What is the best anti-aging skincare routine for Dubai?', a: 'AM: Vitamin C serum + SPF 50+. PM: Retinol serum + rich moisturizer. Weekly: Exfoliation. Our consultation creates a personalized anti-aging routine based on your age, skin type, and specific concerns.' },
        { q: 'At what age should I start anti-aging skincare in Dubai?', a: 'Due to Dubai\'s intense UV exposure, we recommend starting preventive anti-aging skincare in your mid-20s. SPF 50+ should be used from any age. Retinol and peptides are typically introduced in the late 20s to 30s.' },
      ]}
      ctaText="Get Anti-Aging Plan"
    />
  )
}