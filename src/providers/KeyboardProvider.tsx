import * as React from 'react'
import { useAlert } from '../contexts/AlertContext'

interface KeyboardShortcut {
  key: string
  description: string
  action: () => void
  scope?: 'global' | 'modal' | 'navigation'
  modifier?: 'ctrl' | 'alt' | 'shift'
}

interface KeyboardContextValue {
  registerShortcut: (shortcut: KeyboardShortcut) => void
  unregisterShortcut: (key: string) => void
  getShortcuts: () => KeyboardShortcut[]
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}

const KeyboardContext = React.createContext<KeyboardContextValue | undefined>(undefined)

interface KeyboardProviderProps {
  children: React.ReactNode
}

export function KeyboardProvider({ children }: KeyboardProviderProps) {
  const [shortcuts, setShortcuts] = React.useState<KeyboardShortcut[]>([])
  const [isModalOpen, setModalOpen] = React.useState(false)
  const { addAlert } = useAlert()

  const registerShortcut = React.useCallback((shortcut: KeyboardShortcut) => {
    setShortcuts(prev => [...prev, shortcut])
  }, [])

  const unregisterShortcut = React.useCallback((key: string) => {
    setShortcuts(prev => prev.filter(s => s.key !== key))
  }, [])

  const getShortcuts = React.useCallback(() => shortcuts, [shortcuts])

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    // Skip if input or textarea is focused
    if (
      document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLTextAreaElement
    ) {
      return
    }

    const matchingShortcut = shortcuts.find(shortcut => {
      const keyMatches = shortcut.key.toLowerCase() === event.key.toLowerCase()
      const modifierMatches = !shortcut.modifier ||
        (shortcut.modifier === 'ctrl' && event.ctrlKey) ||
        (shortcut.modifier === 'alt' && event.altKey) ||
        (shortcut.modifier === 'shift' && event.shiftKey)
      const scopeMatches = !shortcut.scope ||
        (shortcut.scope === 'global') ||
        (shortcut.scope === 'modal' && isModalOpen) ||
        (shortcut.scope === 'navigation' && !isModalOpen)

      return keyMatches && modifierMatches && scopeMatches
    })

    if (matchingShortcut) {
      event.preventDefault()
      matchingShortcut.action()
      
      // Enhanced visual feedback
      const shortcutText = `${matchingShortcut.description} (${
        matchingShortcut.modifier ? `${matchingShortcut.modifier}+${matchingShortcut.key}` : matchingShortcut.key
      })`
      
      addAlert({
        type: 'info',
        message: shortcutText,
        duration: 2000
      })

      // Add ripple effect at center of viewport
      const ripple = document.createElement('div')
      ripple.className = 'fixed w-4 h-4 bg-primary/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ripple pointer-events-none'
      ripple.style.left = '50%'
      ripple.style.top = '50%'
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 1000)
    }
  }, [shortcuts, isModalOpen, addAlert])

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Register default shortcuts
  React.useEffect(() => {
    const defaultShortcuts: KeyboardShortcut[] = [
      {
        key: '?',
        description: 'Show keyboard shortcuts',
        action: () => setModalOpen(true),
        scope: 'global'
      },
      {
        key: 'Escape',
        description: 'Close modal',
        action: () => setModalOpen(false),
        scope: 'modal'
      },
      {
        key: 'h',
        description: 'Go to home',
        action: () => window.location.href = '/',
        scope: 'navigation'
      },
      {
        key: 'p',
        description: 'Go to tools',
        action: () => window.location.href = '/tools',
        scope: 'navigation'
      },
      {
        key: 'a',
        description: 'Go to about us',
        action: () => window.location.href = '/about',
        scope: 'navigation'
      }
    ]

    defaultShortcuts.forEach(registerShortcut)
  }, [registerShortcut])

  return (
    <KeyboardContext.Provider
      value={{
        registerShortcut,
        unregisterShortcut,
        getShortcuts,
        isModalOpen,
        setModalOpen
      }}
    >
      {children}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 bg-black border border-gray-800 rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-primary mb-4">Keyboard Shortcuts</h2>
            <div className="space-y-2">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                >
                  <span className="text-sm text-gray-400">{shortcut.description}</span>
                  <kbd className="px-2 py-1 text-xs font-mono bg-blue-950/20 border border-blue-500/20 rounded">
                    {shortcut.modifier ? `${shortcut.modifier}+${shortcut.key}` : shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </KeyboardContext.Provider>
  )
}

export function useKeyboard() {
  const context = React.useContext(KeyboardContext)
  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider')
  }
  return context
}
