import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale, type Locale } from '@/lib/i18n/dictionaries'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params

  return {
    title: 'Luxury Skincare Dubai | By Hayat Skin — Personalized Skincare UAE',
    description: 'Dubai\'s premier luxury skincare destination. Personalized skincare consultations, premium products, and expert routines designed for Dubai\'s climate. Shop online or book a consultation.',
    keywords: [
      'skincare dubai', 'luxury skincare dubai', 'skincare consultation dubai',
      'best skincare dubai', 'personalized skincare uae', 'skincare products dubai',
      'by hayat skin dubai', 'skincare routine dubai',
    ],
    alternates: {
      canonical: `https://byhayatskin.com/${lang}/skincare-dubai`,
    },
    openGraph: {
      title: 'Luxury Skincare Dubai | By Hayat Skin',
      description: 'Dubai\'s premier luxury skincare destination. Personalized consultations and premium products.',
      url: `https://byhayatskin.com/${lang}/skincare-dubai`,
    },
  }
}

export default async function SkincareDubaiPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const faqItems = [
    {
      q: 'What makes By Hayat Skin different from other skincare brands in Dubai?',
      a: 'By Hayat Skin combines luxury skincare with personalized consultation, specifically formulated for Dubai\'s unique climate — extreme heat, high UV, and heavy AC exposure. Every routine is tailored to your individual skin profile.',
    },
    {
      q: 'Do you offer skincare consultations in Dubai?',
      a: 'Yes, we offer both online and in-person skincare consultations in Dubai. Our experts analyze your skin type, concerns, lifestyle, and the Dubai climate to create a bespoke skincare routine.',
    },
    {
      q: 'What skincare products work best for Dubai\'s climate?',
      a: 'In Dubai\'s climate, lightweight hydrating serums, broad-spectrum SPF 50+, and barrier-repair moisturizers are essential. Our experts curate products specifically for UAE conditions.',
    },
    {
      q: 'Can I shop By Hayat Skin products online in the UAE?',
      a: 'Yes, we offer online shopping with delivery across the UAE including Dubai, Abu Dhabi, Sharjah, and all emirates.',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Hero */}
      <section className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)] py-16">
        <div className="container-luxury max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              Dubai, UAE
            </span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl lg:text-6xl text-[var(--color-matte-black)] mb-4">
            Luxury Skincare Dubai
          </h1>
          <p className="text-lg text-[var(--color-warm-gray)] max-w-2xl mx-auto mb-8">
            Dubai's premier personalized skincare house. Expert consultations, premium products, and routines designed for the UAE climate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/consultation`} className="btn-luxury btn-primary">
              Book Free Consultation
            </Link>
            <Link href={`/${locale}/products`} className="btn-luxury btn-outline">
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Dubai Needs Specialized Skincare */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <h2 className="heading-luxury text-3xl md:text-4xl text-[var(--color-matte-black)] mb-6 text-center">
            Why Dubai Skin Needs Special Care
          </h2>
          <div className="divider-gold mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '☀', title: 'Extreme UV Exposure', desc: 'Dubai receives intense UV radiation year-round, accelerating skin aging and pigmentation. SPF 50+ is non-negotiable.' },
              { icon: '🌡', title: 'Heat & Humidity', desc: 'Summer temperatures exceed 45°C with high humidity, causing excess sebum production and dehydration.' },
              { icon: '❄', title: 'AC Dehydration', desc: 'Constant air conditioning strips moisture from skin, leading to barrier damage and sensitivity.' },
              { icon: '🌫', title: 'Dust & Pollution', desc: 'Desert dust and urban pollution clog pores and oxidize skin, requiring targeted cleansing routines.' },
            ].map((item, i) => (
              <div key={i} className="card-luxury rounded-sm p-6">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-medium text-[var(--color-matte-black)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[var(--color-pearl)]">
        <div className="container-luxury max-w-4xl">
          <h2 className="heading-luxury text-3xl md:text-4xl text-[var(--color-matte-black)] mb-6 text-center">
            Our Skincare Services in Dubai
          </h2>
          <div className="divider-gold mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Personalized Consultation', desc: 'In-depth skin analysis with a customized routine for your skin type and Dubai\'s climate.', href: `/${locale}/consultation` },
              { title: 'Premium Products', desc: 'Curated luxury skincare products formulated for UAE conditions, available online.', href: `/${locale}/products` },
              { title: 'Skincare Education', desc: 'Expert articles and guides on skincare science, ingredients, and Dubai-specific routines.', href: `/${locale}/blog` },
            ].map((service, i) => (
              <Link key={i} href={service.href} className="group card-luxury rounded-sm p-6 block">
                <div className="w-8 h-px bg-[var(--color-champagne)] mb-4 group-hover:w-12 transition-all duration-300" />
                <h3 className="text-lg font-medium text-[var(--color-matte-black)] mb-2 group-hover:text-[var(--color-champagne-dark)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ with Schema */}
      <section className="section-padding">
        <div className="container-luxury max-w-3xl">
          <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-[var(--color-soft-gray)] rounded-sm p-6">
                <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-3">{item.q}</h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />

      {/* CTA */}
      <section className="py-16 bg-[var(--color-matte-black)] text-center">
        <div className="container-luxury">
          <h2
            className="text-3xl text-white mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
          >
            Start Your Dubai Skincare Journey
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-8 max-w-md mx-auto">
            Join hundreds of Dubai residents who have transformed their skin with By Hayat Skin.
          </p>
          <Link href={`/${locale}/consultation`} className="btn-luxury btn-primary">
            Get Free Skin Analysis
          </Link>
        </div>
      </section>
    </div>
  )
}