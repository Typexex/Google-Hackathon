import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import Tesseract from './Tesseract'
import Particles from './Particles'
import Lights from './Lights'
import CameraRig from './CameraRig'

export default function Scene() {
  const bloomConfig = useControls('Bloom', {
    intensity: { value: 1.5, min: 0, max: 5 },
    luminanceThreshold: { value: 0.02, min: 0, max: 1 },
    luminanceSmoothing: { value: 0.2, min: 0, max: 1 },
  })

  return (
    <>
      <CameraRig />
      <Lights />
      
      <group>
        <Tesseract />
        <Particles />
      </group>

      <EffectComposer disableNormalPass>
        <Bloom 
          mipmapBlur 
          {...bloomConfig}
        />
        <Noise opacity={0.05} />
        <Vignette offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}