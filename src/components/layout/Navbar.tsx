'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import type { DictionaryType } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

interface NavbarProps {
  dict: DictionaryType
  lang: Locale
}

export function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: `/${lang}/products`, label: dict.nav.products },
    { href: `/${lang}/consultation`, label: dict.nav.consultation },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-[var(--color-champagne)]/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex flex-col leading-none group"
          >
            <span
              className="heading-luxury text-xl tracking-[0.15em] uppercase text-[var(--color-matte-black)] group-hover:text-[var(--color-champagne-dark)] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              By Hayat Skin
            </span>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-champagne)] font-light">
              Dubai
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-warm-gray)] hover:text-[var(--color-champagne-dark)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-champagne)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/consultation`}
              className="btn-luxury btn-primary text-[0.7rem] px-5 py-2.5"
            >
              {dict.nav.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[var(--color-matte-black)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 glass flex flex-col pt-24 px-8 pb-8 lg:hidden"
          >
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="heading-luxury text-2xl text-[var(--color-matte-black)] hover:text-[var(--color-champagne-dark)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-4 mt-8">
              <LanguageSwitcher lang={lang} />
              <Link
                href={`/${lang}/consultation`}
                onClick={() => setMobileOpen(false)}
                className="btn-luxury btn-primary w-full text-center"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}