import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { GeoSEOPage } from '@/components/pages/GeoSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Sharjah | By Hayat Skin — Personalized Skincare UAE',
    description: 'Sharjah\'s premier luxury skincare destination. Personalized skincare consultations and premium products for UAE\'s climate.',
    keywords: ['skincare sharjah', 'luxury skincare sharjah', 'skincare consultation sharjah', 'best skincare sharjah'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-sharjah` },
  }
}

const challenges = [
  { icon: '☀', title: 'High UV Exposure', desc: 'Sharjah\'s coastal and inland areas experience intense UV radiation requiring daily SPF protection.' },
  { icon: '💧', title: 'Coastal Humidity', desc: 'Sharjah\'s coastal areas have higher humidity which can cause excess oil production and breakouts.' },
  { icon: '❄', title: 'AC Dehydration', desc: 'Heavy reliance on air conditioning strips skin moisture, requiring intensive hydration routines.' },
  { icon: '🌫', title: 'Urban Pollution', desc: 'Urban pollution and dust require thorough cleansing and antioxidant protection daily.' },
]

const faqItems = [
  { q: 'Does By Hayat Skin deliver to Sharjah?', a: 'Yes, we deliver across Sharjah and all UAE emirates within 1-3 business days.' },
  { q: 'What skincare routine is best for Sharjah\'s climate?', a: 'For Sharjah\'s humid coastal climate, we recommend lightweight hydrating serums, oil-control products for oily areas, and SPF 50+ daily.' },
  { q: 'Can I book a skincare consultation from Sharjah?', a: 'Yes, our online consultation is available to all UAE residents including Sharjah. Book via WhatsApp or our online system.' },
]

export default async function SkincareSharjahPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <GeoSEOPage
      city="Sharjah"
      locale={lang as Locale}
      slug="skincare-sharjah"
      heroTitle="Luxury Skincare Sharjah"
      heroDesc="Sharjah's premier personalized skincare house. Expert consultations and premium products designed for UAE's climate."
      challenges={challenges}
      faqItems={faqItems}
    />
  )
}