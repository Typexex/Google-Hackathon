import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva'
import Tesseract from './Tesseract'
import Particles from './Particles'
import Lights from './Lights'
import CameraRig from './CameraRig'

export default function Scene() {
  const bloomConfig = useControls('Bloom', {
    intensity: { value: 1.5, min: 0, max: 10 },
    luminanceThreshold: { value: 0.1, min: 0, max: 1 },
    luminanceSmoothing: { value: 0.2, min: 0, max: 1 },
    mipmapBlur: true
  }, { collapsed: true })

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ antialias: false, alpha: false, stencil: false }}
      >
        <color attach="background" args={['#050505']} />
        
        <CameraRig />
        <Lights />
        
        <Tesseract />
        <Particles count={2000} />

        <EffectComposer disableNormalPass>
          <Bloom 
            {...bloomConfig} 
          />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}