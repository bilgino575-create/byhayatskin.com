'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// ── Real Mascara GLB Model ──
function MascaraModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/mascara.glb')

  // Clone scene to avoid mutation
  const cloned = useMemo(() => scene.clone(), [scene])

  // Apply luxury dark materials to all meshes
  useMemo(() => {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.envMapIntensity = 2.5
          mat.needsUpdate = true
        }
      }
    })
  }, [cloned])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.18
    groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.06
  })

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.5}>
      <group ref={groupRef} scale={[22, 22, 22]} position={[1.2, -0.2, 0]}>
        <primitive object={cloned} />
      </group>
    </Float>
  )
}

// ── Ambient Gold Particles ──
function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 80

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#C9A96E"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Soft Glow Ring behind model ──
function GlowRing() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02
  })

  return (
    <mesh ref={meshRef} position={[1.2, 0, -3]} rotation={[0, 0, 0]}>
      <circleGeometry args={[4, 64]} />
      <meshBasicMaterial
        color="#C9A96E"
        transparent
        opacity={0.025}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// ── Fallback while model loads ──
function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
  })

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.15, 0.2, 2.8, 32]} />
      <meshStandardMaterial
        color="#C9A96E"
        transparent
        opacity={0.18}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  )
}

export default function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [-1.2, 0.5, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Lighting — warm luxury studio */}
      <ambientLight intensity={0.5} color="#FFF0E0" />
      <directionalLight position={[4, 8, 5]} intensity={2.0} color="#F5E6C8" />
      <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#E8D5B0" />
      <pointLight position={[0, 5, 3]} intensity={1.5} color="#D4AF6E" />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#F0E0D0" />
      <pointLight position={[3, 2, -1]} intensity={0.3} color="#C9A96E" />

      <Suspense fallback={<LoadingFallback />}>
        <Environment preset="studio" />
        <GlowRing />
        <MascaraModel />
        <GoldParticles />
      </Suspense>
    </Canvas>
  )
}

// Preload the model
useGLTF.preload('/models/mascara.glb')