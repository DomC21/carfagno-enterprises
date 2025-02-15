import * as React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Button } from './button'
import { usePreferences } from '../../providers/PreferencesProvider'
import { useKeyboard } from '../../providers/KeyboardProvider'
import { useAccessibility } from '../../providers/AccessibilityProvider'

interface PreferencesDialogProps {
  open: boolean
  onClose: () => void
}

export function PreferencesDialog({ open, onClose }: PreferencesDialogProps) {
  const { preferences, themes, layouts, updatePreferences, resetPreferences } = usePreferences()
  const { isHighContrast, toggleHighContrast } = useAccessibility()
  const { registerShortcut, unregisterShortcut } = useKeyboard()

  React.useEffect(() => {
    registerShortcut({
      key: 'Escape',
      description: 'Close preferences',
      action: onClose,
      scope: 'modal'
    })

    return () => {
      unregisterShortcut('Escape')
    }
  }, [registerShortcut, unregisterShortcut, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
        onClick={e => e.stopPropagation()}
      >
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Preferences</h2>
            <Button variant="ghost" onClick={onClose}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Theme Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-colors ${
                      preferences.theme === theme.id
                        ? 'bg-blue-950/20 border-blue-500/20'
                        : 'hover:bg-blue-950/10'
                    }`}
                    onClick={() => updatePreferences({ theme: theme.id })}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <span className="text-sm text-primary">{theme.name}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Layout Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Layout</h3>
            <div className="grid grid-cols-2 gap-4">
              {layouts.map((layout) => (
                <motion.div
                  key={layout.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-colors ${
                      preferences.layout === layout.id
                        ? 'bg-blue-950/20 border-blue-500/20'
                        : 'hover:bg-blue-950/10'
                    }`}
                    onClick={() => updatePreferences({ layout: layout.id })}
                  >
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-primary">{layout.name}</span>
                      <p className="text-xs text-gray-400">{layout.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Widget Management */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Widgets</h3>
            <div className="space-y-2">
              {preferences.widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-950/10"
                >
                  <span className="text-sm text-primary capitalize">
                    {widget.id.replace('-', ' ')}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => updatePreferences({
                      widgets: preferences.widgets.map(w =>
                        w.id === widget.id ? { ...w, enabled: !w.enabled } : w
                      )
                    })}
                  >
                    {widget.enabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Font Size & Animations */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Font Size</h3>
              <div className="flex gap-2">
                {['sm', 'base', 'lg'].map((size) => (
                  <Button
                    key={size}
                    variant={preferences.fontSize === size ? 'default' : 'outline'}
                    onClick={() => updatePreferences({ fontSize: size as 'sm' | 'base' | 'lg' })}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Animations</h3>
              <div className="flex gap-2">
                <Button
                  variant={preferences.animationsEnabled ? 'default' : 'outline'}
                  onClick={() => updatePreferences({ animationsEnabled: !preferences.animationsEnabled })}
                >
                  {preferences.animationsEnabled ? 'Enabled' : 'Disabled'}
                </Button>
                <Button
                  variant={isHighContrast ? 'default' : 'outline'}
                  onClick={toggleHighContrast}
                >
                  High Contrast
                </Button>
              </div>
            </div>
          </div>

          {/* Data Update Interval */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Data Update Interval</h3>
            <div className="flex gap-2">
              {[500, 1000, 2000, 5000].map((interval) => (
                <Button
                  key={interval}
                  variant={preferences.dataUpdateInterval === interval ? 'default' : 'outline'}
                  onClick={() => updatePreferences({ dataUpdateInterval: interval })}
                >
                  {interval / 1000}s
                </Button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-4 border-t border-gray-800">
            <Button variant="destructive" onClick={resetPreferences}>
              Reset to Defaults
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
