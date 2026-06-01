'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

const HeroScene3D = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full"
      style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)' }}
    />
  ),
})

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

// ── Magnetic cursor (desktop only) ──
function MagneticCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 60, damping: 18 })
  const sy = useSpring(y, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 12); y.set(e.clientY - 12) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div className="w-full h-full rounded-full" style={{ background: 'rgba(201,169,110,0.2)', border: '1px solid rgba(201,169,110,0.4)' }} />
    </motion.div>
  )
}

// ── Marquee strip ──
function MarqueeStrip() {
  const items = ['LUXURY SKINCARE', 'DUBAI', 'PERSONALIZED', 'PREMIUM', 'BY HAYAT SKIN', 'UAE', 'EXPERT CARE', 'BESPOKE']
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden py-3"
      style={{ borderTop: '1px solid rgba(201,169,110,0.08)', borderBottom: '1px solid rgba(201,169,110,0.08)' }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-[0.58rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.25)' }}>
              {item}
            </span>
            <span style={{ color: 'rgba(201,169,110,0.15)', fontSize: '5px' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  useEffect(() => { setMounted(true) }, [])

  const lines = dict.hero.headline.split('\n')

  return (
    <>
      {mounted && <MagneticCursor />}

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100svh', minHeight: '640px', background: '#0F0E0C' }}
      >
        {/* ── Ambient background glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Center glow — where 3D model sits */}
          <div
            className="absolute"
            style={{
              top: '5%', left: '50%', transform: 'translateX(-50%)',
              width: '80%', height: '90%',
              background: 'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.07) 0%, rgba(160,120,64,0.03) 40%, transparent 70%)',
              filter: 'blur(1px)',
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: 'linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)',
              backgroundSize: '100px 100px',
            }}
          />
          {/* Noise */}
          <div className="absolute inset-0 noise-overlay opacity-30" />
        </div>

        {/* ── 3D Scene — full width, model centered via 3D camera ── */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: sceneScale, opacity: sceneOpacity }}
        >
          <HeroScene3D />
        </motion.div>

        {/* ── Dark overlay on mobile to keep text readable ── */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{ background: 'linear-gradient(to top, #0F0E0C 0%, rgba(15,14,12,0.92) 45%, rgba(15,14,12,0.6) 75%, transparent 100%)' }}
        />
        {/* ── Left fade on desktop ── */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ background: 'linear-gradient(to right, #0F0E0C 0%, rgba(15,14,12,0.97) 30%, rgba(15,14,12,0.7) 50%, rgba(15,14,12,0.1) 70%, transparent 85%)' }}
        />

        {/* ── Content ── */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pointer-events-none"
          style={{ y: textY }}
        >
          {/* Marquee */}
          <div className="pointer-events-auto mb-6 md:mb-10">
            <MarqueeStrip />
          </div>

          {/* Main content */}
          <div className="container-luxury pb-10 md:pb-16 lg:pb-20 pointer-events-auto">
            <div className="max-w-xl lg:max-w-2xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-4 mb-5 md:mb-7"
              >
                <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
                <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.7)' }}>
                  {dict.hero.tagline}
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="mb-6 md:mb-8">
                {lines.map((line, i) => (
                  <div key={i} className="overflow-hidden leading-[1.0]">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span
                        className="block"
                        style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: 'clamp(2.6rem, 6.5vw, 6.5rem)',
                          fontWeight: 300,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.0,
                          color: i === 1 ? 'transparent' : '#F5EFE6',
                          WebkitTextStroke: i === 1 ? '1px rgba(201,169,110,0.6)' : 'none',
                          backgroundImage: i === 1
                            ? 'linear-gradient(90deg, #A07840 0%, #C9A96E 45%, #E8D5B0 70%, #C9A96E 100%)'
                            : 'none',
                          WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                          backgroundClip: i === 1 ? 'text' : 'unset',
                        }}
                      >
                        {line}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-sm leading-relaxed mb-8 md:mb-10 max-w-sm hidden sm:block"
                style={{ color: 'rgba(245,239,230,0.45)' }}
              >
                {dict.hero.subheadline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-row gap-3 mb-8 md:mb-12"
              >
                <Link
                  href={`/${lang}/products`}
                  className="group relative overflow-hidden flex-1 sm:flex-none text-center px-6 md:px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium transition-all duration-500"
                  style={{ background: 'linear-gradient(135deg, #A07840 0%, #C9A96E 100%)', color: '#0F0E0C' }}
                >
                  <span className="relative z-10">{dict.hero.cta_primary}</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 100%)' }}
                  />
                </Link>
                <Link
                  href={`/${lang}/consultation`}
                  className="flex-1 sm:flex-none text-center px-6 md:px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium transition-all duration-500"
                  style={{
                    border: '1px solid rgba(201,169,110,0.25)',
                    color: 'rgba(201,169,110,0.8)',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.6)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.06)'
                    ;(e.currentTarget as HTMLElement).style.color = '#C9A96E'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.25)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.8)'
                  }}
                >
                  {dict.hero.cta_secondary}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="flex items-center gap-8 md:gap-12 pt-6 md:pt-8"
                style={{ borderTop: '1px solid rgba(201,169,110,0.08)' }}
              >
                {[
                  { value: dict.brand_story.stat_1_value, label: dict.brand_story.stat_1_label },
                  { value: dict.brand_story.stat_2_value, label: dict.brand_story.stat_2_label },
                  { value: dict.brand_story.stat_3_value, label: dict.brand_story.stat_3_label },
                ].map((stat, i) => (
                  <div key={i} className={i === 2 ? 'hidden sm:block' : ''}>
                    <div
                      className="text-xl md:text-2xl lg:text-3xl font-light mb-0.5"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        background: 'linear-gradient(90deg, #A07840, #C9A96E)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[0.55rem] tracking-[0.18em] uppercase" style={{ color: 'rgba(201,169,110,0.3)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}

                {/* Scroll hint — desktop only */}
                <div className="ml-auto hidden md:flex flex-col items-center gap-2" style={{ color: 'rgba(201,169,110,0.3)' }}>
                  <span className="text-[0.52rem] tracking-[0.25em] uppercase">{dict.hero.scroll}</span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '10px' }}
                  >
                    ↓
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* ── Top-right corner label — desktop ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute top-24 right-8 lg:right-16 hidden md:flex flex-col items-end gap-1.5 pointer-events-none"
        >
          <span className="text-[0.52rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,169,110,0.2)' }}>
            Est. Dubai
          </span>
          <div style={{ width: '20px', height: '1px', background: 'rgba(201,169,110,0.15)' }} />
        </motion.div>

      </section>
    </>
  )
}