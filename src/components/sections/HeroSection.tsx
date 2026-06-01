'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const headlineLines = dict.hero.headline.split('\n')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ivory)]">

      {/* ── Background: warm ivory studio gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFAF5] via-[#FAF5EC] to-[#F0E6D8]" />

      {/* ── Subtle noise texture ── */}
      <div className="absolute inset-0 noise-overlay opacity-20" />

      {/* ══════════════════════════════════════════
          VISUAL COMPOSITION — right side
          Pure CSS luxury skincare atmosphere
      ══════════════════════════════════════════ */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full pointer-events-none select-none">

        {/* ── Primary glow halo — soft champagne light ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.13) 0%, rgba(232,213,176,0.08) 40%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />

        {/* ── Secondary glow — rose gold accent ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute"
          style={{
            top: '35%',
            left: '55%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(183,110,121,0.07) 0%, transparent 65%)',
            filter: 'blur(1px)',
          }}
        />

        {/* ── Central composition: elegant circle frame ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '340px',
            height: '340px',
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgba(201,169,110,0.18)',
              boxShadow: '0 0 60px rgba(201,169,110,0.08)',
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '28px',
              border: '1px solid rgba(201,169,110,0.10)',
            }}
          />
          {/* Inner fill — frosted pearl */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '56px',
              background: 'radial-gradient(ellipse at 40% 35%, rgba(250,248,245,0.95) 0%, rgba(240,230,216,0.7) 100%)',
              boxShadow: 'inset 0 2px 24px rgba(201,169,110,0.12), 0 8px 48px rgba(201,169,110,0.10)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* ── Monogram / brand mark inside circle ── */}
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{ inset: '56px' }}
          >
            {/* Decorative top line */}
            <div style={{ width: '32px', height: '1px', background: 'rgba(160,120,64,0.4)', marginBottom: '10px' }} />
            {/* Serif initial */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '52px',
                fontWeight: 300,
                color: 'rgba(160,120,64,0.55)',
                lineHeight: 1,
                letterSpacing: '0.05em',
              }}
            >
              B
            </div>
            {/* Sub text */}
            <div
              style={{
                fontSize: '7px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(160,120,64,0.45)',
                marginTop: '6px',
              }}
            >
              Hayat Skin
            </div>
            {/* Decorative bottom line */}
            <div style={{ width: '32px', height: '1px', background: 'rgba(160,120,64,0.4)', marginTop: '10px' }} />
          </div>
        </motion.div>

        {/* ── Floating element 1: small gold dot cluster — top right ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.8 }}
          style={{ position: 'absolute', top: '22%', left: '72%' }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}
          >
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(201,169,110,0.5)' }} />
            <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(201,169,110,0.3)' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(201,169,110,0.4)' }} />
          </motion.div>
        </motion.div>

        {/* ── Floating element 2: thin horizontal line — left of circle ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.0 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '12%',
            transformOrigin: 'left center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,110,0.3)' }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(201,169,110,0.35)' }} />
          </div>
        </motion.div>

        {/* ── Floating element 3: small arc — bottom of circle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
          style={{ position: 'absolute', top: '68%', left: '44%' }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
              <path d="M2 22 Q24 2 46 22" stroke="rgba(201,169,110,0.25)" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Floating element 4: tiny diamond — top left of circle ── */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 45 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          style={{ position: 'absolute', top: '28%', left: '30%' }}
        >
          <motion.div
            animate={{ rotate: [45, 50, 45] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '8px',
              height: '8px',
              border: '1px solid rgba(201,169,110,0.35)',
              transform: 'rotate(45deg)',
            }}
          />
        </motion.div>

        {/* ── Floating element 5: small circle ring — bottom right ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 1.6 }}
          style={{ position: 'absolute', top: '65%', left: '68%' }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px solid rgba(201,169,110,0.28)',
            }}
          />
        </motion.div>

        {/* ── Floating element 6: vertical text label ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '82%',
            transform: 'translateY(-50%) rotate(90deg)',
            transformOrigin: 'center center',
          }}
        >
          <span
            style={{
              fontSize: '7px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(160,120,64,0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            Dubai · UAE
          </span>
        </motion.div>

        {/* ── Soft light streak — diagonal ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.6 }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '2px',
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.15), transparent)',
            transform: 'rotate(25deg)',
            filter: 'blur(1px)',
          }}
        />

      </div>

      {/* ── Left content vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-[var(--color-ivory)]/90 to-transparent lg:via-[var(--color-ivory)]/60" />

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 container-luxury w-full pt-32 pb-20">
        <div className="max-w-2xl">

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-[var(--color-champagne)]" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne-dark)] font-medium">
              {dict.hero.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="heading-luxury mb-8">
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block text-5xl md:text-6xl lg:text-7xl text-[var(--color-matte-black)]"
              >
                {i === 1 ? (
                  <span className="text-gold-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-base md:text-lg text-[var(--color-warm-gray)] leading-relaxed mb-10 max-w-lg"
          >
            {dict.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={`/${lang}/products`} className="btn-luxury btn-primary">
              {dict.hero.cta_primary}
            </Link>
            <Link href={`/${lang}/consultation`} className="btn-luxury btn-outline">
              {dict.hero.cta_secondary}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-8 mt-14 pt-8 border-t border-[var(--color-soft-gray)]"
          >
            {[
              { value: dict.brand_story.stat_1_value, label: dict.brand_story.stat_1_label },
              { value: dict.brand_story.stat_2_value, label: dict.brand_story.stat_2_label },
              { value: dict.brand_story.stat_3_value, label: dict.brand_story.stat_3_label },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl md:text-3xl text-gold-gradient mb-1"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.65rem] tracking-[0.12em] uppercase text-[var(--color-warm-gray)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-warm-gray)]"
      >
        <span className="text-[0.6rem] tracking-[0.2em] uppercase">{dict.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[var(--color-champagne)]" />
        </motion.div>
      </motion.div>

    </section>
  )
}