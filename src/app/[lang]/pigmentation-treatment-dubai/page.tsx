import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Pigmentation Treatment Dubai | Dark Spots & Hyperpigmentation Solutions UAE | By Hayat Skin',
    description: 'Effective pigmentation treatment in Dubai. Expert solutions for dark spots, melasma, and hyperpigmentation caused by UAE\'s intense UV exposure.',
    keywords: ['pigmentation treatment dubai', 'dark spots dubai', 'melasma treatment uae', 'hyperpigmentation dubai', 'brightening skincare dubai'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/pigmentation-treatment-dubai` },
  }
}

export default async function PigmentationTreatmentDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Pigmentation Treatment Dubai"
      headline="Pigmentation Treatment Dubai"
      subheadline="Dubai's intense UV causes dark spots and hyperpigmentation. Our expert pigmentation treatments restore even, radiant skin."
      keyword="pigmentation treatment dubai"
      sections={[
        { heading: 'Why Pigmentation is Common in Dubai', body: 'Dubai\'s year-round intense UV radiation is the primary trigger for hyperpigmentation, melasma, and dark spots. Post-inflammatory hyperpigmentation (PIH) from acne is also worsened by UV exposure. Without proper sun protection and targeted treatment, pigmentation becomes increasingly difficult to treat.' },
        { heading: 'Our Pigmentation Treatment Protocol', body: 'We use a multi-pronged approach: vitamin C (antioxidant + brightening), niacinamide (melanin transfer inhibitor), alpha arbutin (tyrosinase inhibitor), and SPF 50+ (essential for preventing new pigmentation). For stubborn melasma, we may recommend azelaic acid or tranexamic acid.' },
        { heading: 'Preventing Pigmentation in Dubai', body: 'Prevention is the most effective pigmentation treatment. Daily SPF 50+ application, antioxidant serums, and avoiding peak sun hours (10am–4pm) are essential. Our consultation creates a prevention + treatment plan tailored to your pigmentation type.' },
      ]}
      products={[
        { name: 'Vitamin C Brightening Serum', desc: 'Stabilized 20% Vitamin C for visible brightening', price: '320', slug: 'vitamin-c-serum' },
        { name: 'Pigmentation Corrector', desc: 'Niacinamide + alpha arbutin for dark spot correction', price: '295', slug: 'pigmentation-corrector' },
        { name: 'SPF 50+ Luxury Shield', desc: 'Essential UV protection to prevent new pigmentation', price: '165', slug: 'spf-shield' },
      ]}
      faqItems={[
        { q: 'What causes pigmentation in Dubai?', a: 'Dubai\'s intense UV radiation is the primary cause of pigmentation, triggering melasma, sunspots, and post-inflammatory hyperpigmentation. Heat can also worsen melasma. Daily SPF 50+ is essential for preventing and treating pigmentation in Dubai.' },
        { q: 'What is the best treatment for dark spots in Dubai?', a: 'For dark spots in Dubai: Vitamin C serum (morning), niacinamide serum, SPF 50+ (daily, non-negotiable), and targeted brightening treatments. Our consultation identifies your pigmentation type and creates a personalized treatment plan.' },
        { q: 'How long does pigmentation treatment take in Dubai?', a: 'With consistent treatment, most clients see improvement in 8–12 weeks. Melasma may take longer. Consistent SPF use is critical — without it, pigmentation will return regardless of treatment.' },
      ]}
      ctaText="Get Pigmentation Treatment Plan"
    />
  )
}