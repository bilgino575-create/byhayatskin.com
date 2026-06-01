import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, type Locale } from '@/lib/i18n/dictionaries'
import { HeroSection } from '@/components/sections/HeroSection'
import { BrandStorySection } from '@/components/sections/BrandStorySection'
import { SkinDiagnosisSection } from '@/components/sections/SkinDiagnosisSection'
import { ProductCategoriesSection } from '@/components/sections/ProductCategoriesSection'
import { ConsultationSection } from '@/components/sections/ConsultationSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { InstagramSection } from '@/components/sections/InstagramSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const dict = await getDictionary(lang as Locale)

  return {
    title: 'By Hayat Skin — Luxury Skincare Dubai',
    description: dict.hero.subheadline,
    keywords: [
      'luxury skincare dubai',
      'skincare consultation dubai',
      'personalized skincare uae',
      'best skincare dubai',
      'anti aging skincare dubai',
      'by hayat skin',
    ],
    openGraph: {
      title: 'By Hayat Skin — Luxury Skincare Dubai',
      description: dict.hero.subheadline,
      url: `https://byhayatskin.com/${lang}`,
      type: 'website',
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return (
    <>
      <HeroSection dict={dict} lang={locale} />
      <BrandStorySection dict={dict} />
      <SkinDiagnosisSection dict={dict} lang={locale} />
      <ProductCategoriesSection dict={dict} lang={locale} />
      <ConsultationSection dict={dict} lang={locale} />
      <WhyUsSection dict={dict} />
      <TestimonialsSection dict={dict} />
      <BlogSection dict={dict} lang={locale} />
      <InstagramSection dict={dict} />
      <FinalCTASection dict={dict} lang={locale} />
    </>
  )
}