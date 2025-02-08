import { useReducedMotion } from './use-reduced-motion';
import { useEffect, useState } from 'react';

export function useAnimationControl(initialDelay = 0) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay, shouldReduceMotion]);

  return { isVisible, shouldReduceMotion };
}
