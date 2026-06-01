'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'enter' | 'exit'>('idle')

  useEffect(() => {
    setTransitionStage('enter')
    const t = setTimeout(() => {
      setDisplayChildren(children)
      setTransitionStage('idle')
    }, 600)
    return () => clearTimeout(t)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative overflow-hidden">
      {/* Curtain wipe — slides in from left on route change */}
      <AnimatePresence>
        {transitionStage === 'enter' && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[9998] pointer-events-none"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 0.9,
              times: [0, 0.4, 0.6, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              background: 'linear-gradient(135deg, #0D0B09 0%, #1A1208 50%, #C9A96E 100%)',
              transformOrigin: 'left center',
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {displayChildren}
      </motion.div>
    </div>
  )
}