import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Sensitive Skin Dubai | Gentle Skincare for Reactive Skin UAE | By Hayat Skin',
    description: 'Expert skincare for sensitive skin in Dubai. Fragrance-free, gentle formulations designed for reactive skin in UAE\'s challenging climate.',
    keywords: ['sensitive skin dubai', 'sensitive skin care uae', 'gentle skincare dubai', 'reactive skin dubai', 'fragrance free skincare uae'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/sensitive-skin-dubai` },
  }
}

export default async function SensitiveSkinDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Sensitive Skin Dubai"
      headline="Sensitive Skin Care Dubai"
      subheadline="Gentle, effective skincare for sensitive and reactive skin in Dubai's challenging climate. Fragrance-free formulations that soothe and protect."
      keyword="sensitive skin dubai"
      sections={[
        { heading: 'Why Sensitive Skin Struggles in Dubai', body: 'Dubai\'s extreme heat, UV radiation, and heavy AC use create a perfect storm for sensitive skin. Heat triggers flushing and redness, UV causes inflammation, and AC dehydrates the skin barrier — making it more reactive. Many people develop sensitive skin after moving to Dubai due to these environmental stressors.' },
        { heading: 'Our Sensitive Skin Approach', body: 'We use only fragrance-free, hypoallergenic formulations with proven calming ingredients: centella asiatica, ceramides, niacinamide, and allantoin. We avoid common irritants: fragrance, alcohol, essential oils, and harsh exfoliants. Every product is patch-tested and suitable for reactive skin.' },
        { heading: 'Building a Sensitive Skin Routine for Dubai', body: 'A sensitive skin routine for Dubai must be minimal and gentle: fragrance-free cleanser, calming serum (centella or niacinamide), barrier-repair moisturizer, and mineral SPF 50+. Our consultation identifies your specific sensitivities and creates a soothing routine.' },
      ]}
      products={[
        { name: 'Barrier Repair Moisturizer', desc: 'Ceramide-rich formula for sensitive, reactive skin', price: '195', slug: 'barrier-repair' },
        { name: 'Calm & Repair Serum', desc: 'Centella asiatica + niacinamide for sensitive skin', price: '225', slug: 'calm-repair-serum' },
        { name: 'Gentle Cleansing Milk', desc: 'Fragrance-free, pH-balanced cleanser for sensitive skin', price: '115', slug: 'gentle-cleanser' },
      ]}
      faqItems={[
        { q: 'Why is my skin more sensitive in Dubai?', a: 'Dubai\'s extreme UV, heat, and AC exposure damage the skin barrier, making skin more reactive and sensitive. Many people develop sensitivity after moving to Dubai. Barrier-repair skincare and gentle formulations are essential.' },
        { q: 'What skincare is safe for sensitive skin in Dubai?', a: 'For sensitive skin in Dubai: fragrance-free cleanser, centella or niacinamide serum, ceramide moisturizer, and mineral SPF 50+. Avoid fragrances, alcohol, and harsh exfoliants. Our consultation creates a gentle routine for your specific sensitivities.' },
        { q: 'Can I use retinol with sensitive skin in Dubai?', a: 'Yes, but carefully. Start with a low concentration (0.025%) and introduce slowly. Use a buffer moisturizer and always follow with SPF 50+. Our consultation guides you through introducing actives safely for sensitive skin.' },
      ]}
      ctaText="Get Sensitive Skin Plan"
    />
  )
}