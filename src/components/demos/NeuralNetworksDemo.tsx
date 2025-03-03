import { useEffect } from 'react'

export function NeuralNetworksDemo() {
  useEffect(() => {
    window.location.href = 'https://zom-stock-demo-sh90u3lo.devinapps.com/'
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto" />
        <p className="mt-4 text-gray-400">Redirecting to Zom AI Demo...</p>
      </div>
    </div>
  )
}
