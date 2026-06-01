import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Best Skincare Dubai 2025 | Top Rated Skincare Products & Consultations | By Hayat Skin',
    description: 'Find the best skincare in Dubai. Expert-curated products, personalized consultations, and routines designed for Dubai\'s climate. Rated #1 by Dubai skincare enthusiasts.',
    keywords: ['best skincare dubai', 'top skincare dubai', 'best skincare products uae', 'best skincare brand dubai 2025'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/best-skincare-dubai` },
  }
}

export default async function BestSkincareDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Best Skincare Dubai"
      headline="Best Skincare in Dubai"
      subheadline="Discover why hundreds of Dubai residents trust By Hayat Skin for their skincare needs. Expert-curated products and personalized consultations."
      keyword="best skincare dubai"
      sections={[
        { heading: 'What Makes the Best Skincare for Dubai?', body: 'The best skincare for Dubai must address the city\'s unique challenges: extreme UV radiation, temperatures exceeding 45°C, heavy air conditioning, and desert dust. Generic skincare brands aren\'t formulated for these conditions. By Hayat Skin specializes exclusively in UAE-optimized skincare.' },
        { heading: 'How We Select the Best Products', body: 'Every product in our collection undergoes rigorous evaluation by our skincare specialists. We assess ingredient quality, clinical evidence, performance in UAE conditions, and compatibility with different skin types. Only products that meet our exacting standards make the cut.' },
        { heading: 'Personalized Skincare: The Best Approach', body: 'The best skincare isn\'t one-size-fits-all. Our consultation system creates a completely personalized routine based on your skin type, concerns, age, lifestyle, and Dubai\'s climate. This personalized approach delivers results that generic routines simply cannot match.' },
      ]}
      products={[
        { name: 'Hydra-Boost Serum', desc: 'Our bestselling hydrating serum for Dubai\'s climate', price: '285', slug: 'hydra-boost-serum' },
        { name: 'SPF 50+ Luxury Shield', desc: 'Maximum UV protection with a luxurious finish', price: '165', slug: 'spf-shield' },
        { name: 'Barrier Repair Moisturizer', desc: 'Restores skin barrier damaged by AC and heat', price: '195', slug: 'barrier-repair' },
      ]}
      faqItems={[
        { q: 'What is the best skincare brand in Dubai?', a: 'By Hayat Skin is consistently rated as Dubai\'s top personalized skincare brand, combining clinical-grade formulations with expert consultations specifically designed for UAE\'s climate.' },
        { q: 'What skincare products are best for Dubai\'s weather?', a: 'For Dubai\'s climate, the best products include: SPF 50+ sunscreen (daily), lightweight hydrating serum, barrier-repair moisturizer, and antioxidant vitamin C serum. Our consultation system creates a personalized routine for your specific needs.' },
        { q: 'Where can I buy the best skincare products in Dubai?', a: 'By Hayat Skin offers online shopping with fast delivery across Dubai and all UAE emirates. Our products are also available via WhatsApp consultation.' },
      ]}
      ctaText="Get Personalized Recommendation"
    />
  )
}