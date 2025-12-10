import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function CameraRig() {
  const reducedMotion = usePrefersReducedMotion();
  const vec = new Vector3();

  useFrame((state) => {
    // If reduced motion is active, lock camera to a steady position
    if (reducedMotion) {
      state.camera.position.lerp(vec.set(0, 0, 10), 0.05);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Parallax logic
    // Mouse x and y are normalized (-1 to 1)
    const mx = state.mouse.x * 2; // Strengthen effect slightly
    const my = state.mouse.y * 2;
    
    // Target position
    // Base is [0, 0, 10]
    // Move slightly on X and Y
    const targetX = mx;
    const targetY = my;
    const targetZ = 10;

    // Smooth lerp
    state.camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}