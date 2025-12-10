import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export default function CameraRig() {
  const reducedMotion = usePrefersReducedMotion()
  
  useFrame((state, delta) => {
    // Basic camera position
    const targetPos = new Vector3(0, 0, 10)

    if (!reducedMotion) {
      // Add parallax based on mouse position
      // state.pointer.x goes from -1 to 1
      // We want a subtle movement, say +/- 1 unit on x and y
      const parallaxX = -state.pointer.x * 1.5
      const parallaxY = -state.pointer.y * 1.5
      
      targetPos.x += parallaxX
      targetPos.y += parallaxY
    }

    // Smooth lerp
    // 0.05 factor for smooth delay
    state.camera.position.lerp(targetPos, 0.05)
    
    // Always look at center
    state.camera.lookAt(0, 0, 0)
  })

  return null
}