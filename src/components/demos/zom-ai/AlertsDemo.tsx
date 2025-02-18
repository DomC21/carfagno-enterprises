import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateStockData, simulateDataStream, type StockData } from '@/lib/demo-data'
import { Bell, BellRing, Trash2 } from 'lucide-react'

interface AlertCondition {
  id: string
  symbol: string
  type: 'price' | 'volume' | 'rsi'
  operator: 'above' | 'below'
  value: number
  triggered: boolean
  timestamp?: number
}

export function AlertsDemo() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [alerts, setAlerts] = useState<AlertCondition[]>([])
  const [newAlert, setNewAlert] = useState<Omit<AlertCondition, 'id' | 'triggered'>>({
    symbol: '',
    type: 'price',
    operator: 'above',
    value: 0
  })

  useEffect(() => {
    const cleanup = simulateDataStream(
      () => generateStockData(10),
      2000,
      (newStocks) => {
        setStocks(newStocks)
        // Check alerts
        setAlerts(prevAlerts => prevAlerts.map(alert => {
          const stock = newStocks.find(s => s.symbol === alert.symbol)
          if (!stock || alert.triggered) return alert

          let currentValue: number
          switch (alert.type) {
            case 'price':
              currentValue = stock.price
              break
            case 'volume':
              currentValue = stock.volume
              break
            case 'rsi':
              currentValue = stock.indicators.rsi
              break
          }

          const isTriggered = alert.operator === 'above' 
            ? currentValue > alert.value
            : currentValue < alert.value

          return isTriggered
            ? { ...alert, triggered: true, timestamp: Date.now() }
            : alert
        }))
      }
    )
    return cleanup
  }, [])

  const addAlert = () => {
    if (!newAlert.symbol) return

    setAlerts(prev => [...prev, {
      ...newAlert,
      id: `${Date.now()}`,
      triggered: false
    }])

    setNewAlert({
      symbol: '',
      type: 'price',
      operator: 'above',
      value: 0
    })
  }

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const formatValue = (type: string, value: number) => {
    switch (type) {
      case 'price':
        return `$${value.toFixed(2)}`
      case 'volume':
        return value.toLocaleString()
      case 'rsi':
        return value.toFixed(1)
      default:
        return value.toString()
    }
  }

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Customizable Alerts</h3>
      <p className="text-gray-300 mb-6">Set up and monitor custom stock alerts</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-teal-400 mb-4">Create Alert</h4>
            
            <div className="space-y-4">
              <Select
                value={newAlert.symbol}
                onValueChange={(value) => setNewAlert(prev => ({ ...prev, symbol: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a stock" />
                </SelectTrigger>
                <SelectContent>
                  {stocks.map(stock => (
                    <SelectItem key={stock.symbol} value={stock.symbol}>
                      {stock.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={newAlert.type}
                  onValueChange={(value: 'price' | 'volume' | 'rsi') => 
                    setNewAlert(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                    <SelectItem value="rsi">RSI</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={newAlert.operator}
                  onValueChange={(value: 'above' | 'below') => 
                    setNewAlert(prev => ({ ...prev, operator: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                type="number"
                value={newAlert.value}
                onChange={(e) => setNewAlert(prev => ({ 
                  ...prev, 
                  value: parseFloat(e.target.value) || 0 
                }))}
                placeholder="Target value"
              />

              <Button 
                onClick={addAlert} 
                className="w-full"
                disabled={!newAlert.symbol}
              >
                Create Alert
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-teal-400 mb-4">Active Alerts</h4>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center justify-between ${
                    alert.triggered 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : 'bg-blue-950/50 border-teal-500/20'
                  } border rounded-lg p-3`}
                >
                  <div className="flex items-center gap-3">
                    {alert.triggered ? (
                      <BellRing className="w-5 h-5 text-green-400" />
                    ) : (
                      <Bell className="w-5 h-5 text-teal-400" />
                    )}
                    <div>
                      <div className="font-medium text-teal-400">
                        {alert.symbol}
                      </div>
                      <div className="text-sm text-gray-400">
                        {alert.type} {alert.operator} {formatValue(alert.type, alert.value)}
                      </div>
                      {alert.triggered && alert.timestamp && (
                        <div className="text-xs text-green-400 mt-1">
                          Triggered {new Date(alert.timestamp).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAlert(alert.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
              {alerts.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  No active alerts
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
