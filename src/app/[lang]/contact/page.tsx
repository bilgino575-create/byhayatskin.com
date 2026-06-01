import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import Link from 'next/link'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Contact By Hayat Skin | Luxury Skincare Dubai',
    description: 'Contact By Hayat Skin for personalized skincare consultations, product inquiries, and expert advice. Available via WhatsApp, email, and online consultation.',
    keywords: ['contact by hayat skin', 'skincare consultation dubai contact', 'by hayat skin whatsapp', 'skincare expert dubai contact'],
    alternates: { canonical: `https://byhayatskin.com/${lang}/contact` },
  }
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Hero */}
      <section className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)] py-20">
        <div className="container-luxury max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">Get In Touch</span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl lg:text-6xl text-[var(--color-matte-black)] mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-[var(--color-warm-gray)] max-w-2xl mx-auto">
            We're here to help you find the perfect skincare routine. Reach out via WhatsApp for the fastest response.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* WhatsApp */}
            <a
              href="https://wa.me/971524502886"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-luxury rounded-sm p-8 text-center block hover:shadow-[var(--shadow-hover)] transition-all duration-400"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(37,211,102,0.1)' }}>
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-2">WhatsApp</h3>
              <p className="text-sm text-[var(--color-warm-gray)] mb-3">Fastest response — usually within minutes</p>
              <span className="text-sm text-[#25D366] font-medium">+971 52 450 2886</span>
            </a>

            {/* Consultation */}
            <Link
              href={`/${lang}/consultation`}
              className="group card-luxury rounded-sm p-8 text-center block hover:shadow-[var(--shadow-hover)] transition-all duration-400"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,169,110,0.1)' }}>
                <span className="text-[var(--color-champagne)] text-xl">✦</span>
              </div>
              <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-2">Free Consultation</h3>
              <p className="text-sm text-[var(--color-warm-gray)] mb-3">Get a personalized skincare plan for your skin type</p>
              <span className="text-sm text-[var(--color-champagne-dark)] font-medium">Book Now →</span>
            </Link>

            {/* Location */}
            <div className="card-luxury rounded-sm p-8 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,169,110,0.1)' }}>
                <span className="text-[var(--color-champagne)] text-xl">◈</span>
              </div>
              <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-2">Location</h3>
              <p className="text-sm text-[var(--color-warm-gray)] mb-3">Based in Dubai, UAE. Serving all emirates.</p>
              <span className="text-sm text-[var(--color-champagne-dark)] font-medium">Dubai, UAE</span>
            </div>
          </div>

          {/* Business Hours */}
          <div className="card-luxury rounded-sm p-8 max-w-2xl mx-auto">
            <h2 className="heading-luxury text-2xl text-[var(--color-matte-black)] mb-6 text-center">Business Hours</h2>
            <div className="space-y-3">
              {[
                { day: 'Monday – Saturday', hours: '9:00 AM – 9:00 PM' },
                { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
                { day: 'WhatsApp Support', hours: '24/7 (response within 2 hours)' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-[var(--color-soft-gray)] last:border-0">
                  <span className="text-sm text-[var(--color-matte-black)]">{item.day}</span>
                  <span className="text-sm text-[var(--color-champagne-dark)]">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[var(--color-pearl)]">
        <div className="container-luxury max-w-3xl">
          <h2 className="heading-luxury text-3xl text-[var(--color-matte-black)] mb-8 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How quickly do you respond to WhatsApp messages?', a: 'We typically respond within minutes during business hours (9 AM – 9 PM, Mon–Sat). Outside hours, we respond within 2 hours.' },
              { q: 'Do you offer in-person consultations in Dubai?', a: 'Yes, we offer both online and in-person consultations in Dubai. Contact us via WhatsApp to schedule an in-person appointment.' },
              { q: 'How long does delivery take across the UAE?', a: 'We deliver across all UAE emirates within 1-3 business days. Same-day delivery is available in Dubai for orders placed before 2 PM.' },
            ].map((item, i) => (
              <div key={i} className="border border-[var(--color-soft-gray)] rounded-sm p-6">
                <h3 className="text-base font-medium text-[var(--color-matte-black)] mb-3">{item.q}</h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact By Hayat Skin',
            url: `https://byhayatskin.com/${lang}/contact`,
            mainEntity: {
              '@type': 'LocalBusiness',
              name: 'By Hayat Skin',
              telephone: '+971524502886',
              address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
              openingHours: 'Mo-Sa 09:00-21:00',
            },
          }),
        }}
      />
    </div>
  )
}