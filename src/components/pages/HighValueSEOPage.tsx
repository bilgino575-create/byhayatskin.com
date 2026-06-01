import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

interface HighValueSEOPageProps {
  locale: Locale
  title: string
  headline: string
  subheadline: string
  keyword: string
  sections: {
    heading: string
    body: string
  }[]
  products: { name: string; desc: string; price: string; slug: string }[]
  faqItems: { q: string; a: string }[]
  ctaText?: string
}

export function HighValueSEOPage({
  locale,
  title,
  headline,
  subheadline,
  keyword,
  sections,
  products,
  faqItems,
  ctaText = 'Get Free Consultation',
}: HighValueSEOPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Hero */}
      <section className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)] py-16">
        <div className="container-luxury max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              By Hayat Skin · Dubai, UAE
            </span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl lg:text-6xl text-[var(--color-matte-black)] mb-4">
            {headline}
          </h1>
          <p className="text-lg text-[var(--color-warm-gray)] max-w-2xl mx-auto mb-8">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/consultation`} className="btn-luxury btn-primary">
              {ctaText}
            </Link>
            <Link href={`/${locale}/products`} className="btn-luxury btn-outline">
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <div className="prose-luxury space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="heading-luxury text-2xl md:text-3xl text-[var(--color-matte-black)] mb-4">
                  {section.heading}
                </h2>
                <div className="divider-gold !mx-0 mb-4" />
                <p className="text-[var(--color-warm-gray)] leading-relaxed text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="section-padding bg-[var(--color-pearl)]">
          <div className="container-luxury max-w-4xl">
            <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-8 text-center">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <Link
                  key={i}
                  href={`/${locale}/products`}
                  className="group card-luxury rounded-sm p-6 block"
                >
                  <div
                    className="w-full h-32 rounded-sm mb-4 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--color-champagne)/15, var(--color-beige))' }}
                  >
                    <span className="text-3xl opacity-20 text-[var(--color-champagne-dark)]">✦</span>
                  </div>
                  <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-1 group-hover:text-[var(--color-champagne-dark)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[var(--color-warm-gray)] mb-3 leading-relaxed">{product.desc}</p>
                  <div className="text-sm text-[var(--color-champagne-dark)]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
                    AED {product.price}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
            Start Your Personalized Skincare Journey
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-8 max-w-md mx-auto">
            Expert skincare consultations and premium products designed for Dubai's climate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/consultation`} className="btn-luxury btn-primary">
              {ctaText}
            </Link>
            <a
              href="https://wa.me/971524502886"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-400 flex items-center gap-2 justify-center"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}