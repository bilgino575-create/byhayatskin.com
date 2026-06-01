import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, type Locale } from '@/lib/i18n/dictionaries'
import { hasLocale, isRTL, locales } from '@/lib/i18n/config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { PageTransition } from '@/components/layout/PageTransition'
import { Cormorant_Garamond, Jost } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const dict = await getDictionary(lang as Locale)
  const isArabic = lang === 'ar'

  return {
    title: {
      default: 'By Hayat Skin — Luxury Skincare Dubai',
      template: '%s | By Hayat Skin',
    },
    description: dict.hero.subheadline,
    alternates: {
      canonical: `https://byhayatskin.com/${lang}`,
      languages: {
        en: 'https://byhayatskin.com/en',
        ar: 'https://byhayatskin.com/ar',
        tr: 'https://byhayatskin.com/tr',
        ru: 'https://byhayatskin.com/ru',
        de: 'https://byhayatskin.com/de',
        fr: 'https://byhayatskin.com/fr',
        es: 'https://byhayatskin.com/es',
        it: 'https://byhayatskin.com/it',
        zh: 'https://byhayatskin.com/zh',
        'x-default': 'https://byhayatskin.com/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isArabic ? 'ar_AE' : `${lang}_AE`,
      url: `https://byhayatskin.com/${lang}`,
      siteName: 'By Hayat Skin',
      title: 'By Hayat Skin — Luxury Skincare Dubai',
      description: dict.hero.subheadline,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'By Hayat Skin — Luxury Skincare Dubai',
      description: dict.hero.subheadline,
    },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const dir = isRTL(locale) ? 'rtl' : 'ltr'

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <head>
        {dir === 'rtl' && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'By Hayat Skin',
              description:
                'Luxury skincare house in Dubai offering personalized skincare consultations and premium products.',
              url: 'https://byhayatskin.com',
              telephone: '+971524502886',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dubai',
                addressCountry: 'AE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 25.2048,
                longitude: 55.2708,
              },
              openingHours: 'Mo-Sa 09:00-21:00',
              priceRange: '$$$$',
              image: 'https://byhayatskin.com/og-image.jpg',
              sameAs: [
                'https://www.instagram.com/byhayatskin',
                'https://wa.me/971524502886',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#0D0B09] text-[var(--color-matte-black)] antialiased">
        <Navbar dict={dict} lang={locale} />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer dict={dict} lang={locale} />
        <WhatsAppButton label={dict.final_cta.whatsapp} />
      </body>
    </html>
  )
}