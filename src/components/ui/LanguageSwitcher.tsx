'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { locales, localeNames, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  lang: Locale
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Replace current locale prefix with new locale
  const getLocalePath = (newLang: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLang
    return segments.join('/')
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[var(--color-warm-gray)] hover:text-[var(--color-champagne-dark)] transition-colors duration-300"
        aria-label="Select language"
      >
        <Globe size={14} />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 glass rounded-sm border border-[var(--color-champagne)]/20 shadow-[var(--shadow-luxury)] min-w-[140px] overflow-hidden z-50"
          >
            {locales.map((locale) => (
              <Link
                key={locale}
                href={getLocalePath(locale)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[0.7rem] tracking-[0.08em] uppercase transition-colors duration-200 ${
                  locale === lang
                    ? 'text-[var(--color-champagne-dark)] bg-[var(--color-champagne)]/10'
                    : 'text-[var(--color-warm-gray)] hover:text-[var(--color-champagne-dark)] hover:bg-[var(--color-champagne)]/5'
                }`}
              >
                <span className="font-medium">{locale.toUpperCase()}</span>
                <span className="text-[var(--color-warm-gray)]/60 normal-case tracking-normal">
                  {localeNames[locale]}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}