import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { GeoSEOPage } from '@/components/pages/GeoSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Ajman | By Hayat Skin — Personalized Skincare UAE',
    description: 'Ajman\'s premier luxury skincare destination. Personalized skincare consultations and premium products for UAE\'s climate.',
    keywords: ['skincare ajman', 'luxury skincare ajman', 'skincare consultation ajman', 'best skincare ajman'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-ajman` },
  }
}

const challenges = [
  { icon: '☀', title: 'UV & Heat Exposure', desc: 'Ajman\'s coastal location means intense UV radiation and heat requiring daily broad-spectrum SPF protection.' },
  { icon: '💧', title: 'Coastal Humidity', desc: 'High humidity levels can cause excess sebum production and clogged pores, requiring balanced skincare.' },
  { icon: '❄', title: 'Indoor AC Dryness', desc: 'Air conditioning in homes and offices dehydrates skin, making hydrating serums essential.' },
  { icon: '🌊', title: 'Salt Air Exposure', desc: 'Coastal salt air can irritate sensitive skin and accelerate moisture loss.' },
]

const faqItems = [
  { q: 'Does By Hayat Skin deliver to Ajman?', a: 'Yes, we deliver across Ajman and all UAE emirates within 1-3 business days.' },
  { q: 'What skincare is best for Ajman\'s coastal climate?', a: 'For Ajman\'s coastal climate, we recommend barrier-strengthening moisturizers, antioxidant serums, and SPF 50+ to protect against UV and salt air.' },
  { q: 'How can I get a skincare consultation in Ajman?', a: 'Our online consultation is available to all UAE residents. Complete our skin analysis form or contact us via WhatsApp for a personalized plan.' },
]

export default async function SkincareAjmanPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <GeoSEOPage
      city="Ajman"
      locale={lang as Locale}
      slug="skincare-ajman"
      heroTitle="Luxury Skincare Ajman"
      heroDesc="Ajman's premier personalized skincare house. Expert consultations and premium products designed for UAE's coastal climate."
      challenges={challenges}
      faqItems={faqItems}
    />
  )
}