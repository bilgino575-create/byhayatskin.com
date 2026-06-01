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
    rating: 5,
    text: 'By Hayat Skin completely transformed my skincare routine. The personalized consultation identified exactly what my skin needed for the Dubai climate. My skin has never looked better.',
    initials: 'SA',
    color: '#C9A96E',
  },
  {
    name: 'Anastasia Volkov',
    location: 'Dubai, UAE',
    skin: 'Sensitive Skin',
    rating: 5,
    text: 'As someone with very sensitive skin, I was skeptical. But the team understood my concerns perfectly. The products are gentle yet incredibly effective. I\'ve seen a dramatic improvement.',
    initials: 'AV',
    color: '#B76E79',
  },
  {
    name: 'Fatima Hassan',
    location: 'Abu Dhabi, UAE',
    skin: 'Oily Skin',
    rating: 5,
    text: 'The consultation process was thorough and professional. They took into account the UAE heat and humidity, which made all the difference. My skin stays matte and healthy all day.',
    initials: 'FH',
    color: '#7BA7BC',
  },
  {
    name: 'Elena Müller',
    location: 'Dubai, UAE',
    skin: 'Combination Skin',
    rating: 5,
    text: 'I\'ve tried countless luxury skincare brands, but By Hayat Skin is different. The personalization is unmatched. My skin has balanced out beautifully over the past three months.',
    initials: 'EM',
    color: '#A8C5A0',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          fill={i < rating ? 'var(--color-champagne)' : 'none'}
          stroke="var(--color-champagne)"
          strokeWidth="1"
          className="w-3 h-3"
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection({ dict }: TestimonialsSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} className="section-padding bg-[var(--color-pearl)] relative overflow-hidden">
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
              {dict.testimonials.label}
            </span>
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
          </div>
          <h2 className="heading-luxury text-4xl md:text-5xl text-[var(--color-matte-black)]">
            {dict.testimonials.headline}
          </h2>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-sm p-8 md:p-12 border border-[var(--color-champagne)]/20 text-center"
            >
              {/* Quote mark */}
              <div
                className="text-6xl text-[var(--color-champagne)]/20 mb-4 leading-none"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                "
              </div>

              <StarRating rating={testimonials[active].rating} />

              <p className="text-lg md:text-xl text-[var(--color-matte-black)] leading-relaxed my-6"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
              >
                {testimonials[active].text}
              </p>

              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ background: testimonials[active].color }}
                >
                  {testimonials[active].initials}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-[var(--color-matte-black)]">
                    {testimonials[active].name}
                  </div>
                  <div className="text-[0.7rem] text-[var(--color-warm-gray)]">
                    {testimonials[active].location} · {testimonials[active].skin}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Dots / Thumbnails */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                i === active
                  ? 'border-[var(--color-champagne)] bg-[var(--color-champagne)]/10'
                  : 'border-[var(--color-soft-gray)] hover:border-[var(--color-champagne-light)]'
              }`}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[0.6rem] font-medium"
                style={{ background: t.color }}
              >
                {t.initials}
              </div>
              <span className="text-[0.7rem] text-[var(--color-warm-gray)] hidden sm:block">
                {t.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}