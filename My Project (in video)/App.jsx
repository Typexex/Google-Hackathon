import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Scene from './Scene'
import UI from './UI'

function App() {
  return (
    <>
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false, stencil: false, alpha: false }}
          camera={{ position: [0, 0, 10], fov: 45 }}
        >
          <color attach="background" args={['#050505']} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <UI />

      {/* Debug Controls (hidden by default) */}
      <Leva collapsed hidden={window.location.hash !== '#debug'} />
    </>
  )
}

export default App