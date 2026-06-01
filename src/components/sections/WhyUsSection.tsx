'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface WhyUsSectionProps {
  dict: DictionaryType
}

const featureKeys = ['expert', 'climate', 'luxury', 'personal', 'longterm'] as const

// Each feature gets a unique cinematic number + accent color
const featureMeta = [
  { num: '01', accent: '#C9A96E', glyph: '✦' },
  { num: '02', accent: '#B76E79', glyph: '◈' },
  { num: '03', accent: '#C9A96E', glyph: '◉' },
  { num: '04', accent: '#B76E79', glyph: '✧' },
  { num: '05', accent: '#C9A96E', glyph: '☀' },
]

export function WhyUsSection({ dict }: WhyUsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  const features = featureKeys.map((key, i) => ({
    ...featureMeta[i],
    title: dict.why_us.features[key].title,
    desc: dict.why_us.features[key].desc,
  }))

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#FDFAF5', paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      {/* ── Parallax background number ── */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          x: bgX,
          top: '5%',
          left: '-8%',
          fontSize: 'clamp(200px, 35vw, 480px)',
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontWeight: 300,
          color: 'rgba(160,120,64,0.04)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        WHY
      </motion.div>

      {/* ── Vertical accent line ── */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.15), transparent)' }}
      />

      <div className="container-luxury relative">

        {/* ── Header ── */}
        <div className="mb-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.6)' }} />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.7)' }}>
              {dict.why_us.label}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#1A1A1A',
                lineHeight: 1.05,
              }}
            >
              {dict.why_us.headline}
            </motion.h2>
          </div>
        </div>

        {/* ── Features — full-width list with large numbers ── */}
        <div className="flex flex-col">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid grid-cols-[auto_1fr_auto] lg:grid-cols-[120px_1fr_auto] items-center gap-6 lg:gap-12 py-8 cursor-default"
              style={{ borderBottom: '1px solid rgba(201,169,110,0.07)' }}
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(201,169,110,0.03), transparent)' }}
              />

              {/* Number */}
              <div
                className="font-light leading-none select-none"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: 'rgba(201,169,110,0.2)',
                  transition: 'color 0.5s',
                }}
              >
                {feature.num}
              </div>

              {/* Title + desc */}
              <div>
                <div
                  className="mb-2 transition-colors duration-500"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                    fontWeight: 300,
                    color: '#2A2018',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {feature.title}
                </div>
                <p
                  className="text-sm leading-relaxed max-w-xl"
                  style={{ color: 'rgba(80,65,50,0.6)' }}
                >
                  {feature.desc}
                </p>
              </div>

              {/* Glyph accent */}
              <div
                className="text-xl opacity-20 group-hover:opacity-60 transition-all duration-500 group-hover:scale-110"
                style={{ color: feature.accent }}
              >
                {feature.glyph}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA line ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex items-center justify-between"
        >
          <div
            className="text-sm"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontStyle: 'italic',
              color: 'rgba(201,169,110,0.4)',
            }}
          >
            {dict.why_us.headline}
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.2)' }} />
            <span className="text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,169,110,0.3)' }}>
              Dubai, UAE
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}