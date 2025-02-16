import { useEffect, useCallback } from 'react'
import { useAlert } from '@/contexts/AlertContext'

type ShortcutHandler = () => void
type ShortcutMap = Record<string, ShortcutHandler>

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const { showInfo } = useAlert()

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    const isCtrl = event.ctrlKey
    const isShift = event.shiftKey
    
    const shortcutKey = `${isCtrl ? 'ctrl+' : ''}${isShift ? 'shift+' : ''}${key}`
    
    if (shortcuts[shortcutKey]) {
      event.preventDefault()
      shortcuts[shortcutKey]()
      showInfo(`Executed: ${shortcutKey}`)
    }
  }, [shortcuts, showInfo])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return {
    shortcuts,
    showShortcuts: () => {
      const shortcutList = Object.keys(shortcuts)
        .map(key => `${key}: Available`)
        .join('\n')
      showInfo(`Available Shortcuts:\n${shortcutList}`)
    }
  }
}
