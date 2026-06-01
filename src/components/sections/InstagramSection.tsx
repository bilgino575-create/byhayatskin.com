'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface InstagramSectionProps {
  dict: DictionaryType
}

// Placeholder Instagram grid items with luxury aesthetic
const instagramPosts = [
  { id: 1, gradient: 'from-[#C9A96E]/30 to-[#E8D5B0]/20', symbol: '✦', aspect: 'square' },
  { id: 2, gradient: 'from-[#B76E79]/20 to-[#E8B4B8]/10', symbol: '◈', aspect: 'square' },
  { id: 3, gradient: 'from-[#7BA7BC]/20 to-[#B8D4E0]/10', symbol: '◎', aspect: 'square' },
  { id: 4, gradient: 'from-[#A8C5A0]/20 to-[#C8E0C0]/10', symbol: '◇', aspect: 'square' },
  { id: 5, gradient: 'from-[#9B8EA8]/20 to-[#C4B8D0]/10', symbol: '✧', aspect: 'square' },
  { id: 6, gradient: 'from-[#C9A96E]/20 to-[#F0E0C0]/10', symbol: '◆', aspect: 'square' },
]

export function InstagramSection({ dict }: InstagramSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-[var(--color-beige)] relative overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
              {dict.instagram.label}
            </span>
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
          </div>
          <a
            href="https://www.instagram.com/byhayatskin"
            target="_blank"
            rel="noopener noreferrer"
            className="heading-luxury text-3xl md:text-4xl text-[var(--color-matte-black)] hover:text-[var(--color-champagne-dark)] transition-colors duration-300 inline-block"
          >
            {dict.instagram.headline}
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/byhayatskin"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative aspect-square rounded-sm overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ color: 'var(--color-champagne-dark)' }}
                >
                  {post.symbol}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--color-champagne)]/0 group-hover:bg-[var(--color-champagne)]/10 transition-all duration-300 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="w-6 h-6 opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.instagram.com/byhayatskin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury btn-outline inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            {dict.instagram.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}