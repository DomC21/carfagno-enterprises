import { StockData } from './fakeData'

export interface TechnicalIndicators {
  sma20: number
  sma50: number
  sma200: number
  upperBB: number
  middleBB: number
  lowerBB: number
  volumeProfile: {
    price: number
    volume: number
    type: 'buy' | 'sell'
  }[]
}

export function calculateSMA(data: number[], period: number): number {
  if (data.length < period) return data[data.length - 1]
  const sum = data.slice(-period).reduce((a, b) => a + b, 0)
  return sum / period
}

export function calculateBollingerBands(data: number[], period: number = 20, stdDev: number = 2): {
  upper: number
  middle: number
  lower: number
} {
  if (data.length < period) {
    return {
      upper: data[data.length - 1],
      middle: data[data.length - 1],
      lower: data[data.length - 1]
    }
  }

  const sma = calculateSMA(data, period)
  const squaredDiffs = data.slice(-period).map(price => Math.pow(price - sma, 2))
  const standardDeviation = Math.sqrt(squaredDiffs.reduce((a, b) => a + b) / period)

  return {
    upper: sma + (standardDeviation * stdDev),
    middle: sma,
    lower: sma - (standardDeviation * stdDev)
  }
}

export function calculateVolumeProfile(data: StockData[], priceRanges: number = 10): {
  price: number
  volume: number
  type: 'buy' | 'sell'
}[] {
  const prices = data.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceStep = (maxPrice - minPrice) / priceRanges

  const profile: { [key: number]: { buyVolume: number; sellVolume: number } } = {}

  data.forEach(candle => {
    const priceLevel = Math.floor((candle.price - minPrice) / priceStep)
    if (!profile[priceLevel]) {
      profile[priceLevel] = { buyVolume: 0, sellVolume: 0 }
    }
    if (candle.price > candle.open) {
      profile[priceLevel].buyVolume += candle.volume
    } else {
      profile[priceLevel].sellVolume += candle.volume
    }
  })

  return Object.entries(profile).map(([level, volumes]) => ({
    price: minPrice + (Number(level) * priceStep),
    volume: Math.max(volumes.buyVolume, volumes.sellVolume),
    type: volumes.buyVolume > volumes.sellVolume ? ('buy' as const) : ('sell' as const)
  })).sort((a, b) => b.price - a.price)
}

export function calculateIndicators(data: StockData[]): TechnicalIndicators {
  const prices = data.map(d => d.price)
  const sma20 = calculateSMA(prices, 20)
  const sma50 = calculateSMA(prices, 50)
  const sma200 = calculateSMA(prices, 200)
  const bollingerBands = calculateBollingerBands(prices)
  const volumeProfile = calculateVolumeProfile(data)

  return {
    sma20,
    sma50,
    sma200,
    upperBB: bollingerBands.upper,
    middleBB: bollingerBands.middle,
    lowerBB: bollingerBands.lower,
    volumeProfile
  }
}

export const indicatorDescriptions = {
  sma: {
    title: 'Simple Moving Average (SMA)',
    description: 'Calculates the average price over a specified period. Helps identify trend direction and potential support/resistance levels.',
    interpretation: {
      bullish: 'Price above SMA indicates uptrend',
      bearish: 'Price below SMA indicates downtrend',
      crossovers: 'SMA crossovers can signal trend changes'
    }
  },
  bollingerBands: {
    title: 'Bollinger Bands',
    description: 'Shows price volatility and potential overbought/oversold conditions using standard deviations.',
    interpretation: {
      width: 'Band width indicates volatility',
      squeeze: 'Narrow bands suggest low volatility, potential breakout',
      edges: 'Price near bands suggests potential reversal'
    }
  },
  volumeProfile: {
    title: 'Volume Profile',
    description: 'Shows trading activity at different price levels to identify significant support/resistance areas.',
    interpretation: {
      highVolume: 'High volume nodes often act as support/resistance',
      distribution: 'Volume distribution indicates market participation',
      gaps: 'Low volume areas suggest potential price gaps'
    }
  }
}
