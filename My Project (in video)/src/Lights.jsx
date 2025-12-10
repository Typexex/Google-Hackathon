import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function Lights() {
  const cyanRef = useRef();
  const magentaRef = useRef();
  const reducedMotion = usePrefersReducedMotion();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = reducedMotion ? 0.2 : 1.0; 
    
    // Cyan Light movement (sinusoidal orbit)
    if (cyanRef.current) {
      cyanRef.current.position.x = Math.sin(t * speed * 0.7) * 4;
      cyanRef.current.position.y = Math.cos(t * speed * 0.5) * 3;
      cyanRef.current.position.z = Math.sin(t * speed * 0.3) * 4 + 2;
    }

    // Magenta Light movement (opposing orbit)
    if (magentaRef.current) {
      magentaRef.current.position.x = Math.cos(t * speed * 0.6) * 4;
      magentaRef.current.position.y = Math.sin(t * speed * 0.4) * 3;
      magentaRef.current.position.z = Math.cos(t * speed * 0.2) * 4 + 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      
      <pointLight
        ref={cyanRef}
        color="#00FFFF"
        intensity={15}
        distance={20}
        decay={2}
      />
      
      <pointLight
        ref={magentaRef}
        color="#FF00FF"
        intensity={15}
        distance={20}
        decay={2}
      />
    </>
  );
}