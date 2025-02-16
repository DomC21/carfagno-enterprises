import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAlert } from '../contexts/AlertContext'

interface ShortcutMap {
  [key: string]: {
    action: () => void
    description: string
  }
}

interface KeyboardShortcutsContextType {
  registerShortcut: (key: string, action: () => void, description: string) => void
  unregisterShortcut: (key: string) => void
  showShortcuts: () => void
  shortcuts: ShortcutMap
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | null>(null)

export function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [shortcuts, setShortcuts] = useState<ShortcutMap>({})
  const [showingShortcuts, setShowingShortcuts] = useState(false)
  const { showInfo } = useAlert()

  const registerShortcut = (key: string, action: () => void, description: string) => {
    setShortcuts(prev => ({
      ...prev,
      [key.toLowerCase()]: { action, description }
    }))
  }

  const unregisterShortcut = (key: string) => {
    setShortcuts(prev => {
      const newShortcuts = { ...prev }
      delete newShortcuts[key.toLowerCase()]
      return newShortcuts
    })
  }

  const showShortcuts = () => {
    if (showingShortcuts) return
    setShowingShortcuts(true)
    const shortcutList = Object.entries(shortcuts)
      .map(([key, { description }]) => `${key}: ${description}`)
      .join('\n')
    showInfo(`Available Keyboard Shortcuts:\n${shortcutList}`)
    setTimeout(() => setShowingShortcuts(false), 5000)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      const isCtrl = event.ctrlKey
      const isShift = event.shiftKey
      const isAlt = event.altKey
      
      const shortcutKey = `${isCtrl ? 'ctrl+' : ''}${isShift ? 'shift+' : ''}${isAlt ? 'alt+' : ''}${key}`
      
      if (shortcuts[shortcutKey]) {
        event.preventDefault()
        shortcuts[shortcutKey].action()
      }

      // Global shortcut to show all shortcuts
      if (isCtrl && key === '?') {
        event.preventDefault()
        showShortcuts()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])

  return (
    <KeyboardShortcutsContext.Provider value={{
      registerShortcut,
      unregisterShortcut,
      showShortcuts,
      shortcuts
    }}>
      {children}
    </KeyboardShortcutsContext.Provider>
  )
}

export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutsContext)
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider')
  }
  return context
}
