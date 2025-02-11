import { useReducedMotion } from './use-reduced-motion';
import { useEffect, useRef, useState } from 'react';

export function useAnimationControl(initialDelay = 0) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    setIsInitialized(true);
    
    if (shouldReduceMotion) {
      if (mountedRef.current) {
        setIsVisible(true);
      }
      return;
    }

    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setIsVisible(true);
      }
    }, initialDelay);

    return () => {
      clearTimeout(timer);
      mountedRef.current = false;
    };
  }, [initialDelay, shouldReduceMotion]);

  return { 
    isVisible: isInitialized && isVisible, 
    shouldReduceMotion,
    isInitialized 
  };
}
