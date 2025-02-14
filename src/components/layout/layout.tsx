import { ParticleBackground } from '../ui/particle-background'
import { Outlet } from 'react-router-dom'
import { type ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black relative">
      <ParticleBackground />
      <div className="relative z-10">
        {children || <Outlet />}
      </div>
    </div>
  )
}
