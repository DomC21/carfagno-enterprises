import { StockData } from './fakeData'

interface WebSocketMessage {
  type: 'trade' | 'quote' | 'depth'
  data: any
  timestamp: number
}

export function simulateWebSocket(
  onMessage: (message: WebSocketMessage) => void,
  interval: number = 100
) {
  let lastPrice = 180 + Math.random() * 5
  let volume = 1000
  
  const generateTrade = (): WebSocketMessage => {
    // Simulate price movement with mean reversion
    const change = (Math.random() - 0.5) * 0.1
    lastPrice = lastPrice + change
    volume = Math.floor(500 + Math.random() * 1000)

    return {
      type: 'trade',
      timestamp: Date.now(),
      data: {
        price: lastPrice,
        volume,
        side: Math.random() > 0.5 ? 'buy' : 'sell'
      }
    }
  }

  const generateQuote = (): WebSocketMessage => {
    const spread = 0.02
    return {
      type: 'quote',
      timestamp: Date.now(),
      data: {
        bid: lastPrice - spread / 2,
        ask: lastPrice + spread / 2,
        bidSize: Math.floor(100 + Math.random() * 900),
        askSize: Math.floor(100 + Math.random() * 900)
      }
    }
  }

  const generateDepth = (): WebSocketMessage => {
    const levels = 5
    const bids = Array.from({ length: levels }, (_, i) => ({
      price: lastPrice - (i + 1) * 0.01,
      size: Math.floor(100 + Math.random() * 900)
    }))
    const asks = Array.from({ length: levels }, (_, i) => ({
      price: lastPrice + (i + 1) * 0.01,
      size: Math.floor(100 + Math.random() * 900)
    }))

    return {
      type: 'depth',
      timestamp: Date.now(),
      data: { bids, asks }
    }
  }

  const messageGenerators = [
    generateTrade,
    generateQuote,
    generateDepth
  ]

  const intervalId = setInterval(() => {
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      const generator = messageGenerators[Math.floor(Math.random() * messageGenerators.length)]
      onMessage(generator())
    })
  }, interval)

  return () => {
    clearInterval(intervalId)
  }
}

export function aggregateMarketData(messages: WebSocketMessage[]): StockData {
  const trades = messages.filter(m => m.type === 'trade')
  const quotes = messages.filter(m => m.type === 'quote')
  const depths = messages.filter(m => m.type === 'depth')

  if (trades.length === 0 || quotes.length === 0) {
    throw new Error('Insufficient market data')
  }

  const latestTrade = trades[trades.length - 1].data
  const latestQuote = quotes[quotes.length - 1].data
  const latestDepth = depths[depths.length - 1]?.data

  return {
    price: latestTrade.price,
    volume: latestTrade.volume,
    timestamp: Date.now(),
    open: trades[0].data.price,
    high: Math.max(...trades.map(t => t.data.price)),
    low: Math.min(...trades.map(t => t.data.price)),
    close: latestTrade.price,
    bid: latestQuote.bid,
    ask: latestQuote.ask,
    bidSize: latestQuote.bidSize,
    askSize: latestQuote.askSize,
    depth: latestDepth || { bids: [], asks: [] },
    technicalIndicators: {
      rsi: 50 + (Math.random() - 0.5) * 20,
      macd: (Math.random() - 0.5) * 0.5,
      signal: (Math.random() - 0.5) * 0.5,
      histogram: (Math.random() - 0.5) * 0.2
    }
  }
}
