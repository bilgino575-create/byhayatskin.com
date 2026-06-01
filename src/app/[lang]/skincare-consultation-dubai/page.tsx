import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { HighValueSEOPage } from '@/components/pages/HighValueSEOPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Skincare Consultation Dubai | Personalized Skin Analysis UAE | By Hayat Skin',
    description: 'Expert skincare consultation in Dubai. Personalized skin analysis, custom routines, and premium product recommendations tailored for UAE climate and your unique skin.',
    keywords: ['skincare consultation dubai', 'skin analysis dubai', 'personalized skincare uae', 'skin consultation dubai', 'skincare expert dubai'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/skincare-consultation-dubai` },
  }
}

export default async function SkincareConsultationDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return (
    <HighValueSEOPage
      locale={lang as Locale}
      title="Skincare Consultation Dubai"
      headline="Skincare Consultation Dubai"
      subheadline="Your skin is unique. Our expert consultation creates a fully personalized skincare routine designed for your skin type, concerns, and Dubai's demanding climate."
      keyword="skincare consultation dubai"
      sections={[
        {
          heading: 'Why a Professional Skincare Consultation Matters in Dubai',
          body: "Dubai's extreme heat, UV intensity, air conditioning, and humidity fluctuations create a uniquely challenging environment for skin. Generic skincare routines often fail here. A professional consultation identifies your exact skin type, active concerns (acne, pigmentation, aging, sensitivity), and builds a routine that works with Dubai's climate — not against it. Our consultations are rooted in dermatology-inspired analysis, not guesswork.",
        },
        {
          heading: 'What Our Consultation Covers',
          body: 'Our in-depth skin consultation covers: skin type assessment (dry, oily, combination, sensitive, normal), active concern analysis (acne, pigmentation, fine lines, dehydration, redness), lifestyle factors (diet, sleep, stress, sun exposure), Dubai climate adaptation (heat, humidity, AC exposure, dust), and goal setting (glow, anti-aging, clarity, hydration). You receive a complete AM and PM routine, a curated product list, and a 3-month skin improvement roadmap.',
        },
        {
          heading: 'Our Consultation Process',
          body: 'Step 1: Complete our detailed skin questionnaire. Step 2: Our skincare expert reviews your responses and skin history. Step 3: You receive a personalized skincare report with your custom routine. Step 4: Product recommendations with exact application instructions. Step 5: Follow-up check-in at 4 weeks to adjust the routine. All consultations are available via WhatsApp, video call, or in-person in Dubai.',
        },
      ]}
      products={[
        { name: 'Starter Consultation Kit', desc: 'Curated essentials based on your consultation results', price: '350', slug: 'starter-consultation-kit' },
        { name: 'Advanced Skin Analysis', desc: 'Deep-dive consultation with full routine + product plan', price: '0', slug: 'consultation' },
        { name: 'Routine Builder Set', desc: 'Complete AM/PM routine products selected for your skin', price: '580', slug: 'routine-builder-set' },
      ]}
      faqItems={[
        {
          q: 'How does the skincare consultation work?',
          a: 'You complete a detailed skin questionnaire covering your skin type, concerns, lifestyle, and goals. Our skincare expert then creates a personalized report with your custom AM/PM routine, product recommendations, and a skin improvement plan. Consultations are available via WhatsApp, video call, or in-person in Dubai.',
        },
        {
          q: 'Is the skincare consultation free?',
          a: 'We offer a complimentary initial skin assessment. Our full personalized consultation — which includes a detailed routine, product plan, and follow-up — is included with qualifying product purchases. Contact us via WhatsApp to learn more about current consultation options.',
        },
        {
          q: 'How long does it take to see results from a personalized routine?',
          a: 'Most clients notice improved skin texture and hydration within 2–4 weeks. Significant improvements in acne, pigmentation, or anti-aging concerns typically appear within 6–12 weeks of consistent use. We include a 4-week follow-up to adjust your routine as your skin responds.',
        },
        {
          q: 'Can you help with skincare for Dubai\'s climate specifically?',
          a: "Absolutely — Dubai's climate is central to our consultation approach. We account for extreme UV exposure, heat-induced oil production, air conditioning dehydration, and seasonal humidity changes. Every routine we create is optimized for UAE conditions, not generic global advice.",
        },
      ]}
      ctaText="Book Free Consultation"
    />
  )
}