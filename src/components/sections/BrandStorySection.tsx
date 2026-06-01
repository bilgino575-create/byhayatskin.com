'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface BrandStorySectionProps {
  dict: DictionaryType
}

export function BrandStorySection({ dict }: BrandStorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })
  const headlineInView = useInView(headlineRef, { once: true, amount: 0.25 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%'])

  const stats = [
    { value: dict.brand_story.stat_1_value, label: dict.brand_story.stat_1_label },
    { value: dict.brand_story.stat_2_value, label: dict.brand_story.stat_2_label },
    { value: dict.brand_story.stat_3_value, label: dict.brand_story.stat_3_label },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#141210', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Watermark */}
        <div
          className="absolute select-none"
          style={{
            top: '8%', right: '-4%',
            fontSize: 'clamp(120px, 20vw, 280px)',
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.03)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          BHS
        </div>
        {/* Vertical light streak */}
        <div
          className="absolute"
          style={{
            top: 0, left: '35%',
            width: '1px', height: '100%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.06) 30%, rgba(201,169,110,0.1) 50%, rgba(201,169,110,0.06) 70%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Animated top line */}
      <div className="container-luxury mb-16">
        <motion.div
          className="h-px"
          style={{
            width: lineWidth,
            background: 'linear-gradient(to right, rgba(201,169,110,0.5), rgba(201,169,110,0.1))',
          }}
        />
      </div>

      <div className="container-luxury">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>
            {dict.brand_story.label}
          </span>
        </motion.div>

        {/* Giant headline */}
        <div ref={headlineRef} className="mb-20 overflow-hidden">
          {dict.brand_story.headline.split(' ').reduce<string[][]>((acc, word, i) => {
            const lineIndex = Math.floor(i / 2)
            if (!acc[lineIndex]) acc[lineIndex] = []
            acc[lineIndex].push(word)
            return acc
          }, []).map((words, lineIdx) => (
            <div key={lineIdx} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={headlineInView ? { y: '0%' } : {}}
                transition={{ duration: 1.0, delay: lineIdx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block leading-[1.0]"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: lineIdx % 2 === 0 ? '#F5EFE6' : 'transparent',
                    WebkitTextStroke: lineIdx % 2 !== 0 ? '1px rgba(201,169,110,0.35)' : 'none',
                  }}
                >
                  {words.join(' ')}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Two column: body + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base leading-[1.9] mb-8" style={{ color: 'rgba(245,239,230,0.6)' }}>
              {dict.brand_story.body}
            </p>
            <div className="flex items-center gap-4">
              <div style={{ width: '36px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '1.05rem',
                  fontWeight: 300,
                  color: 'rgba(201,169,110,0.45)',
                  fontStyle: 'italic',
                }}
              >
                By Hayat Skin, Dubai
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-col gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative py-8"
                style={{ borderBottom: i < stats.length - 1 ? '1px solid rgba(201,169,110,0.06)' : 'none' }}
              >
                <div
                  className="leading-none mb-2"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: 300,
                    background: 'linear-gradient(90deg, #C9A96E 0%, #E8D5B0 60%, #C9A96E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.58rem] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,169,110,0.25)' }}>
                  {stat.label}
                </div>
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'rgba(201,169,110,0.2)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-24 pt-8 overflow-hidden"
          style={{ borderTop: '1px solid rgba(201,169,110,0.06)' }}
        >
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-[0.52rem] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,169,110,0.12)' }}>
                LUXURY SKINCARE · DUBAI · PERSONALIZED BEAUTY · PREMIUM FORMULATIONS ·&nbsp;
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}