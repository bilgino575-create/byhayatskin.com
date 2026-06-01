'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface ConsultationSectionProps {
  dict: DictionaryType
  lang: Locale
}

const steps = [
  { key: 'skin_type', icon: '◉', color: '#C9A96E' },
  { key: 'concerns', icon: '◈', color: '#B76E79' },
  { key: 'lifestyle', icon: '◎', color: '#7BA7BC' },
  { key: 'climate', icon: '☀', color: '#A8C5A0' },
  { key: 'goals', icon: '✦', color: '#9B8EA8' },
] as const

const outputs = [
  { key: 'am', icon: '🌅' },
  { key: 'pm', icon: '🌙' },
  { key: 'products', icon: '✦' },
  { key: 'plan', icon: '◈' },
] as const

export function ConsultationSection({ dict, lang }: ConsultationSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-[var(--color-pearl)] relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, var(--color-champagne) 0%, transparent 70%)' }}
      />

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[var(--color-champagne)]" />
              <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
                {dict.consultation.label}
              </span>
            </div>

            <h2 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)] mb-4">
              {dict.consultation.headline}
            </h2>

            <div className="divider-gold !mx-0 mb-6" />

            <p className="text-[var(--color-warm-gray)] leading-relaxed mb-10 max-w-md">
              {dict.consultation.subheadline}
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0"
                    style={{ background: step.color + '15', color: step.color }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-warm-gray)]/60 w-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-[var(--color-matte-black)]">
                      {dict.consultation.steps[step.key]}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-4 h-px bg-[var(--color-soft-gray)]" />
                  )}
                </motion.div>
              ))}
            </div>

            <Link
              href={`/${lang}/consultation`}
              className="btn-luxury btn-primary inline-flex items-center gap-2 group"
            >
              {dict.consultation.cta}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Right — Output Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Main card */}
            <div className="glass rounded-sm p-8 border border-[var(--color-champagne)]/20 shadow-[var(--shadow-luxury)]">
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-champagne-dark)] mb-6 font-medium">
                {dict.skin_diagnosis.routine_label}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {outputs.map((output, i) => (
                  <motion.div
                    key={output.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-sm bg-[var(--color-ivory)] border border-[var(--color-soft-gray)]"
                  >
                    <div className="text-xl mb-2">{output.icon}</div>
                    <div className="text-sm font-medium text-[var(--color-matte-black)]">
                      {dict.consultation.features[output.key]}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Sample routine preview */}
              <div className="mt-6 pt-6 border-t border-[var(--color-soft-gray)]">
                <div className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--color-warm-gray)] mb-3">
                  Sample AM Routine
                </div>
                <div className="space-y-2">
                  {['Gentle Cleanser', 'Vitamin C Serum', 'SPF 50+ Moisturizer'].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-champagne)]/15 flex items-center justify-center text-[0.6rem] text-[var(--color-champagne-dark)] font-medium">
                        {i + 1}
                      </div>
                      <span className="text-xs text-[var(--color-warm-gray)]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-dark rounded-full px-4 py-2 border border-[var(--color-champagne)]/30"
            >
              <span className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-champagne)]">
                Personalized
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}