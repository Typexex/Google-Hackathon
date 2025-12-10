import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const COUNT = 2000
const noise3D = createNoise3D()

export default function Particles() {
  const mesh = useRef()
  const reducedMotion = usePrefersReducedMotion()

  // Generate initial random positions
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 15
      // Store initial position and a random offset for noise
      temp.push({ 
        pos: new THREE.Vector3(x, y, z), 
        original: new THREE.Vector3(x, y, z),
        offset: Math.random() * 100 
      })
    }
    return temp
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!mesh.current) return

    const t = state.clock.getElapsedTime()
    const speedFactor = reducedMotion ? 0.05 : 0.2

    particles.forEach((particle, i) => {
      // Calculate noise based movement
      const { original, offset } = particle
      
      // Use noise to displace from original position
      const noiseX = noise3D(original.x * 0.1 + t * speedFactor, offset)
      const noiseY = noise3D(original.y * 0.1 + t * speedFactor, offset + 100)
      const noiseZ = noise3D(original.z * 0.1 + t * speedFactor, offset + 200)

      const movementRange = reducedMotion ? 0.2 : 1.5

      dummy.position.set(
        original.x + noiseX * movementRange,
        original.y + noiseY * movementRange,
        original.z + noiseZ * movementRange
      )
      
      // Slight rotation for each particle
      dummy.rotation.x = t * 0.1 + offset
      dummy.rotation.y = t * 0.1 + offset
      
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </instancedMesh>
  )
}