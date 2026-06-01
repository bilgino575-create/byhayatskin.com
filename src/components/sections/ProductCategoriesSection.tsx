'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface ProductCategoriesSectionProps {
  dict: DictionaryType
  lang: Locale
}

const categoryKeys = ['serums', 'moisturizers', 'cleansers', 'masks', 'spf', 'eye_care', 'anti_aging', 'acne', 'pigmentation', 'barrier', 'kits'] as const

const categoryMeta: Record<string, { glyph: string; desc: string; href: string }> = {
  serums:       { glyph: '✦', desc: 'Concentrated actives for targeted results', href: 'serums' },
  moisturizers: { glyph: '◈', desc: 'Deep hydration for Dubai\'s climate', href: 'moisturizers' },
  cleansers:    { glyph: '◎', desc: 'Gentle yet effective daily cleansing', href: '' },
  masks:        { glyph: '◇', desc: 'Intensive weekly treatment rituals', href: '' },
  spf:          { glyph: '☀', desc: 'UAE-grade sun protection SPF 50+', href: 'spf' },
  eye_care:     { glyph: '◉', desc: 'Precision care for delicate eye area', href: '' },
  anti_aging:   { glyph: '✧', desc: 'Science-backed age-defying formulas', href: 'anti-aging' },
  acne:         { glyph: '◆', desc: 'Clear skin solutions for UAE heat', href: '' },
  pigmentation: { glyph: '◐', desc: 'Even tone, luminous complexion', href: '' },
  barrier:      { glyph: '⬡', desc: 'Restore and strengthen skin barrier', href: '' },
  kits:         { glyph: '✦', desc: 'Curated luxury ritual collections', href: 'kits' },
}

const categoryLabels: Record<string, string> = {
  serums: 'Serums', moisturizers: 'Moisturizers', cleansers: 'Cleansers',
  masks: 'Masks', spf: 'SPF Protection', eye_care: 'Eye Care',
  anti_aging: 'Anti-Aging', acne: 'Acne Treatment', pigmentation: 'Pigmentation',
  barrier: 'Barrier Repair', kits: 'Luxury Kits',
}

export function ProductCategoriesSection({ dict, lang }: ProductCategoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.08 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  const categories = categoryKeys.map((key) => ({
    key,
    label: categoryLabels[key],
    ...categoryMeta[key],
  }))

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#141210', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Background watermark */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          y: bgY, bottom: '-5%', left: '-4%',
          fontSize: 'clamp(120px, 22vw, 320px)',
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontWeight: 300,
          color: 'rgba(201,169,110,0.025)',
          lineHeight: 1, letterSpacing: '-0.04em',
        }}
      >
        SKIN
      </motion.div>

      <div className="container-luxury relative">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-7"
            >
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
              <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>
                Our Collection
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: '#F5EFE6',
                  lineHeight: 1.05,
                }}
              >
                {dict.products.headline}
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href={`/${lang}/products`}
              className="group flex items-center gap-3 text-[0.62rem] tracking-[0.25em] uppercase transition-all duration-400"
              style={{ color: 'rgba(201,169,110,0.4)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.9)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.4)'}
            >
              <span>View All Products</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {categories.map((cat, i) => {
            const href = cat.href ? `/${lang}/products/${cat.href}` : `/${lang}/products`
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={href}
                  className="group relative block py-6 px-5 transition-all duration-500"
                  style={{
                    borderBottom: '1px solid rgba(201,169,110,0.06)',
                    borderRight: (i % 3 !== 2) ? '1px solid rgba(201,169,110,0.06)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover bg */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.04), transparent)' }}
                  />
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 h-px pointer-events-none"
                    animate={{ width: hoveredIndex === i ? '40px' : '0px' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: '#C9A96E' }}
                  />

                  <div className="relative flex items-start gap-4">
                    {/* Glyph */}
                    <div
                      className="mt-0.5 text-sm transition-all duration-500 flex-shrink-0"
                      style={{ color: hoveredIndex === i ? '#C9A96E' : 'rgba(201,169,110,0.15)' }}
                    >
                      {cat.glyph}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className="mb-1 transition-colors duration-300"
                        style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: '1.1rem',
                          fontWeight: 400,
                          color: hoveredIndex === i ? '#F5EFE6' : 'rgba(245,239,230,0.35)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {cat.label}
                      </div>
                      <div
                        className="text-[0.62rem] leading-relaxed transition-all duration-300"
                        style={{ color: hoveredIndex === i ? 'rgba(245,239,230,0.35)' : 'rgba(245,239,230,0.15)' }}
                      >
                        {cat.desc}
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{ opacity: hoveredIndex === i ? 1 : 0, x: hoveredIndex === i ? 0 : -6 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-0.5 text-xs"
                      style={{ color: '#C9A96E' }}
                    >
                      →
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}