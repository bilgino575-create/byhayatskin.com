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
  glowColor: string
  amRoutine: string[]
  pmRoutine: string[]
  products: string[]
}> = {
  dry: {
    glowColor: 'rgba(122,167,188,0.4)',
    amRoutine: ['Gentle Hydrating Cleanser', 'Hyaluronic Acid Serum', 'Rich Moisturizer', 'SPF 50+'],
    pmRoutine: ['Oil Cleanser', 'Nourishing Serum', 'Barrier Repair Cream', 'Facial Oil'],
    products: ['Hydra-Boost Serum', 'Barrier Repair Moisturizer', 'Gentle Milk Cleanser'],
  },
  oily: {
    glowColor: 'rgba(201,169,110,0.4)',
    amRoutine: ['Foaming Cleanser', 'Niacinamide Serum', 'Oil-Free Moisturizer', 'SPF 50+'],
    pmRoutine: ['Double Cleanse', 'BHA Exfoliant (2x/week)', 'Lightweight Gel Moisturizer'],
    products: ['Pore-Refining Serum', 'Oil-Control Moisturizer', 'Clarifying Cleanser'],
  },
  combination: {
    glowColor: 'rgba(107,175,138,0.4)',
    amRoutine: ['Balancing Cleanser', 'Vitamin C Serum', 'Zone-Specific Moisturizer', 'SPF 50+'],
    pmRoutine: ['Micellar Water + Cleanser', 'Retinol Serum (3x/week)', 'Balancing Night Cream'],
    products: ['Balance Serum', 'Dual-Zone Moisturizer', 'Gentle Exfoliating Toner'],
  },
  sensitive: {
    glowColor: 'rgba(212,132,154,0.4)',
    amRoutine: ['Fragrance-Free Cleanser', 'Centella Serum', 'Calming Moisturizer', 'Mineral SPF 50+'],
    pmRoutine: ['Micellar Cleansing Water', 'Barrier Serum', 'Soothing Night Cream'],
    products: ['Calm & Repair Serum', 'Sensitive Skin Moisturizer', 'Gentle Cleansing Milk'],
  },
  acne: {
    glowColor: 'rgba(139,107,175,0.4)',
    amRoutine: ['Salicylic Acid Cleanser', 'Niacinamide + Zinc Serum', 'Non-Comedogenic Moisturizer', 'SPF 50+'],
    pmRoutine: ['Double Cleanse', 'Retinol Serum (3x/week)', 'Spot Treatment', 'Light Gel Moisturizer'],
    products: ['Acne-Clear Serum', 'Blemish Control Moisturizer', 'Purifying Cleanser'],
  },
}

// ── Premium Animated SVG Icons ──
function DryIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="dry-g" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#A8D8F0" />
          <stop offset="100%" stopColor="#4A90D9" />
        </radialGradient>
      </defs>
      <motion.path
        d="M24 6C24 6 12 20 12 28C12 34.627 17.373 40 24 40C30.627 40 36 34.627 36 28C36 20 24 6 24 6Z"
        fill="url(#dry-g)"
        animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '24px 24px' }}
      />
      <ellipse cx="20" cy="22" rx="3" ry="5" fill="rgba(255,255,255,0.4)" transform="rotate(-20 20 22)" />
      {active && [0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx="24" cy="38" r="4"
          stroke="#7BA7BC" strokeWidth="0.8" fill="none"
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{ scale: 2.5 + i * 0.8, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: '24px 38px' }}
        />
      ))}
    </svg>
  )
}

function OilyIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="oily-g" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F0D898" />
          <stop offset="100%" stopColor="#A07840" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="24" cy="24" r="12"
        fill="url(#oily-g)"
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '24px 24px' }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={i}
          x1={24 + Math.cos((angle * Math.PI) / 180) * 14}
          y1={24 + Math.sin((angle * Math.PI) / 180) * 14}
          x2={24 + Math.cos((angle * Math.PI) / 180) * 19}
          y2={24 + Math.sin((angle * Math.PI) / 180) * 19}
          stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"
          animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      <circle cx="20" cy="20" r="2.5" fill="rgba(255,255,255,0.5)" />
    </svg>
  )
}

function CombinationIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="combo-l" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A90D9" />
          <stop offset="100%" stopColor="#7BA7BC" />
        </linearGradient>
        <linearGradient id="combo-r" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#A07840" />
        </linearGradient>
      </defs>
      <motion.path
        d="M24 8A16 16 0 0 0 24 40Z"
        fill="url(#combo-l)"
        animate={active ? { x: [-1, 0, -1] } : { x: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M24 8A16 16 0 0 1 24 40Z"
        fill="url(#combo-r)"
        animate={active ? { x: [1, 0, 1] } : { x: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="24" y1="8" x2="24" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <motion.circle
        cx="24" cy="24" r="3" fill="white"
        animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transformOrigin: '24px 24px' }}
      />
    </svg>
  )
}

function SensitiveIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="sens-g" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F0B8C0" />
          <stop offset="100%" stopColor="#C47080" />
        </radialGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.ellipse
          key={i}
          cx={24 + Math.cos((angle * Math.PI) / 180) * 9}
          cy={24 + Math.sin((angle * Math.PI) / 180) * 9}
          rx="5" ry="8"
          fill="url(#sens-g)"
          transform={`rotate(${angle} ${24 + Math.cos((angle * Math.PI) / 180) * 9} ${24 + Math.sin((angle * Math.PI) / 180) * 9})`}
          animate={active ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          style={{ transformOrigin: `${24 + Math.cos((angle * Math.PI) / 180) * 9}px ${24 + Math.sin((angle * Math.PI) / 180) * 9}px` }}
        />
      ))}
      <circle cx="24" cy="24" r="6" fill="#E8B4B8" />
      <circle cx="24" cy="24" r="3" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

function AcneIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="acne-g" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#B09AC8" />
          <stop offset="100%" stopColor="#6B4A8F" />
        </radialGradient>
      </defs>
      <motion.path
        d="M24 6L38 12L38 26C38 34 24 42 24 42C24 42 10 34 10 26L10 12Z"
        fill="url(#acne-g)"
        animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '24px 24px' }}
      />
      <motion.path
        d="M17 24L22 29L31 19"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
        transition={{ duration: 0.8, repeat: active ? Infinity : 0, repeatDelay: 2 }}
      />
    </svg>
  )
}

const skinIcons: Record<SkinType, React.ComponentType<{ active: boolean }>> = {
  dry: DryIcon,
  oily: OilyIcon,
  combination: CombinationIcon,
  sensitive: SensitiveIcon,
  acne: AcneIcon,
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
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F0E0C 0%, #141210 50%, #0F0E0C 100%)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, #0F0E0C, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, #0F0E0C, transparent)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[var(--color-champagne)] font-medium">
              {dict.skin_diagnosis.label}
            </span>
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-5"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              color: '#F5EFE6',
              lineHeight: 1.1,
            }}
          >
            {dict.skin_diagnosis.headline}
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(245,239,230,0.5)' }}>
            {dict.skin_diagnosis.subheadline}
          </p>
        </motion.div>

        {/* Skin Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-10">
          {skinTypes.map((type, i) => {
            const data = skinTypeData[type.key]
            const isSelected = selected === type.key
            const IconComponent = skinIcons[type.key]

            return (
              <motion.button
                key={type.key}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelected(isSelected ? null : type.key)}
                className="relative group text-left rounded-sm overflow-hidden cursor-pointer"
                style={{
                  background: isSelected ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? `1px solid ${data.glowColor}` : '1px solid rgba(201,169,110,0.12)',
                  boxShadow: isSelected
                    ? `0 0 30px ${data.glowColor}, 0 8px 32px rgba(0,0,0,0.4)`
                    : '0 4px 16px rgba(0,0,0,0.2)',
                  transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                  padding: '1.25rem',
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${data.glowColor} 0%, transparent 70%)` }}
                />

                {/* 3D Icon */}
                <div
                  className="relative w-12 h-12 mb-4 mx-auto"
                  style={{
                    filter: isSelected ? `drop-shadow(0 0 12px ${data.glowColor})` : 'none',
                    transition: 'filter 0.4s',
                  }}
                >
                  <IconComponent active={isSelected} />
                </div>

                {/* Name */}
                <div
                  className="text-center mb-1.5"
                  style={{
                    color: isSelected ? '#F5EFE6' : 'rgba(245,239,230,0.7)',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                  }}
                >
                  {type.name}
                </div>

                {/* Description */}
                <div
                  className="text-[0.68rem] leading-snug text-center"
                  style={{ color: 'rgba(245,239,230,0.35)' }}
                >
                  {type.description}
                </div>

                {/* Selected bottom bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${data.glowColor}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            )
          })}
        </div>

        {/* Results Panel */}
        <AnimatePresence mode="wait">
          {selected && selectedData && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-sm overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${selectedData.glowColor}`,
                boxShadow: `0 0 60px ${selectedData.glowColor.replace('0.4', '0.1')}, 0 16px 48px rgba(0,0,0,0.4)`,
              }}
            >
              {/* Panel header */}
              <div
                className="px-6 md:px-10 py-5 flex items-center gap-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: selectedData.glowColor, boxShadow: `0 0 10px ${selectedData.glowColor}` }}
                />
                <h3
                  className="text-xl md:text-2xl font-light"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: '#F5EFE6' }}
                >
                  {dict.skin_diagnosis.routine_label}
                </h3>
                <div className="ml-auto">
                  <span
                    className="text-[0.6rem] tracking-[0.25em] uppercase px-3 py-1 rounded-full"
                    style={{
                      background: selectedData.glowColor.replace('0.4', '0.15'),
                      color: '#C9A96E',
                      border: `1px solid ${selectedData.glowColor.replace('0.4', '0.3')}`,
                    }}
                  >
                    Personalized
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {/* AM Routine */}
                <div className="px-6 md:px-8 py-7">
                  <div
                    className="text-[0.62rem] tracking-[0.25em] uppercase mb-5 font-medium flex items-center gap-2"
                    style={{ color: '#C9A96E' }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem]"
                      style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}
                    >
                      ☀
                    </span>
                    {dict.consultation.features.am}
                  </div>
                  <ol className="space-y-3">
                    {selectedData.amRoutine.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'rgba(245,239,230,0.65)' }}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[0.58rem] font-medium shrink-0 mt-0.5"
                          style={{
                            background: selectedData.glowColor.replace('0.4', '0.2'),
                            color: '#C9A96E',
                            border: `1px solid ${selectedData.glowColor.replace('0.4', '0.3')}`,
                          }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* PM Routine */}
                <div className="px-6 md:px-8 py-7">
                  <div
                    className="text-[0.62rem] tracking-[0.25em] uppercase mb-5 font-medium flex items-center gap-2"
                    style={{ color: '#C9A96E' }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem]"
                      style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}
                    >
                      ☽
                    </span>
                    {dict.consultation.features.pm}
                  </div>
                  <ol className="space-y-3">
                    {selectedData.pmRoutine.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 + 0.1 }}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'rgba(245,239,230,0.65)' }}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[0.58rem] font-medium shrink-0 mt-0.5"
                          style={{
                            background: selectedData.glowColor.replace('0.4', '0.2'),
                            color: '#C9A96E',
                            border: `1px solid ${selectedData.glowColor.replace('0.4', '0.3')}`,
                          }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Recommended Products */}
                <div className="px-6 md:px-8 py-7">
                  <div
                    className="text-[0.62rem] tracking-[0.25em] uppercase mb-5 font-medium flex items-center gap-2"
                    style={{ color: '#C9A96E' }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem]"
                      style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)' }}
                    >
                      ✦
                    </span>
                    {dict.consultation.features.products}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {selectedData.products.map((product, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 + 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: selectedData.glowColor }}
                        />
                        <span className="text-sm" style={{ color: '#F5EFE6' }}>{product}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link
                    href={`/${lang}/consultation`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.68rem] tracking-[0.15em] uppercase font-medium transition-all duration-400"
                    style={{
                      background: 'linear-gradient(135deg, #A07840, #C9A96E)',
                      color: '#FDFAF5',
                    }}
                  >
                    {dict.skin_diagnosis.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA when nothing selected */}
        {!selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-4"
          >
            <p className="text-[0.72rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>
              Select your skin type above to see your personalized routine
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}