'use client'

import { useRef, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'
import * as THREE from 'three'

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

// ── Luxury Serum Bottle Body ──
function SerumBottle() {
  const bottleRef = useRef<THREE.Group>(null)
  const liquidRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!bottleRef.current) return
    // Gentle slow float rotation
    bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12
    bottleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.04
    // Liquid shimmer
    if (liquidRef.current) {
      const mat = liquidRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.6}>
      <group ref={bottleRef} position={[0, 0, 0]}>

        {/* ── Main bottle glass body ── */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.42, 2.2, 64, 1, false]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.15}
            roughness={0.02}
            transmission={0.96}
            ior={1.5}
            chromaticAberration={0.03}
            anisotropy={0.1}
            distortion={0.05}
            distortionScale={0.2}
            temporalDistortion={0.02}
            color="#F5EDD8"
            attenuationColor="#E8D5A3"
            attenuationDistance={1.5}
          />
        </mesh>

        {/* ── Golden liquid inside ── */}
        <mesh ref={liquidRef} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 1.5, 48]} />
          <meshStandardMaterial
            color="#C9A96E"
            transparent
            opacity={0.75}
            roughness={0.05}
            metalness={0.2}
            emissive="#B8860B"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* ── Bottle shoulder (tapered top) ── */}
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.18, 0.38, 0.5, 48]} />
          <MeshTransmissionMaterial
            samples={4}
            thickness={0.1}
            roughness={0.02}
            transmission={0.95}
            ior={1.5}
            color="#F5EDD8"
          />
        </mesh>

        {/* ── Bottle neck ── */}
        <mesh position={[0, 1.62, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 0.28, 32]} />
          <meshStandardMaterial
            color="#E8D5B0"
            roughness={0.05}
            metalness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* ── Gold cap / dropper top ── */}
        <mesh position={[0, 1.95, 0]}>
          <cylinderGeometry args={[0.16, 0.14, 0.5, 32]} />
          <meshStandardMaterial
            color="#C9A96E"
            roughness={0.08}
            metalness={0.85}
            envMapIntensity={2}
          />
        </mesh>

        {/* ── Cap top dome ── */}
        <mesh position={[0, 2.22, 0]}>
          <sphereGeometry args={[0.16, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#D4AF6E"
            roughness={0.06}
            metalness={0.9}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* ── Subtle label area (frosted band) ── */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.385, 0.385, 0.9, 48]} />
          <meshStandardMaterial
            color="#FAF5EC"
            roughness={0.6}
            metalness={0}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* ── Bottom base rim ── */}
        <mesh position={[0, -1.15, 0]}>
          <cylinderGeometry args={[0.44, 0.42, 0.1, 48]} />
          <meshStandardMaterial
            color="#C9A96E"
            roughness={0.1}
            metalness={0.7}
          />
        </mesh>

      </group>
    </Float>
  )
}

// ── Soft Gold Particles (minimal, elegant) ──
function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 80

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#C9A96E"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}

// ── Soft Glow Halo behind bottle ──
function GlowHalo() {
  const haloRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!haloRef.current) return
    const mat = haloRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.5) * 0.025
  })

  return (
    <mesh ref={haloRef} position={[0, 0, -1.5]}>
      <circleGeometry args={[2.2, 64]} />
      <meshBasicMaterial
        color="#E8D5A3"
        transparent
        opacity={0.07}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── 3D Scene ──
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className="w-full h-full"
    >
      <ambientLight intensity={0.6} color="#FFF8F0" />
      <directionalLight position={[3, 6, 4]} intensity={1.8} color="#F5E6C8" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#E8D5B0" />
      <pointLight position={[0, 4, 3]} intensity={1.2} color="#D4AF6E" />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#F0E6D3" />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <GlowHalo />
        <SerumBottle />
        <GoldParticles />
      </Suspense>
    </Canvas>
  )
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const headlineLines = dict.hero.headline.split('\n')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ivory)]">
      {/* Background gradient — warm ivory studio */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ivory)] via-[var(--color-pearl)] to-[#EDE0CC]" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* Soft radial glow — right side, behind bottle */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.10) 0%, rgba(232,213,176,0.06) 40%, transparent 70%)',
        }}
      />

      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 w-full lg:w-[52%] h-full opacity-90 lg:opacity-100">
        <Scene3D />
      </div>

      {/* Soft vignette — left content protection */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-[var(--color-ivory)]/85 to-transparent lg:via-[var(--color-ivory)]/55" />

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