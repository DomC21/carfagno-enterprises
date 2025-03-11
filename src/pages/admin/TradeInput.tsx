import { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Slider } from '../../components/ui/slider'
import { Card } from '../../components/ui/card'

export default function TradeInput() {
  const [riskScore, setRiskScore] = useState(5)
  const [formData, setFormData] = useState({
    ticker: '',
    quantity: '',
    price: '',
    isOption: false
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement trade alert submission
    console.log('Submitting trade:', { ...formData, riskScore })
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-primary">New Trade Alert</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ticker Symbol
            </label>
            <Input
              value={formData.ticker}
              onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
              placeholder="AAPL"
              className="bg-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity
            </label>
            <Input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="100"
              className="bg-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price
            </label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="150.00"
              step="0.01"
              className="bg-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Risk Score (0-10)
            </label>
            <Slider
              value={[riskScore]}
              onValueChange={([value]) => setRiskScore(value)}
              max={10}
              step={1}
              className="my-4"
            />
            <div className="text-sm text-gray-400 text-center">
              Current Risk Score: {riskScore}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="isOption"
              checked={formData.isOption}
              onChange={(e) => setFormData({ ...formData, isOption: e.target.checked })}
              className="rounded bg-gray-800 border-gray-600"
            />
            <label htmlFor="isOption" className="text-sm font-medium text-gray-300">
              This is an options trade
            </label>
          </div>
          
          <Button type="submit" className="w-full">
            Send Alert
          </Button>
        </form>
      </Card>
    </div>
  )
}
