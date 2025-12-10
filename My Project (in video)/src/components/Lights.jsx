import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

export default function Lights() {
  const light1 = useRef()
  const light2 = useRef()
  const reducedMotion = usePrefersReducedMotion()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const speed = reducedMotion ? 0.2 : 1.0 // Slower movement if reduced motion

    // Cyan Light Path
    if (light1.current) {
      light1.current.position.x = Math.sin(t * speed * 0.7) * 5
      light1.current.position.y = Math.cos(t * speed * 0.5) * 5
      light1.current.position.z = Math.sin(t * speed * 0.3) * 5
    }

    // Magenta Light Path (Opposite phase/speed)
    if (light2.current) {
      light2.current.position.x = Math.cos(t * speed * 0.6) * 5
      light2.current.position.y = Math.sin(t * speed * 0.8) * 5
      light2.current.position.z = Math.cos(t * speed * 0.4) * 5
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