import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { ProductCategoryPage } from '@/components/pages/ProductCategoryPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Skincare Ritual Kits Dubai | Premium Skincare Sets UAE | By Hayat Skin',
    description:
      'Shop luxury skincare ritual kits in Dubai. Complete AM & PM routines curated for UAE climate. Perfect as gifts or to start your personalized skincare journey. Free consultation included.',
    keywords: [
      'luxury skincare kit dubai',
      'skincare set uae',
      'skincare gift set dubai',
      'complete skincare routine uae',
      'luxury beauty kit dubai',
      'skincare ritual dubai',
      'premium skincare set uae',
      'skincare starter kit dubai',
    ],
    alternates: { canonical: `https://byhayatskin.com/${lang}/products/kits` },
    openGraph: {
      title: 'Luxury Skincare Ritual Kits Dubai | By Hayat Skin',
      description:
        'Complete luxury skincare ritual kits curated for Dubai\'s climate. Perfect gift sets & starter routines for UAE.',
      url: `https://byhayatskin.com/${lang}/products/kits`,
      siteName: 'By Hayat Skin',
      type: 'website',
    },
  }
}

export default async function KitsPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <ProductCategoryPage
        locale={lang as Locale}
        title="Luxury Ritual Kits"
        headline="Complete Skincare Rituals for Dubai Living"
        subheadline="Expertly curated collections that take the guesswork out of skincare. Every kit is a complete routine, optimized for UAE's unique climate demands."
        description="Our Luxury Ritual Kits are more than product bundles — they are complete skincare systems curated by our expert consultants specifically for Dubai's climate. Each kit contains a precisely sequenced routine with complementary formulas that work synergistically for maximum results. Whether you're new to skincare, looking for the perfect gift, or ready to elevate your existing routine, our kits provide a seamless entry into the By Hayat Skin experience — including a complimentary consultation to personalize your ritual further."
        products={[
          {
            name: 'The Dubai Essentials Kit',
            desc: 'Cleanser + Vitamin C Serum + Moisturizer + SPF 50+. The complete daily defense against Dubai\'s climate.',
            price: '595',
            badge: 'Bestseller',
          },
          {
            name: 'The Anti-Aging Ritual Kit',
            desc: 'Retinol Serum + Peptide Cream + Eye Cream + Collagen Mask. Complete anti-aging system for UAE skin.',
            price: '895',
            badge: 'Most Popular',
          },
          {
            name: 'The Brightening Ritual Kit',
            desc: 'Vitamin C Serum + Niacinamide Toner + Brightening Moisturizer + SPF 50+. Targets pigmentation & dullness.',
            price: '745',
            badge: 'Glow Collection',
          },
          {
            name: 'The Hydration Intensive Kit',
            desc: 'Hyaluronic Serum + Barrier Cream + Hydrating Mask + Mist. Combats dehydration from AC & desert air.',
            price: '645',
          },
          {
            name: 'The Luxury Gift Collection',
            desc: 'Our 6 hero products in premium gift packaging. The ultimate luxury skincare gift for Dubai\'s discerning clientele.',
            price: '1250',
            badge: 'Gift Edition',
          },
          {
            name: 'The Sensitive Skin Ritual Kit',
            desc: 'Gentle Cleanser + Barrier Serum + Calm Moisturizer + Mineral SPF 50. Complete routine for reactive skin.',
            price: '695',
          },
        ]}
        benefits={[
          {
            icon: '🎯',
            title: 'Expert-Curated Routines',
            desc: 'Every kit is assembled by our skincare consultants — not randomly bundled. Each product is chosen for its synergy with the others, ensuring maximum efficacy and zero ingredient conflicts.',
          },
          {
            icon: '💰',
            title: 'Exceptional Value',
            desc: 'Our ritual kits offer 20–30% savings compared to purchasing products individually. You receive a complete, professional-grade routine at a price that reflects our commitment to accessible luxury.',
          },
          {
            icon: '🎁',
            title: 'Complimentary Consultation',
            desc: 'Every kit purchase includes a complimentary 30-minute skincare consultation with our experts. We\'ll personalize the routine to your specific skin type, concerns, and Dubai lifestyle.',
          },
        ]}
        faqItems={[
          {
            q: 'Which kit is best for someone new to skincare in Dubai?',
            a: 'We recommend The Dubai Essentials Kit for skincare beginners. It contains the four fundamental products every Dubai resident needs: a gentle cleanser, vitamin C serum for UV protection support, a climate-appropriate moisturizer, and SPF 50+ sunscreen. The included consultation will help you build from this foundation.',
          },
          {
            q: 'Can I customize a kit for my specific skin concerns?',
            a: 'Absolutely. While our pre-curated kits are designed for common skin concerns, we offer fully bespoke kit creation through our consultation service. Book a free consultation and our experts will assemble a personalized kit based on your skin type, concerns, lifestyle, and budget.',
          },
          {
            q: 'Are the kits suitable as gifts?',
            a: 'Yes, our kits are beautifully packaged and make exceptional gifts. The Luxury Gift Collection is our most popular gift option, presented in premium packaging with a personalized note. We offer complimentary gift wrapping and same-day delivery across Dubai for last-minute gifting.',
          },
          {
            q: 'How long does a kit last?',
            a: 'Most of our ritual kits provide a full 2–3 month supply with daily use. The Luxury Gift Collection contains full-size products that last 3–4 months. We recommend repurchasing individual products as needed rather than waiting for all products to run out simultaneously.',
          },
          {
            q: 'Do you offer corporate gifting for Dubai businesses?',
            a: 'Yes, we offer bespoke corporate gifting solutions for Dubai businesses, hotels, and events. Custom packaging, branded inserts, and bulk pricing are available. Contact us via WhatsApp or our consultation form for corporate gifting inquiries.',
          },
        ]}
        keyword="luxury skincare kit dubai"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Luxury Skincare Ritual Kits Dubai | By Hayat Skin',
            description:
              'Complete luxury skincare ritual kits curated for Dubai\'s climate. Perfect gift sets & starter routines for UAE.',
            url: `https://byhayatskin.com/${lang}/products/kits`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `https://byhayatskin.com/${lang}` },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `https://byhayatskin.com/${lang}/products` },
                { '@type': 'ListItem', position: 3, name: 'Luxury Ritual Kits', item: `https://byhayatskin.com/${lang}/products/kits` },
              ],
            },
          }),
        }}
      />
    </>
  )
}