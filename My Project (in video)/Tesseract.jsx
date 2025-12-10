import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export default function Tesseract() {
  const outer = useRef()
  const inner = useRef()
  const reducedMotion = usePrefersReducedMotion()

  const config = useControls('Glass Material', {
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 1.2, min: 0, max: 3 },
    roughness: { value: 0.1, min: 0, max: 1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
    ior: { value: 1.5, min: 1, max: 2 },
  })

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const speed = reducedMotion ? 0.1 : 0.4

    if (outer.current) {
      outer.current.rotation.x = t * speed * 0.5
      outer.current.rotation.y = t * speed * 0.6
    }
    
    if (inner.current) {
      // Counter rotation
      inner.current.rotation.x = -t * speed * 0.8
      inner.current.rotation.z = t * speed * 0.4
    }
  })

  return (
    <group>
      {/* Outer Glass Cube */}
      <mesh ref={outer}>
        <boxGeometry args={[3, 3, 3]} />
        <MeshTransmissionMaterial 
          {...config}
          background="#000000"
          backside={true}
          resolution={1024}
          samples={10} 
          color="#ffffff"
        />
      </mesh>

      {/* Inner Wireframe Cube */}
      <mesh ref={inner} scale={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
    </group>
  )
}