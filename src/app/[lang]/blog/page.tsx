import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale, type Locale } from '@/lib/i18n/dictionaries'
import { Clock, ArrowRight } from 'lucide-react'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)

  return {
    title: dict.blog.headline,
    description: dict.blog.subheadline,
    keywords: [
      'skincare blog dubai', 'skincare tips uae', 'luxury skincare guide',
      'anti aging skincare', 'acne treatment guide', 'dubai climate skincare',
    ],
    openGraph: {
      title: `${dict.blog.headline} | By Hayat Skin`,
      description: dict.blog.subheadline,
    },
  }
}

const blogPosts = [
  {
    slug: 'skincare-routine-dubai-summer',
    category: 'Dubai Climate',
    title: "The Ultimate Skincare Routine for Dubai's Summer Heat",
    excerpt: 'Discover how to protect and nourish your skin in extreme heat and humidity with our expert-curated routine designed specifically for the UAE climate.',
    readTime: '5 min',
    color: '#C9A96E',
    featured: true,
  },
  {
    slug: 'hyaluronic-acid-guide',
    category: 'Ingredients Science',
    title: 'Hyaluronic Acid: The Complete Guide to Skin Hydration',
    excerpt: 'Everything you need to know about the most powerful hydrating ingredient in modern skincare.',
    readTime: '7 min',
    color: '#7BA7BC',
    featured: false,
  },
  {
    slug: 'anti-aging-routine-uae',
    category: 'Anti-Aging',
    title: 'Anti-Aging Skincare: A Science-Backed Approach for UAE Skin',
    excerpt: 'How to build an effective anti-aging routine that works with the UAE climate, not against it.',
    readTime: '8 min',
    color: '#B76E79',
    featured: false,
  },
  {
    slug: 'best-skincare-routine-dry-skin-dubai',
    category: 'Dry Skin',
    title: 'Best Skincare Routine for Dry Skin in Dubai',
    excerpt: "Combat the drying effects of Dubai's climate with this comprehensive routine for dry skin types.",
    readTime: '6 min',
    color: '#A8C5A0',
    featured: false,
  },
  {
    slug: 'best-skincare-routine-oily-skin-dubai',
    category: 'Oily Skin',
    title: 'Best Skincare Routine for Oily Skin in Dubai',
    excerpt: "Keep shine at bay and maintain clear skin with this expert routine for oily skin in Dubai's heat.",
    readTime: '6 min',
    color: '#9B8EA8',
    featured: false,
  },
  {
    slug: 'skin-barrier-repair-dubai-climate',
    category: 'Skin Barrier',
    title: "How to Repair Your Skin Barrier in Dubai's Climate",
    excerpt: "AC exposure, UV rays, and heat can damage your skin barrier. Here's how to restore it.",
    readTime: '7 min',
    color: '#C9A96E',
    featured: false,
  },
]

const categories = ['All', 'Dubai Climate', 'Ingredients Science', 'Anti-Aging', 'Dry Skin', 'Oily Skin', 'Skin Barrier']

export default async function BlogPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const featured = blogPosts.find((p) => p.featured)
  const rest = blogPosts.filter((p) => !p.featured)

  return (
    <div className="min-h-screen pt-28" style={{ background: '#0F0E0C' }}>

      {/* ── Header ── */}
      <div style={{ background: '#141210', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
        <div className="container-luxury py-14">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
            <span
              className="text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ color: 'rgba(201,169,110,0.6)' }}
            >
              {dict.blog.label}
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-3"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontWeight: 300,
              color: '#F5EFE6',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            {dict.blog.headline}
          </h1>
          <p style={{ color: 'rgba(245,239,230,0.45)', maxWidth: '480px', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {dict.blog.subheadline}
          </p>
        </div>
      </div>

      <div className="container-luxury py-12">

        {/* ── Category Filter ── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 text-[0.65rem] tracking-[0.1em] uppercase rounded-full transition-all duration-300"
              style={
                cat === 'All'
                  ? {
                      background: 'rgba(201,169,110,0.15)',
                      border: '1px solid rgba(201,169,110,0.4)',
                      color: '#C9A96E',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid rgba(201,169,110,0.12)',
                      color: 'rgba(245,239,230,0.4)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured Post ── */}
        {featured && (
          <Link href={`/${locale}/blog/${featured.slug}`} className="group block mb-10">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden transition-all duration-500"
              style={{
                border: '1px solid rgba(201,169,110,0.12)',
                background: '#141210',
              }}
            >
              {/* Visual side */}
              <div
                className="relative min-h-[260px] lg:min-h-[320px] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${featured.color}18 0%, rgba(15,14,12,0.8) 100%)` }}
              >
                <div
                  className="text-[120px] leading-none select-none"
                  style={{
                    color: featured.color,
                    opacity: 0.08,
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                  }}
                >
                  ✦
                </div>
                <div className="absolute top-5 left-5">
                  <span
                    className="text-[0.58rem] tracking-[0.18em] uppercase px-3 py-1 rounded-full font-medium"
                    style={{ background: featured.color + '22', color: featured.color, border: `1px solid ${featured.color}33` }}
                  >
                    Featured · {featured.category}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div
                className="p-8 lg:p-12 flex flex-col justify-center"
                style={{ background: '#141210' }}
              >
                <div className="flex items-center gap-2 mb-5" style={{ color: 'rgba(201,169,110,0.4)' }}>
                  <Clock size={11} />
                  <span className="text-[0.62rem] tracking-[0.1em]">{featured.readTime} read</span>
                </div>
                <h2
                  className="mb-4 leading-snug transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontWeight: 300,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    color: '#F5EFE6',
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  className="leading-relaxed mb-7 text-sm"
                  style={{ color: 'rgba(245,239,230,0.5)' }}
                >
                  {featured.excerpt}
                </p>
                <div
                  className="flex items-center gap-2 text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300 group-hover:gap-3"
                  style={{ color: '#C9A96E' }}
                >
                  {dict.blog.read_more}
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block overflow-hidden transition-all duration-500"
              style={{
                background: '#141210',
                border: '1px solid rgba(201,169,110,0.1)',
              }}
            >
              {/* Visual */}
              <div
                className="relative h-44 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${post.color}15 0%, rgba(15,14,12,0.9) 100%)` }}
              >
                <div
                  className="text-7xl leading-none select-none"
                  style={{
                    color: post.color,
                    opacity: 0.1,
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                  }}
                >
                  ✦
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[0.55rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full font-medium"
                    style={{ background: post.color + '22', color: post.color, border: `1px solid ${post.color}33` }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pt-4">
                <div className="flex items-center gap-1.5 mb-3" style={{ color: 'rgba(201,169,110,0.35)' }}>
                  <Clock size={10} />
                  <span className="text-[0.6rem] tracking-[0.08em]">{post.readTime} read</span>
                </div>
                <h3
                  className="mb-3 leading-snug transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontWeight: 300,
                    fontSize: '1.15rem',
                    color: '#F5EFE6',
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 line-clamp-2"
                  style={{ color: 'rgba(245,239,230,0.45)' }}
                >
                  {post.excerpt}
                </p>
                <div
                  className="flex items-center gap-2 text-[0.62rem] tracking-[0.1em] uppercase transition-all duration-300 group-hover:gap-3"
                  style={{ color: '#C9A96E' }}
                >
                  {dict.blog.read_more}
                  <ArrowRight size={11} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}