
import { Outlet } from 'react-router-dom'
import { ParticleBackground } from '../ui/particle-background'
import { PageTransition } from '../ui/page-transition'

export function Layout() {
  return (
    <div className="min-h-screen bg-black relative">
      <ParticleBackground />
      <div className="relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  )
}
