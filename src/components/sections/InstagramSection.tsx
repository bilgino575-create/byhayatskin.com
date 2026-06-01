'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface InstagramSectionProps {
  dict: DictionaryType
}

const posts = [
  { glyph: '✦' },
  { glyph: '◈' },
  { glyph: '◎' },
  { glyph: '◇' },
  { glyph: '✧' },
  { glyph: '◆' },
]

export function InstagramSection({ dict }: InstagramSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0F0E0C', paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.1), transparent)' }}
      />

      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
            <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.5)' }}>
              Follow Our Journey
            </span>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.4)' }} />
          </div>
          <a
            href="https://www.instagram.com/byhayatskin"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 inline-block"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'rgba(245,239,230,0.6)',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A96E'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,239,230,0.6)'}
          >
            @byhayatskin
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/byhayatskin"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-sm overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,169,110,0.06)' }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Subtle gradient bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'rgba(201,169,110,0.06)' }}
              />

              {/* Glyph */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-300"
                  style={{ color: '#C9A96E' }}
                >
                  {post.glyph}
                </span>
              </div>

              {/* Instagram icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.7)" strokeWidth="1.5" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(201,169,110,0.7)" stroke="none" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.instagram.com/byhayatskin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[0.62rem] tracking-[0.18em] uppercase font-medium transition-all duration-400"
            style={{
              border: '1px solid rgba(201,169,110,0.2)',
              color: 'rgba(201,169,110,0.7)',
              background: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.5)'
              ;(e.currentTarget as HTMLElement).style.color = '#C9A96E'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.05)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.2)'
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.7)'
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}