import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, type Locale } from '@/lib/i18n/dictionaries'
import { LuxuryHomePage } from '@/components/sections/LuxuryHomePage'

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

  return <LuxuryHomePage dict={dict} lang={locale} />
}