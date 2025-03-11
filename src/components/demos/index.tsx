import React, { lazy } from 'react'

// Lazy load demo components with proper type assertions
export const NeuralNetworksDemo = lazy(() => 
  import('./NeuralNetworksDemo').then(module => ({ default: module.NeuralNetworksDemo }))
)

export const ZomAIDemo = lazy(() => 
  import('./ZomAIDemo').then(module => ({ default: module.ZomAIDemo }))
)

// Loading fallback component
export const DemoLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary transform-gpu"></div>
  </div>
)
