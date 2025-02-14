
import { Outlet } from 'react-router-dom'
import { ParticleBackground } from '../ui/particle-background'

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
