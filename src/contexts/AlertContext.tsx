import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { Alert, AlertManager } from '../components/ui/alert-manager'

interface AlertContextValue {
  alerts: Alert[]
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void
  dismissAlert: (id: string) => void
  clearAlerts: () => void
  showSuccess: (message: string, duration?: number) => void
  showError: (message: string, duration?: number) => void
  showWarning: (message: string, duration?: number) => void
  showInfo: (message: string, duration?: number) => void
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined)

interface AlertProviderProps {
  children: ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const addAlert = useCallback((alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(7)
    const timestamp = new Date()
    const newAlert = { ...alert, id, timestamp }
    setAlerts(prev => [...prev, newAlert])

    if (alert.duration) {
      setTimeout(() => dismissAlert(id), alert.duration)
    }
  }, [])

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }, [])

  const clearAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  const showSuccess = useCallback((message: string, duration = 5000) => {
    addAlert({ type: 'success', message, duration })
  }, [addAlert])

  const showError = useCallback((message: string, duration = 5000) => {
    addAlert({ type: 'error', message, duration })
  }, [addAlert])

  const showWarning = useCallback((message: string, duration = 5000) => {
    addAlert({ type: 'warning', message, duration })
  }, [addAlert])

  const showInfo = useCallback((message: string, duration = 5000) => {
    addAlert({ type: 'info', message, duration })
  }, [addAlert])

  return (
    <AlertContext.Provider value={{ 
      alerts, 
      addAlert, 
      dismissAlert, 
      clearAlerts,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
      <AlertManager alerts={alerts} onDismiss={dismissAlert} />
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
