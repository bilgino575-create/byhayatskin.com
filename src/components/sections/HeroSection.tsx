'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

// Three.js scene — client only
const HeroScene3D = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

// ── Split text character animation ──
function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.028,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ── Magnetic cursor follower ──
function MagneticCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{ background: 'rgba(201,169,110,0.9)' }}
      />
    </motion.div>
  )
}

// ── Horizontal marquee strip ──
function MarqueeStrip() {
  const items = ['LUXURY SKINCARE', 'DUBAI', 'PERSONALIZED', 'PREMIUM', 'BY HAYAT SKIN', 'UAE', 'EXPERT CARE', 'BESPOKE']
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-3 border-y border-[rgba(201,169,110,0.15)]">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className="text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ color: 'rgba(160,120,64,0.5)' }}
            >
              {item}
            </span>
            <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: '6px' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5])

  useEffect(() => { setMounted(true) }, [])

  const lines = dict.hero.headline.split('\n')

  return (
    <>
      {mounted && <MagneticCursor />}

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100svh', minHeight: '700px' }}
      >
        {/* ══ LAYER 0: Deep background ══ */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #0D0B09 0%, #1A1410 35%, #0F0C09 100%)',
          }}
        />

        {/* ══ LAYER 1: 3D Scene — full screen ══ */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: sceneScale }}
        >
          <HeroScene3D />
        </motion.div>

        {/* ══ LAYER 2: Cinematic gradient overlays ══ */}
        {/* Bottom vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.4) 30%, transparent 60%)',
          }}
        />
        {/* Left vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(13,11,9,0.7) 0%, rgba(13,11,9,0.2) 40%, transparent 70%)',
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(13,11,9,0.6) 0%, transparent 25%)',
          }}
        />
        {/* Scroll-driven darkening */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-[#0D0B09]"
          style={{ opacity: overlayOpacity }}
        />

        {/* ══ LAYER 3: Ambient light streaks ══ */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '15%',
            right: '20%',
            width: '1px',
            height: '180px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.25), transparent)',
            transform: 'rotate(15deg)',
            filter: 'blur(0.5px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: '25%',
            right: '35%',
            width: '1px',
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, rgba(183,110,121,0.15), transparent)',
            transform: 'rotate(-8deg)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* ══ LAYER 4: Content ══ */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pointer-events-none"
          style={{ y: textY }}
        >
          {/* Marquee strip */}
          <div className="pointer-events-auto mb-10 lg:mb-14">
            <MarqueeStrip />
          </div>

          {/* Main content block */}
          <div className="container-luxury pb-16 lg:pb-20 pointer-events-auto">
            <div className="max-w-5xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div style={{ width: '32px', height: '1px', background: 'rgba(201,169,110,0.7)' }} />
                <span
                  className="text-[0.62rem] tracking-[0.35em] uppercase"
                  style={{ color: 'rgba(201,169,110,0.8)' }}
                >
                  {dict.hero.tagline}
                </span>
              </motion.div>

              {/* Headline — split text */}
              <h1 className="mb-8 overflow-hidden">
                {lines.map((line, i) => (
                  <div key={i} className="overflow-hidden leading-[1.05]">
                    <div
                      className="text-[clamp(3rem,7vw,6.5rem)] font-light tracking-[-0.02em]"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        color: i === 1 ? 'transparent' : '#F5EDD8',
                        WebkitTextStroke: i === 1 ? '1px rgba(201,169,110,0.8)' : 'none',
                        backgroundImage: i === 1
                          ? 'linear-gradient(90deg, #C9A96E 0%, #E8D5B0 40%, #C9A96E 70%, #A07840 100%)'
                          : 'none',
                        WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                        backgroundClip: i === 1 ? 'text' : 'unset',
                      }}
                    >
                      <SplitText text={line} delay={0.3 + i * 0.15} />
                    </div>
                  </div>
                ))}
              </h1>

              {/* Subheadline + CTAs row */}
              <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16">

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: 'rgba(200,185,165,0.7)' }}
                >
                  {dict.hero.subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.05 }}
                  className="flex flex-col sm:flex-row gap-3 lg:ml-auto"
                >
                  <Link
                    href={`/${lang}/products`}
                    className="group relative overflow-hidden px-8 py-3.5 text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #C9A96E 0%, #A07840 100%)',
                      color: '#0D0B09',
                    }}
                  >
                    <span className="relative z-10">{dict.hero.cta_primary}</span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, #E8D5B0 0%, #C9A96E 100%)' }}
                    />
                  </Link>

                  <Link
                    href={`/${lang}/consultation`}
                    className="group px-8 py-3.5 text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-all duration-500"
                    style={{
                      border: '1px solid rgba(201,169,110,0.35)',
                      color: 'rgba(201,169,110,0.85)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.8)'
                      ;(e.currentTarget as HTMLElement).style.color = '#C9A96E'
                      ;(e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.06)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.35)'
                      ;(e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.85)'
                      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                    }}
                  >
                    {dict.hero.cta_secondary}
                  </Link>
                </motion.div>
              </div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="flex items-center gap-10 mt-12 pt-8"
                style={{ borderTop: '1px solid rgba(201,169,110,0.12)' }}
              >
                {[
                  { value: dict.brand_story.stat_1_value, label: dict.brand_story.stat_1_label },
                  { value: dict.brand_story.stat_2_value, label: dict.brand_story.stat_2_label },
                  { value: dict.brand_story.stat_3_value, label: dict.brand_story.stat_3_label },
                ].map((stat, i) => (
                  <div key={i}>
                    <div
                      className="text-2xl lg:text-3xl font-light mb-0.5"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[0.58rem] tracking-[0.18em] uppercase"
                      style={{ color: 'rgba(200,185,165,0.5)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}

                {/* Scroll hint — right aligned */}
                <div className="ml-auto flex flex-col items-center gap-2" style={{ color: 'rgba(201,169,110,0.4)' }}>
                  <span className="text-[0.55rem] tracking-[0.25em] uppercase">{dict.hero.scroll}</span>
                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowDown size={12} />
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* ══ LAYER 5: Top-right corner detail ══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute top-24 right-8 lg:right-16 flex flex-col items-end gap-1 pointer-events-none"
        >
          <span
            className="text-[0.55rem] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(201,169,110,0.3)' }}
          >
            Est. Dubai
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.2)' }} />
        </motion.div>

      </section>
    </>
  )
}