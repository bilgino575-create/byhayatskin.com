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
  },
  {
    slug: 'hyaluronic-acid-guide',
    category: 'Ingredients Science',
    title: 'Hyaluronic Acid: The Complete Guide to Skin Hydration',
    excerpt: 'Everything you need to know about the most powerful hydrating ingredient in modern skincare.',
    readTime: '7 min',
  },
  {
    slug: 'anti-aging-routine-uae',
    category: 'Anti-Aging',
    title: 'Anti-Aging Skincare: A Science-Backed Approach for UAE Skin',
    excerpt: 'How to build an effective anti-aging routine that works with the UAE climate, not against it.',
    readTime: '8 min',
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
        className="group block h-full rounded-sm overflow-hidden"
        style={{
          background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
          border: hovered ? '1px solid rgba(201,169,110,0.2)' : '1px solid rgba(201,169,110,0.08)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image placeholder */}
        <div
          className="relative h-48 overflow-hidden flex items-center justify-center"
          style={{
            background: 'rgba(201,169,110,0.04)',
            borderBottom: '1px solid rgba(201,169,110,0.06)',
          }}
        >
          <div
            className="text-6xl opacity-10"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#C9A96E' }}
          >
            ✦
          </div>
          <div className="absolute top-4 left-4">
            <span
              className="text-[0.58rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
              style={{
                background: 'rgba(201,169,110,0.1)',
                color: 'rgba(201,169,110,0.7)',
                border: '1px solid rgba(201,169,110,0.15)',
              }}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <span className="text-[0.58rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(201,169,110,0.3)' }}>
              {post.readTime} read
            </span>
          </div>

          <h3
            className="mb-3 leading-snug"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.15rem',
              fontWeight: 400,
              color: hovered ? '#F5EFE6' : 'rgba(245,239,230,0.7)',
              letterSpacing: '0.01em',
              transition: 'color 0.3s',
            }}
          >
            {post.title}
          </h3>

          <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(245,239,230,0.35)' }}>
            {post.excerpt}
          </p>

          <div
            className="flex items-center gap-2 text-[0.6rem] tracking-[0.15em] uppercase"
            style={{ color: hovered ? 'rgba(201,169,110,0.8)' : 'rgba(201,169,110,0.4)', transition: 'color 0.3s' }}
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