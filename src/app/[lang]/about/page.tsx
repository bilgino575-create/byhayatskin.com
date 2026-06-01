import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import Link from 'next/link'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'About By Hayat Skin | Luxury Skincare House Dubai',
    description: 'By Hayat Skin is Dubai\'s premier luxury skincare house. Combining dermatology-inspired formulations with personalized consultations for UAE\'s unique climate.',
    keywords: ['about by hayat skin', 'luxury skincare dubai brand', 'skincare house dubai', 'personalized skincare uae'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/about` },
  }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Hero */}
      <section className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)] py-20">
        <div className="container-luxury max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">Our Story</span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl lg:text-6xl text-[var(--color-matte-black)] mb-6">
            About By Hayat Skin
          </h1>
          <p className="text-lg text-[var(--color-warm-gray)] max-w-2xl mx-auto">
            Born in Dubai. Built for your skin. Designed for the UAE climate.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="divider-gold !mx-0 mb-6" />
              <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-6">Where Science Meets Luxury</h2>
              <p className="text-[var(--color-warm-gray)] leading-relaxed mb-6">
                By Hayat Skin was founded with a singular vision: to create a skincare experience that truly understands the demands of living in Dubai. Our extreme heat, intense UV radiation, and the constant shift between outdoor humidity and indoor air conditioning create unique challenges that generic skincare brands simply don't address.
              </p>
              <p className="text-[var(--color-warm-gray)] leading-relaxed mb-6">
                We combine dermatology-inspired formulations with the opulence of a luxury brand — creating skincare rituals that transform, protect, and elevate. Every product in our collection is curated specifically for UAE conditions.
              </p>
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                Our personalized consultation system ensures that every client receives a skincare routine tailored to their unique skin type, concerns, and lifestyle — not a one-size-fits-all solution.
              </p>
            </div>
            <div className="space-y-8">
              {[
                { num: '500+', label: 'Clients Transformed', desc: 'Personalized skincare journeys completed across the UAE' },
                { num: '15+', label: 'Premium Ingredients', desc: 'Clinically proven actives in every formulation' },
                { num: '100%', label: 'Personalized Plans', desc: 'Every consultation is unique to your skin' },
                { num: '9', label: 'Languages Served', desc: 'Supporting Dubai\'s diverse international community' },
              ].map((stat, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div
                    className="text-3xl font-light flex-shrink-0"
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      background: 'linear-gradient(90deg, var(--color-champagne-dark), var(--color-champagne))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--color-matte-black)] mb-1">{stat.label}</div>
                    <div className="text-xs text-[var(--color-warm-gray)] leading-relaxed">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-pearl)]">
        <div className="container-luxury max-w-4xl">
          <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-12 text-center">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Climate-First Formulation', desc: 'Every product is designed with Dubai\'s extreme heat, UV intensity, and humidity in mind. Generic skincare fails here — ours doesn\'t.' },
              { title: 'Personalization at Core', desc: 'No two skins are alike. Our consultation system creates truly bespoke routines based on your skin type, concerns, and lifestyle.' },
              { title: 'Luxury Without Compromise', desc: 'Premium ingredients, elegant formulations, and an experience that feels as good as the results. Skincare should be a ritual, not a chore.' },
            ].map((value, i) => (
              <div key={i} className="card-luxury rounded-sm p-6">
                <div className="w-8 h-px bg-[var(--color-champagne)] mb-4" />
                <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-3">{value.title}</h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-matte-black)] text-center">
        <div className="container-luxury">
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}>
            Begin Your Skincare Journey
          </h2>
          <p className="text-[var(--color-warm-gray)] mb-8 max-w-md mx-auto">
            Book a personalized consultation and discover what your skin truly needs.
          </p>
          <Link href={`/${lang}/consultation`} className="btn-luxury btn-primary">
            Book Free Consultation
          </Link>
        </div>
      </section>

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About By Hayat Skin',
            description: 'By Hayat Skin is Dubai\'s premier luxury skincare house offering personalized consultations and premium products.',
            url: `https://byhayatskin.com/${lang}/about`,
            mainEntity: {
              '@type': 'Organization',
              name: 'By Hayat Skin',
              foundingLocation: 'Dubai, UAE',
              description: 'Luxury skincare house combining dermatology-inspired formulations with personalized consultations.',
            },
          }),
        }}
      />
    </div>
  )
}