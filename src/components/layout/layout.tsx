import { ParticleBackground } from '../ui/particle-background'
import { Outlet } from 'react-router-dom'
import { type ReactNode } from 'react'
import { PreferencesDialog } from '../ui/preferences-dialog'
import { usePreferences } from '../../providers/PreferencesProvider'
import { useState } from 'react'
import { cn } from '../../utils/styles'
import { Navigation } from '../navigation/Navigation'

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [showPreferences, setShowPreferences] = useState(false)
  const { preferences } = usePreferences()

  return (
    <div className={cn("min-h-screen bg-black relative", {
        "text-sm": preferences.fontSize === "sm",
        "text-base": preferences.fontSize === "base",
        "text-lg": preferences.fontSize === "lg"
      })}>
      <ParticleBackground />
      <Navigation />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        {children || <Outlet />}
      </div>

      <PreferencesDialog
        open={showPreferences}
        onClose={() => setShowPreferences(false)}
      />
    </div>
  )
}
