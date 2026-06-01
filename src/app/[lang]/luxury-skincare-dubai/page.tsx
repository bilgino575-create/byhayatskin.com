import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Dubai | Premium Skincare Products & Consultations | By Hayat Skin',
    description: 'Discover Dubai\'s most luxurious skincare experience. Premium products, personalized consultations, and expert routines designed for Dubai\'s climate. Shop By Hayat Skin.',
    keywords: ['luxury skincare dubai', 'premium skincare dubai', 'luxury beauty dubai', 'high end skincare uae', 'by hayat skin luxury'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/luxury-skincare-dubai` },
  }
}

export default async function LuxurySkincareDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Luxury Skincare Dubai"
      headline="Luxury Skincare Dubai"
      subheadline="Experience the pinnacle of personalized luxury skincare in Dubai. Premium formulations, expert consultations, and bespoke routines crafted for your skin."
      keyword="luxury skincare dubai"
      sections={[
        { heading: 'What Makes Luxury Skincare Different in Dubai?', body: 'Dubai\'s luxury skincare market demands more than premium packaging — it requires formulations that perform in extreme heat, high UV, and air-conditioned environments. By Hayat Skin combines dermatology-grade ingredients with the opulence of a luxury beauty house, creating skincare that truly transforms.' },
        { heading: 'Our Luxury Skincare Philosophy', body: 'Every product in our collection is hand-selected by skincare specialists with clinical expertise. We believe luxury skincare should deliver visible results, not just beautiful packaging. Our formulations use the highest-grade active ingredients — retinol, vitamin C, hyaluronic acid, peptides — at clinically effective concentrations.' },
        { heading: 'Personalized Luxury Skincare Consultations', body: 'True luxury is personalization. Our expert consultation system analyzes your skin type, concerns, lifestyle, and Dubai\'s climate to create a completely bespoke skincare routine. No two clients receive the same plan — because no two skins are the same.' },
      ]}
      products={[
        { name: 'Hydra-Boost Luxury Serum', desc: 'Triple-weight hyaluronic acid with peptides for deep hydration', price: '285', slug: 'hydra-boost-serum' },
        { name: 'Vitamin C Brightening Serum', desc: 'Stabilized 20% Vitamin C with ferulic acid for radiant skin', price: '320', slug: 'vitamin-c-serum' },
        { name: 'Luxury Ritual Kit', desc: 'Complete luxury skincare ritual with 5 premium products', price: '650', slug: 'luxury-kit' },
      ]}
      faqItems={[
        { q: 'What is the best luxury skincare brand in Dubai?', a: 'By Hayat Skin is Dubai\'s premier luxury skincare house, combining clinical-grade formulations with personalized consultations specifically designed for UAE\'s climate.' },
        { q: 'How much does luxury skincare cost in Dubai?', a: 'Our luxury skincare products range from AED 125 to AED 650, with personalized consultation services available. We offer premium quality at competitive luxury pricing.' },
        { q: 'Is luxury skincare worth it in Dubai\'s climate?', a: 'Absolutely. Dubai\'s extreme UV, heat, and AC exposure require high-performance ingredients that only luxury-grade formulations provide. Investing in quality skincare protects your skin long-term.' },
      ]}
      ctaText="Book Luxury Consultation"
    />
  )
}