import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

interface GeoSEOPageProps {
  city: string
  cityAr?: string
  locale: Locale
  slug: string
  heroTitle: string
  heroDesc: string
  challenges: { icon: string; title: string; desc: string }[]
  faqItems: { q: string; a: string }[]
}

export function GeoSEOPage({
  city,
  locale,
  heroTitle,
  heroDesc,
  challenges,
  faqItems,
}: GeoSEOPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Hero */}
      <section className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)] py-16">
        <div className="container-luxury max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              {city}, UAE
            </span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl lg:text-6xl text-[var(--color-matte-black)] mb-4">
            {heroTitle}
          </h1>
          <p className="text-lg text-[var(--color-warm-gray)] max-w-2xl mx-auto mb-8">
            {heroDesc}
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

      {/* Climate Challenges */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <h2 className="heading-luxury text-3xl md:text-4xl text-[var(--color-matte-black)] mb-6 text-center">
            Why {city} Skin Needs Special Care
          </h2>
          <div className="divider-gold mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((item, i) => (
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
            Our Skincare Services in {city}
          </h2>
          <div className="divider-gold mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Personalized Consultation', desc: `In-depth skin analysis with a customized routine for ${city}'s climate.`, href: `/${locale}/consultation` },
              { title: 'Premium Products', desc: 'Curated luxury skincare products formulated for UAE conditions.', href: `/${locale}/products` },
              { title: 'Skincare Education', desc: 'Expert articles and guides on skincare science and UAE-specific routines.', href: `/${locale}/blog` },
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

      {/* FAQ */}
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
            Start Your {city} Skincare Journey
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-8 max-w-md mx-auto">
            Join hundreds of {city} residents who have transformed their skin with By Hayat Skin.
          </p>
          <Link href={`/${locale}/consultation`} className="btn-luxury btn-primary">
            Get Free Skin Analysis
          </Link>
        </div>
      </section>
    </div>
  )
}