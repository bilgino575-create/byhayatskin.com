'use client'

import { useRef, Suspense, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// ── Responsive hook — runs only client-side ──
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

// ── Real Mascara GLB Model ──
function MascaraModel({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/mascara.glb')

  const cloned = useMemo(() => scene.clone(), [scene])

  // Auto-center: compute bounding box and offset so model origin = center
  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const center = new THREE.Vector3()
    box.getCenter(center)
    return center
  }, [cloned])

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

  const scale: [number, number, number] = isMobile ? [6, 6, 6] : [13, 13, 13]
  const position: [number, number, number] = isMobile ? [0, -0.5, 0] : [0, -0.5, 0]

  return (
    <Float speed={1.2} rotationIntensity={0.06} floatIntensity={isMobile ? 0.15 : 0.3}>
      <group ref={groupRef} scale={scale} position={position}>
        {/* Offset inner group to cancel GLB's own origin offset */}
        <group position={[-centerOffset.x, -centerOffset.y, -centerOffset.z]}>
          <primitive object={cloned} />
        </group>
      </group>
    </Float>
  )
}

// ── Ambient Gold Particles ──
function GoldParticles({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = isMobile ? 40 : 80

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const spread = isMobile ? 6 : 9
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [count, isMobile])

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
        size={isMobile ? 0.03 : 0.022}
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
function GlowRing({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02
  })

  const pos: [number, number, number] = [0, 0, -3]

  return (
    <mesh ref={meshRef} position={pos}>
      <circleGeometry args={[isMobile ? 3 : 4, 64]} />
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

// ── Scene content — receives isMobile as prop ──
function SceneContent({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={1.2} color="#FFF8F0" />
      <directionalLight position={[4, 8, 5]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-5, 3, -2]} intensity={1.0} color="#F5EDD8" />
      <pointLight position={[0, 5, 3]} intensity={2.0} color="#E8D5B0" />
      <pointLight position={[-3, -2, 3]} intensity={0.6} color="#F5EDD8" />
      <pointLight position={[3, 2, -1]} intensity={0.5} color="#C9A96E" />

      <Suspense fallback={<LoadingFallback />}>
        <Environment preset="studio" />
        <GlowRing isMobile={isMobile} />
        <MascaraModel isMobile={isMobile} />
        <GoldParticles isMobile={isMobile} />
      </Suspense>
    </>
  )
}

export default function HeroScene3D() {
  const isMobileRaw = useIsMobile()

  // Wait for client-side detection before rendering Canvas
  // This prevents hydration mismatch and wrong camera on mobile
  if (isMobileRaw === null) {
    return (
      <div
        className="w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.08) 0%, transparent 65%)',
        }}
      />
    )
  }

  const isMobile = isMobileRaw

  const cameraPosition: [number, number, number] = isMobile
    ? [0, 0, 9]
    : [0, 0, 6]
  const cameraFov = isMobile ? 55 : 42

  return (
    // key forces Canvas remount when mobile/desktop switches
    <Canvas
      key={isMobile ? 'mobile' : 'desktop'}
      camera={{ position: cameraPosition, fov: cameraFov }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContent isMobile={isMobile} />
    </Canvas>
  )
}

// Preload the model
useGLTF.preload('/models/mascara.glb')