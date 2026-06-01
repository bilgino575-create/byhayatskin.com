'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface TestimonialsSectionProps {
  dict: DictionaryType
}

const testimonials = [
  {
    name: 'Sarah Al-Mansouri',
    location: 'Dubai, UAE',
    skin: 'Dry Skin',
    text: 'By Hayat Skin completely transformed my skincare routine. The personalized consultation identified exactly what my skin needed for the Dubai climate. My skin has never looked better.',
    initials: 'SA',
    accent: '#C9A96E',
  },
  {
    name: 'Anastasia Volkov',
    location: 'Dubai, UAE',
    skin: 'Sensitive Skin',
    text: 'I was struggling with redness and sensitivity in Dubai\'s heat. The consultation was incredibly thorough — they understood my skin better than any dermatologist I\'ve visited.',
    initials: 'AV',
    accent: '#B76E79',
  },
  {
    name: 'Fatima Al-Rashid',
    location: 'Abu Dhabi, UAE',
    skin: 'Oily Skin',
    text: 'Finally found products that actually work in UAE humidity. The oil-control routine they created for me is perfect. My skin stays matte all day even in summer.',
    initials: 'FA',
    accent: '#C9A96E',
  },
  {
    name: 'Elena Petrova',
    location: 'Sharjah, UAE',
    skin: 'Combination Skin',
    text: 'The luxury experience from consultation to delivery is unmatched. Every product recommendation was spot-on. I feel like I have a personal skincare expert on call.',
    initials: 'EP',
    accent: '#B76E79',
  },
]

export function TestimonialsSection({ dict }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [active, setActive] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#060504', paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      {/* ── Large quote mark watermark ── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: '5%',
          right: '5%',
          fontSize: 'clamp(200px, 30vw, 400px)',
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          color: 'rgba(201,169,110,0.03)',
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* ── Vertical accent line ── */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px pointer-events-none"
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.1), transparent)' }}
      />

      <div className="container-luxury relative">

        {/* ── Header ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.6)' }} />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.7)' }}>
              {dict.testimonials.label}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#F5EDD8',
                lineHeight: 1.05,
              }}
            >
              {dict.testimonials.headline}
            </motion.h2>
          </div>
        </div>

        {/* ── Main testimonial display ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">

          {/* Active testimonial — large quote */}
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote text */}
                <p
                  className="mb-10 leading-[1.6]"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                    fontWeight: 300,
                    color: 'rgba(245,237,216,0.85)',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-5">
                  {/* Monogram */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `1px solid ${testimonials[active].accent}40`,
                      background: `${testimonials[active].accent}10`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '1rem',
                        color: testimonials[active].accent,
                        fontWeight: 400,
                      }}
                    >
                      {testimonials[active].initials}
                    </span>
                  </div>
                  <div>
                    <div
                      className="mb-0.5"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '1.1rem',
                        fontWeight: 400,
                        color: '#E8DDD0',
                      }}
                    >
                      {testimonials[active].name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(200,185,165,0.4)' }}>
                        {testimonials[active].location}
                      </span>
                      <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: '8px' }}>·</span>
                      <span className="text-[0.6rem] tracking-[0.12em] uppercase" style={{ color: testimonials[active].accent, opacity: 0.6 }}>
                        {testimonials[active].skin}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial selector — vertical list */}
          <div className="flex flex-col gap-0">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group text-left py-5 relative transition-all duration-500"
                style={{ borderBottom: '1px solid rgba(201,169,110,0.07)' }}
              >
                {/* Active indicator */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px"
                  animate={{ scaleY: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: t.accent, originY: 0 }}
                />

                <div className="pl-4">
                  <div
                    className="text-sm mb-1 transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '1rem',
                      color: active === i ? '#E8DDD0' : 'rgba(200,185,165,0.35)',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-[0.58rem] tracking-[0.15em] uppercase transition-colors duration-300"
                    style={{ color: active === i ? t.accent : 'rgba(200,185,165,0.2)' }}
                  >
                    {t.skin}
                  </div>
                </div>
              </button>
            ))}

            {/* Navigation dots */}
            <div className="flex items-center gap-2 pt-6 pl-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-400"
                  style={{
                    width: active === i ? '20px' : '4px',
                    height: '2px',
                    background: active === i ? 'rgba(201,169,110,0.7)' : 'rgba(201,169,110,0.2)',
                    borderRadius: '1px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}