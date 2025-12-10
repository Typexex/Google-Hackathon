import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import * as THREE from 'three'

export default function Lights() {
  const light1 = useRef()
  const light2 = useRef()
  const reducedMotion = usePrefersReducedMotion()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const speed = reducedMotion ? 0.2 : 0.8
    const range = 6 // Movement radius

    if (light1.current) {
      light1.current.position.x = Math.sin(t * speed) * range
      light1.current.position.y = Math.cos(t * speed * 0.5) * range
      light1.current.position.z = Math.sin(t * speed * 0.8) * range
    }

    if (light2.current) {
      light2.current.position.x = Math.sin(t * speed * 0.7 + 2) * range
      light2.current.position.y = Math.cos(t * speed * 0.3 + 1) * range
      light2.current.position.z = Math.sin(t * speed + 4) * range
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Cyan Light */}
      <pointLight 
        ref={light1} 
        color="#00FFFF" 
        intensity={15} 
        distance={20} 
        decay={2}
      />
      
      {/* Magenta Light */}
      <pointLight 
        ref={light2} 
        color="#FF00FF" 
        intensity={15} 
        distance={20} 
        decay={2}
      />
    </>
  )
}