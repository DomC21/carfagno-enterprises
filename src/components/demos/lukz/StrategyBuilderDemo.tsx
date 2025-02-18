import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StrategyOption {
  type: 'call' | 'put'
  strike: number
  position: 'long' | 'short'
}

export function StrategyBuilderDemo() {
  const [strategy, setStrategy] = useState<StrategyOption[]>([])
  const [stockPrice] = useState(100)
  const [newOption, setNewOption] = useState<StrategyOption>({
    type: 'call',
    strike: stockPrice,
    position: 'long'
  })

  const addOption = () => {
    setStrategy([...strategy, newOption])
  }

  const calculatePayoff = (price: number) => {
    return strategy.reduce((total, option) => {
      const multiplier = option.position === 'long' ? 1 : -1
      if (option.type === 'call') {
        return total + multiplier * Math.max(0, price - option.strike)
      } else {
        return total + multiplier * Math.max(0, option.strike - price)
      }
    }, 0)
  }

  const payoffData = Array.from({ length: 21 }, (_, i) => {
    const price = stockPrice * (0.5 + i * 0.05)
    return {
      price,
      payoff: calculatePayoff(price)
    }
  })

  return (
    <Card className="p-6 bg-blue-950/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-teal-400 mb-4">Options Strategy Builder</h3>
      <p className="text-gray-300 mb-6">Build and visualize custom options strategies</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select
              value={newOption.type}
              onValueChange={(value: 'call' | 'put') => 
                setNewOption({ ...newOption, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Option Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="put">Put</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={newOption.position}
              onValueChange={(value: 'long' | 'short') => 
                setNewOption({ ...newOption, position: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="number"
            value={newOption.strike}
            onChange={(e) => setNewOption({ 
              ...newOption, 
              strike: parseFloat(e.target.value) 
            })}
            placeholder="Strike Price"
          />

          <Button onClick={addOption} className="w-full">
            Add Option
          </Button>

          <div className="space-y-2">
            {strategy.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-900/30 border border-teal-500/20 rounded-lg p-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-teal-400">
                    {option.position} {option.type}
                  </span>
                  <span className="text-gray-300">
                    Strike: ${option.strike}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payoffData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 212, 191, 0.1)" />
              <XAxis 
                dataKey="price"
                stroke="rgba(148, 163, 184, 0.5)"
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <YAxis 
                stroke="rgba(148, 163, 184, 0.5)"
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(45, 212, 191, 0.2)',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: 'rgba(148, 163, 184, 1)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Payoff']}
                labelFormatter={(value) => `Stock Price: $${parseFloat(value.toString()).toFixed(2)}`}
              />
              <Line 
                type="monotone"
                dataKey="payoff"
                stroke="rgba(45, 212, 191, 1)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
