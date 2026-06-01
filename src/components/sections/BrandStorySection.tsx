'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface BrandStorySectionProps {
  dict: DictionaryType
}

export function BrandStorySection({ dict }: BrandStorySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-[var(--color-pearl)] relative overflow-hidden">
      {/* Decorative background element */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-champagne) 0%, transparent 70%)' }}
      />

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Main image placeholder with luxury styling */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-beige) 0%, var(--color-champagne-light) 50%, var(--color-soft-gray) 100%)',
                }}
              />
              {/* Decorative lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-6xl text-[var(--color-champagne-dark)] opacity-20 mb-4"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
                  >
                    BHS
                  </div>
                  <div className="w-16 h-px bg-[var(--color-champagne)] mx-auto" />
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 glass p-6 rounded-sm shadow-[var(--shadow-luxury)] max-w-[200px]"
            >
              <div
                className="text-3xl text-[var(--color-champagne-dark)] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
              >
                {dict.brand_story.stat_1_value}
              </div>
              <div className="text-[0.65rem] tracking-[0.12em] uppercase text-[var(--color-warm-gray)]">
                {dict.brand_story.stat_1_label}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[var(--color-champagne)]" />
              <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
                {dict.brand_story.label}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)] mb-6"
            >
              {dict.brand_story.headline}
            </h2>

            {/* Gold divider */}
            <div className="divider-gold !mx-0 mb-6" />

            {/* Body */}
            <p className="text-base text-[var(--color-warm-gray)] leading-relaxed mb-10">
              {dict.brand_story.body}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--color-soft-gray)]">
              {[
                { value: dict.brand_story.stat_1_value, label: dict.brand_story.stat_1_label },
                { value: dict.brand_story.stat_2_value, label: dict.brand_story.stat_2_label },
                { value: dict.brand_story.stat_3_value, label: dict.brand_story.stat_3_label },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                >
                  <div
                    className="text-2xl text-gold-gradient mb-1"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-warm-gray)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}