import { Brain } from 'lucide-react'
import { cn } from "../../lib/utils"

interface ChatInsightProps {
  insight: string
  confidence?: number
  type?: 'technical' | 'fundamental' | 'sentiment'
  className?: string
}

export function ChatInsight({ 
  insight, 
  confidence = 0.85, 
  type = 'technical',
  className 
}: ChatInsightProps) {
  return (
    <div className={cn("bg-blue-900/30 p-4 rounded-lg", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          type === 'technical' ? 'bg-purple-900/50 text-purple-400' :
          type === 'fundamental' ? 'bg-blue-900/50 text-blue-400' :
          'bg-orange-900/50 text-orange-400'
        }`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <span className="text-sm text-gray-400">{new Date().toLocaleString()}</span>
      </div>
      <div className="flex items-start gap-3">
        <Brain className="w-5 h-5 text-teal-400 mt-1" />
        <div>
          <p className="text-gray-300">{insight}</p>
          <div className="mt-2 flex items-center">
            <div className="flex-1 bg-blue-900/50 rounded-full h-1.5">
              <div 
                className="bg-teal-400 h-1.5 rounded-full"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-gray-400">
              {(confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
