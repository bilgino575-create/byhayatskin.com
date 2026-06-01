'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// ── Eyeshadow Palette ──
function EyeshadowPalette() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.18
    groupRef.current.rotation.x = -0.18 + Math.sin(state.clock.elapsedTime * 0.12) * 0.04
  })

  const panColors = [
    '#E8D5C4', '#D4A5A5', '#C9A96E', '#B8967A',
    '#E2C4B0', '#C4A882', '#D4B896', '#BFA090',
    '#E8C8B8', '#C8A898', '#D4B8A8', '#B89888',
  ]

  return (
    <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0.2, 0]}>

        {/* Palette base */}
        <RoundedBox args={[3.2, 0.18, 2.0]} radius={0.06} smoothness={4} position={[0, -0.09, 0]}>
          <meshStandardMaterial color="#2A2420" roughness={0.15} metalness={0.4} envMapIntensity={1.2} />
        </RoundedBox>

        {/* Palette lid (open, tilted back) */}
        <group position={[0, 0.05, -1.05]} rotation={[-Math.PI * 0.55, 0, 0]}>
          <RoundedBox args={[3.2, 0.12, 2.0]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#1E1A18" roughness={0.12} metalness={0.5} envMapIntensity={1.5} />
          </RoundedBox>
          {/* Mirror inside lid */}
          <mesh position={[0, 0.07, 0]}>
            <planeGeometry args={[2.8, 1.7]} />
            <meshStandardMaterial color="#C8C0B8" roughness={0.02} metalness={0.95} envMapIntensity={3} />
          </mesh>
          {/* Brand mark on lid */}
          <mesh position={[0, -0.07, 0.6]}>
            <planeGeometry args={[1.2, 0.25]} />
            <meshStandardMaterial color="#C9A96E" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>

        {/* Eyeshadow pans 4×3 */}
        {panColors.map((color, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const x = (col - 1.5) * 0.72
          const z = (row - 1) * 0.58
          return (
            <group key={i} position={[x, 0.02, z]}>
              <mesh>
                <cylinderGeometry args={[0.28, 0.28, 0.06, 32]} />
                <meshStandardMaterial color="#3A3230" roughness={0.2} metalness={0.5} />
              </mesh>
              <mesh position={[0, 0.04, 0]}>
                <cylinderGeometry args={[0.24, 0.24, 0.02, 32]} />
                <meshStandardMaterial color={color} roughness={0.55} metalness={0.08} envMapIntensity={0.8} />
              </mesh>
            </group>
          )
        })}
      </group>
    </Float>
  )
}

// ── Makeup Brush 1 (powder brush) ──
function MakeupBrush1() {
  const brushRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!brushRef.current) return
    const t = state.clock.elapsedTime
    brushRef.current.position.x = -0.6 + Math.sin(t * 0.35) * 0.5
    brushRef.current.position.y = 1.1 + Math.sin(t * 0.35) * 0.08
    brushRef.current.rotation.z = -0.5 + Math.sin(t * 0.35) * 0.12
    brushRef.current.rotation.x = 0.3
  })

  return (
    <group ref={brushRef} position={[-0.6, 1.1, 0.3]}>
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 2.2, 16]} />
        <meshStandardMaterial color="#C9A96E" roughness={0.08} metalness={0.85} envMapIntensity={2} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.22, 16]} />
        <meshStandardMaterial color="#D4AF6E" roughness={0.05} metalness={0.95} envMapIntensity={2.5} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.065, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#E8D5C4" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.14, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#EDE0D4" roughness={0.95} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Makeup Brush 2 (detail brush) ──
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
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.032, 0.04, 2.0, 12]} />
        <meshStandardMaterial color="#1E1A18" roughness={0.12} metalness={0.5} envMapIntensity={1.5} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.18, 12]} />
        <meshStandardMaterial color="#C9A96E" roughness={0.06} metalness={0.9} envMapIntensity={2} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.08, 0.22, 0.04]} />
        <meshStandardMaterial color="#E8D0C0" roughness={0.92} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Compact Powder ──
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
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 0.12, 48]} />
          <meshStandardMaterial color="#1E1A18" roughness={0.1} metalness={0.6} envMapIntensity={2} />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.02, 48]} />
          <meshStandardMaterial color="#E8C8B0" roughness={0.7} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.1, 48]} />
          <meshStandardMaterial color="#2A2420" roughness={0.08} metalness={0.55} envMapIntensity={2} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.44, 0.44, 0.01, 48]} />
          <meshStandardMaterial color="#D0C8C0" roughness={0.01} metalness={0.98} envMapIntensity={4} />
        </mesh>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.005, 32]} />
          <meshStandardMaterial color="#C9A96E" roughness={0.15} metalness={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

// ── Golden Dust Particles ──
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
      <pointsMaterial size={0.018} color="#C9A96E" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ── Ambient Particles ──
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

// ── Auto-rotating camera wrapper ──
function AutoRotateScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.07
  })

  return (
    <group ref={groupRef}>
      <EyeshadowPalette />
      <MakeupBrush1 />
      <MakeupBrush2 />
      <CompactPowder />
      <GoldenDust />
      <AmbientParticles />
    </group>
  )
}

export default function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} color="#FFF8F0" />
      <directionalLight position={[4, 8, 5]} intensity={1.6} color="#F5E6C8" />
      <directionalLight position={[-5, 3, -2]} intensity={0.5} color="#E8D5B0" />
      <pointLight position={[0, 5, 3]} intensity={1.0} color="#D4AF6E" />
      <pointLight position={[-3, 1, 4]} intensity={0.4} color="#F0E0D0" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#C9A96E" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <AutoRotateScene />
      </Suspense>
    </Canvas>
  )
}