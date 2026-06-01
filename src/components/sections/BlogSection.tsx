'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface BlogSectionProps {
  dict: DictionaryType
  lang: Locale
}

const blogPosts = [
  {
    slug: 'skincare-routine-dubai-summer',
    category: 'Dubai Climate',
    title: 'The Ultimate Skincare Routine for Dubai\'s Summer Heat',
    excerpt: 'Discover how to protect and nourish your skin in extreme heat and humidity with our expert-curated routine.',
    readTime: '5 min',
    color: '#C9A96E',
    gradient: 'from-[#C9A96E]/20 to-[#E8D5B0]/10',
  },
  {
    slug: 'hyaluronic-acid-guide',
    category: 'Ingredients Science',
    title: 'Hyaluronic Acid: The Complete Guide to Skin Hydration',
    excerpt: 'Everything you need to know about the most powerful hydrating ingredient in modern skincare.',
    readTime: '7 min',
    color: '#7BA7BC',
    gradient: 'from-[#7BA7BC]/20 to-[#B8D4E0]/10',
  },
  {
    slug: 'anti-aging-routine-uae',
    category: 'Anti-Aging',
    title: 'Anti-Aging Skincare: A Science-Backed Approach for UAE Skin',
    excerpt: 'How to build an effective anti-aging routine that works with the UAE climate, not against it.',
    readTime: '8 min',
    color: '#B76E79',
    gradient: 'from-[#B76E79]/20 to-[#E8B4B8]/10',
  },
]

export function BlogSection({ dict, lang }: BlogSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-[var(--color-ivory)] relative overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[var(--color-champagne)]" />
              <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
                {dict.blog.label}
              </span>
            </div>
            <h2 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)]">
              {dict.blog.headline}
            </h2>
            <p className="text-[var(--color-warm-gray)] mt-3 max-w-lg">
              {dict.blog.subheadline}
            </p>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-champagne-dark)] hover:gap-3 transition-all duration-300 group shrink-0"
          >
            {dict.blog.view_all}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="group block card-luxury rounded-sm overflow-hidden h-full"
              >
                {/* Image placeholder */}
                <div className={`relative h-52 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-5xl opacity-20"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: post.color }}
                    >
                      ✦
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full font-medium"
                      style={{ background: post.color + '20', color: post.color }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[0.65rem] text-[var(--color-warm-gray)] mb-3">
                    <Clock size={11} />
                    <span>{post.readTime} read</span>
                  </div>

                  <h3
                    className="text-lg text-[var(--color-matte-black)] mb-3 group-hover:text-[var(--color-champagne-dark)] transition-colors duration-300 leading-snug"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[0.7rem] tracking-[0.08em] uppercase text-[var(--color-champagne-dark)] group-hover:gap-3 transition-all duration-300">
                    {dict.blog.read_more}
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}