import { ParticleBackground } from '../ui/particle-background'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-black relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  )
}
