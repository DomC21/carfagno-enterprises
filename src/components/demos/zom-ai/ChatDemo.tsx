
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Send, Bot } from 'lucide-react'

interface Message {
  type: 'user' | 'ai'
  content: string
  timestamp: number
}

const simulatedMessages: Message[] = [
  {
    type: 'user',
    content: 'Can you analyze AAPL stock for me?',
    timestamp: Date.now()
  },
  {
    type: 'ai',
    content: 'Based on our analysis of AAPL, we observe strong technical indicators with the stock trading above its 50-day moving average. Recent volume patterns suggest institutional accumulation, and our AI models indicate a 75% probability of continued upward momentum. Key support levels are established at $175 and $170.',
    timestamp: Date.now() + 1000
  },
  {
    type: 'user',
    content: 'What are the main risks to watch for?',
    timestamp: Date.now() + 2000
  },
  {
    type: 'ai',
    content: 'For AAPL, our AI has identified several key risk factors: 1) Supply chain constraints in Asia could impact production, 2) Market saturation in the smartphone segment might affect growth, 3) Regulatory challenges in key markets. However, our sentiment analysis shows overall positive market confidence with strong institutional support.',
    timestamp: Date.now() + 3000
  },
  {
    type: 'user',
    content: 'Show me the latest insider trading activity.',
    timestamp: Date.now() + 4000
  },
  {
    type: 'ai',
    content: 'Recent insider activity for AAPL shows: 1) CFO Luca Maestri sold 35,780 shares at $178.45 on Feb 1st, 2) SVP Deirdre O\'Brien sold 12,500 shares at $177.89 on Jan 28th. Our analysis indicates these are routine sales following options exercises and don\'t signal negative sentiment. Institutional holdings increased by 2.3% in Q4 2024.',
    timestamp: Date.now() + 5000
  },
  {
    type: 'user',
    content: 'What\'s the technical analysis saying?',
    timestamp: Date.now() + 6000
  },
  {
    type: 'ai',
    content: 'Technical analysis shows bullish signals: RSI at 62 indicates strong momentum without being overbought, MACD crossed above signal line, and price is forming a cup and handle pattern. Volume weighted average price (VWAP) suggests strong support at $172. Our AI models predict a 70% chance of testing $185 resistance within 30 days.',
    timestamp: Date.now() + 7000
  },
  {
    type: 'user',
    content: 'Any unusual options activity?',
    timestamp: Date.now() + 8000
  },
  {
    type: 'ai',
    content: 'Significant options flow detected: Large block of March $180 calls bought for $3.2M premium, suggesting bullish sentiment. Put/Call ratio at 0.75 indicates overall positive positioning. Dark pool data shows accumulation at $174-176 range. Implied volatility skew suggests market makers are pricing in potential upside movement.',
    timestamp: Date.now() + 9000
  }
]

export function ChatDemo() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0) // Start from beginning
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const playNextMessage = () => {
    if (currentMessageIndex < simulatedMessages.length) {
      if (simulatedMessages[currentMessageIndex].type === 'user') {
        setInputValue(simulatedMessages[currentMessageIndex].content)
        setShowInput(true)
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setShowInput(false)
          setCurrentMessageIndex(prev => prev + 1)
        }, 800)
      } else {
        setShowInput(false)
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setCurrentMessageIndex(prev => prev + 1)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    // Start playing messages and reset when finished
    const timer = setTimeout(() => {
      if (currentMessageIndex < simulatedMessages.length) {
        playNextMessage()
      } else {
        setCurrentMessageIndex(0)
        setShowInput(false)
        setIsTyping(false)
      }
    }, currentMessageIndex === simulatedMessages.length ? 2000 : 500)
    
    return () => clearTimeout(timer)
  }, [currentMessageIndex])

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 bg-red-500/10 text-white px-4 py-2 text-sm rounded-t-lg">
        Demo — All data displayed is simulated
      </div>
      
      <motion.div 
        className="mt-8 p-6 bg-gray-900 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {simulatedMessages.slice(0, currentMessageIndex).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {showInput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                readOnly
                className="bg-gray-800 border-gray-700"
                placeholder="Type your question..."
              />
              <Button className="bg-primary text-white hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '200ms' }} />
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '400ms' }} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
