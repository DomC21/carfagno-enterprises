import * as React from 'react'
import { Alert, AlertManager } from '../components/ui/alert-manager'
import { useAlerts } from '../hooks/useAlerts'

const { createContext, useContext, useCallback } = React
type ReactNode = React.ReactNode

interface AlertContextValue {
  alerts: Alert[]
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void
  dismissAlert: (id: string) => void
  clearAlerts: () => void
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined)

interface AlertProviderProps {
  children: ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
  const { alerts, addAlert, dismissAlert, clearAlerts } = useAlerts()

  return (
    <AlertContext.Provider value={{ alerts, addAlert, dismissAlert, clearAlerts }}>
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

// Helper functions for common alert types
export const showSuccess = (message: string, duration = 5000) => {
  useAlert().addAlert({
    type: 'success',
    message,
    duration
  })
}

export const showError = (message: string, duration = 5000) => {
  useAlert().addAlert({
    type: 'error',
    message,
    duration
  })
}

export const showWarning = (message: string, duration = 5000) => {
  useAlert().addAlert({
    type: 'warning',
    message,
    duration
  })
}

export const showInfo = (message: string, duration = 5000) => {
  useAlert().addAlert({
    type: 'info',
    message,
    duration
  })
}
