'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType } from '@/lib/i18n/dictionaries'

interface InstagramSectionProps {
  dict: DictionaryType
}

// Luxury skincare editorial tiles — CSS-only, no images needed
const editorialTiles = [
  {
    label: 'Serum Ritual',
    sub: 'Vitamin C · Morning',
    bg: 'linear-gradient(135deg, #1a1208 0%, #2d1f0a 40%, #1a1208 100%)',
    accent: '#C9A96E',
    glyph: '✦',
    size: 'large', // spans 2 rows on desktop
  },
  {
    label: 'Hydration',
    sub: 'Hyaluronic Acid',
    bg: 'linear-gradient(135deg, #0a1520 0%, #0d2035 50%, #0a1520 100%)',
    accent: '#7BA7BC',
    glyph: '◈',
    size: 'normal',
  },
  {
    label: 'SPF 50+',
    sub: 'UAE Protection',
    bg: 'linear-gradient(135deg, #1a1208 0%, #261a08 50%, #1a1208 100%)',
    accent: '#E8D5B0',
    glyph: '☀',
    size: 'normal',
  },
  {
    label: 'Night Ritual',
    sub: 'Retinol · Repair',
    bg: 'linear-gradient(135deg, #120a1a 0%, #1e0f2d 50%, #120a1a 100%)',
    accent: '#B76E79',
    glyph: '◉',
    size: 'normal',
  },
  {
    label: 'Barrier Care',
    sub: 'Ceramide Complex',
    bg: 'linear-gradient(135deg, #0a1a10 0%, #0f2518 50%, #0a1a10 100%)',
    accent: '#A8C5A0',
    glyph: '◇',
    size: 'normal',
  },
  {
    label: 'Glow Edit',
    sub: 'Dubai Radiance',
    bg: 'linear-gradient(135deg, #1a1208 0%, #2a1c0a 40%, #1a1208 100%)',
    accent: '#C9A96E',
    glyph: '✧',
    size: 'normal',
  },
]

function EditorialTile({
  tile,
  index,
  inView,
}: {
  tile: typeof editorialTiles[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.a
      href="https://www.instagram.com/byhayatskin"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden cursor-pointer block"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: tile.bg,
        border: `1px solid ${tile.accent}18`,
        aspectRatio: tile.size === 'large' ? undefined : '1',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${tile.accent}18 0%, transparent 65%)`,
        }}
      />

      {/* Corner accent lines */}
      <div
        className="absolute top-0 left-0 w-6 h-px transition-all duration-500 group-hover:w-12"
        style={{ background: `${tile.accent}50` }}
      />
      <div
        className="absolute top-0 left-0 w-px h-6 transition-all duration-500 group-hover:h-12"
        style={{ background: `${tile.accent}50` }}
      />
      <div
        className="absolute bottom-0 right-0 w-6 h-px transition-all duration-500 group-hover:w-12"
        style={{ background: `${tile.accent}50` }}
      />
      <div
        className="absolute bottom-0 right-0 w-px h-6 transition-all duration-500 group-hover:h-12"
        style={{ background: `${tile.accent}50` }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {/* Large decorative glyph */}
        <div
          className="mb-3 transition-all duration-500 group-hover:scale-110"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: tile.size === 'large' ? '3.5rem' : '2rem',
            color: tile.accent,
            opacity: 0.25,
            lineHeight: 1,
          }}
        >
          {tile.glyph}
        </div>

        {/* Label */}
        <div
          className="text-center mb-1 transition-colors duration-300"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: tile.size === 'large' ? '1.1rem' : '0.85rem',
            fontWeight: 400,
            color: 'rgba(245,239,230,0.7)',
            letterSpacing: '0.03em',
          }}
        >
          {tile.label}
        </div>

        {/* Sub label */}
        <div
          className="text-[0.55rem] tracking-[0.2em] uppercase"
          style={{ color: `${tile.accent}80` }}
        >
          {tile.sub}
        </div>
      </div>

      {/* Instagram hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(15,14,12,0.7)', border: `1px solid ${tile.accent}40` }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={tile.accent} strokeWidth="1.5" className="w-4 h-4">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill={tile.accent} stroke="none" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}

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
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.12), transparent)' }}
      />

      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: '28px', height: '1px', background: 'rgba(201,169,110,0.5)' }} />
              <span className="text-[0.6rem] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,169,110,0.6)' }}>
                Skincare Rituals
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 300,
                color: '#F5EFE6',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              The Art of Skincare
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'rgba(245,239,230,0.4)' }}>
              Curated rituals for Dubai&apos;s climate
            </p>
          </div>

          <a
            href="https://www.instagram.com/byhayatskin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-[0.62rem] tracking-[0.18em] uppercase font-medium transition-all duration-400 shrink-0"
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            @byhayatskin
          </a>
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {editorialTiles.map((tile, i) => (
            <EditorialTile key={i} tile={tile} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(245,239,230,0.2)',
              letterSpacing: '0.02em',
            }}
          >
            &ldquo;Luxury is in each detail.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}