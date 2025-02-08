import React from 'react'
import { animationClasses } from '../utils/styles'
import { useAnimationControl } from '../hooks/use-animation-control'

import { AnimationProps } from '../types/animation'

const DataFlowAnimationComponent = ({ maxElements = 20 }: AnimationProps) => {
  const { isVisible, shouldReduceMotion } = useAnimationControl()

  if (!isVisible || shouldReduceMotion) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      {Array.from({ length: maxElements }).map((_, i) => (
        <div
          key={i}
          className={`absolute ${animationClasses.dataFlow}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`
          }}
        >
          <span className="font-mono text-xs text-white/40 backdrop-blur-sm">
            {Math.random().toString(16).substring(2, 8)}
          </span>
        </div>
      ))}
    </div>
  )
}

export const DataFlowAnimation = React.memo(DataFlowAnimationComponent, 
  (prevProps, nextProps) => prevProps.maxElements === nextProps.maxElements
);
