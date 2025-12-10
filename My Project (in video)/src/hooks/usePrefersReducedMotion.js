import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    
    // If matches is true, it means NO PREFERENCE, so reduced is false
    // If matches is false, it means REDUCED MOTION IS PREFERRED, so reduced is true
    // Wait, the query asks for "no-preference".
    // So if matches === true, user wants motion.
    // If matches === false, user wants reduced motion.
    
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };

    // Set initial
    setPrefersReducedMotion(!mediaQueryList.matches);

    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}