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
    title: 'The Ultimate Skincare Routine for Dubai\'s Summer Heat',
    excerpt: 'Discover how to protect and nourish your skin in extreme heat and humidity with our expert-curated routine designed specifically for the UAE climate.',
    readTime: '5 min',
    color: '#C9A96E',
    gradient: 'from-[#C9A96E]/20 to-[#E8D5B0]/10',
    featured: true,
  },
  {
    slug: 'hyaluronic-acid-guide',
    category: 'Ingredients Science',
    title: 'Hyaluronic Acid: The Complete Guide to Skin Hydration',
    excerpt: 'Everything you need to know about the most powerful hydrating ingredient in modern skincare.',
    readTime: '7 min',
    color: '#7BA7BC',
    gradient: 'from-[#7BA7BC]/20 to-[#B8D4E0]/10',
    featured: false,
  },
  {
    slug: 'anti-aging-routine-uae',
    category: 'Anti-Aging',
    title: 'Anti-Aging Skincare: A Science-Backed Approach for UAE Skin',
    excerpt: 'How to build an effective anti-aging routine that works with the UAE climate, not against it.',
    readTime: '8 min',
    color: '#B76E79',
    gradient: 'from-[#B76E79]/20 to-[#E8B4B8]/10',
    featured: false,
  },
  {
    slug: 'best-skincare-routine-dry-skin-dubai',
    category: 'Dry Skin',
    title: 'Best Skincare Routine for Dry Skin in Dubai',
    excerpt: 'Combat the drying effects of Dubai\'s climate with this comprehensive routine for dry skin types.',
    readTime: '6 min',
    color: '#A8C5A0',
    gradient: 'from-[#A8C5A0]/20 to-[#C8E0C0]/10',
    featured: false,
  },
  {
    slug: 'best-skincare-routine-oily-skin-dubai',
    category: 'Oily Skin',
    title: 'Best Skincare Routine for Oily Skin in Dubai',
    excerpt: 'Keep shine at bay and maintain clear skin with this expert routine for oily skin in Dubai\'s heat.',
    readTime: '6 min',
    color: '#9B8EA8',
    gradient: 'from-[#9B8EA8]/20 to-[#C4B8D0]/10',
    featured: false,
  },
  {
    slug: 'skin-barrier-repair-dubai-climate',
    category: 'Skin Barrier',
    title: 'How to Repair Your Skin Barrier in Dubai\'s Climate',
    excerpt: 'AC exposure, UV rays, and heat can damage your skin barrier. Here\'s how to restore it.',
    readTime: '7 min',
    color: '#C9A96E',
    gradient: 'from-[#C9A96E]/15 to-[#E8D5B0]/8',
    featured: false,
  },
]

const categories = ['All', 'Dubai Climate', 'Ingredients Science', 'Anti-Aging', 'Dry Skin', 'Oily Skin', 'Skin Barrier', 'Acne', 'Pigmentation']

export default async function BlogPage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const featured = blogPosts.find((p) => p.featured)
  const rest = blogPosts.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-28">
      {/* Header */}
      <div className="bg-[var(--color-pearl)] border-b border-[var(--color-soft-gray)]">
        <div className="container-luxury py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[var(--color-champagne)]" />
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)]">
              {dict.blog.label}
            </span>
          </div>
          <h1 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)] mb-2">
            {dict.blog.headline}
          </h1>
          <p className="text-[var(--color-warm-gray)] max-w-xl">
            {dict.blog.subheadline}
          </p>
        </div>
      </div>

      <div className="container-luxury py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 text-[0.7rem] tracking-[0.08em] uppercase rounded-full border transition-all duration-300 ${
                cat === 'All'
                  ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/10 text-[var(--color-champagne-dark)]'
                  : 'border-[var(--color-soft-gray)] text-[var(--color-warm-gray)] hover:border-[var(--color-champagne-light)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            className="group block mb-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-sm overflow-hidden border border-[var(--color-soft-gray)] hover:border-[var(--color-champagne-light)] hover:shadow-[var(--shadow-hover)] transition-all duration-400">
              {/* Image */}
              <div className={`relative h-64 lg:h-auto bg-gradient-to-br ${featured.gradient} min-h-[280px]`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="text-8xl opacity-10"
                    style={{ color: featured.color, fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    ✦
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full font-medium"
                    style={{ background: featured.color + '20', color: featured.color }}
                  >
                    Featured · {featured.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 bg-[var(--color-pearl)] flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[0.65rem] text-[var(--color-warm-gray)] mb-4">
                  <Clock size={11} />
                  <span>{featured.readTime} read</span>
                </div>
                <h2
                  className="text-2xl lg:text-3xl text-[var(--color-matte-black)] mb-4 group-hover:text-[var(--color-champagne-dark)] transition-colors duration-300 leading-snug"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
                >
                  {featured.title}
                </h2>
                <p className="text-[var(--color-warm-gray)] leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-[var(--color-champagne-dark)] group-hover:gap-3 transition-all duration-300">
                  {dict.blog.read_more}
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block card-luxury rounded-sm overflow-hidden"
            >
              {/* Image */}
              <div className={`relative h-48 bg-gradient-to-br ${post.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="text-5xl opacity-15"
                    style={{ color: post.color, fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    ✦
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[0.55rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full font-medium"
                    style={{ background: post.color + '20', color: post.color }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[0.65rem] text-[var(--color-warm-gray)] mb-2">
                  <Clock size={10} />
                  <span>{post.readTime} read</span>
                </div>
                <h3
                  className="text-lg text-[var(--color-matte-black)] mb-2 group-hover:text-[var(--color-champagne-dark)] transition-colors duration-300 leading-snug"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
                >
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.08em] uppercase text-[var(--color-champagne-dark)] group-hover:gap-3 transition-all duration-300">
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