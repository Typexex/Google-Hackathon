import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useControls } from 'leva';

export function Tesseract() {
  const outerRef = useRef();
  const innerRef = useRef();
  const reducedMotion = usePrefersReducedMotion();

  // Expose tweakable parameters but keep collapsed
  // We hardcode defaults from requirements
  const config = useControls('Tesseract', {
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 1.2, min: 0, max: 5 },
    roughness: { value: 0.1, min: 0, max: 1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
    backside: true,
  }, { collapsed: true });

  useFrame((state, delta) => {
    if (!outerRef.current || !innerRef.current) return;

    // Rotation speeds
    const outerSpeed = reducedMotion ? 0.05 : 0.2;
    const innerSpeed = reducedMotion ? 0.1 : 0.3;

    // Outer cube: rotate on multiple axes slowly
    outerRef.current.rotation.x += delta * outerSpeed;
    outerRef.current.rotation.y += delta * outerSpeed * 0.5;

    // Inner cube: rotate faster, opposite direction
    innerRef.current.rotation.x -= delta * innerSpeed;
    innerRef.current.rotation.y -= delta * innerSpeed * 0.8;
    innerRef.current.rotation.z += delta * innerSpeed * 0.2;
  });

  return (
    <group>
      {/* Outer Glass Cube */}
      <mesh ref={outerRef} scale={2.5}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial 
          {...config}
          resolution={1024}
          distortion={0.2}
          color="#ffffff"
          background={null} // Important for transmission to see background
        />
      </mesh>

      {/* Inner Wireframe Cube */}
      <mesh ref={innerRef} scale={1.2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
    </group>
  );
}