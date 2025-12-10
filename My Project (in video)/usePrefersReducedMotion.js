import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    
    // If the query matches 'no-preference', then reduced motion is FALSE.
    // So if matches is true, reduced is false.
    // If matches is false, reduced is true.
    setPrefersReducedMotion(!mediaQueryList.matches);

    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}