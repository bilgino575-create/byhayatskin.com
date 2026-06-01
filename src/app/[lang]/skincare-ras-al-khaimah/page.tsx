import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { GeoSEOPage } from '@/components/pages/GeoSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Ras Al Khaimah | By Hayat Skin — Personalized Skincare UAE',
    description: 'Ras Al Khaimah\'s premier luxury skincare destination. Personalized skincare consultations and premium products designed for RAK\'s unique mountain-coastal climate.',
    keywords: ['skincare ras al khaimah', 'luxury skincare rak', 'skincare consultation ras al khaimah', 'best skincare rak', 'skincare uae'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-ras-al-khaimah` },
  }
}

const challenges = [
  { icon: '🏔', title: 'Mountain & Coastal Duality', desc: 'RAK\'s unique geography combines mountain dryness with coastal humidity, creating complex skin challenges that require adaptive skincare routines.' },
  { icon: '☀', title: 'Intense UV Exposure', desc: 'High altitude areas in RAK experience stronger UV radiation. Daily SPF 50+ is essential to prevent premature aging and pigmentation.' },
  { icon: '💨', title: 'Dry Desert Winds', desc: 'Desert winds from the interior strip moisture from skin rapidly. Barrier-strengthening moisturizers and hydrating serums are critical.' },
  { icon: '❄', title: 'AC-Induced Dehydration', desc: 'Indoor air conditioning in RAK\'s homes and offices causes chronic skin dehydration, requiring consistent hydration support.' },
]

const faqItems = [
  { q: 'Does By Hayat Skin deliver to Ras Al Khaimah?', a: 'Yes, we deliver across Ras Al Khaimah and all UAE emirates within 1-3 business days. Free delivery is available on qualifying orders.' },
  { q: 'What skincare is best for RAK\'s mountain-coastal climate?', a: 'RAK\'s dual climate requires a balanced approach: rich barrier-repair moisturizers for mountain dryness, lightweight hydrating serums for coastal humidity, and SPF 50+ year-round. Our consultation creates a routine tailored to your specific location within RAK.' },
  { q: 'How can I get a skincare consultation in Ras Al Khaimah?', a: 'Our online consultation is available to all UAE residents including RAK. Complete our skin analysis form or contact us via WhatsApp for a personalized skincare plan designed for your skin and RAK\'s climate.' },
]

export default async function SkincareRasAlKhaimahPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <GeoSEOPage
      city="Ras Al Khaimah"
      locale={lang as Locale}
      slug="skincare-ras-al-khaimah"
      heroTitle="Luxury Skincare Ras Al Khaimah"
      heroDesc="RAK's premier personalized skincare house. Expert consultations and premium products designed for Ras Al Khaimah's unique mountain-coastal climate."
      challenges={challenges}
      faqItems={faqItems}
    />
  )
}