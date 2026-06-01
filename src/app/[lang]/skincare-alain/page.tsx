import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { GeoSEOPage } from '@/components/pages/GeoSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Al Ain | By Hayat Skin — Personalized Skincare UAE',
    description: 'Al Ain\'s premier luxury skincare destination. Personalized skincare consultations and premium products for UAE\'s desert climate.',
    keywords: ['skincare al ain', 'luxury skincare al ain', 'skincare consultation al ain', 'best skincare al ain', 'skincare alain'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-alain` },
  }
}

const challenges = [
  { icon: '☀', title: 'Extreme Desert UV', desc: 'Al Ain\'s inland desert location means the most intense UV radiation in the UAE, requiring maximum SPF protection.' },
  { icon: '🌡', title: 'Dry Desert Heat', desc: 'Al Ain\'s dry desert climate causes rapid moisture evaporation from skin, requiring intensive hydration.' },
  { icon: '🌫', title: 'Desert Sand & Dust', desc: 'Fine desert sand particles are particularly prevalent in Al Ain, requiring thorough cleansing routines.' },
  { icon: '❄', title: 'Temperature Extremes', desc: 'Al Ain experiences greater temperature swings between day and night, stressing the skin barrier.' },
]

const faqItems = [
  { q: 'Does By Hayat Skin deliver to Al Ain?', a: 'Yes, we deliver across Al Ain and all UAE emirates within 1-3 business days.' },
  { q: 'What skincare is best for Al Ain\'s dry desert climate?', a: 'Al Ain\'s dry desert climate requires intensive hydrating serums, rich barrier-repair moisturizers, and maximum SPF 50+ protection. We recommend our Hydra-Boost Serum and Barrier Repair Moisturizer.' },
  { q: 'How does Al Ain\'s climate differ from Dubai for skincare?', a: 'Al Ain is drier and hotter than Dubai with less humidity. This means skin loses moisture faster, requiring richer moisturizers and more intensive hydration routines.' },
]

export default async function SkincareAlAinPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <GeoSEOPage
      city="Al Ain"
      locale={lang as Locale}
      slug="skincare-alain"
      heroTitle="Luxury Skincare Al Ain"
      heroDesc="Al Ain's premier personalized skincare house. Expert consultations and premium products designed for UAE's desert interior climate."
      challenges={challenges}
      faqItems={faqItems}
    />
  )
}