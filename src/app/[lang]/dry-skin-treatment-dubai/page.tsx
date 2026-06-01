import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Dry Skin Treatment Dubai | Best Hydrating Skincare UAE | By Hayat Skin',
    description: 'Expert dry skin treatment in Dubai. Intensive hydration solutions for skin dehydrated by UAE\'s heat and air conditioning. Restore your skin\'s moisture barrier.',
    keywords: ['dry skin treatment dubai', 'dry skin care uae', 'hydrating skincare dubai', 'dehydrated skin dubai', 'moisturizer dubai'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/dry-skin-treatment-dubai` },
  }
}

export default async function DrySkinTreatmentDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Dry Skin Treatment Dubai"
      headline="Dry Skin Treatment Dubai"
      subheadline="Dubai's AC and heat dehydrate skin. Our intensive hydration treatments restore moisture and repair your skin barrier."
      keyword="dry skin treatment dubai"
      sections={[
        { heading: 'Why Dubai Causes Dry Skin', body: 'Dubai\'s air conditioning is the primary cause of dry skin — it removes moisture from the air, causing transepidermal water loss (TEWL). Combined with heat-induced dehydration and UV damage to the skin barrier, dry skin is extremely common in UAE residents. Even naturally oily skin types can experience dehydration in Dubai.' },
        { heading: 'Our Dry Skin Treatment Protocol', body: 'We use a layered hydration approach: hyaluronic acid (draws moisture), ceramides (locks moisture in), and occlusives (prevents moisture loss). Our dry skin routine includes: hydrating toner, hyaluronic acid serum, rich moisturizer, and facial oil for extra nourishment.' },
        { heading: 'Hydration vs. Moisturization: What Dry Skin Needs', body: 'Dry skin needs both hydration (water) and moisturization (oil). Hyaluronic acid provides hydration, while ceramides and fatty acids provide moisturization. Our consultation identifies whether your dryness is true dry skin (lacks oil) or dehydration (lacks water) and creates the appropriate treatment plan.' },
      ]}
      products={[
        { name: 'Hydra-Boost Serum', desc: 'Triple-weight hyaluronic acid for deep hydration', price: '285', slug: 'hydra-boost-serum' },
        { name: 'Barrier Repair Moisturizer', desc: 'Ceramide-rich formula for dry, dehydrated skin', price: '195', slug: 'barrier-repair' },
        { name: 'Deep Hydration Mask', desc: 'Weekly intensive hydration treatment', price: '185', slug: 'hydration-mask' },
      ]}
      faqItems={[
        { q: 'Why is my skin so dry in Dubai?', a: 'Dubai\'s air conditioning removes moisture from the air, causing skin dehydration. Heat also increases water loss through the skin. This combination makes dry skin extremely common in Dubai, even for people who didn\'t have dry skin before moving to the UAE.' },
        { q: 'What is the best moisturizer for dry skin in Dubai?', a: 'For dry skin in Dubai, look for moisturizers with ceramides, hyaluronic acid, and fatty acids. Our Barrier Repair Moisturizer is specifically formulated for UAE\'s dehydrating conditions. Apply to damp skin for maximum absorption.' },
        { q: 'How can I prevent dry skin in Dubai\'s AC?', a: 'Use a humidifier in your bedroom, apply moisturizer immediately after showering, use a hydrating serum under your moisturizer, and drink plenty of water. Our consultation creates a complete dry skin prevention and treatment plan.' },
      ]}
      ctaText="Get Dry Skin Treatment Plan"
    />
  )
}