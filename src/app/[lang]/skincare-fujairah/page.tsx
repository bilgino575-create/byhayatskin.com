import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { GeoSEOPage } from '@/components/pages/GeoSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Fujairah | By Hayat Skin — Personalized Skincare UAE',
    description: 'Fujairah\'s premier luxury skincare destination. Personalized skincare consultations and premium products designed for Fujairah\'s East Coast tropical climate.',
    keywords: ['skincare fujairah', 'luxury skincare fujairah', 'skincare consultation fujairah', 'best skincare fujairah', 'skincare east coast uae'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-fujairah` },
  }
}

const challenges = [
  { icon: '🌊', title: 'East Coast Tropical Humidity', desc: 'Fujairah\'s Indian Ocean coastline creates higher humidity than other emirates, leading to excess sebum production and congested pores.' },
  { icon: '☀', title: 'Intense UV & Heat', desc: 'Fujairah\'s tropical climate delivers year-round intense UV radiation. Daily SPF 50+ is non-negotiable to prevent sun damage and pigmentation.' },
  { icon: '🌿', title: 'Lush Environment Allergens', desc: 'Fujairah\'s greener landscape means more airborne allergens that can trigger skin sensitivity and redness, requiring gentle barrier-focused skincare.' },
  { icon: '💧', title: 'Salt Water Exposure', desc: 'Frequent exposure to the Arabian Sea\'s salt water can disrupt the skin barrier, causing dryness and irritation that needs targeted repair.' },
]

const faqItems = [
  { q: 'Does By Hayat Skin deliver to Fujairah?', a: 'Yes, we deliver across Fujairah and all UAE emirates within 1-3 business days. Free delivery is available on qualifying orders.' },
  { q: 'What skincare is best for Fujairah\'s tropical climate?', a: 'Fujairah\'s high humidity requires lightweight, non-comedogenic moisturizers, oil-control serums, and strong antioxidant protection. We also recommend barrier-repair products to counter salt water and allergen exposure. Our consultation creates a routine tailored to Fujairah\'s specific climate.' },
  { q: 'How can I get a skincare consultation in Fujairah?', a: 'Our online consultation is available to all UAE residents including Fujairah. Complete our skin analysis form or contact us via WhatsApp for a personalized skincare plan designed for your skin type and Fujairah\'s East Coast climate.' },
]

export default async function SkincareFujairahPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <GeoSEOPage
      city="Fujairah"
      locale={lang as Locale}
      slug="skincare-fujairah"
      heroTitle="Luxury Skincare Fujairah"
      heroDesc="Fujairah's premier personalized skincare house. Expert consultations and premium products designed for the East Coast's unique tropical climate."
      challenges={challenges}
      faqItems={faqItems}
    />
  )
}