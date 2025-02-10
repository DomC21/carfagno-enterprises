import { useReducedMotion } from './use-reduced-motion';
import { useEffect, useState } from 'react';

export function useAnimationControl(initialDelay = 0) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }
    const timer = setTimeout(() => setIsVisible(true), initialDelay);
    return () => {
      clearTimeout(timer);
      setIsVisible(false);
      setIsInitialized(false);
    };
  }, [initialDelay, shouldReduceMotion]);

  return { isVisible: isInitialized && isVisible, shouldReduceMotion };
}
