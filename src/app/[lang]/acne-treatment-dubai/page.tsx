import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Acne Treatment Dubai | Expert Acne Skincare Solutions | By Hayat Skin',
    description: 'Effective acne treatment in Dubai. Expert-formulated products and personalized consultations for acne-prone skin in UAE\'s climate. Clear skin starts here.',
    keywords: ['acne treatment dubai', 'acne skincare dubai', 'acne products uae', 'clear skin dubai', 'acne consultation dubai'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/acne-treatment-dubai` },
  }
}

export default async function AcneTreatmentDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Acne Treatment Dubai"
      headline="Acne Treatment Dubai"
      subheadline="Expert acne solutions designed for Dubai's climate. Personalized routines that clear breakouts and prevent future acne."
      keyword="acne treatment dubai"
      sections={[
        { heading: 'Why Acne is Worse in Dubai\'s Climate', body: 'Dubai\'s heat and humidity increase sebum production, while dust and pollution clog pores. Air conditioning causes dehydration, which paradoxically triggers more oil production. This combination makes acne particularly challenging in the UAE. Our acne treatment protocols are specifically designed for these conditions.' },
        { heading: 'Our Acne Treatment Approach', body: 'We combine salicylic acid cleansers, niacinamide serums, and non-comedogenic moisturizers in a balanced routine that clears acne without over-drying. Our consultation system identifies your specific acne triggers and creates a targeted treatment plan.' },
        { heading: 'Acne-Safe Skincare for Dubai', body: 'All our acne-treatment products are non-comedogenic, fragrance-free, and tested for Dubai\'s climate. We avoid pore-clogging ingredients and focus on proven actives: salicylic acid, niacinamide, zinc, and benzoyl peroxide at appropriate concentrations.' },
      ]}
      products={[
        { name: 'Clarifying Cleanser', desc: 'Salicylic acid cleanser for acne-prone skin', price: '125', slug: 'clarifying-cleanser' },
        { name: 'Acne-Clear Treatment', desc: 'Targeted blemish treatment with niacinamide & zinc', price: '155', slug: 'acne-clear' },
        { name: 'Oil-Control Moisturizer', desc: 'Lightweight non-comedogenic hydration', price: '145', slug: 'oil-control' },
      ]}
      faqItems={[
        { q: 'What causes acne in Dubai\'s climate?', a: 'Dubai\'s heat increases sebum production, humidity promotes bacterial growth, dust clogs pores, and AC dehydration triggers compensatory oil production. This combination makes acne particularly common in UAE residents.' },
        { q: 'What is the best acne treatment for Dubai\'s weather?', a: 'For Dubai\'s climate, we recommend: salicylic acid cleanser (twice daily), niacinamide + zinc serum, lightweight non-comedogenic moisturizer, and SPF 50+ sunscreen. Our consultation creates a personalized acne treatment plan.' },
        { q: 'Can I get an acne consultation in Dubai?', a: 'Yes, By Hayat Skin offers personalized acne consultations online and via WhatsApp. Our experts analyze your skin and create a targeted treatment plan for your specific acne type.' },
      ]}
      ctaText="Get Acne Treatment Plan"
    />
  )
}