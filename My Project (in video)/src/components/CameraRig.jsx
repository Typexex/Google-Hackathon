import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { usePrefersReducedMotion } from '../usePrefersReducedMotion'

export default function CameraRig() {
  const vec = new Vector3()
  const reducedMotion = usePrefersReducedMotion()

  useFrame((state) => {
    if (reducedMotion) {
      // Static slightly elevated view for reduced motion
      state.camera.position.lerp(vec.set(0, 0, 10), 0.05)
      state.camera.lookAt(0, 0, 0)
      return
    }

    // Mouse parallax
    // state.pointer.x/y are normalized coordinates (-1 to 1)
    const x = state.pointer.x * 2 // Horizontal range
    const y = state.pointer.y * 2 // Vertical range

    state.camera.position.lerp(vec.set(x, y, 10), 0.05)
    state.camera.lookAt(0, 0, 0)
  })

  return null
}