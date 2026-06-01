import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { GeoSEOPage } from '@/components/pages/GeoSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Abu Dhabi | By Hayat Skin — Personalized Skincare UAE',
    description: 'Abu Dhabi\'s premier luxury skincare destination. Personalized skincare consultations and premium products designed for UAE\'s climate.',
    keywords: ['skincare abu dhabi', 'luxury skincare abu dhabi', 'skincare consultation abu dhabi', 'best skincare abu dhabi', 'by hayat skin abu dhabi'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-abu-dhabi` },
    openGraph: { title: 'Luxury Skincare Abu Dhabi | By Hayat Skin', description: 'Abu Dhabi\'s premier luxury skincare destination.' },
  }
}

const challenges = [
  { icon: '☀', title: 'Intense UV Radiation', desc: 'Abu Dhabi\'s desert location means extreme UV exposure year-round, requiring high-SPF protection and antioxidant serums.' },
  { icon: '🌡', title: 'Extreme Heat', desc: 'Summer temperatures regularly exceed 45°C, causing dehydration and accelerated skin aging.' },
  { icon: '❄', title: 'AC Dehydration', desc: 'Constant air conditioning in Abu Dhabi\'s buildings strips moisture from skin, leading to barrier damage.' },
  { icon: '🌫', title: 'Desert Dust', desc: 'Fine desert particles clog pores and oxidize skin, requiring targeted cleansing and antioxidant protection.' },
]

const faqItems = [
  { q: 'Does By Hayat Skin deliver to Abu Dhabi?', a: 'Yes, we offer fast delivery across Abu Dhabi and all UAE emirates. Orders are typically delivered within 1-3 business days.' },
  { q: 'Can I get a skincare consultation for Abu Dhabi\'s climate?', a: 'Absolutely. Our consultation system is specifically designed for UAE\'s climate, including Abu Dhabi\'s unique desert conditions and humidity levels.' },
  { q: 'What skincare products are best for Abu Dhabi\'s heat?', a: 'Lightweight hydrating serums, broad-spectrum SPF 50+, and barrier-repair moisturizers are essential for Abu Dhabi\'s climate.' },
  { q: 'Do you have a physical store in Abu Dhabi?', a: 'We currently operate online with delivery across the UAE. Our consultation service is available via WhatsApp and online booking.' },
]

export default async function SkincareAbuDhabiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <GeoSEOPage
      city="Abu Dhabi"
      locale={lang as Locale}
      slug="skincare-abu-dhabi"
      heroTitle="Luxury Skincare Abu Dhabi"
      heroDesc="Abu Dhabi's premier personalized skincare house. Expert consultations, premium products, and routines designed for the UAE capital's climate."
      challenges={challenges}
      faqItems={faqItems}
    />
  )
}