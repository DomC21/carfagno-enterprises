import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generateAIResponse } from '../../utils/fakeData'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Send } from 'lucide-react'

interface Message {
  type: 'user' | 'ai'
  content: string
  timestamp: number
}

export function ZomAIDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, aiResponse])
      setLoading(false)
    }, 1000)
  }

  const screeningResults = [
    { symbol: 'AAPL', score: 85, volume: 12500000 },
    { symbol: 'MSFT', score: 82, volume: 10200000 },
    { symbol: 'GOOGL', score: 78, volume: 8900000 },
    { symbol: 'AMZN', score: 75, volume: 7500000 },
    { symbol: 'META', score: 72, volume: 6800000 }
  ]

  return (
    <div className="space-y-6">
      {/* Chat Interface */}
      <Card className="p-4 bg-black border-border">
        <h3 className="text-lg font-semibold mb-4 text-primary">AI Analysis</h3>
        <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-950/20 border border-blue-500/20 ml-12'
                  : 'bg-teal-950/20 border border-teal-500/20 mr-12'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-primary">
                  {message.type === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-300">{message.content}</p>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about market trends, stock analysis, or trading strategies..."
            className="flex-1 bg-black border-border focus:border-primary"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>

      {/* Stock Screening Results */}
      <Card className="p-4 bg-black border-border">
        <h3 className="text-lg font-semibold mb-4 text-primary">Stock Screening</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={screeningResults}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="symbol" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '0.375rem'
                }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {screeningResults.map((result, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-blue-950/20 border border-blue-500/20"
            >
              <span className="text-sm font-medium text-primary">{result.symbol}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  Score: <span className="text-primary">{result.score}</span>
                </span>
                <span className="text-sm text-gray-400">
                  Volume: <span className="text-primary">{result.volume.toLocaleString()}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
