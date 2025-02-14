import React from 'react'
import { ParticleBackground } from '../ui/particle-background'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black relative">
      <ParticleBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
