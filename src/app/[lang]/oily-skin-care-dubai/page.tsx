import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Oily Skin Care Dubai | Oil Control Skincare UAE | By Hayat Skin',
    description: 'Expert oily skin care in Dubai. Oil-control products and personalized routines for oily and combination skin in UAE\'s heat and humidity.',
    keywords: ['oily skin care dubai', 'oily skin products uae', 'oil control dubai', 'combination skin dubai', 'pore care dubai'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/oily-skin-care-dubai` },
  }
}

export default async function OilySkinCareDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Oily Skin Care Dubai"
      headline="Oily Skin Care Dubai"
      subheadline="Dubai's heat increases sebum production. Our oil-control skincare keeps your skin balanced, matte, and clear in UAE's climate."
      keyword="oily skin care dubai"
      sections={[
        { heading: 'Why Oily Skin is Worse in Dubai', body: 'Dubai\'s heat directly stimulates sebaceous glands to produce more oil. High humidity prevents sweat evaporation, creating a greasy film on skin. Dust and pollution mix with excess oil to clog pores. This combination makes oily skin particularly challenging in the UAE, often leading to breakouts and enlarged pores.' },
        { heading: 'Our Oily Skin Control Approach', body: 'We use a balanced approach that controls oil without over-stripping: salicylic acid for pore cleansing, niacinamide for sebum regulation, lightweight oil-free moisturizer (yes, oily skin needs hydration), and SPF 50+ in a matte finish. Over-drying oily skin backfires — it triggers more oil production.' },
        { heading: 'The Right Routine for Oily Skin in Dubai', body: 'AM: Foaming cleanser, niacinamide serum, oil-free moisturizer, matte SPF 50+. PM: Double cleanse (oil cleanser + foaming cleanser), BHA exfoliant (2-3x/week), lightweight gel moisturizer. Our consultation creates a personalized oil-control routine for your specific skin.' },
      ]}
      products={[
        { name: 'Clarifying Cleanser', desc: 'Salicylic acid cleanser for oily, acne-prone skin', price: '125', slug: 'clarifying-cleanser' },
        { name: 'Niacinamide Pore Serum', desc: '10% niacinamide + zinc for oil control', price: '210', slug: 'niacinamide-serum' },
        { name: 'Oil-Control Moisturizer', desc: 'Lightweight, non-comedogenic hydration', price: '145', slug: 'oil-control-moisturizer' },
      ]}
      faqItems={[
        { q: 'Why is my skin so oily in Dubai?', a: 'Dubai\'s heat stimulates sebaceous glands to produce more oil. High humidity prevents sweat evaporation, making skin feel greasier. This is a normal response to Dubai\'s climate — the right skincare routine can effectively control it.' },
        { q: 'Should oily skin use moisturizer in Dubai?', a: 'Yes, absolutely. Skipping moisturizer with oily skin triggers more oil production as the skin compensates for dehydration. Use a lightweight, oil-free, non-comedogenic moisturizer. Our Oil-Control Moisturizer is specifically formulated for oily skin in Dubai\'s climate.' },
        { q: 'What is the best skincare routine for oily skin in Dubai?', a: 'AM: Foaming cleanser, niacinamide serum, oil-free moisturizer, matte SPF 50+. PM: Double cleanse, BHA exfoliant (2-3x/week), lightweight gel moisturizer. Our consultation creates a personalized routine for your oily skin type.' },
      ]}
      ctaText="Get Oily Skin Routine"
    />
  )
}