'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface Props {
  dict: DictionaryType
  lang: Locale
}

// ── HERO ──────────────────────────────────────
function HeroSection({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: '100svh', minHeight: '680px', background: '#FAF8F3' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '80vh', background: 'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.08) 0%, transparent 65%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)' }} />

      <motion.div className="absolute inset-0 flex flex-col" style={{ y, opacity }}>
        <div className="flex items-center justify-between px-8 lg:px-16 pt-32">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-3">
            <div style={{ width: '24px', height: '1px', background: 'rgba(160,120,64,0.5)' }} />
            <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(160,120,64,0.7)' }}>{dict.hero.tagline}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="hidden md:block text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(160,120,64,0.35)' }}>
            Est. Dubai · UAE
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="overflow-hidden mb-2">
            <motion.p initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="text-[0.6rem] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(160,120,64,0.6)' }}>
              By Hayat Skin
            </motion.p>
          </div>
          {['Luxury', 'Skincare', 'Designed For You'].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1 initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 }} className="block leading-[0.92]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3.5rem, 10vw, 10rem)', fontWeight: 300, letterSpacing: '-0.03em', color: i === 1 ? 'transparent' : '#1A1714', WebkitTextStroke: i === 1 ? '1px rgba(160,120,64,0.5)' : 'none', backgroundImage: i === 1 ? 'linear-gradient(90deg, #A07840 0%, #C9A96E 50%, #A07840 100%)' : 'none', WebkitBackgroundClip: i === 1 ? 'text' : 'unset', backgroundClip: i === 1 ? 'text' : 'unset' }}>
                {word}
              </motion.h1>
            </div>
          ))}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }} className="mt-8 max-w-md text-sm leading-relaxed" style={{ color: 'rgba(26,23,20,0.45)' }}>
            {dict.hero.subheadline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }} className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <Link href={`/${lang}/products`} className="group relative overflow-hidden px-10 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-medium transition-all duration-500" style={{ background: '#1A1714', color: '#FAF8F3' }}>
              <span className="relative z-10">{dict.hero.cta_primary}</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)' }} />
            </Link>
            <Link href={`/${lang}/consultation`} className="px-10 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-medium transition-all duration-400" style={{ border: '1px solid rgba(160,120,64,0.35)', color: 'rgba(160,120,64,0.8)', background: 'transparent' }}>
              {dict.hero.cta_secondary}
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="flex items-center justify-center gap-12 md:gap-20 px-8 pb-10" style={{ borderTop: '1px solid rgba(160,120,64,0.08)' }}>
          {[{ v: '500+', l: 'Clients Transformed' }, { v: '15+', l: 'Premium Ingredients' }, { v: '100%', l: 'Personalized' }].map((s, i) => (
            <div key={i} className="text-center pt-6">
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, color: '#A07840', lineHeight: 1 }}>{s.v}</div>
              <div className="text-[0.52rem] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(26,23,20,0.3)' }}>{s.l}</div>
            </div>
          ))}
          {mounted && (
            <div className="hidden md:flex flex-col items-center gap-2 pt-6 ml-auto" style={{ color: 'rgba(160,120,64,0.4)' }}>
              <span className="text-[0.5rem] tracking-[0.3em] uppercase">{dict.hero.scroll}</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '10px' }}>↓</motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── MANIFESTO ─────────────────────────────────
function ManifestoSection({ dict }: { dict: DictionaryType }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#1A1714', paddingTop: '9rem', paddingBottom: '9rem' }}>
      <div className="absolute pointer-events-none select-none" style={{ top: '-5%', right: '-3%', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(180px, 28vw, 380px)', fontWeight: 300, color: 'rgba(201,169,110,0.03)', lineHeight: 1, letterSpacing: '-0.05em' }}>BHS</div>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
              <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>{dict.brand_story.label}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(245,239,230,0.2)', fontStyle: 'italic', lineHeight: 1.6 }}>Dubai, UAE<br />Est. 2023</div>
            <div className="mt-12 space-y-8">
              {[{ v: dict.brand_story.stat_1_value, l: dict.brand_story.stat_1_label }, { v: dict.brand_story.stat_2_value, l: dict.brand_story.stat_2_label }, { v: dict.brand_story.stat_3_value, l: dict.brand_story.stat_3_label }].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }} className="pb-8" style={{ borderBottom: '1px solid rgba(201,169,110,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 300, background: 'linear-gradient(90deg, #C9A96E, #E8D5B0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{s.v}</div>
                  <div className="text-[0.55rem] tracking-[0.25em] uppercase mt-1" style={{ color: 'rgba(201,169,110,0.25)' }}>{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div>
            <div className="overflow-hidden mb-10">
              {dict.brand_story.headline.split(' ').reduce<string[][]>((acc, w, i) => { const li = Math.floor(i / 3); if (!acc[li]) acc[li] = []; acc[li].push(w); return acc }, []).map((words, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.span initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1.1, delay: li * 0.1, ease: [0.16, 1, 0.3, 1] }} className="block leading-[1.0]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 300, letterSpacing: '-0.02em', color: li % 2 === 0 ? '#F5EFE6' : 'transparent', WebkitTextStroke: li % 2 !== 0 ? '1px rgba(201,169,110,0.3)' : 'none' }}>
                    {words.join(' ')}
                  </motion.span>
                </div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.5 }}>
              <div style={{ width: '48px', height: '1px', background: 'rgba(201,169,110,0.3)', marginBottom: '2rem' }} />
              <p className="text-base leading-[1.9] max-w-lg" style={{ color: 'rgba(245,239,230,0.55)' }}>{dict.brand_story.body}</p>
              <div className="flex items-center gap-4 mt-8">
                <div style={{ width: '32px', height: '1px', background: 'rgba(201,169,110,0.25)' }} />
                <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', fontWeight: 300, color: 'rgba(201,169,110,0.4)', fontStyle: 'italic' }}>By Hayat Skin, Dubai</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CATEGORIES ────────────────────────────────
const cats = [
  { key: 'serums', label: 'Serums', desc: 'Concentrated actives', href: 'serums', num: '01' },
  { key: 'moisturizers', label: 'Moisturizers', desc: 'Deep hydration', href: 'moisturizers', num: '02' },
  { key: 'spf', label: 'SPF 50+', desc: 'UAE-grade protection', href: 'spf', num: '03' },
  { key: 'anti_aging', label: 'Anti-Aging', desc: 'Science-backed formulas', href: 'anti-aging', num: '04' },
  { key: 'kits', label: 'Ritual Kits', desc: 'Curated collections', href: 'kits', num: '05' },
  { key: 'cleansers', label: 'Cleansers', desc: 'Gentle daily ritual', href: '', num: '06' },
]

function CategoriesSection({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hov, setHov] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#FAF8F3', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(160,120,64,1) 1px, transparent 1px), linear-gradient(90deg, rgba(160,120,64,1) 1px, transparent 1px)', backgroundSize: '120px 120px' }} />
      <div className="container-luxury relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-5">
              <div style={{ width: '24px', height: '1px', background: 'rgba(160,120,64,0.5)' }} />
              <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(160,120,64,0.6)' }}>Our Collection</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#1A1714', lineHeight: 1.05 }}>
                {dict.products.headline}
              </motion.h2>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <Link href={`/${lang}/products`} className="flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase" style={{ color: 'rgba(160,120,64,0.5)' }}>
              View All <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {cats.map((cat, i) => {
            const href = cat.href ? `/${lang}/products/${cat.href}` : `/${lang}/products`
            return (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 + i * 0.07 }}>
                <Link href={href} className="group relative flex items-center justify-between py-6" style={{ borderBottom: '1px solid rgba(160,120,64,0.1)' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
                  <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: hov === i ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ background: 'linear-gradient(to right, rgba(160,120,64,0.04), transparent)' }} />
                  <motion.div className="absolute top-0 left-0 h-px pointer-events-none" animate={{ width: hov === i ? '60px' : '0px' }} transition={{ duration: 0.4 }} style={{ background: '#A07840' }} />
                  <div className="flex items-center gap-6 lg:gap-10">
                    <span className="text-[0.58rem] tracking-[0.2em] transition-colors duration-300" style={{ color: hov === i ? 'rgba(160,120,64,0.6)' : 'rgba(26,23,20,0.2)' }}>{cat.num}</span>
                    <div>
                      <div className="transition-colors duration-300" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 300, letterSpacing: '-0.01em', color: hov === i ? '#1A1714' : 'rgba(26,23,20,0.7)' }}>{cat.label}</div>
                      <div className="text-[0.6rem] tracking-[0.1em] transition-colors duration-300" style={{ color: hov === i ? 'rgba(160,120,64,0.6)' : 'rgba(26,23,20,0.35)' }}>{cat.desc}</div>
                    </div>
                  </div>
                  <motion.div animate={{ opacity: hov === i ? 1 : 0, x: hov === i ? 0 : -8 }} transition={{ duration: 0.3 }} style={{ color: '#A07840', fontSize: '1.1rem' }}>→</motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── RITUAL / CONSULTATION ─────────────────────
function RitualSection({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const steps = [
    { icon: '◉', label: dict.consultation.steps.skin_type },
    { icon: '◈', label: dict.consultation.steps.concerns },
    { icon: '◎', label: dict.consultation.steps.lifestyle },
    { icon: '☀', label: dict.consultation.steps.climate },
    { icon: '✦', label: dict.consultation.steps.goals },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#1A1714', paddingTop: '9rem', paddingBottom: '9rem' }}>
      <div className="absolute pointer-events-none" style={{ top: '20%', right: '-5%', width: '50%', height: '60%', background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)' }} />
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-7">
              <div style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
              <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>{dict.consultation.label}</span>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#F5EFE6', lineHeight: 1.05 }}>
                {dict.consultation.headline}
              </motion.h2>
            </div>
            <div style={{ width: '48px', height: '1px', background: 'rgba(201,169,110,0.25)', marginBottom: '1.5rem' }} />
            <p className="text-sm leading-relaxed mb-10 max-w-md" style={{ color: 'rgba(245,239,230,0.45)' }}>{dict.consultation.subheadline}</p>
            <div className="space-y-4 mb-10">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', color: '#C9A96E' }}>{step.icon}</div>
                  <span className="text-sm" style={{ color: 'rgba(245,239,230,0.55)' }}>{step.label}</span>
                </motion.div>
              ))}
            </div>
            <Link href={`/${lang}/consultation`} className="inline-flex items-center gap-3 px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium transition-all duration-500 group" style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)', color: '#1A1714' }}>
              {dict.consultation.cta}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="relative">
            <div className="p-8 lg:p-10" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,169,110,0.12)', boxShadow: '0 0 60px rgba(201,169,110,0.05), 0 16px 48px rgba(0,0,0,0.4)' }}>
              <div className="text-[0.58rem] tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(201,169,110,0.4)' }}>{dict.skin_diagnosis.routine_label}</div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[{ icon: '☀', label: dict.consultation.features.am }, { icon: '☽', label: dict.consultation.features.pm }, { icon: '✦', label: dict.consultation.features.products }, { icon: '◈', label: dict.consultation.features.plan }].map((item, i) => (
                  <div key={i} className="p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,169,110,0.08)' }}>
                    <div className="text-base mb-2" style={{ color: 'rgba(201,169,110,0.5)' }}>{item.icon}</div>
                    <div className="text-xs" style={{ color: 'rgba(245,239,230,0.45)' }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(201,169,110,0.08)', paddingTop: '1.25rem' }}>
                <div className="text-[0.55rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(201,169,110,0.3)' }}>Sample AM Routine</div>
                {['Gentle Cleanser', 'Vitamin C Serum', 'SPF 50+ Moisturizer'].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[0.52rem] shrink-0" style={{ background: 'rgba(201,169,110,0.1)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.2)' }}>{i + 1}</div>
                    <span className="text-xs" style={{ color: 'rgba(245,239,230,0.4)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-4 -right-4 px-4 py-2" style={{ background: 'rgba(15,14,12,0.95)', border: '1px solid rgba(201,169,110,0.25)', backdropFilter: 'blur(12px)' }}>
              <span className="text-[0.58rem] tracking-[0.15em] uppercase" style={{ color: '#C9A96E' }}>Personalized</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── WHY US ────────────────────────────────────
const whyKeys = ['expert', 'climate', 'luxury', 'personal', 'longterm'] as const

function WhySection({ dict }: { dict: DictionaryType }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hov, setHov] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#FAF8F3', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-5">
              <div style={{ width: '24px', height: '1px', background: 'rgba(160,120,64,0.5)' }} />
              <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(160,120,64,0.6)' }}>{dict.why_us.label}</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#1A1714', lineHeight: 1.1 }}>
                {dict.why_us.headline}
              </motion.h2>
            </div>
          </div>
          <div className="flex flex-col">
            {whyKeys.map((key, i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }} className="group relative grid grid-cols-[60px_1fr] gap-6 py-7 cursor-default" style={{ borderBottom: '1px solid rgba(160,120,64,0.1)' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(160,120,64,0.04), transparent)' }} />
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.4rem, 2vw, 2rem)', fontWeight: 300, color: hov === i ? 'rgba(160,120,64,0.5)' : 'rgba(26,23,20,0.15)', transition: 'color 0.4s', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontWeight: 300, color: '#1A1714', letterSpacing: '-0.01em', marginBottom: '0.4rem' }}>{dict.why_us.features[key].title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,23,20,0.5)' }}>{dict.why_us.features[key].desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────
const testimonials = [
  { name: 'Sarah Al-Mansouri', location: 'Dubai', skin: 'Dry Skin', initials: 'SA', text: 'By Hayat Skin completely transformed my skincare routine. The personalized consultation identified exactly what my skin needed for the Dubai climate. My skin has never looked better.' },
  { name: 'Anastasia Volkov', location: 'Dubai', skin: 'Sensitive Skin', initials: 'AV', text: "I was struggling with redness and sensitivity in Dubai's heat. The consultation was incredibly thorough — they understood my skin better than any dermatologist I've visited." },
  { name: 'Fatima Al-Rashid', location: 'Abu Dhabi', skin: 'Oily Skin', initials: 'FA', text: 'Finally found products that actually work in UAE humidity. The oil-control routine they created for me is perfect. My skin stays matte all day even in summer.' },
  { name: 'Elena Petrova', location: 'Sharjah', skin: 'Combination', initials: 'EP', text: 'The luxury experience from consultation to delivery is unmatched. Every product recommendation was spot-on. I feel like I have a personal skincare expert on call.' },
]

function TestimonialsSection({ dict }: { dict: DictionaryType }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#1A1714', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="absolute pointer-events-none select-none" style={{ top: '0%', right: '2%', fontFamily: 'Georgia, serif', fontSize: 'clamp(200px, 30vw, 420px)', fontWeight: 700, color: 'rgba(201,169,110,0.025)', lineHeight: 1 }}>&ldquo;</div>
      <div className="container-luxury">
        <div className="flex items-center gap-3 mb-5">
          <div style={{ width: '24px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
          <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>{dict.testimonials.label}</span>
        </div>
        <div className="overflow-hidden mb-14">
          <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#F5EFE6', lineHeight: 1.05 }}>
            {dict.testimonials.headline}
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16 items-start">
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }} transition={{ duration: 0.5 }}>
                <p className="mb-8 leading-[1.7]" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.9rem)', fontWeight: 300, color: 'rgba(245,239,230,0.7)', fontStyle: 'italic' }}>
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(201,169,110,0.25)', background: 'rgba(201,169,110,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', color: '#C9A96E' }}>{testimonials[active].initials}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem', color: '#F5EFE6', fontWeight: 400 }}>{testimonials[active].name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(245,239,230,0.25)' }}>{testimonials[active].location}</span>
                      <span style={{ color: 'rgba(201,169,110,0.2)', fontSize: '6px' }}>·</span>
                      <span className="text-[0.55rem] tracking-[0.12em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>{testimonials[active].skin}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-0">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} className="text-left py-4 relative" style={{ borderBottom: '1px solid rgba(201,169,110,0.06)' }}>
                <motion.div className="absolute left-0 top-0 bottom-0 w-px" animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ background: '#C9A96E', transformOrigin: 'top' }} />
                <div className="pl-4">
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.95rem', color: active === i ? '#F5EFE6' : 'rgba(245,239,230,0.25)', transition: 'color 0.3s' }}>{t.name}</div>
                  <div className="text-[0.52rem] tracking-[0.15em] uppercase" style={{ color: active === i ? 'rgba(201,169,110,0.6)' : 'rgba(201,169,110,0.15)', transition: 'color 0.3s' }}>{t.skin}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── JOURNAL ───────────────────────────────────
const journalPosts = [
  { slug: 'skincare-routine-dubai-summer', cat: 'Dubai Climate', title: "The Ultimate Skincare Routine for Dubai's Summer Heat", time: '5 min', accent: '#C9A96E', bg: 'linear-gradient(135deg, #1a1208 0%, #2d1f0a 45%, #1a1208 100%)', glyph: '☀' },
  { slug: 'hyaluronic-acid-guide', cat: 'Ingredients', title: 'Hyaluronic Acid: The Complete Guide to Skin Hydration', time: '7 min', accent: '#7BA7BC', bg: 'linear-gradient(135deg, #0a1520 0%, #0d2035 45%, #0a1520 100%)', glyph: '◈' },
  { slug: 'anti-aging-routine-uae', cat: 'Anti-Aging', title: 'Anti-Aging Skincare: A Science-Backed Approach for UAE Skin', time: '8 min', accent: '#B76E79', bg: 'linear-gradient(135deg, #1a0a10 0%, #2d1020 45%, #1a0a10 100%)', glyph: '✦' },
]

function JournalSection({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#FAF8F3', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-5">
              <div style={{ width: '24px', height: '1px', background: 'rgba(160,120,64,0.5)' }} />
              <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(160,120,64,0.6)' }}>{dict.blog.label}</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#1A1714', lineHeight: 1.05 }}>
                {dict.blog.headline}
              </motion.h2>
            </div>
          </div>
          <Link href={`/${lang}/blog`} className="flex items-center gap-2 text-[0.6rem] tracking-[0.25em] uppercase shrink-0" style={{ color: 'rgba(160,120,64,0.5)' }}>
            {dict.blog.view_all} <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {journalPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <Link href={`/${lang}/blog/${post.slug}`} className="group block overflow-hidden transition-all duration-400" style={{ border: '1px solid rgba(160,120,64,0.12)', background: '#FFFFFF' }}>
                <div className="relative h-52 overflow-hidden" style={{ background: post.bg }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at 50% 60%, ${post.accent}25 0%, transparent 65%)` }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="transition-all duration-500 group-hover:scale-110" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '5rem', color: post.accent, opacity: 0.12, lineHeight: 1 }}>{post.glyph}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <span className="text-[0.52rem] tracking-[0.18em] uppercase px-2.5 py-1" style={{ background: `${post.accent}18`, color: post.accent, border: `1px solid ${post.accent}30` }}>{post.cat}</span>
                    <span className="text-[0.52rem] tracking-[0.15em] uppercase" style={{ color: `${post.accent}60` }}>{post.time} read</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 leading-snug" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem', fontWeight: 400, color: '#1A1714', lineHeight: 1.3 }}>{post.title}</h3>
                  <div className="flex items-center gap-2 text-[0.58rem] tracking-[0.15em] uppercase transition-all duration-300 group-hover:gap-3" style={{ color: 'rgba(160,120,64,0.6)' }}>{dict.blog.read_more} <span>→</span></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA ─────────────────────────────────
function FinalSection({ dict, lang }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const lines = dict.final_cta.headline.split('\n')

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#1A1714', paddingTop: '9rem', paddingBottom: '9rem' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '700px', height: '350px', background: 'radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%)', filter: 'blur(2px)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)' }} />
      <div className="container-luxury text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="flex items-center justify-center gap-3 mb-8">
          <div style={{ width: '36px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
          <span className="text-[0.58rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>By Hayat Skin</span>
          <div style={{ width: '36px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
        </motion.div>
        <h2 className="mb-6">
          {lines.map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 + i * 0.15 }} className="block" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.05, color: i === 0 ? 'transparent' : '#F5EFE6', backgroundImage: i === 0 ? 'linear-gradient(90deg, #A07840 0%, #C9A96E 50%, #A07840 100%)' : 'none', WebkitBackgroundClip: i === 0 ? 'text' : 'unset', backgroundClip: i === 0 ? 'text' : 'unset' }}>
              {line}
            </motion.span>
          ))}
        </h2>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-lg mx-auto mb-10 text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.4)' }}>
          {dict.final_cta.subheadline}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.55 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${lang}/products`} className="inline-flex items-center justify-center min-w-[180px] px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium" style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)', color: '#1A1714' }}>{dict.final_cta.cta_primary}</Link>
          <Link href={`/${lang}/consultation`} className="inline-flex items-center justify-center min-w-[180px] px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium" style={{ border: '1px solid rgba(201,169,110,0.25)', color: 'rgba(201,169,110,0.8)', background: 'transparent' }}>{dict.final_cta.cta_secondary}</Link>
          <a href="https://wa.me/971524502886" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-w-[180px] px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium" style={{ border: '1px solid rgba(37,211,102,0.25)', color: 'rgba(37,211,102,0.8)', background: 'transparent' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            {dict.final_cta.whatsapp}
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="flex items-center justify-center gap-8 md:gap-16 mt-14 pt-10" style={{ borderTop: '1px solid rgba(201,169,110,0.08)' }}>
          {[{ value: '500+', label: 'Happy Clients' }, { value: '4.9★', label: 'Average Rating' }, { value: 'Dubai', label: 'Based In' }].map((badge, i) => (
            <div key={i} className="text-center">
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, fontSize: '1.3rem', background: 'linear-gradient(90deg, #A07840, #C9A96E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{badge.value}</div>
              <div className="text-[0.52rem] tracking-[0.18em] uppercase" style={{ color: 'rgba(201,169,110,0.25)' }}>{badge.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── MAIN EXPORT ───────────────────────────────
export function LuxuryHomePage({ dict, lang }: Props) {
  return (
    <>
      <HeroSection dict={dict} lang={lang} />
      <ManifestoSection dict={dict} />
      <CategoriesSection dict={dict} lang={lang} />
      <RitualSection dict={dict} lang={lang} />
      <WhySection dict={dict} />
      <TestimonialsSection dict={dict} />
      <JournalSection dict={dict} lang={lang} />
      <FinalSection dict={dict} lang={lang} />
    </>
  )
}