'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface SkinDiagnosisSectionProps {
  dict: DictionaryType
  lang: Locale
}

type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'acne'

const skinTypeData: Record<SkinType, {
  icon: string
  color: string
  amRoutine: string[]
  pmRoutine: string[]
  products: string[]
}> = {
  dry: {
    icon: '💧',
    color: '#7BA7BC',
    amRoutine: ['Gentle Hydrating Cleanser', 'Hyaluronic Acid Serum', 'Rich Moisturizer', 'SPF 50+'],
    pmRoutine: ['Oil Cleanser', 'Nourishing Serum', 'Barrier Repair Cream', 'Facial Oil'],
    products: ['Hydra-Boost Serum', 'Barrier Repair Moisturizer', 'Gentle Milk Cleanser'],
  },
  oily: {
    icon: '✨',
    color: '#C9A96E',
    amRoutine: ['Foaming Cleanser', 'Niacinamide Serum', 'Oil-Free Moisturizer', 'SPF 50+'],
    pmRoutine: ['Double Cleanse', 'BHA Exfoliant (2x/week)', 'Lightweight Gel Moisturizer'],
    products: ['Pore-Refining Serum', 'Oil-Control Moisturizer', 'Clarifying Cleanser'],
  },
  combination: {
    icon: '⚖️',
    color: '#A8C5A0',
    amRoutine: ['Balancing Cleanser', 'Vitamin C Serum', 'Zone-Specific Moisturizer', 'SPF 50+'],
    pmRoutine: ['Micellar Water + Cleanser', 'Retinol Serum (3x/week)', 'Balancing Night Cream'],
    products: ['Balance Serum', 'Dual-Zone Moisturizer', 'Gentle Exfoliating Toner'],
  },
  sensitive: {
    icon: '🌸',
    color: '#E8B4B8',
    amRoutine: ['Fragrance-Free Cleanser', 'Centella Serum', 'Calming Moisturizer', 'Mineral SPF 50+'],
    pmRoutine: ['Micellar Cleansing Water', 'Barrier Serum', 'Soothing Night Cream'],
    products: ['Calm & Repair Serum', 'Sensitive Skin Moisturizer', 'Gentle Cleansing Milk'],
  },
  acne: {
    icon: '🎯',
    color: '#9B8EA8',
    amRoutine: ['Salicylic Acid Cleanser', 'Niacinamide + Zinc Serum', 'Non-Comedogenic Moisturizer', 'SPF 50+'],
    pmRoutine: ['Double Cleanse', 'Retinol Serum (3x/week)', 'Spot Treatment', 'Light Gel Moisturizer'],
    products: ['Acne-Clear Serum', 'Blemish Control Moisturizer', 'Purifying Cleanser'],
  },
}

export function SkinDiagnosisSection({ dict, lang }: SkinDiagnosisSectionProps) {
  const [selected, setSelected] = useState<SkinType | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const skinTypes: { key: SkinType; name: string; description: string }[] = [
    { key: 'dry', name: dict.skin_diagnosis.types.dry.name, description: dict.skin_diagnosis.types.dry.description },
    { key: 'oily', name: dict.skin_diagnosis.types.oily.name, description: dict.skin_diagnosis.types.oily.description },
    { key: 'combination', name: dict.skin_diagnosis.types.combination.name, description: dict.skin_diagnosis.types.combination.description },
    { key: 'sensitive', name: dict.skin_diagnosis.types.sensitive.name, description: dict.skin_diagnosis.types.sensitive.description },
    { key: 'acne', name: dict.skin_diagnosis.types.acne.name, description: dict.skin_diagnosis.types.acne.description },
  ]

  const selectedData = selected ? skinTypeData[selected] : null

  return (
    <section ref={ref} className="section-padding bg-[var(--color-ivory)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, var(--color-champagne) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
              {dict.skin_diagnosis.label}
            </span>
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
          </div>
          <h2 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)] mb-4">
            {dict.skin_diagnosis.headline}
          </h2>
          <p className="text-[var(--color-warm-gray)] max-w-xl mx-auto">
            {dict.skin_diagnosis.subheadline}
          </p>
        </motion.div>

        {/* Skin Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {skinTypes.map((type, i) => {
            const data = skinTypeData[type.key]
            const isSelected = selected === type.key
            return (
              <motion.button
                key={type.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => setSelected(isSelected ? null : type.key)}
                className={`relative p-5 rounded-sm text-left transition-all duration-400 border ${
                  isSelected
                    ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/5 shadow-[var(--shadow-luxury)]'
                    : 'border-[var(--color-soft-gray)] bg-[var(--color-pearl)] hover:border-[var(--color-champagne-light)] hover:shadow-[var(--shadow-card)]'
                }`}
              >
                {/* Color accent */}
                <div
                  className="w-8 h-1 rounded-full mb-3 transition-all duration-300"
                  style={{ background: isSelected ? data.color : 'var(--color-soft-gray)' }}
                />
                <div className="text-2xl mb-2">{data.icon}</div>
                <div className="text-sm font-medium text-[var(--color-matte-black)] mb-1">
                  {type.name}
                </div>
                <div className="text-[0.7rem] text-[var(--color-warm-gray)] leading-snug">
                  {type.description}
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute inset-0 rounded-sm border-2 border-[var(--color-champagne)] pointer-events-none"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Results Panel */}
        <AnimatePresence mode="wait">
          {selected && selectedData && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-sm p-8 md:p-10 border border-[var(--color-champagne)]/20"
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: selectedData.color }}
                />
                <h3 className="heading-luxury text-2xl text-[var(--color-matte-black)]">
                  {dict.skin_diagnosis.routine_label}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* AM Routine */}
                <div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-champagne-dark)] mb-4 font-medium">
                    {dict.consultation.features.am}
                  </div>
                  <ol className="space-y-2">
                    {selectedData.amRoutine.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-warm-gray)]">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-medium shrink-0 mt-0.5"
                          style={{ background: selectedData.color + '20', color: selectedData.color }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* PM Routine */}
                <div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-champagne-dark)] mb-4 font-medium">
                    {dict.consultation.features.pm}
                  </div>
                  <ol className="space-y-2">
                    {selectedData.pmRoutine.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-warm-gray)]">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-medium shrink-0 mt-0.5"
                          style={{ background: selectedData.color + '20', color: selectedData.color }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Recommended Products */}
                <div>
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-champagne-dark)] mb-4 font-medium">
                    {dict.consultation.features.products}
                  </div>
                  <ul className="space-y-3">
                    {selectedData.products.map((product, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: selectedData.color }}
                        />
                        <span className="text-sm text-[var(--color-matte-black)]">{product}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${lang}/consultation`}
                    className="btn-luxury btn-primary mt-6 text-[0.7rem] px-5 py-2.5 inline-flex"
                  >
                    {dict.skin_diagnosis.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}