import { useState, useCallback } from 'react'
import { Alert } from '../components/ui/alert-manager'

interface UseAlertsResult {
  alerts: Alert[]
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void
  dismissAlert: (id: string) => void
  clearAlerts: () => void
}

export function useAlerts(): UseAlertsResult {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const addAlert = useCallback((alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2)
    const timestamp = new Date()
    const newAlert = { ...alert, id, timestamp }

    setAlerts((currentAlerts) => {
      // Remove oldest alert if we have more than 5
      const updatedAlerts = currentAlerts.length >= 5 
        ? currentAlerts.slice(1) 
        : currentAlerts

      return [...updatedAlerts, newAlert]
    })

    // Auto-dismiss after duration (default 5s)
    if (alert.duration !== 0) {
      setTimeout(() => {
        dismissAlert(id)
      }, alert.duration || 5000)
    }
  }, [])

  const dismissAlert = useCallback((id: string) => {
    setAlerts((currentAlerts) => 
      currentAlerts.filter((alert) => alert.id !== id)
    )
  }, [])

  const clearAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  return {
    alerts,
    addAlert,
    dismissAlert,
    clearAlerts
  }
}
