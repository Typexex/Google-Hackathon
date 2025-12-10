import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { Tesseract } from './Tesseract';
import { Particles } from './Particles';
import { Lights } from './Lights';
import { CameraRig } from './CameraRig';

function Effects() {
  const { bloomIntensity, bloomThreshold, noiseOpacity } = useControls('Effects', {
    bloomIntensity: { value: 1.5, min: 0, max: 5 },
    bloomThreshold: { value: 0.02, min: 0, max: 1 },
    noiseOpacity: { value: 0.05, min: 0, max: 0.5 },
  }, { collapsed: true });

  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={bloomThreshold} 
        mipmapBlur 
        intensity={bloomIntensity} 
        luminanceSmoothing={0.2} 
      />
      <Noise opacity={noiseOpacity} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}

export function Scene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Leva hidden={false} collapsed /> {/* Debug controls */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        
        <CameraRig />
        <Lights />
        
        <group>
          <Tesseract />
          <Particles />
        </group>

        <Effects />
      </Canvas>
    </div>
  );
}