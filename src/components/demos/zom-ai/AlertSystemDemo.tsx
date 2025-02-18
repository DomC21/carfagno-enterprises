import { useState, useEffect } from 'react'
import { Card } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ArrowUp, ArrowDown, Percent, DollarSign, AlertTriangle } from 'lucide-react'

interface Alert {
  id: string
  type: 'price' | 'change' | 'volume'
  condition: 'above' | 'below'
  value: number
  symbol: string
  createdAt: number
  triggered?: {
    time: number
    value: number
  }
}

export function AlertSystemDemo() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [newAlert, setNewAlert] = useState<Partial<Alert>>({
    type: 'price',
    condition: 'above',
    symbol: 'AAPL'
  })

  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']

  useEffect(() => {
    // Simulate alert triggers
    const interval = setInterval(() => {
      setAlerts(prev => 
        prev.map(alert => {
          if (!alert.triggered && Math.random() > 0.8) {
            return {
              ...alert,
              triggered: {
                time: Date.now(),
                value: alert.type === 'price' ? alert.value * (1 + (Math.random() * 0.1 - 0.05))
                  : alert.type === 'change' ? alert.value * (Math.random() > 0.5 ? 1.2 : 0.8)
                  : alert.value * (1 + (Math.random() * 0.5))
              }
            }
          }
          return alert
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleCreateAlert = () => {
    if (!newAlert.value) return

    const alert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      type: newAlert.type!,
      condition: newAlert.condition!,
      value: newAlert.value,
      symbol: newAlert.symbol!,
      createdAt: Date.now()
    }

    setAlerts(prev => [...prev, alert])
    setNewAlert({
      ...newAlert,
      value: undefined
    })
  }

  return (
    <Card className="p-4 bg-black border-border">
      <h3 className="text-lg font-semibold mb-4 text-primary">Custom Alert System</h3>
      <p className="text-gray-300 mb-6">Set up and monitor custom price alerts</p>

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select
            value={newAlert.type}
            onValueChange={(value: 'price' | 'change' | 'volume') => 
              setNewAlert({ ...newAlert, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Alert Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="change">% Change</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={newAlert.condition}
            onValueChange={(value: 'above' | 'below') => 
              setNewAlert({ ...newAlert, condition: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="above">Above</SelectItem>
              <SelectItem value="below">Below</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={newAlert.symbol}
            onValueChange={(value: string) => 
              setNewAlert({ ...newAlert, symbol: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              {symbols.map(symbol => (
                <SelectItem key={symbol} value={symbol}>{symbol}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={newAlert.value || ''}
            onChange={(e) => setNewAlert({ 
              ...newAlert, 
              value: parseFloat(e.target.value) 
            })}
            placeholder="Value"
          />
        </div>

        <Button 
          onClick={handleCreateAlert}
          className="w-full"
          disabled={!newAlert.value}
        >
          <Bell className="w-4 h-4 mr-2" />
          Create Alert
        </Button>

        <div className="space-y-4">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-lg ${
                  alert.triggered
                    ? 'bg-red-950/20 border-red-500/20'
                    : 'bg-blue-900/30 border-blue-500/20'
                } border`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {alert.triggered ? (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      ) : (
                        <Bell className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="font-medium text-gray-200">
                        {alert.symbol}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      {alert.type === 'price' && <DollarSign className="w-3 h-3 inline" />}
                      {alert.type === 'change' && <Percent className="w-3 h-3 inline" />}
                      {alert.type === 'volume' && 'Vol: '}
                      {alert.value.toLocaleString()}
                      {alert.condition === 'above' ? (
                        <ArrowUp className="w-3 h-3 inline ml-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 inline ml-1" />
                      )}
                    </div>
                  </div>
                  {alert.triggered ? (
                    <div className="text-right">
                      <div className="text-red-400 font-medium">
                        Triggered
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(alert.triggered.time).toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        Value: {alert.triggered.value.toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  )
}
