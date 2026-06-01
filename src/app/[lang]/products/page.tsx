import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/lib/i18n/dictionaries'
import { ProductsPageClient } from './ProductsPageClient'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)

  return {
    title: dict.products.headline,
    description: 'Shop By Hayat Skin\'s luxury skincare collection. Premium serums, moisturizers, SPF, and personalized skincare products for Dubai\'s climate.',
    keywords: ['luxury skincare products dubai', 'buy skincare dubai', 'premium skincare uae', 'by hayat skin products'],
    openGraph: {
      title: `${dict.products.headline} | By Hayat Skin`,
      description: 'Premium skincare products curated for Dubai\'s climate.',
    },
  }
}

export default async function ProductsPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return <ProductsPageClient dict={dict} lang={locale} />
}