'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface Props {
  dict: DictionaryType
  lang: Locale
}

// ─────────────────────────────────────────────────────────────
// SCENE 1 — CINEMATIC HERO
// Full viewport, dark, single line, breathing animation
// ─────────────────────────────────────────────────────────────
function SceneHero({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000)
    return () => clearInterval(id)
  }, [])

  const words = ['Luxury.', 'Personalized.', 'Dubai.']

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '100svh', minHeight: '700px', background: '#080706' }}
    >
      {/* Animated background — breathing gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse at 70% 60%, rgba(201,169,110,0.08) 0%, transparent 55%)',
            'radial-gradient(ellipse at 50% 30%, rgba(201,169,110,0.05) 0%, transparent 55%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fine noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Thin top line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)', transformOrigin: 'left' }}
      />

      {/* Corner label TL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-8 left-8 lg:top-12 lg:left-12"
        style={{ color: 'rgba(201,169,110,0.3)', fontSize: '0.52rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
      >
        By Hayat Skin
      </motion.div>

      {/* Corner label TR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute top-8 right-8 lg:top-12 lg:right-12"
        style={{ color: 'rgba(201,169,110,0.2)', fontSize: '0.52rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
      >
        Dubai · UAE
      </motion.div>

      {/* Main content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4 mb-10"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '32px' }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ height: '1px', background: 'rgba(201,169,110,0.4)' }}
          />
          <span style={{ color: 'rgba(201,169,110,0.5)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase' }}>
            {dict.hero.tagline}
          </span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '32px' }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ height: '1px', background: 'rgba(201,169,110,0.4)' }}
          />
        </motion.div>

        {/* Giant headline */}
        <div className="text-center px-6 mb-10">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(4rem, 14vw, 14rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  color: '#F5EFE6',
                  display: 'block',
                }}
              >
                Luxury
              </span>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(4rem, 14vw, 14rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(201,169,110,0.35)',
                  display: 'block',
                }}
              >
                Skincare
              </span>
            </motion.div>
          </div>
        </div>

        {/* Rotating word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-6 mb-12"
        >
          <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.2)' }} />
          <div style={{ height: '1.4rem', overflow: 'hidden', minWidth: '100px', textAlign: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={tick % words.length}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(201,169,110,0.6)',
                  letterSpacing: '0.05em',
                }}
              >
                {words[tick % words.length]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.2)' }} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href={`/${lang}/products`}
            className="group relative overflow-hidden px-10 py-4 text-[0.62rem] tracking-[0.25em] uppercase font-medium"
            style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}
          >
            <span className="relative z-10 transition-colors duration-400 group-hover:text-[#0F0E0C]">{dict.hero.cta_primary}</span>
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400" style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)' }} />
          </Link>
          <Link
            href={`/${lang}/consultation`}
            className="px-10 py-4 text-[0.62rem] tracking-[0.25em] uppercase font-medium transition-all duration-400"
            style={{ border: '1px solid rgba(245,239,230,0.1)', color: 'rgba(245,239,230,0.5)' }}
          >
            {dict.hero.cta_secondary}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          {dict.hero.scroll}
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SCENE 2 — STICKY SCROLL CHAPTERS
// 4 chapters reveal as user scrolls through pinned section
// ─────────────────────────────────────────────────────────────
const chapters = [
  {
    num: '01',
    title: 'Born in Dubai',
    sub: 'Our Story',
    body: 'By Hayat Skin was born from a simple truth: the Dubai climate demands a different approach to skincare. Extreme UV, humidity, and air conditioning create unique challenges that generic routines cannot address.',
    accent: '#C9A96E',
  },
  {
    num: '02',
    title: 'Science Meets Luxury',
    sub: 'Our Philosophy',
    body: 'We combine dermatology-inspired formulations with the opulence of a luxury brand. Every ingredient is chosen for efficacy. Every texture is crafted for pleasure. Nothing is accidental.',
    accent: '#7BA7BC',
  },
  {
    num: '03',
    title: 'Your Skin, Your Ritual',
    sub: 'Personalization',
    body: 'No two skins are alike. Our consultation system analyzes your unique skin profile — type, concerns, lifestyle, climate exposure — to create a routine built exclusively for you.',
    accent: '#B76E79',
  },
  {
    num: '04',
    title: 'Transformation',
    sub: 'The Result',
    body: 'Over 500 clients have transformed their skin with By Hayat Skin. Not quick fixes — lasting change. Skin that glows, holds moisture, resists the Dubai sun, and ages beautifully.',
    accent: '#A8C5A0',
  },
]

function SceneChapters() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const activeChapter = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])

  return (
    <div ref={containerRef} style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh', background: '#0F0E0C' }}>
        {/* Background chapter number watermark */}
        {chapters.map((ch, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              top: '50%',
              left: '-5%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(200px, 35vw, 500px)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.06em',
              color: ch.accent,
              opacity: useTransform(
                scrollYProgress,
                [i * 0.25 - 0.05, i * 0.25, i * 0.25 + 0.2, i * 0.25 + 0.25],
                [0, 0.04, 0.04, 0]
              ),
            }}
          >
            {ch.num}
          </motion.div>
        ))}

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(201,169,110,0.06)' }}>
          <motion.div
            className="h-full"
            style={{
              width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
              background: 'linear-gradient(to right, #A07840, #C9A96E)',
            }}
          />
        </div>

        {/* Chapter dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {chapters.map((ch, i) => (
            <motion.div
              key={i}
              style={{
                width: '4px',
                height: useTransform(
                  scrollYProgress,
                  [i * 0.25, i * 0.25 + 0.05, i * 0.25 + 0.2, i * 0.25 + 0.25],
                  ['4px', '20px', '20px', '4px']
                ),
                background: ch.accent,
                opacity: useTransform(
                  scrollYProgress,
                  [i * 0.25 - 0.05, i * 0.25, i * 0.25 + 0.2, i * 0.25 + 0.25],
                  [0.2, 1, 1, 0.2]
                ),
                borderRadius: '2px',
              }}
            />
          ))}
        </div>

        {/* Chapter content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-luxury w-full">
            {chapters.map((ch, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [i * 0.25 - 0.05, i * 0.25, i * 0.25 + 0.2, i * 0.25 + 0.25],
                    [0, 1, 1, 0]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [i * 0.25 - 0.05, i * 0.25, i * 0.25 + 0.2, i * 0.25 + 0.25],
                    ['40px', '0px', '0px', '-40px']
                  ),
                }}
              >
                <div className="container-luxury">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: '0.75rem',
                          color: ch.accent,
                          letterSpacing: '0.3em',
                          opacity: 0.7,
                        }}
                      >
                        {ch.num}
                      </span>
                      <div style={{ width: '40px', height: '1px', background: ch.accent, opacity: 0.4 }} />
                      <span style={{ color: ch.accent, fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.6 }}>
                        {ch.sub}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: 'clamp(3rem, 7vw, 7rem)',
                        fontWeight: 300,
                        letterSpacing: '-0.03em',
                        lineHeight: 0.92,
                        color: '#F5EFE6',
                        marginBottom: '2.5rem',
                      }}
                    >
                      {ch.title}
                    </h2>

                    <div style={{ width: '60px', height: '1px', background: ch.accent, opacity: 0.3, marginBottom: '1.5rem' }} />

                    <p
                      style={{
                        color: 'rgba(245,239,230,0.5)',
                        fontSize: '1rem',
                        lineHeight: 1.85,
                        maxWidth: '480px',
                      }}
                    >
                      {ch.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SCENE 3 — PRODUCT SHOWCASE
// Full-screen, each category as a large editorial block
// ─────────────────────────────────────────────────────────────
const products = [
  { label: 'Serums', desc: 'Concentrated actives for targeted results', href: 'serums', color: '#C9A96E', bg: 'linear-gradient(135deg, #1a1208 0%, #2d1f0a 100%)' },
  { label: 'Moisturizers', desc: 'Deep hydration for Dubai\'s climate', href: 'moisturizers', color: '#7BA7BC', bg: 'linear-gradient(135deg, #0a1520 0%, #0d2035 100%)' },
  { label: 'SPF 50+', desc: 'UAE-grade sun protection', href: 'spf', color: '#E8D5B0', bg: 'linear-gradient(135deg, #1a1510 0%, #2a2010 100%)' },
  { label: 'Anti-Aging', desc: 'Science-backed age-defying formulas', href: 'anti-aging', color: '#B76E79', bg: 'linear-gradient(135deg, #1a0a10 0%, #2d1020 100%)' },
  { label: 'Ritual Kits', desc: 'Curated luxury collections', href: 'kits', color: '#A8C5A0', bg: 'linear-gradient(135deg, #0a1a10 0%, #0f2518 100%)' },
]

function SceneProducts({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hov, setHov] = useState<number | null>(null)

  return (
    <section ref={ref} style={{ background: '#080706', paddingTop: '0', paddingBottom: '0' }}>
      {/* Section header */}
      <div className="container-luxury py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
            <span style={{ color: 'rgba(201,169,110,0.5)', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              The Collection
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#F5EFE6',
            }}
          >
            Curated for<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.35)' }}>Every Skin</span>
          </h2>
        </motion.div>
      </div>

      {/* Full-width product blocks */}
      {products.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <Link
            href={`/${lang}/products/${p.href}`}
            className="group relative flex items-center overflow-hidden"
            style={{
              height: hov === i ? '120px' : '80px',
              background: hov === i ? p.bg : 'transparent',
              borderTop: '1px solid rgba(201,169,110,0.06)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at 20% 50%, ${p.color}15 0%, transparent 60%)`,
                opacity: hov === i ? 1 : 0,
              }}
            />

            <div className="container-luxury w-full flex items-center justify-between">
              <div className="flex items-center gap-8">
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '0.7rem',
                    color: hov === i ? p.color : 'rgba(201,169,110,0.2)',
                    letterSpacing: '0.25em',
                    transition: 'color 0.4s',
                    minWidth: '30px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(1.6rem, 3vw, 3rem)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      color: hov === i ? '#F5EFE6' : 'rgba(245,239,230,0.6)',
                      lineHeight: 1,
                      transition: 'color 0.4s',
                    }}
                  >
                    {p.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: hov === i ? p.color : 'rgba(245,239,230,0.2)',
                      letterSpacing: '0.08em',
                      marginTop: '4px',
                      transition: 'all 0.4s',
                      opacity: hov === i ? 1 : 0,
                      transform: hov === i ? 'translateY(0)' : 'translateY(4px)',
                    }}
                  >
                    {p.desc}
                  </div>
                </div>
              </div>
              <div
                style={{
                  color: p.color,
                  fontSize: '1.5rem',
                  opacity: hov === i ? 1 : 0,
                  transform: hov === i ? 'translateX(0)' : 'translateX(-12px)',
                  transition: 'all 0.4s',
                }}
              >
                →
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      <div style={{ borderTop: '1px solid rgba(201,169,110,0.06)' }} />

      <div className="container-luxury py-10 flex justify-end">
        <Link
          href={`/${lang}/products`}
          className="flex items-center gap-2 text-[0.6rem] tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ color: 'rgba(201,169,110,0.4)' }}
        >
          View All Products
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
        </Link>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SCENE 4 — FULL-SCREEN TESTIMONIAL
// One quote at a time, cinematic
// ─────────────────────────────────────────────────────────────
const quotes = [
  { text: 'By Hayat Skin completely transformed my skincare routine. My skin has never looked better.', name: 'Sarah Al-Mansouri', skin: 'Dry Skin', city: 'Dubai' },
  { text: "They understood my skin better than any dermatologist I've visited. The results speak for themselves.", name: 'Anastasia Volkov', skin: 'Sensitive Skin', city: 'Dubai' },
  { text: 'Finally found products that actually work in UAE humidity. My skin stays perfect all day.', name: 'Fatima Al-Rashid', skin: 'Oily Skin', city: 'Abu Dhabi' },
]

function SceneTestimonials({ dict }: { dict: DictionaryType }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(a => (a + 1) % quotes.length), 5000)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '80vh', background: '#141210' }}
    >
      {/* Large decorative quote mark */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: '-5%', left: '-2%',
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(300px, 45vw, 600px)',
          fontWeight: 700,
          color: 'rgba(201,169,110,0.025)',
          lineHeight: 1,
        }}
      >
        &ldquo;
      </div>

      <div className="container-luxury relative z-10 py-24">
        <div className="flex items-center gap-3 mb-12">
          <div style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
          <span style={{ color: 'rgba(201,169,110,0.5)', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>{dict.testimonials.label}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(245,239,230,0.75)', lineHeight: 1.5, marginBottom: '2.5rem' }}>
              &ldquo;{quotes[active].text}&rdquo;
            </p>
            <div className="flex items-center gap-5">
              <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#F5EFE6', fontWeight: 400 }}>{quotes[active].name}</div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.45)', marginTop: '2px' }}>{quotes[active].skin} · {quotes[active].city}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3 mt-12">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: active === i ? '32px' : '6px', height: '2px', background: active === i ? '#C9A96E' : 'rgba(201,169,110,0.2)', borderRadius: '1px', transition: 'all 0.4s', border: 'none', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// SCENE 5 — CONSULTATION CTA
// ─────────────────────────────────────────────────────────────
function SceneConsultation({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#080706', paddingTop: '10rem', paddingBottom: '10rem' }}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: ['radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 60%)', 'radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)'] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.15), transparent)' }} />

      <div className="container-luxury text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="flex items-center justify-center gap-4 mb-10">
          <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
          <span style={{ color: 'rgba(201,169,110,0.5)', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase' }}>{dict.consultation.label}</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3.5rem, 9vw, 9rem)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#F5EFE6' }}>
            {dict.consultation.headline}
          </motion.h2>
        </div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-md mx-auto mb-12 text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.4)' }}>
          {dict.consultation.subheadline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.55 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href={`/${lang}/consultation`} className="group relative overflow-hidden px-12 py-4 text-[0.65rem] tracking-[0.25em] uppercase font-medium" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.35)', color: '#C9A96E' }}>
            <span className="relative z-10 transition-colors duration-400 group-hover:text-[#080706]">{dict.consultation.cta}</span>
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400" style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)' }} />
          </Link>
          <Link href={`/${lang}/products`} className="px-12 py-4 text-[0.65rem] tracking-[0.25em] uppercase font-medium transition-all duration-400" style={{ border: '1px solid rgba(245,239,230,0.1)', color: 'rgba(245,239,230,0.45)' }}>
            {dict.final_cta.cta_primary}
          </Link>
          <a href="https://wa.me/971524502886" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-12 py-4 text-[0.65rem] tracking-[0.25em] uppercase font-medium transition-all duration-400" style={{ border: '1px solid rgba(37,211,102,0.2)', color: 'rgba(37,211,102,0.6)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            {dict.final_cta.whatsapp}
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.9 }} className="flex items-center justify-center gap-12 md:gap-20 pt-10" style={{ borderTop: '1px solid rgba(201,169,110,0.06)' }}>
          {[{ v: '500+', l: 'Clients' }, { v: '4.9★', l: 'Rating' }, { v: 'Dubai', l: 'Based In' }].map((b, i) => (
            <div key={i} className="text-center">
              <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '1.5rem', background: 'linear-gradient(90deg, #A07840, #C9A96E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{b.v}</div>
              <div style={{ fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.25)', marginTop: '4px' }}>{b.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export function LuxuryHomePage({ dict, lang }: Props) {
  return (
    <>
      <SceneHero dict={dict} lang={lang} />
      <SceneChapters />
      <SceneProducts lang={lang} />
      <SceneTestimonials dict={dict} />
      <SceneConsultation dict={dict} lang={lang} />
    </>
  )
}