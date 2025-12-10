import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D, Color } from 'three';
import { createNoise3D } from 'simplex-noise';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

const COUNT = 2000;
const RADIUS = 6; // Spread radius

export function Particles() {
  const meshRef = useRef();
  const noise3D = createNoise3D();
  const reducedMotion = usePrefersReducedMotion();

  // Create dummy object for matrix calculations
  const dummy = useMemo(() => new Object3D(), []);
  
  // Initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = Math.cbrt(Math.random()) * RADIUS; // Cube root for uniform sphere distribution

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      temp.push({ 
        x, y, z, 
        initialX: x, initialY: y, initialZ: z,
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * 100
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime();
    // Reduce speed if motion reduced
    const timeFactor = reducedMotion ? 0.1 : 0.5;

    particles.forEach((particle, i) => {
      // Noise driven movement
      const noiseT = t * timeFactor + particle.offset;
      
      // Calculate noise displacement
      const dx = noise3D(particle.initialX * 0.1, particle.initialY * 0.1, noiseT) * 0.5;
      const dy = noise3D(particle.initialY * 0.1, particle.initialZ * 0.1, noiseT + 100) * 0.5;
      const dz = noise3D(particle.initialZ * 0.1, particle.initialX * 0.1, noiseT + 200) * 0.5;

      // Gentle rotation around center
      const rotSpeed = reducedMotion ? 0.05 : 0.2;
      const rotX = particle.initialX * Math.cos(t * rotSpeed) - particle.initialZ * Math.sin(t * rotSpeed);
      const rotZ = particle.initialX * Math.sin(t * rotSpeed) + particle.initialZ * Math.cos(t * rotSpeed);

      dummy.position.set(
        rotX + dx,
        particle.initialY + dy,
        rotZ + dz
      );

      // Scale pulse
      const scale = (Math.sin(t * 2 + particle.offset) + 2) * 0.02;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="white" transparent opacity={0.6} />
    </instancedMesh>
  );
}