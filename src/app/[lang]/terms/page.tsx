import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n/config'
import Link from 'next/link'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Terms of Service | By Hayat Skin Dubai',
    description:
      'Read the terms of service for By Hayat Skin. Understand your rights and obligations when using our luxury skincare platform and services in Dubai, UAE.',
    alternates: { canonical: `https://byhayatskin.com/${lang}/terms` },
    robots: { index: true, follow: true },
  }
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const lastUpdated = 'June 1, 2025'

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Hero */}
      <section className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)] py-16">
        <div className="container-luxury max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              Legal
            </span>
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)] mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--color-warm-gray)]">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-luxury max-w-3xl">
          <div className="prose-luxury space-y-10">

            <div>
              <p className="text-[var(--color-warm-gray)] leading-relaxed">
                Welcome to By Hayat Skin. These Terms of Service ("Terms") govern your use of our website at byhayatskin.com and all related services provided by By Hayat Skin ("we," "our," or "us"), a luxury skincare brand based in Dubai, United Arab Emirates. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree, please do not use our services.
              </p>
            </div>

            {[
              {
                title: '1. Acceptance of Terms',
                content: `By accessing byhayatskin.com, you confirm that you are at least 18 years of age, have the legal capacity to enter into a binding agreement, and agree to comply with these Terms and all applicable UAE laws and regulations.

These Terms apply to all visitors, users, and customers of our website and services, including but not limited to browsing, purchasing products, booking consultations, and using our skin diagnosis tools.`,
              },
              {
                title: '2. Products & Services',
                content: `By Hayat Skin offers luxury skincare products and personalized skincare consultation services. All products are intended for cosmetic use only and are not medical treatments or pharmaceutical products.

Product Descriptions: We strive to display our products as accurately as possible. However, we cannot guarantee that your device's display accurately reflects the actual colors or appearance of our products.

Availability: All products are subject to availability. We reserve the right to discontinue any product at any time without notice.

Pricing: All prices are displayed in UAE Dirhams (AED) and are inclusive of applicable taxes unless otherwise stated. We reserve the right to modify prices at any time.`,
              },
              {
                title: '3. Orders & Payment',
                content: `Order Acceptance: Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including but not limited to product unavailability, errors in pricing, or suspected fraudulent activity.

Payment: We accept major credit cards, debit cards, and other payment methods as displayed at checkout. All transactions are processed through secure, PCI-DSS compliant payment gateways.

Order Confirmation: You will receive an email confirmation upon successful placement of your order. This confirmation does not constitute acceptance of your order — acceptance occurs when your order is dispatched.

Currency: All transactions are processed in UAE Dirhams (AED). International customers may be subject to currency conversion fees charged by their bank.`,
              },
              {
                title: '4. Shipping & Delivery',
                content: `Delivery Areas: We deliver across all UAE emirates. International shipping is available to select countries.

Delivery Times: Standard delivery within Dubai is 1–2 business days. Delivery to other UAE emirates is 2–3 business days. International delivery times vary by destination.

Shipping Costs: Free delivery is available for orders above AED 200 within the UAE. Shipping costs for orders below this threshold and international orders are calculated at checkout.

Risk of Loss: Risk of loss and title for products pass to you upon delivery to the shipping carrier.`,
              },
              {
                title: '5. Returns & Refunds',
                content: `Return Policy: We accept returns within 14 days of delivery for unopened, unused products in their original packaging. Due to hygiene reasons, opened skincare products cannot be returned unless they are defective.

Defective Products: If you receive a defective or damaged product, please contact us within 48 hours of delivery with photographic evidence. We will arrange a replacement or full refund at no additional cost.

Refund Processing: Approved refunds are processed within 5–7 business days to your original payment method.

Consultation Services: Consultation fees are non-refundable once the consultation has been conducted. If you need to reschedule, please provide at least 24 hours notice.`,
              },
              {
                title: '6. Consultation Services',
                content: `Nature of Service: Our skincare consultation service provides personalized skincare recommendations based on the information you provide. Our consultations are advisory in nature and do not constitute medical advice, diagnosis, or treatment.

Medical Disclaimer: By Hayat Skin is not a medical practice. Our consultants are skincare experts, not licensed medical professionals. If you have a skin condition requiring medical treatment, please consult a qualified dermatologist.

Accuracy of Information: The quality of our consultation recommendations depends on the accuracy of the information you provide. We are not responsible for recommendations based on inaccurate or incomplete information.

Confidentiality: All consultation information is treated as confidential and handled in accordance with our Privacy Policy.`,
              },
              {
                title: '7. Intellectual Property',
                content: `All content on byhayatskin.com — including text, images, graphics, logos, product descriptions, and software — is the exclusive property of By Hayat Skin and is protected by UAE and international intellectual property laws.

You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from our website without our express written permission.

User-generated content (such as reviews or testimonials) submitted to us grants By Hayat Skin a non-exclusive, royalty-free license to use, display, and distribute such content in connection with our business.`,
              },
              {
                title: '8. User Conduct',
                content: `You agree not to:

• Use our website for any unlawful purpose or in violation of UAE law
• Attempt to gain unauthorized access to our systems or user accounts
• Transmit any harmful, offensive, or disruptive content
• Use automated tools to scrape, crawl, or extract data from our website
• Impersonate By Hayat Skin or any of our employees or representatives
• Submit false or misleading information in consultations or orders

We reserve the right to terminate access for any user who violates these terms.`,
              },
              {
                title: '9. Limitation of Liability',
                content: `To the maximum extent permitted by UAE law, By Hayat Skin shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products.

Our total liability for any claim arising from these Terms or your use of our services shall not exceed the amount you paid for the specific product or service giving rise to the claim.

We do not warrant that our website will be uninterrupted, error-free, or free of viruses or other harmful components.`,
              },
              {
                title: '10. Governing Law',
                content: `These Terms are governed by and construed in accordance with the laws of the United Arab Emirates and the Emirate of Dubai. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.

If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.`,
              },
              {
                title: '11. Changes to Terms',
                content: `We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website with an updated "Last Updated" date. Your continued use of our website after such changes constitutes acceptance of the updated Terms.

We encourage you to review these Terms periodically to stay informed of any updates.`,
              },
              {
                title: '12. Contact Us',
                content: `For questions about these Terms of Service, please contact us:

By Hayat Skin
Dubai, United Arab Emirates
Email: legal@byhayatskin.com
Phone: +971 52 450 2886
WhatsApp: wa.me/971524502886`,
              },
            ].map((section, i) => (
              <div key={i} className="border-t border-[var(--color-soft-gray)] pt-8">
                <h2 className="heading-luxury text-xl text-[var(--color-matte-black)] mb-4">
                  {section.title}
                </h2>
                <div className="text-sm text-[var(--color-warm-gray)] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}

          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-[var(--color-soft-gray)] flex flex-col sm:flex-row gap-4">
            <Link href={`/${lang}`} className="btn-luxury btn-outline text-sm">
              ← Back to Home
            </Link>
            <Link href={`/${lang}/contact`} className="btn-luxury btn-primary text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms of Service | By Hayat Skin',
            description: 'Terms of service for By Hayat Skin, Dubai luxury skincare brand.',
            url: `https://byhayatskin.com/${lang}/terms`,
            dateModified: '2025-06-01',
          }),
        }}
      />
    </div>
  )
}