'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface ProductCategoriesSectionProps {
  dict: DictionaryType
  lang: Locale
}

const categoryIcons: Record<string, string> = {
  serums: '✦',
  moisturizers: '◈',
  cleansers: '◎',
  masks: '◇',
  spf: '☀',
  eye_care: '◉',
  anti_aging: '✧',
  acne: '◆',
  pigmentation: '◐',
  barrier: '⬡',
  kits: '✦',
}

const categoryColors = [
  '#C9A96E', '#B76E79', '#7BA7BC', '#A8C5A0', '#9B8EA8',
  '#C9A96E', '#B76E79', '#7BA7BC', '#A8C5A0', '#9B8EA8', '#C9A96E',
]

export function ProductCategoriesSection({ dict, lang }: ProductCategoriesSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const categories = [
    { key: 'serums', label: dict.categories.items.serums, slug: 'serums' },
    { key: 'moisturizers', label: dict.categories.items.moisturizers, slug: 'moisturizers' },
    { key: 'cleansers', label: dict.categories.items.cleansers, slug: 'cleansers' },
    { key: 'masks', label: dict.categories.items.masks, slug: 'masks' },
    { key: 'spf', label: dict.categories.items.spf, slug: 'spf' },
    { key: 'eye_care', label: dict.categories.items.eye_care, slug: 'eye-care' },
    { key: 'anti_aging', label: dict.categories.items.anti_aging, slug: 'anti-aging' },
    { key: 'acne', label: dict.categories.items.acne, slug: 'acne' },
    { key: 'pigmentation', label: dict.categories.items.pigmentation, slug: 'pigmentation' },
    { key: 'barrier', label: dict.categories.items.barrier, slug: 'barrier' },
    { key: 'kits', label: dict.categories.items.kits, slug: 'kits' },
  ]

  return (
    <section ref={ref} className="section-padding bg-[var(--color-beige)] relative overflow-hidden">
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
                {dict.categories.label}
              </span>
            </div>
            <h2 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)]">
              {dict.categories.headline}
            </h2>
          </div>
          <Link
            href={`/${lang}/products`}
            className="flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-champagne-dark)] hover:gap-3 transition-all duration-300 group shrink-0"
          >
            {dict.categories.cta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/${lang}/products/${cat.slug}`}
                className="group flex flex-col items-center text-center p-5 rounded-sm bg-[var(--color-pearl)] border border-[var(--color-soft-gray)] hover:border-[var(--color-champagne-light)] hover:shadow-[var(--shadow-hover)] transition-all duration-400 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 text-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: categoryColors[i] + '15',
                    color: categoryColors[i],
                  }}
                >
                  {categoryIcons[cat.key]}
                </div>
                <span className="text-[0.75rem] font-medium text-[var(--color-matte-black)] group-hover:text-[var(--color-champagne-dark)] transition-colors duration-300 leading-tight">
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}

          {/* View All Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: categories.length * 0.05 }}
          >
            <Link
              href={`/${lang}/products`}
              className="group flex flex-col items-center justify-center text-center p-5 rounded-sm border border-dashed border-[var(--color-champagne)]/40 hover:border-[var(--color-champagne)] hover:bg-[var(--color-champagne)]/5 transition-all duration-400 h-full min-h-[100px]"
            >
              <ArrowRight
                size={20}
                className="text-[var(--color-champagne)] mb-2 group-hover:translate-x-1 transition-transform duration-300"
              />
              <span className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--color-champagne-dark)]">
                {dict.categories.cta}
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}