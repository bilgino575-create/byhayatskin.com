import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

interface Product {
  name: string
  desc: string
  price: string
  badge?: string
}

interface ProductCategoryPageProps {
  locale: Locale
  title: string
  headline: string
  subheadline: string
  description: string
  products: Product[]
  benefits: { icon: string; title: string; desc: string }[]
  faqItems: { q: string; a: string }[]
  keyword: string
}

export function ProductCategoryPage({
  locale,
  title,
  headline,
  subheadline,
  description,
  products,
  benefits,
  faqItems,
  keyword,
}: ProductCategoryPageProps) {
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
            <Link href={`/${locale}/products`} className="btn-luxury btn-primary">
              Shop All Products
            </Link>
            <Link href={`/${locale}/consultation`} className="btn-luxury btn-outline">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <p className="text-base text-[var(--color-warm-gray)] leading-relaxed text-center max-w-3xl mx-auto mb-16">
            {description}
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="card-luxury rounded-sm p-6">
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-2">{b.title}</h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-[var(--color-pearl)]">
        <div className="container-luxury max-w-4xl">
          <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-8 text-center">
            Featured {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <Link
                key={i}
                href={`/${locale}/products`}
                className="group card-luxury rounded-sm p-6 block"
              >
                {product.badge && (
                  <div className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-champagne-dark)] mb-3">
                    {product.badge}
                  </div>
                )}
                <div
                  className="w-full h-32 rounded-sm mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.1), var(--color-beige))' }}
                >
                  <span className="text-3xl opacity-20 text-[var(--color-champagne-dark)]">✦</span>
                </div>
                <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-1 group-hover:text-[var(--color-champagne-dark)] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[var(--color-warm-gray)] mb-3 leading-relaxed">{product.desc}</p>
                <div
                  className="text-sm text-[var(--color-champagne-dark)]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  AED {product.price}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${locale}/products`} className="btn-luxury btn-outline">
              View All Products
            </Link>
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
            Find Your Perfect {title}
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-8 max-w-md mx-auto">
            Get a personalized recommendation based on your skin type and Dubai's climate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/consultation`} className="btn-luxury btn-primary">
              Get Free Consultation
            </Link>
            <a
              href="https://wa.me/971524502886"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-400 flex items-center gap-2 justify-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}