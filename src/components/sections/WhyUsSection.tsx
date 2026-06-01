'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface WhyUsSectionProps {
  dict: DictionaryType
}

const featureIcons = ['✦', '☀', '◈', '◉', '✧']
const featureKeys = ['expert', 'climate', 'luxury', 'personal', 'longterm'] as const

export function WhyUsSection({ dict }: WhyUsSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const features = featureKeys.map((key, i) => ({
    icon: featureIcons[i],
    title: dict.why_us.features[key].title,
    desc: dict.why_us.features[key].desc,
  }))

  return (
    <section ref={ref} className="section-padding bg-[var(--color-matte-black)] relative overflow-hidden">
      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-champagne)]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-champagne)]/40 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-champagne) 0%, transparent 70%)' }}
      />

      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne)] font-medium">
              {dict.why_us.label}
            </span>
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
          </div>
          <h2
            className="text-4xl md:text-5xl text-white"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, letterSpacing: '0.02em' }}
          >
            {dict.why_us.headline}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative p-6 rounded-sm border border-[var(--color-champagne)]/15 hover:border-[var(--color-champagne)]/40 transition-all duration-400 hover:bg-[var(--color-champagne)]/5"
            >
              {/* Icon */}
              <div className="text-2xl text-[var(--color-champagne)] mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Gold line */}
              <div className="w-8 h-px bg-[var(--color-champagne)]/40 mb-4 group-hover:w-12 transition-all duration-300" />

              {/* Title */}
              <h3
                className="text-lg text-white mb-3"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--color-warm-gray)] leading-relaxed">
                {feature.desc}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}