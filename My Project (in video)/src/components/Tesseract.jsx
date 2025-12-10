import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

export default function Tesseract() {
  const outer = useRef()
  const inner = useRef()
  const reducedMotion = usePrefersReducedMotion()

  // Leva controls for tweaking visuals if needed during dev
  const materialProps = useControls('Glass Material', {
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 1.2, min: 0, max: 5 },
    roughness: { value: 0.1, min: 0, max: 1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
    anisotropicBlur: { value: 0.1, min: 0, max: 1 },
    distortion: { value: 0.2, min: 0, max: 1 },
    distortionScale: { value: 0.3, min: 0.1, max: 1 },
    temporalDistortion: { value: 0.5, min: 0, max: 1 },
  }, { collapsed: true })

  useFrame((state, delta) => {
    // Rotation logic
    const speed = reducedMotion ? 0.1 : 0.5
    
    if (outer.current) {
      outer.current.rotation.x += delta * speed * 0.2
      outer.current.rotation.y += delta * speed * 0.25
    }
    
    if (inner.current) {
      inner.current.rotation.x -= delta * speed * 0.2
      inner.current.rotation.y -= delta * speed * 0.3
    }
  })

  return (
    <group>
      {/* Outer Glass Cube */}
      <mesh ref={outer}>
        <boxGeometry args={[3, 3, 3]} />
        <MeshTransmissionMaterial 
          {...materialProps} 
          backside 
          color="#ffffff"
          resolution={512}
        />
      </mesh>

      {/* Inner Wireframe Cube */}
      <mesh ref={inner} scale={0.5}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
    </group>
  )
}