'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

type RevealVariant = 'rise' | 'slide-left' | 'slide-right' | 'scale' | 'fade' | 'curtain'

export function useCinematicReveal(variant: RevealVariant = 'rise', margin = '-80px') {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const variants = {
    rise: {
      hidden: { opacity: 0, y: 60, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
    },
    'slide-left': {
      hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
    },
    'slide-right': {
      hidden: { opacity: 0, x: 80, filter: 'blur(6px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.88, filter: 'blur(8px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 1.4, ease: 'easeOut' } },
    },
    curtain: {
      hidden: { clipPath: 'inset(0 100% 0 0)' },
      visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
    },
  }

  return {
    ref,
    animate: inView ? 'visible' : 'hidden',
    variants: variants[variant],
    inView,
  }
}