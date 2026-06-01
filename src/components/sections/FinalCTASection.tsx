'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'

interface FinalCTASectionProps {
  dict: DictionaryType
  lang: Locale
}

export function FinalCTASection({ dict, lang }: FinalCTASectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const headlineLines = dict.final_cta.headline.split('\n')

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-matte-black) 0%, #2A2018 50%, var(--color-matte-black) 100%)' }}
    >
      {/* Gold particle decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'var(--color-champagne)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, var(--color-champagne) 0%, transparent 70%)' }}
      />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-champagne)]/50 to-transparent" />

      <div className="container-luxury relative z-10 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-10 bg-[var(--color-champagne)]" />
          <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[var(--color-champagne)] font-medium">
            By Hayat Skin
          </span>
          <div className="h-px w-10 bg-[var(--color-champagne)]" />
        </motion.div>

        {/* Headline */}
        <h2 className="mb-6">
          {headlineLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.15 }}
              className="block text-4xl md:text-5xl lg:text-6xl text-white"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, letterSpacing: '0.02em' }}
            >
              {i === 0 ? (
                <span className="text-gold-gradient">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[var(--color-warm-gray)] max-w-lg mx-auto mb-10 text-base"
        >
          {dict.final_cta.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`/${lang}/products`}
            className="btn-luxury btn-primary min-w-[180px]"
          >
            {dict.final_cta.cta_primary}
          </Link>
          <Link
            href={`/${lang}/consultation`}
            className="btn-luxury border border-[var(--color-champagne)]/40 text-[var(--color-champagne-light)] hover:bg-[var(--color-champagne)]/10 hover:border-[var(--color-champagne)] transition-all duration-400 min-w-[180px]"
          >
            {dict.final_cta.cta_secondary}
          </Link>
          <a
            href="https://wa.me/971524502886"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-400 min-w-[180px] flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {dict.final_cta.whatsapp}
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-8 mt-14 pt-10 border-t border-[var(--color-champagne)]/15"
        >
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '4.9★', label: 'Average Rating' },
            { value: 'Dubai', label: 'Based In' },
          ].map((badge, i) => (
            <div key={i} className="text-center">
              <div
                className="text-xl text-[var(--color-champagne)] mb-1"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}
              >
                {badge.value}
              </div>
              <div className="text-[0.6rem] tracking-[0.15em] uppercase text-[var(--color-warm-gray)]/60">
                {badge.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}