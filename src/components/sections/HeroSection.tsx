'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

// ── Three.js scene loaded client-side only (no SSR) ──
const HeroScene3D = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
      }}
    />
  ),
})

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const headlineLines = dict.hero.headline.split('\n')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ivory)]">

      {/* Background: warm ivory studio */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFAF5] via-[#FAF5EC] to-[#EDE0CC]" />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      {/* Soft radial glow behind scene */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[90%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.09) 0%, rgba(232,213,176,0.05) 45%, transparent 70%)',
        }}
      />

      {/* 3D Canvas — right side, client-only */}
      <div className="absolute right-0 top-0 w-full lg:w-[54%] h-full opacity-95 lg:opacity-100">
        <HeroScene3D />
      </div>

      {/* Left content vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-[var(--color-ivory)]/88 to-transparent lg:via-[var(--color-ivory)]/55" />

      {/* Content */}
      <div className="relative z-10 container-luxury w-full pt-32 pb-20">
        <div className="max-w-2xl">

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
              {dict.hero.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="heading-luxury mb-8">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block text-5xl md:text-6xl lg:text-7xl text-[var(--color-matte-black)]"
              >
                {i === 1 ? (
                  <span className="text-gold-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-base md:text-lg text-[var(--color-warm-gray)] leading-relaxed mb-10 max-w-lg"
          >
            {dict.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={`/${lang}/products`} className="btn-luxury btn-primary">
              {dict.hero.cta_primary}
            </Link>
            <Link href={`/${lang}/consultation`} className="btn-luxury btn-outline">
              {dict.hero.cta_secondary}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-8 mt-14 pt-8 border-t border-[var(--color-soft-gray)]"
          >
            {[
              { value: dict.brand_story.stat_1_value, label: dict.brand_story.stat_1_label },
              { value: dict.brand_story.stat_2_value, label: dict.brand_story.stat_2_label },
              { value: dict.brand_story.stat_3_value, label: dict.brand_story.stat_3_label },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl md:text-3xl text-gold-gradient mb-1"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.65rem] tracking-[0.12em] uppercase text-[var(--color-warm-gray)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-warm-gray)]"
      >
        <span className="text-[0.6rem] tracking-[0.2em] uppercase">{dict.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[var(--color-champagne)]" />
        </motion.div>
      </motion.div>

    </section>
  )
}