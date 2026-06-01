'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

// Three.js scene — client only, non-blocking
const HeroScene3D = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full"
      style={{
        background: 'radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.08) 0%, transparent 65%)',
      }}
    />
  ),
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
            duration: 0.5,
            delay: delay + i * 0.016,
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
      className="fixed top-0 left-0 w-7 h-7 pointer-events-none z-[9999] mix-blend-multiply"
      style={{ x: springX, y: springY }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{ background: 'rgba(160,120,64,0.35)' }}
      />
    </motion.div>
  )
}

// ── Horizontal marquee strip ──
function MarqueeStrip() {
  const items = ['LUXURY SKINCARE', 'DUBAI', 'PERSONALIZED', 'PREMIUM', 'BY HAYAT SKIN', 'UAE', 'EXPERT CARE', 'BESPOKE']
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-3"
      style={{ borderTop: '1px solid rgba(160,120,64,0.15)', borderBottom: '1px solid rgba(160,120,64,0.15)' }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span
              className="text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ color: 'rgba(160,120,64,0.45)' }}
            >
              {item}
            </span>
            <span style={{ color: 'rgba(160,120,64,0.25)', fontSize: '6px' }}>✦</span>
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

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  useEffect(() => { setMounted(true) }, [])

  const lines = dict.hero.headline.split('\n')

  return (
    <>
      {mounted && <MagneticCursor />}

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100svh', minHeight: '600px', background: '#FDFAF5' }}
      >
        {/* ── Background: warm ivory gradient ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #FDFAF5 0%, #FAF5EC 40%, #F5EDE0 100%)',
          }}
        />

        {/* ── Subtle noise texture ── */}
        <div className="absolute inset-0 noise-overlay opacity-20" />

        {/* ── Soft champagne radial glow — right side ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '10%',
            right: '-5%',
            width: '60%',
            height: '80%',
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, rgba(232,213,176,0.06) 45%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />

        {/* ── 3D Scene ──
            Masaüstü: full screen arkada
            Mobil: üst yarıda, içerik altta
        ── */}
        <motion.div
          className="absolute inset-0 md:inset-0"
          style={{ scale: sceneScale }}
        >
          {/* Mobilde 3D sahneyi üst %55'e sınırla */}
          <div className="w-full h-full md:h-full" style={{ height: '100%' }}>
            <HeroScene3D />
          </div>
        </motion.div>

        {/* ── Vignette: masaüstünde soldan, mobilde alttan ── */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(to right, rgba(253,250,245,0.96) 0%, rgba(253,250,245,0.85) 35%, rgba(253,250,245,0.3) 60%, transparent 80%)',
          }}
        />
        {/* Mobil vignette: alttan yukarı doğru içeriği arka plandan ayırır */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background: 'linear-gradient(to top, rgba(253,250,245,1) 0%, rgba(253,250,245,0.98) 40%, rgba(253,250,245,0.5) 65%, transparent 100%)',
          }}
        />

        {/* ── Ambient light streaks — sadece masaüstü ── */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            top: '20%',
            right: '25%',
            width: '1px',
            height: '140px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2), transparent)',
            transform: 'rotate(12deg)',
            filter: 'blur(0.5px)',
          }}
        />

        {/* ── Content ── */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pointer-events-none"
          style={{ y: textY }}
        >
          {/* Marquee strip */}
          <div className="pointer-events-auto mb-6 md:mb-10 lg:mb-14">
            <MarqueeStrip />
          </div>

          {/* Main content block */}
          <div className="container-luxury pb-8 md:pb-16 lg:pb-20 pointer-events-auto">
            <div className="max-w-2xl">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                className="flex items-center gap-4 mb-4 md:mb-6"
              >
                <div style={{ width: '32px', height: '1px', background: 'rgba(160,120,64,0.6)' }} />
                <span
                  className="text-[0.62rem] tracking-[0.35em] uppercase"
                  style={{ color: 'rgba(160,120,64,0.8)' }}
                >
                  {dict.hero.tagline}
                </span>
              </motion.div>

              {/* Headline — split text */}
              <h1 className="mb-5 md:mb-8 overflow-hidden">
                {lines.map((line, i) => (
                  <div key={i} className="overflow-hidden leading-[1.05]">
                    <div
                      className="text-[clamp(2.2rem,7vw,6rem)] font-light tracking-[-0.02em]"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        color: i === 1 ? 'transparent' : '#1A1A1A',
                        WebkitTextStroke: i === 1 ? '1px rgba(160,120,64,0.7)' : 'none',
                        backgroundImage: i === 1
                          ? 'linear-gradient(90deg, #A07840 0%, #C9A96E 40%, #A07840 70%, #8B6914 100%)'
                          : 'none',
                        WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                        backgroundClip: i === 1 ? 'text' : 'unset',
                      }}
                    >
                      <SplitText text={line} delay={0.05 + i * 0.08} />
                    </div>
                  </div>
                ))}
              </h1>

              {/* Subheadline + CTAs row */}
              <div className="flex flex-col lg:flex-row lg:items-end gap-4 md:gap-8 lg:gap-16">

                {/* Subheadline — mobilde kısa tut */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-sm leading-relaxed max-w-sm hidden sm:block"
                  style={{ color: 'rgba(100,85,70,0.7)' }}
                >
                  {dict.hero.subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-row gap-2 md:gap-3 lg:ml-auto w-full sm:w-auto"
                >
                  <Link
                    href={`/${lang}/products`}
                    className="group relative overflow-hidden flex-1 sm:flex-none text-center px-5 md:px-8 py-3 md:py-3.5 text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #A07840 0%, #C9A96E 100%)',
                      color: '#FDFAF5',
                    }}
                  >
                    <span className="relative z-10">{dict.hero.cta_primary}</span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 100%)' }}
                    />
                  </Link>

                  <Link
                    href={`/${lang}/consultation`}
                    className="group flex-1 sm:flex-none text-center px-5 md:px-8 py-3 md:py-3.5 text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium transition-all duration-500"
                    style={{
                      border: '1px solid rgba(160,120,64,0.4)',
                      color: 'rgba(160,120,64,0.9)',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(160,120,64,0.8)'
                      ;(e.currentTarget as HTMLElement).style.background = 'rgba(160,120,64,0.06)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(160,120,64,0.4)'
                      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                    }}
                  >
                    {dict.hero.cta_secondary}
                  </Link>
                </motion.div>
              </div>

              {/* Stats row — mobilde sadece 2 stat göster, scroll hint gizle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 md:gap-10 mt-6 md:mt-12 pt-5 md:pt-8"
                style={{ borderTop: '1px solid rgba(160,120,64,0.15)' }}
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
                    <div
                      className="text-[0.55rem] md:text-[0.58rem] tracking-[0.15em] md:tracking-[0.18em] uppercase"
                      style={{ color: 'rgba(100,85,70,0.5)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}

                {/* Scroll hint — sadece masaüstü */}
                <div className="ml-auto hidden md:flex flex-col items-center gap-2" style={{ color: 'rgba(160,120,64,0.5)' }}>
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

        {/* ── Top-right corner detail — sadece masaüstü ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-24 right-8 lg:right-16 hidden md:flex flex-col items-end gap-1 pointer-events-none"
        >
          <span
            className="text-[0.55rem] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(160,120,64,0.3)' }}
          >
            Est. Dubai
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(160,120,64,0.2)' }} />
        </motion.div>

      </section>
    </>
  )
}