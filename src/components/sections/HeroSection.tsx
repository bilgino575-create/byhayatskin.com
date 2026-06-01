'use client'

import { useRef, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, RoundedBox, OrbitControls } from '@react-three/drei'
import type { DictionaryType, Locale } from '@/lib/i18n/dictionaries'
import * as THREE from 'three'

interface HeroSectionProps {
  dict: DictionaryType
  lang: Locale
}

// ── Eyeshadow Palette ──
function EyeshadowPalette() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.18
    groupRef.current.rotation.x = -0.18 + Math.sin(state.clock.elapsedTime * 0.12) * 0.04
  })

  // Palette pan colors: beige, rose, nude, champagne gold, soft taupe, blush
  const panColors = [
    '#E8D5C4', '#D4A5A5', '#C9A96E', '#B8967A',
    '#E2C4B0', '#C4A882', '#D4B896', '#BFA090',
    '#E8C8B8', '#C8A898', '#D4B8A8', '#B89888',
  ]

  return (
    <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0.2, 0]}>

        {/* ── Palette base (bottom tray) ── */}
        <RoundedBox args={[3.2, 0.18, 2.0]} radius={0.06} smoothness={4} position={[0, -0.09, 0]}>
          <meshStandardMaterial
            color="#2A2420"
            roughness={0.15}
            metalness={0.4}
            envMapIntensity={1.2}
          />
        </RoundedBox>

        {/* ── Palette lid (open, tilted back) ── */}
        <group position={[0, 0.05, -1.05]} rotation={[-Math.PI * 0.55, 0, 0]}>
          <RoundedBox args={[3.2, 0.12, 2.0]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color="#1E1A18"
              roughness={0.12}
              metalness={0.5}
              envMapIntensity={1.5}
            />
          </RoundedBox>
          {/* Mirror inside lid */}
          <mesh position={[0, 0.07, 0]}>
            <planeGeometry args={[2.8, 1.7]} />
            <meshStandardMaterial
              color="#C8C0B8"
              roughness={0.02}
              metalness={0.95}
              envMapIntensity={3}
            />
          </mesh>
          {/* Brand text area on lid */}
          <mesh position={[0, -0.07, 0.6]}>
            <planeGeometry args={[1.2, 0.25]} />
            <meshStandardMaterial color="#C9A96E" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>

        {/* ── Eyeshadow pans (4x3 grid) ── */}
        {panColors.map((color, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const x = (col - 1.5) * 0.72
          const z = (row - 1) * 0.58
          return (
            <group key={i} position={[x, 0.02, z]}>
              {/* Pan rim */}
              <mesh>
                <cylinderGeometry args={[0.28, 0.28, 0.06, 32]} />
                <meshStandardMaterial color="#3A3230" roughness={0.2} metalness={0.5} />
              </mesh>
              {/* Pan color surface */}
              <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.24, 0.24, 0.02, 32]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.55}
                  metalness={0.08}
                  envMapIntensity={0.8}
                />
              </mesh>
            </group>
          )
        })}

        {/* ── Gold palette frame edge ── */}
        <mesh position={[0, 0.0, 0]}>
          <boxGeometry args={[3.28, 0.22, 2.08]} />
          <meshStandardMaterial
            color="#C9A96E"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.0}
            wireframe={false}
          />
        </mesh>

      </group>
    </Float>
  )
}

// ── Makeup Brush 1 (large powder brush) ──
function MakeupBrush1() {
  const brushRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!brushRef.current) return
    const t = state.clock.elapsedTime
    // Gentle sweep motion over palette
    brushRef.current.position.x = -0.6 + Math.sin(t * 0.35) * 0.5
    brushRef.current.position.y = 1.1 + Math.sin(t * 0.35) * 0.08
    brushRef.current.rotation.z = -0.5 + Math.sin(t * 0.35) * 0.12
    brushRef.current.rotation.x = 0.3
  })

  return (
    <group ref={brushRef} position={[-0.6, 1.1, 0.3]}>
      {/* Handle */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 2.2, 16]} />
        <meshStandardMaterial color="#C9A96E" roughness={0.08} metalness={0.85} envMapIntensity={2} />
      </mesh>
      {/* Ferrule (metal band) */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.22, 16]} />
        <meshStandardMaterial color="#D4AF6E" roughness={0.05} metalness={0.95} envMapIntensity={2.5} />
      </mesh>
      {/* Bristle base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.065, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#E8D5C4" roughness={0.9} metalness={0} />
      </mesh>
      {/* Bristle dome */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.14, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#EDE0D4" roughness={0.95} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Makeup Brush 2 (detail brush, angled) ──
function MakeupBrush2() {
  const brushRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!brushRef.current) return
    const t = state.clock.elapsedTime * 0.22
    brushRef.current.rotation.z = 0.6 + Math.sin(t) * 0.06
    brushRef.current.position.y = 0.8 + Math.sin(t * 1.3) * 0.05
  })

  return (
    <group ref={brushRef} position={[1.8, 0.8, 0.2]} rotation={[0.2, 0, 0.6]}>
      {/* Handle */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.032, 0.04, 2.0, 12]} />
        <meshStandardMaterial color="#1E1A18" roughness={0.12} metalness={0.5} envMapIntensity={1.5} />
      </mesh>
      {/* Ferrule */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.18, 12]} />
        <meshStandardMaterial color="#C9A96E" roughness={0.06} metalness={0.9} envMapIntensity={2} />
      </mesh>
      {/* Bristle — flat angled */}
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.08, 0.22, 0.04]} />
        <meshStandardMaterial color="#E8D0C0" roughness={0.92} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Compact Powder Case ──
function CompactPowder() {
  const compactRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!compactRef.current) return
    compactRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.15
    compactRef.current.position.y = -0.8 + Math.sin(state.clock.elapsedTime * 0.9 + 1.5) * 0.06
  })

  return (
    <Float speed={1.3} rotationIntensity={0.05} floatIntensity={0.4}>
      <group ref={compactRef} position={[1.6, -0.8, 0.6]}>
        {/* Base */}
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 0.12, 48]} />
          <meshStandardMaterial color="#1E1A18" roughness={0.1} metalness={0.6} envMapIntensity={2} />
        </mesh>
        {/* Gold rim */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.57, 0.57, 0.14, 48]} />
          <meshStandardMaterial
            color="#C9A96E"
            roughness={0.08}
            metalness={0.88}
            envMapIntensity={2.5}
            transparent
            opacity={0.0}
          />
        </mesh>
        {/* Powder surface */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.02, 48]} />
          <meshStandardMaterial color="#E8C8B0" roughness={0.7} metalness={0.02} />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.1, 48]} />
          <meshStandardMaterial color="#2A2420" roughness={0.08} metalness={0.55} envMapIntensity={2} />
        </mesh>
        {/* Mirror on lid */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.01, 48]} />
          <meshStandardMaterial color="#D0C8C0" roughness={0.01} metalness={0.98} envMapIntensity={4} />
        </mesh>
        {/* Gold logo mark */}
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.005, 32]} />
          <meshStandardMaterial color="#C9A96E" roughness={0.15} metalness={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

// ── Golden Dust Particles (brush interaction) ──
function GoldenDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 60

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.5
      pos[i * 3 + 1] = Math.random() * 0.8 + 0.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
      spd[i] = 0.3 + Math.random() * 0.7
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.002 * speeds[i]
      if (pos[i * 3 + 1] > 1.5) pos[i * 3 + 1] = 0.1
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#C9A96E"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Ambient Glow Particles ──
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 50

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#E8D5B0" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ── 3D Scene ──
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className="w-full h-full"
    >
      {/* Lighting */}
      <ambientLight intensity={0.7} color="#FFF8F0" />
      <directionalLight position={[4, 8, 5]} intensity={1.6} color="#F5E6C8" castShadow />
      <directionalLight position={[-5, 3, -2]} intensity={0.5} color="#E8D5B0" />
      <pointLight position={[0, 5, 3]} intensity={1.0} color="#D4AF6E" />
      <pointLight position={[-3, 1, 4]} intensity={0.4} color="#F0E0D0" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#C9A96E" />

      <Suspense fallback={null}>
        <Environment preset="studio" />

        {/* Slow cinematic orbit */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.4}
          target={[0, 0, 0]}
        />

        <EyeshadowPalette />
        <MakeupBrush1 />
        <MakeupBrush2 />
        <CompactPowder />
        <GoldenDust />
        <AmbientParticles />
      </Suspense>
    </Canvas>
  )
}

export function HeroSection({ dict, lang }: HeroSectionProps) {
  const headlineLines = dict.hero.headline.split('\n')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ivory)]">

      {/* Background: warm ivory studio */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFAF5] via-[#FAF5EC] to-[#EDE0CC]" />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      {/* Soft radial glow behind scene */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[90%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.09) 0%, rgba(232,213,176,0.05) 45%, transparent 70%)',
        }}
      />

      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 w-full lg:w-[54%] h-full opacity-95 lg:opacity-100">
        <Scene3D />
      </div>

      {/* Left content vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-[var(--color-ivory)]/88 to-transparent lg:via-[var(--color-ivory)]/55" />

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