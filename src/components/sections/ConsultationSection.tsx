'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface ConsultationSectionProps {
  dict: DictionaryType
  lang: Locale
}

const steps = [
  { key: 'skin_type', icon: '◉', color: '#C9A96E' },
  { key: 'concerns', icon: '◈', color: '#C9A96E' },
  { key: 'lifestyle', icon: '◎', color: '#C9A96E' },
  { key: 'climate', icon: '☀', color: '#C9A96E' },
  { key: 'goals', icon: '✦', color: '#C9A96E' },
] as const

const outputs = [
  { key: 'am', icon: '☀' },
  { key: 'pm', icon: '☽' },
  { key: 'products', icon: '✦' },
  { key: 'plan', icon: '◈' },
] as const

export function ConsultationSection({ dict, lang }: ConsultationSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0F0E0C', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute"
          style={{
            top: '10%', right: '-10%',
            width: '50%', height: '80%',
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
              <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>
                {dict.consultation.label}
              </span>
            </div>

            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#F5EFE6',
                lineHeight: 1.1,
              }}
            >
              {dict.consultation.headline}
            </h2>

            <div style={{ width: '48px', height: '1px', background: 'rgba(201,169,110,0.3)', marginBottom: '1.5rem' }} />

            <p className="leading-relaxed mb-10 max-w-md text-sm" style={{ color: 'rgba(245,239,230,0.45)' }}>
              {dict.consultation.subheadline}
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
                    style={{
                      background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.2)',
                      color: '#C9A96E',
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-[0.58rem] tracking-[0.15em] uppercase w-5" style={{ color: 'rgba(201,169,110,0.25)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm" style={{ color: 'rgba(245,239,230,0.6)' }}>
                      {dict.consultation.steps[step.key]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href={`/${lang}/consultation`}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium transition-all duration-500 group"
              style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)', color: '#0F0E0C' }}
            >
              {dict.consultation.cta}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          {/* Right — Output Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="rounded-sm p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,169,110,0.12)',
                boxShadow: '0 0 60px rgba(201,169,110,0.05), 0 16px 48px rgba(0,0,0,0.4)',
              }}
            >
              <div className="text-[0.6rem] tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(201,169,110,0.5)' }}>
                {dict.skin_diagnosis.routine_label}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {outputs.map((output, i) => (
                  <motion.div
                    key={output.key}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    className="p-4 rounded-sm"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(201,169,110,0.08)',
                    }}
                  >
                    <div className="text-base mb-2" style={{ color: 'rgba(201,169,110,0.5)' }}>{output.icon}</div>
                    <div className="text-xs" style={{ color: 'rgba(245,239,230,0.5)' }}>
                      {dict.consultation.features[output.key]}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Sample routine */}
              <div
                className="pt-5"
                style={{ borderTop: '1px solid rgba(201,169,110,0.08)' }}
              >
                <div className="text-[0.58rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(201,169,110,0.3)' }}>
                  Sample AM Routine
                </div>
                <div className="space-y-2">
                  {['Gentle Cleanser', 'Vitamin C Serum', 'SPF 50+ Moisturizer'].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-medium shrink-0"
                        style={{ background: 'rgba(201,169,110,0.1)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.2)' }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-xs" style={{ color: 'rgba(245,239,230,0.45)' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 rounded-full px-4 py-2"
              style={{
                background: 'rgba(15,14,12,0.95)',
                border: '1px solid rgba(201,169,110,0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: '#C9A96E' }}>
                Personalized
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}