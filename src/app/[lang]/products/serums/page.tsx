import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/i18n/config'
import { ProductCategoryPage } from '@/components/pages/ProductCategoryPage'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Luxury Face Serums Dubai | Best Vitamin C & Hyaluronic Acid Serums UAE',
    description:
      'Shop premium face serums in Dubai. Vitamin C, hyaluronic acid, retinol & niacinamide serums formulated for UAE climate. Free consultation with every purchase.',
    keywords: [
      'face serum dubai',
      'vitamin c serum uae',
      'hyaluronic acid serum dubai',
      'best serum dubai',
      'luxury serum uae',
      'anti aging serum dubai',
      'brightening serum dubai',
      'retinol serum uae',
    ],
    alternates: { canonical: `https://byhayatskin.com/${lang}/products/serums` },
    openGraph: {
      title: 'Luxury Face Serums Dubai | By Hayat Skin',
      description:
        'Premium face serums formulated for Dubai\'s climate. Shop vitamin C, hyaluronic acid & anti-aging serums.',
      url: `https://byhayatskin.com/${lang}/products/serums`,
      siteName: 'By Hayat Skin',
      type: 'website',
    },
  }
}

export default async function SerumsPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <ProductCategoryPage
        locale={lang as Locale}
        title="Face Serums"
        headline="Luxury Face Serums for Dubai's Climate"
        subheadline="Concentrated actives engineered for UAE heat, humidity & UV intensity. Visible results from the first application."
        description="Our curated serum collection addresses every skin concern faced by Dubai residents — from dehydration caused by air conditioning to hyperpigmentation triggered by intense UV exposure. Each formula is dermatologist-tested and optimized for the UAE's unique environmental demands, delivering pharmaceutical-grade actives in a luxurious sensory experience."
        products={[
          {
            name: 'Radiance Vitamin C Serum',
            desc: '20% stabilized Vitamin C with ferulic acid. Brightens, protects & evens skin tone against Dubai sun damage.',
            price: '285',
            badge: 'Bestseller',
          },
          {
            name: 'Hydra-Plump Hyaluronic Serum',
            desc: 'Triple-weight hyaluronic acid complex. Restores moisture lost to air conditioning & desert air.',
            price: '245',
            badge: 'Climate Defense',
          },
          {
            name: 'Retinol Renewal Night Serum',
            desc: '0.5% encapsulated retinol with bakuchiol. Accelerates cell turnover while you sleep.',
            price: '320',
            badge: 'Anti-Aging',
          },
          {
            name: 'Niacinamide Pore Refining Serum',
            desc: '10% niacinamide + zinc. Controls excess sebum production in Dubai\'s heat & humidity.',
            price: '195',
          },
          {
            name: 'Peptide Firming Serum',
            desc: 'Multi-peptide complex with collagen-boosting actives. Firms & lifts for a sculpted appearance.',
            price: '365',
            badge: 'Luxury',
          },
          {
            name: 'Barrier Repair Ceramide Serum',
            desc: 'Ceramide NP, AP & EOP complex. Rebuilds skin barrier damaged by harsh UAE climate.',
            price: '275',
          },
        ]}
        benefits={[
          {
            icon: '☀️',
            title: 'UAE Climate Optimized',
            desc: 'Every serum is formulated to perform in Dubai\'s extreme heat, intense UV radiation, and the constant shift between outdoor humidity and indoor air conditioning.',
          },
          {
            icon: '🔬',
            title: 'Clinically Proven Actives',
            desc: 'Pharmaceutical-grade concentrations of vitamin C, retinol, hyaluronic acid, and peptides — backed by clinical studies and dermatologist approval.',
          },
          {
            icon: '✨',
            title: 'Visible Results',
            desc: 'Our clients report visible improvements in skin tone, texture, and hydration within 2–4 weeks of consistent use, with full transformation in 8–12 weeks.',
          },
        ]}
        faqItems={[
          {
            q: 'Which serum is best for Dubai\'s hot climate?',
            a: 'For Dubai\'s climate, we recommend starting with our Hydra-Plump Hyaluronic Serum to combat dehydration from air conditioning, paired with our Radiance Vitamin C Serum for morning UV protection support. Our free consultation will create a personalized serum routine for your specific skin type.',
          },
          {
            q: 'Can I use multiple serums together?',
            a: 'Yes, layering serums is highly effective when done correctly. Apply water-based serums first, then oil-based. Avoid combining retinol with vitamin C in the same routine — use vitamin C in the morning and retinol at night. Our consultation service provides a precise layering guide.',
          },
          {
            q: 'How long does a serum last?',
            a: 'Most of our serums (30ml) last 2–3 months with daily use. We recommend storing them away from direct sunlight and heat — particularly important in Dubai. Keep in a cool, dry place or your bathroom cabinet away from windows.',
          },
          {
            q: 'Are your serums suitable for sensitive skin?',
            a: 'Yes. Our Barrier Repair Ceramide Serum and Hydra-Plump Hyaluronic Serum are specifically formulated for sensitive skin. We recommend a patch test before full application. Our consultation service can identify the safest serums for your sensitivity level.',
          },
          {
            q: 'Do you offer free delivery in Dubai?',
            a: 'Yes, we offer complimentary same-day delivery across Dubai and next-day delivery to Abu Dhabi, Sharjah, and other UAE emirates for orders above AED 200.',
          },
        ]}
        keyword="face serums dubai"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Luxury Face Serums Dubai | By Hayat Skin',
            description:
              'Premium face serums formulated for Dubai\'s climate. Shop vitamin C, hyaluronic acid & anti-aging serums.',
            url: `https://byhayatskin.com/${lang}/products/serums`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `https://byhayatskin.com/${lang}` },
                { '@type': 'ListItem', position: 2, name: 'Products', item: `https://byhayatskin.com/${lang}/products` },
                { '@type': 'ListItem', position: 3, name: 'Serums', item: `https://byhayatskin.com/${lang}/products/serums` },
              ],
            },
          }),
        }}
      />
    </>
  )
}