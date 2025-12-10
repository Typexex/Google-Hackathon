import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva'
import * as SimplexModule from 'simplex-noise'

function Tesseract(props) {
  const innerRef = useRef()
  const outerRef = useRef()

  useFrame((state, delta) => {
    innerRef.current.rotation.x += delta * 0.5
    innerRef.current.rotation.y += delta * 0.5
    outerRef.current.rotation.y += delta * 0.1
    outerRef.current.rotation.x += delta * 0.1
  })

  // Leva controls for tweaking the material
  const config = useControls({
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 2.5, min: 0, max: 10 },
    roughness: { value: 0.1, min: 0, max: 1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
    anisotropicBlur: { value: 0.1, min: 0, max: 1 },
    distortion: { value: 0.1, min: 0, max: 1 },
    distortionScale: { value: 0.3, min: 0, max: 1 },
    temporalDistortion: { value: 0.5, min: 0, max: 1 },
  })

  return (
    <group {...props}>
      {/* Outer Glass Cube */}
      <mesh ref={outerRef}>
        <boxGeometry args={[3, 3, 3]} />
        <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} {...config} />
      </mesh>
      {/* Inner Wireframe Cube */}
      <mesh ref={innerRef} scale={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial wireframe color="cyan" />
      </mesh>
    </group>
  )
}

function Particles({ count = 2000 }) {
  const instancedMeshRef = useRef()
  const simplex = useMemo(() => new SimplexModule.SimplexNoise(), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
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
      
      particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.02
      particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.02

      dummy.position.set(
        (particle.mx / 10) + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix)
    })
    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.02, 32, 32]} />
      <meshBasicMaterial color="#b0fdff" />
    </instancedMesh>
  )
}

function Lights() {
  const light1 = useRef()
  const light2 = useRef()
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    light1.current.position.x = Math.sin(time * 0.5) * 10
    light1.current.position.z = Math.cos(time * 0.5) * 10
    light2.current.position.x = Math.sin(time * 0.3) * -10
    light2.current.position.z = Math.cos(time * 0.7) * 10
  })
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={light1} color="cyan" intensity={15} distance={20} />
      <pointLight ref={light2} color="magenta" intensity={10} distance={20} />
    </>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    state.camera.position.lerp(new THREE.Vector3(-state.mouse.x * 2, -state.mouse.y * 2, 10), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <>
      <Tesseract position={[0, 0, 0]} />
      <Particles />
      <Lights />
      <CameraRig />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} intensity={1.5} levels={9} mipmapBlur />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}