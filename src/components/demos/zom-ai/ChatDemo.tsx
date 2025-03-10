
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
  }
]

export function ChatDemo() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(2) // Start with first response visible
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
    // Start playing remaining messages after a short delay
    setTimeout(() => {
      playNextMessage()
    }, 500)
  }, [])

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
