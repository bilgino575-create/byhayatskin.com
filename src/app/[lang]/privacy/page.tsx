import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n/config'
import Link from 'next/link'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Privacy Policy | By Hayat Skin Dubai',
    description:
      'Read the privacy policy of By Hayat Skin. Learn how we collect, use, and protect your personal data in compliance with UAE data protection regulations.',
    alternates: { canonical: `https://byhayatskin.com/${lang}/privacy` },
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPage({ params }: Props) {
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
            Privacy Policy
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
                By Hayat Skin ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at byhayatskin.com or use our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
              </p>
            </div>

            {[
              {
                title: '1. Information We Collect',
                content: `We may collect information about you in a variety of ways:

Personal Data: When you register, make a purchase, book a consultation, or contact us, we may collect personally identifiable information such as your name, email address, phone number, and shipping address.

Skin Profile Data: When you use our consultation or skin diagnosis tools, we collect information about your skin type, concerns, lifestyle, and skincare goals to provide personalized recommendations.

Usage Data: We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.

Communication Data: If you contact us via WhatsApp, email, or our contact form, we retain records of that correspondence.`,
              },
              {
                title: '2. How We Use Your Information',
                content: `We use the information we collect to:

• Process and fulfill your orders and consultations
• Provide personalized skincare recommendations based on your skin profile
• Send transactional emails (order confirmations, shipping updates)
• Send marketing communications (with your consent)
• Improve our website, products, and services
• Respond to your inquiries and provide customer support
• Comply with legal obligations under UAE law
• Prevent fraudulent transactions and monitor against theft`,
              },
              {
                title: '3. Sharing Your Information',
                content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

Service Providers: Third-party vendors who assist us in operating our website, processing payments, and delivering orders (e.g., payment processors, shipping companies).

Analytics Partners: We use analytics services (such as Google Analytics) to understand how visitors use our site. These services may collect anonymized usage data.

Legal Requirements: We may disclose your information if required by UAE law, court order, or governmental authority.

Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.`,
              },
              {
                title: '4. Data Security',
                content: `We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmission, secure payment processing through PCI-DSS compliant providers, and restricted access to personal data within our organization.

However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.`,
              },
              {
                title: '5. Cookies & Tracking Technologies',
                content: `We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:

• Remember your preferences and language settings
• Analyze website traffic and usage patterns
• Deliver personalized content and advertisements
• Maintain your shopping cart and session

You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.`,
              },
              {
                title: '6. Your Rights',
                content: `Depending on your location, you may have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you
• Correction: Request correction of inaccurate or incomplete data
• Deletion: Request deletion of your personal data (subject to legal obligations)
• Portability: Request transfer of your data to another service provider
• Objection: Object to processing of your data for marketing purposes
• Withdrawal of Consent: Withdraw consent for data processing at any time

To exercise any of these rights, please contact us at privacy@byhayatskin.com or via WhatsApp at +971 52 450 2886.`,
              },
              {
                title: '7. Data Retention',
                content: `We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by UAE law. Specifically:

• Order and transaction data: 7 years (UAE commercial law requirement)
• Consultation and skin profile data: 3 years from last interaction
• Marketing preferences: Until you unsubscribe or request deletion
• Website analytics data: 26 months (anonymized)`,
              },
              {
                title: '8. Third-Party Links',
                content: `Our website may contain links to third-party websites, including social media platforms (Instagram, WhatsApp). We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
              },
              {
                title: '9. Children\'s Privacy',
                content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will take steps to delete such information.`,
              },
              {
                title: '10. Changes to This Policy',
                content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of significant changes by posting the new policy on this page with an updated "Last Updated" date. Your continued use of our website after such changes constitutes acceptance of the updated policy.`,
              },
              {
                title: '11. Contact Us',
                content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

By Hayat Skin
Dubai, United Arab Emirates
Email: privacy@byhayatskin.com
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
            name: 'Privacy Policy | By Hayat Skin',
            description: 'Privacy policy of By Hayat Skin, Dubai luxury skincare brand.',
            url: `https://byhayatskin.com/${lang}/privacy`,
            dateModified: '2025-06-01',
          }),
        }}
      />
    </div>
  )
}