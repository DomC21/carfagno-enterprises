import * as React from 'react'
import { useAlert } from '../contexts/AlertContext'

interface AccessibilityContextValue {
  isHighContrast: boolean
  toggleHighContrast: () => void
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  focusableElements: HTMLElement[]
  registerFocusable: (element: HTMLElement) => void
  unregisterFocusable: (element: HTMLElement) => void
}

const AccessibilityContext = React.createContext<AccessibilityContextValue | undefined>(undefined)

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [isHighContrast, setHighContrast] = React.useState(false)
  const [focusableElements, setFocusableElements] = React.useState<HTMLElement[]>([])
  // Announcements are handled directly through the live regions
  const { addAlert } = useAlert()

  // Live region for screen reader announcements
  const politeAnnouncerRef = React.useRef<HTMLDivElement>(null)
  const assertiveAnnouncerRef = React.useRef<HTMLDivElement>(null)

  const toggleHighContrast = React.useCallback(() => {
    setHighContrast(prev => {
      const newValue = !prev
      document.documentElement.classList.toggle('high-contrast', newValue)
      addAlert({
        type: 'info',
        message: `High contrast mode ${newValue ? 'enabled' : 'disabled'}`,
        duration: 2000
      })
      return newValue
    })
  }, [addAlert])

  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = priority === 'polite' ? politeAnnouncerRef.current : assertiveAnnouncerRef.current
    if (announcer) {
      announcer.textContent = message
    }
    addAlert({
      type: 'info',
      message,
      duration: 3000
    })
  }, [addAlert])

  const registerFocusable = React.useCallback((element: HTMLElement) => {
    setFocusableElements(prev => [...prev, element])
  }, [])

  const unregisterFocusable = React.useCallback((element: HTMLElement) => {
    setFocusableElements(prev => prev.filter(el => el !== element))
  }, [])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
        if (currentIndex !== -1) {
          event.preventDefault()
          const nextIndex = event.shiftKey 
            ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
            : (currentIndex + 1) % focusableElements.length
          focusableElements[nextIndex]?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusableElements])

  // Apply high contrast styles
  React.useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isHighContrast])

  return (
    <AccessibilityContext.Provider
      value={{
        isHighContrast,
        toggleHighContrast,
        announce,
        focusableElements,
        registerFocusable,
        unregisterFocusable
      }}
    >
      {children}
      <div
        ref={politeAnnouncerRef}
        role="status"
        aria-live="polite"
        className="sr-only"
      />
      <div
        ref={assertiveAnnouncerRef}
        role="alert"
        aria-live="assertive"
        className="sr-only"
      />
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = React.useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

// High contrast styles
const highContrastStyles = `
  .high-contrast {
    --primary: #ffffff;
    --secondary: #000000;
    --accent: #ffff00;
    --background: #000000;
    --text: #ffffff;
    --border: #ffffff;
  }

  .high-contrast * {
    border-color: var(--border) !important;
  }

  .high-contrast button,
  .high-contrast a {
    background-color: var(--background) !important;
    color: var(--text) !important;
    border: 2px solid var(--border) !important;
  }

  .high-contrast button:focus,
  .high-contrast a:focus {
    outline: 3px solid var(--accent) !important;
    outline-offset: 2px !important;
  }

  .high-contrast input,
  .high-contrast textarea {
    background-color: var(--background) !important;
    color: var(--text) !important;
    border: 2px solid var(--border) !important;
  }

  .high-contrast input:focus,
  .high-contrast textarea:focus {
    outline: 3px solid var(--accent) !important;
    outline-offset: 2px !important;
  }
`

// Add high contrast styles to document
const styleSheet = document.createElement('style')
styleSheet.textContent = highContrastStyles
document.head.appendChild(styleSheet)
