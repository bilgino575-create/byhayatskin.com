import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/lib/i18n/dictionaries'
import { ConsultationEngine } from './ConsultationEngine'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)

  return {
    title: dict.consultation.headline,
    description: dict.consultation.subheadline,
    keywords: ['skincare consultation dubai', 'personalized skincare uae', 'skin analysis dubai', 'by hayat skin consultation'],
    openGraph: {
      title: `${dict.consultation.headline} | By Hayat Skin`,
      description: dict.consultation.subheadline,
    },
  }
}

export default async function ConsultationPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return <ConsultationEngine dict={dict} lang={locale} />
}