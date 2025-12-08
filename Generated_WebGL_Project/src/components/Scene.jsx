import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva'
import SimplexNoise from 'simplex-noise'

function Tesseract(props) {
  const innerRef = useRef()
  const outerRef = useRef()

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.1
      outerRef.current.rotation.y += delta * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.2
      innerRef.current.rotation.y -= delta * 0.05
    }
  })
  
  const transmissionControls = useControls('Tesseract', {
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 1.5, min: 0, max: 5 },
    roughness: { value: 0.1, min: 0, max: 1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
  })

  return (
    <group {...props}>
      {/* Outer Glass Cube */}
      <mesh ref={outerRef}>
        <boxGeometry args={[3, 3, 3]} />
        <MeshTransmissionMaterial
          backside
          {...transmissionControls}
        />
      </mesh>
      {/* Inner Wireframe Cube */}
      <mesh ref={innerRef} scale={0.5}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
    </group>
  )
}

function Particles({ count = 2000 }) {
  const instancedMeshRef = useRef()
  const { viewport, camera } = useThree()
  const simplex = useMemo(() => new SimplexNoise(), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.005 + Math.random() / 200
      const xFactor = -20 + Math.random() * 40
      const yFactor = -20 + Math.random() * 40
      const zFactor = -20 + Math.random() * 40
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state, delta) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.max(1.5, Math.cos(t) * 5)
      
      const time = state.clock.getElapsedTime()
      const noise = simplex.noise3D(
        (xFactor + t) * 0.1,
        (yFactor + t) * 0.1,
        (zFactor + t) * 0.1
      ) * 0.1;

      dummy.position.set(
        xFactor + Math.cos(t / 10) * factor + Math.sin(t * 1) * factor,
        yFactor + Math.sin(t / 10) * factor + Math.cos(t * 2) * factor,
        zFactor + noise
      )
      
      dummy.scale.setScalar(s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix)
    })
    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.02, 32, 32]} />
      <meshBasicMaterial color="white" />
    </instancedMesh>
  )
}

function Lights() {
  const ref1 = useRef()
  const ref2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref1.current.position.x = Math.sin(t * 0.5) * 5
    ref1.current.position.z = Math.cos(t * 0.5) * 5
    ref2.current.position.x = Math.cos(t * 0.3) * -6
    ref2.current.position.y = Math.sin(t * 0.3) * 6
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={ref1} position={[5, 0, 0]} color="#00FFFF" intensity={15} />
      <pointLight ref={ref2} position={[-5, 0, 0]} color="#FF00FF" intensity={15} />
    </>
  )
}

function CameraRig() {
    useFrame((state, delta) => {
        state.camera.position.lerp(
            new THREE.Vector3(-state.pointer.x * 2, state.pointer.y * 2, 10), 
            0.05
        )
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

export default function Scene() {
  const { intensity, luminanceThreshold, luminanceSmoothing } = useControls('Bloom', {
    intensity: { value: 1.5, min: 0, max: 5 },
    luminanceThreshold: { value: 0.02, min: 0, max: 1 },
    luminanceSmoothing: { value: 0.2, min: 0, max: 1 },
  })

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <Tesseract />
      <Particles />
      <Lights />
      <CameraRig />

      <EffectComposer>
        <Bloom 
          mipmapBlur 
          intensity={intensity}
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={luminanceSmoothing}
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}