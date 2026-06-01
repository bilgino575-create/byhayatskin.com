'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(15,14,12,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.1)' : 'none',
          paddingTop: scrolled ? '0.75rem' : '1.25rem',
          paddingBottom: scrolled ? '0.75rem' : '1.25rem',
        }}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex flex-col leading-none group">
            <span
              className="tracking-[0.15em] uppercase transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.2rem',
                fontWeight: 300,
                color: '#F5EFE6',
                letterSpacing: '0.15em',
              }}
            >
              By Hayat Skin
            </span>
            <span
              className="text-[0.55rem] tracking-[0.3em] uppercase font-light"
              style={{ color: 'rgba(201,169,110,0.5)' }}
            >
              Dubai
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.68rem] tracking-[0.12em] uppercase transition-colors duration-300 relative group"
                style={{ color: 'rgba(245,239,230,0.45)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.9)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,239,230,0.45)'}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: 'rgba(201,169,110,0.5)' }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/consultation`}
              className="px-5 py-2.5 text-[0.62rem] tracking-[0.15em] uppercase font-medium transition-all duration-400"
              style={{
                background: 'linear-gradient(135deg, #A07840, #C9A96E)',
                color: '#0F0E0C',
              }}
            >
              {dict.nav.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
            style={{ color: '#F5EFE6' }}
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
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-8 lg:hidden"
            style={{
              background: 'rgba(15,14,12,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(201,169,110,0.08)',
            }}
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
                    className="block transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '2rem',
                      fontWeight: 300,
                      color: 'rgba(245,239,230,0.7)',
                      letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A96E'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,239,230,0.7)'}
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
                className="w-full text-center px-8 py-3.5 text-[0.65rem] tracking-[0.18em] uppercase font-medium"
                style={{ background: 'linear-gradient(135deg, #A07840, #C9A96E)', color: '#0F0E0C' }}
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