'use client'

import { useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'
import * as THREE from 'three'

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

// ── 3D Floating Serum Bottle (abstract luxury orb) ──
function LuxuryOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#C9A96E"
            attach="material"
            distort={0.35}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1.5}
          />
        </Sphere>
      </mesh>
    </Float>
  )
}

// ── Gold Particles ──
function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 120

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C9A96E"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// ── 3D Scene ──
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="w-full h-full"
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#E8D5B0" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#B76E79" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <LuxuryOrb />
        <GoldParticles />
      </Suspense>
    </Canvas>
  )
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const headlineLines = dict.hero.headline.split('\n')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ivory)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ivory)] via-[var(--color-pearl)] to-[var(--color-beige)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-80 lg:opacity-100">
        <Scene3D />
      </div>

      {/* Soft vignette overlay on 3D side */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-[var(--color-ivory)]/80 to-transparent lg:via-[var(--color-ivory)]/60" />

      {/* Content */}
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
            <Link
              href={`/${lang}/products`}
              className="btn-luxury btn-primary"
            >
              {dict.hero.cta_primary}
            </Link>
            <Link
              href={`/${lang}/consultation`}
              className="btn-luxury btn-outline"
            >
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