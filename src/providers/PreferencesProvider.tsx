import * as React from 'react'
import { useAlert } from '../contexts/AlertContext'

interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    border: string
  }
}

interface LayoutPreset {
  id: string
  name: string
  description: string
  grid: {
    x: number
    y: number
    w: number
    h: number
    id: string
  }[]
}

interface UserPreferences {
  theme: Theme['id']
  layout: LayoutPreset['id']
  widgets: {
    id: string
    enabled: boolean
    position?: {
      x: number
      y: number
    }
  }[]
  fontSize: 'sm' | 'base' | 'lg'
  animationsEnabled: boolean
  compactMode: boolean
  dataUpdateInterval: number
}

const defaultThemes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark Theme',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e293b',
      accent: '#22c55e',
      background: '#000000',
      text: '#ffffff',
      border: '#1e293b'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    colors: {
      primary: '#8b5cf6',
      secondary: '#1e1b4b',
      accent: '#10b981',
      background: '#020617',
      text: '#e2e8f0',
      border: '#1e1b4b'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      primary: '#f59e0b',
      secondary: '#18181b',
      accent: '#ec4899',
      background: '#09090b',
      text: '#fafafa',
      border: '#27272a'
    }
  }
]

const defaultLayouts: LayoutPreset[] = [
  {
    id: 'standard',
    name: 'Standard Layout',
    description: 'Default dashboard layout with balanced widget placement',
    grid: [
      { id: 'insights', x: 0, y: 0, w: 2, h: 2 },
      { id: 'patterns', x: 2, y: 0, w: 2, h: 2 },
      { id: 'sentiment', x: 0, y: 2, w: 4, h: 2 }
    ]
  },
  {
    id: 'compact',
    name: 'Compact View',
    description: 'Condensed layout for smaller screens',
    grid: [
      { id: 'insights', x: 0, y: 0, w: 4, h: 1 },
      { id: 'patterns', x: 0, y: 1, w: 4, h: 1 },
      { id: 'sentiment', x: 0, y: 2, w: 4, h: 1 }
    ]
  },
  {
    id: 'focus',
    name: 'Focus Mode',
    description: 'Emphasizes main widgets for focused analysis',
    grid: [
      { id: 'patterns', x: 0, y: 0, w: 3, h: 2 },
      { id: 'insights', x: 3, y: 0, w: 1, h: 2 },
      { id: 'sentiment', x: 0, y: 2, w: 4, h: 1 }
    ]
  }
]

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  layout: 'standard',
  widgets: [
    { id: 'insights', enabled: true },
    { id: 'patterns', enabled: true },
    { id: 'sentiment', enabled: true },
    { id: 'options-flow', enabled: false },
    { id: 'congressional', enabled: false }
  ],
  fontSize: 'base',
  animationsEnabled: true,
  compactMode: false,
  dataUpdateInterval: 1000
}

interface PreferencesContextValue {
  preferences: UserPreferences
  themes: Theme[]
  layouts: LayoutPreset[]
  updatePreferences: (updates: Partial<UserPreferences>) => void
  resetPreferences: () => void
  getTheme: (id: string) => Theme
  getLayout: (id: string) => LayoutPreset
}

const PreferencesContext = React.createContext<PreferencesContextValue | undefined>(undefined)

const STORAGE_KEY = 'user-preferences'

interface PreferencesProviderProps {
  children: React.ReactNode
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [preferences, setPreferences] = React.useState<UserPreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultPreferences
  })
  const { addAlert } = useAlert()

  const updatePreferences = React.useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
    addAlert({
      type: 'success',
      message: 'Preferences updated successfully',
      duration: 2000
    })
  }, [addAlert])

  const resetPreferences = React.useCallback(() => {
    setPreferences(defaultPreferences)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreferences))
    addAlert({
      type: 'info',
      message: 'Preferences reset to defaults',
      duration: 2000
    })
  }, [addAlert])

  const getTheme = React.useCallback((id: string) => {
    return defaultThemes.find(theme => theme.id === id) || defaultThemes[0]
  }, [])

  const getLayout = React.useCallback((id: string) => {
    return defaultLayouts.find(layout => layout.id === id) || defaultLayouts[0]
  }, [])

  // Apply theme
  React.useEffect(() => {
    const theme = getTheme(preferences.theme)
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [preferences.theme, getTheme])

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        themes: defaultThemes,
        layouts: defaultLayouts,
        updatePreferences,
        resetPreferences,
        getTheme,
        getLayout
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = React.useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return context
}
