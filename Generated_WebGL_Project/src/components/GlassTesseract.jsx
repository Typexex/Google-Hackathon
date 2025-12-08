import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const innerBoxGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);

function GlassTesseract() {
  const outerCube = useRef();
  const innerCube = useRef();

  useFrame((state, delta) => {
    // Animate rotations
    outerCube.current.rotation.x += delta * 0.15;
    outerCube.current.rotation.y += delta * 0.1;
    innerCube.current.rotation.y -= delta * 0.25;
    innerCube.current.rotation.z -= delta * 0.2;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Glass Cube */}
      <mesh ref={outerCube} geometry={boxGeometry}>
        <MeshTransmissionMaterial
          backside
          transmission={1}
          thickness={0.2}
          roughness={0.1}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          ior={1.5}
        />
      </mesh>

      {/* Inner Glowing Wireframe Cube */}
      <mesh ref={innerCube} geometry={innerBoxGeometry}>
        <meshBasicMaterial color={[1.5, 0.5, 0]} toneMapped={false} wireframe />
      </mesh>
    </group>
  );
}

export default GlassTesseract;