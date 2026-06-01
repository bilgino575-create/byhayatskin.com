'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface BlogSectionProps {
  dict: DictionaryType
  lang: Locale
}

const blogPosts = [
  {
    slug: 'skincare-routine-dubai-summer',
    category: 'Dubai Climate',
    title: "The Ultimate Skincare Routine for Dubai's Summer Heat",
    excerpt: 'Discover how to protect and nourish your skin in extreme heat and humidity with our expert-curated routine.',
    readTime: '5 min',
    accent: '#C9A96E',
    bg: 'linear-gradient(135deg, #1a1208 0%, #2d1f0a 45%, #1a1208 100%)',
    label: 'Dubai Heat',
    glyph: '☀',
  },
  {
    slug: 'hyaluronic-acid-guide',
    category: 'Ingredients Science',
    title: 'Hyaluronic Acid: The Complete Guide to Skin Hydration',
    excerpt: 'Everything you need to know about the most powerful hydrating ingredient in modern skincare.',
    readTime: '7 min',
    accent: '#7BA7BC',
    bg: 'linear-gradient(135deg, #0a1520 0%, #0d2035 45%, #0a1520 100%)',
    label: 'Hydration',
    glyph: '◈',
  },
  {
    slug: 'anti-aging-routine-uae',
    category: 'Anti-Aging',
    title: 'Anti-Aging Skincare: A Science-Backed Approach for UAE Skin',
    excerpt: 'How to build an effective anti-aging routine that works with the UAE climate, not against it.',
    readTime: '8 min',
    accent: '#B76E79',
    bg: 'linear-gradient(135deg, #1a0a10 0%, #2d1020 45%, #1a0a10 100%)',
    label: 'Anti-Aging',
    glyph: '✦',
  },
]

function BlogCard({ post, lang, index, inView }: {
  post: typeof blogPosts[0]
  lang: string
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link
        href={`/${lang}/blog/${post.slug}`}
        className="group block h-full overflow-hidden"
        style={{
          background: '#141210',
          border: hovered ? `1px solid ${post.accent}35` : '1px solid rgba(201,169,110,0.08)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
          boxShadow: hovered ? `0 12px 40px ${post.accent}12` : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Editorial image area */}
        <div
          className="relative h-52 overflow-hidden"
          style={{ background: post.bg }}
        >
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${post.accent}20 0%, transparent 65%)`,
              opacity: hovered ? 1 : 0.5,
            }}
          />

          {/* Large decorative glyph */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '5rem',
                color: post.accent,
                opacity: hovered ? 0.18 : 0.1,
                lineHeight: 1,
                transition: 'opacity 0.4s',
              }}
            >
              {post.glyph}
            </span>
          </div>

          {/* Editorial label bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
            <span
              className="text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
              style={{
                background: `${post.accent}18`,
                color: post.accent,
                border: `1px solid ${post.accent}30`,
              }}
            >
              {post.category}
            </span>
            <span
              className="text-[0.55rem] tracking-[0.15em] uppercase"
              style={{ color: `${post.accent}60` }}
            >
              {post.readTime} read
            </span>
          </div>

          {/* Corner accent */}
          <div
            className="absolute top-0 left-0 w-8 h-px transition-all duration-500"
            style={{ background: `${post.accent}50`, width: hovered ? '48px' : '32px' }}
          />
          <div
            className="absolute top-0 left-0 w-px h-8 transition-all duration-500"
            style={{ background: `${post.accent}50`, height: hovered ? '48px' : '32px' }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className="mb-3 leading-snug"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.2rem',
              fontWeight: 400,
              color: hovered ? '#F5EFE6' : 'rgba(245,239,230,0.8)',
              letterSpacing: '0.01em',
              lineHeight: 1.3,
              transition: 'color 0.3s',
            }}
          >
            {post.title}
          </h3>

          <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(245,239,230,0.4)' }}>
            {post.excerpt}
          </p>

          <div
            className="flex items-center gap-2 text-[0.6rem] tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              color: hovered ? post.accent : 'rgba(201,169,110,0.4)',
              gap: hovered ? '10px' : '8px',
            }}
          >
            Read More <span>→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export function BlogSection({ dict, lang }: BlogSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#141210', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
              <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>
                {dict.blog.label}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#F5EFE6',
                lineHeight: 1.1,
              }}
            >
              {dict.blog.headline}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.4)' }}>
              {dict.blog.subheadline}
            </p>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="flex items-center gap-2 text-[0.62rem] tracking-[0.2em] uppercase shrink-0 transition-colors duration-300"
            style={{ color: 'rgba(201,169,110,0.5)' }}
          >
            {dict.blog.view_all}
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} lang={lang} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}