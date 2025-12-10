import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

const noise3D = createNoise3D()

export default function Particles({ count = 2000 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const reducedMotion = usePrefersReducedMotion()
  
  // Initial positions
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 15
      
      temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return

    const time = state.clock.getElapsedTime()
    // Significantly reduce movement speed if reduced motion is enabled
    const timeScale = reducedMotion ? 0.05 : 0.2 

    particles.forEach((particle, i) => {
      // Noise driven movement
      let { x, y, z, t, speed, factor } = particle
      
      // Update internal time
      t = particle.t += speed / 2
      
      // Calculate noise offsets
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      
      // Apply noise
      const s = Math.cos(t)
      
      // Mutate positions with noise
      const nX = noise3D(x / factor, y / factor, time * timeScale)
      const nY = noise3D(y / factor, z / factor, time * timeScale)
      const nZ = noise3D(z / factor, x / factor, time * timeScale)

      particle.mx += (nX * 0.05)
      particle.my += (nY * 0.05)
      
      // Gentle orbit + noise
      dummy.position.set(
        x + Math.cos((t * 0.1) + particle.mx) * 2,
        y + Math.sin((t * 0.1) + particle.my) * 2,
        z + nZ
      )
      
      // Scale based on sine wave for "breathing" effect
      const scale = (Math.sin(t * 5) + 2) * 0.02
      dummy.scale.set(scale, scale, scale)
      
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  )
}