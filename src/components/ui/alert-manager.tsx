import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Alert {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  duration?: number
  timestamp: Date
}

interface AlertManagerProps {
  alerts: Alert[]
  onDismiss: (id: string) => void
}

const alertVariants = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 }
}

const alertColors = {
  info: {
    bg: 'bg-blue-950/20',
    border: 'border-blue-500/20',
    text: 'text-blue-400'
  },
  success: {
    bg: 'bg-green-950/20',
    border: 'border-green-500/20',
    text: 'text-green-400'
  },
  warning: {
    bg: 'bg-yellow-950/20',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400'
  },
  error: {
    bg: 'bg-red-950/20',
    border: 'border-red-500/20',
    text: 'text-red-400'
  }
}

export function AlertManager({ alerts, onDismiss }: AlertManagerProps) {
  const handleDismiss = useCallback((id: string) => {
    onDismiss(id)
  }, [onDismiss])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-96 pointer-events-none">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            variants={alertVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`p-4 rounded-lg border pointer-events-auto ${alertColors[alert.type].bg} ${alertColors[alert.type].border}`}
            onClick={() => handleDismiss(alert.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-2 h-2 rounded-full ${alertColors[alert.type].text}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${alertColors[alert.type].text}`}>
                  {alert.message}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button
                className="text-gray-400 hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDismiss(alert.id)
                }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
