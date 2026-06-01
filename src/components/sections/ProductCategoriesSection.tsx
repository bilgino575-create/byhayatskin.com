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

const categoryMeta: Record<string, { glyph: string; accent: string; desc: string }> = {
  serums:       { glyph: '✦', accent: '#C9A96E', desc: 'Concentrated actives for targeted results' },
  moisturizers: { glyph: '◈', accent: '#B76E79', desc: 'Deep hydration for Dubai\'s climate' },
  cleansers:    { glyph: '◎', accent: '#7BA7BC', desc: 'Gentle yet effective daily cleansing' },
  masks:        { glyph: '◇', accent: '#A8C5A0', desc: 'Intensive weekly treatment rituals' },
  spf:          { glyph: '☀', accent: '#C9A96E', desc: 'UAE-grade sun protection SPF 50+' },
  eye_care:     { glyph: '◉', accent: '#9B8EA8', desc: 'Precision care for delicate eye area' },
  anti_aging:   { glyph: '✧', accent: '#C9A96E', desc: 'Science-backed age-defying formulas' },
  acne:         { glyph: '◆', accent: '#B76E79', desc: 'Clear skin solutions for UAE heat' },
  pigmentation: { glyph: '◐', accent: '#7BA7BC', desc: 'Even tone, luminous complexion' },
  barrier:      { glyph: '⬡', accent: '#A8C5A0', desc: 'Restore and strengthen skin barrier' },
  kits:         { glyph: '✦', accent: '#C9A96E', desc: 'Curated luxury ritual collections' },
}

export function ProductCategoriesSection({ dict, lang }: ProductCategoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.08 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const categoryLabels: Record<string, string> = {
    serums: 'Serums', moisturizers: 'Moisturizers', cleansers: 'Cleansers',
    masks: 'Masks', spf: 'SPF Protection', eye_care: 'Eye Care',
    anti_aging: 'Anti-Aging', acne: 'Acne Treatment', pigmentation: 'Pigmentation',
    barrier: 'Barrier Repair', kits: 'Luxury Kits',
  }
  const categories = categoryKeys.map((key) => ({
    key,
    label: categoryLabels[key],
    ...categoryMeta[key],
  }))

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0C0A07', paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      {/* ── Parallax background text ── */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          y: bgY,
          bottom: '-5%',
          left: '-5%',
          fontSize: 'clamp(120px, 22vw, 320px)',
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontWeight: 300,
          color: 'rgba(201,169,110,0.025)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        SKIN
      </motion.div>

      <div className="container-luxury relative">

        {/* ── Header ── */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.6)' }} />
              <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.7)' }}>
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
                  color: '#F5EDD8',
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
              className="group flex items-center gap-3 text-[0.65rem] tracking-[0.25em] uppercase transition-all duration-400"
              style={{ color: 'rgba(201,169,110,0.6)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,1)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.6)'}
            >
              <span>View All Products</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* ── Category grid — full-width list style ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/${lang}/products`}
                className="group relative block py-7 px-6 transition-all duration-500"
                style={{
                  borderBottom: '1px solid rgba(201,169,110,0.07)',
                  borderRight: (i % 3 !== 2) ? '1px solid rgba(201,169,110,0.07)' : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `linear-gradient(135deg, ${cat.accent}08, transparent)` }}
                />

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 left-0 w-0 h-px pointer-events-none"
                  animate={{ width: hoveredIndex === i ? '40px' : '0px' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: cat.accent }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Glyph */}
                  <div
                    className="mt-0.5 text-base transition-all duration-500 flex-shrink-0"
                    style={{
                      color: hoveredIndex === i ? cat.accent : 'rgba(201,169,110,0.2)',
                    }}
                  >
                    {cat.glyph}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Category name */}
                    <div
                      className="mb-1.5 transition-colors duration-400"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '1.15rem',
                        fontWeight: 400,
                        color: hoveredIndex === i ? '#F5EDD8' : 'rgba(200,185,165,0.6)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {cat.label}
                    </div>
                    {/* Desc */}
                    <div
                      className="text-[0.65rem] leading-relaxed transition-all duration-400"
                      style={{
                        color: hoveredIndex === i ? 'rgba(200,185,165,0.5)' : 'rgba(200,185,165,0.2)',
                      }}
                    >
                      {cat.desc}
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{
                      opacity: hoveredIndex === i ? 1 : 0,
                      x: hoveredIndex === i ? 0 : -8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: cat.accent, fontSize: '0.75rem' }}
                  >
                    →
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}