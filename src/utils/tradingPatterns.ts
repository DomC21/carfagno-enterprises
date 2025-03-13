import { faker } from '@faker-js/faker'

export interface TradingPattern {
  type: 'double-top' | 'double-bottom' | 'head-shoulders' | 'triangle'
  confidence: number
  priceTarget: number
  supportLevels: number[]
  resistanceLevels: number[]
  timeframe: string
  volume: number[]
}

export function generateTradingPattern(basePrice: number): TradingPattern {
  const patterns = ['double-top', 'double-bottom', 'head-shoulders', 'triangle'] as const
  const pattern = patterns[Math.floor(Math.random() * patterns.length)]
  const confidence = faker.number.float({ min: 0.6, max: 0.95 })
  const priceTarget = basePrice * (1 + (pattern === 'double-top' || pattern === 'head-shoulders' 
    ? -faker.number.float({ min: 0.05, max: 0.15 }) 
    : faker.number.float({ min: 0.05, max: 0.15 })))

  // Generate support and resistance levels
  const supportLevels = Array.from({ length: 3 }, () => 
    basePrice * (1 - faker.number.float({ min: 0.02, max: 0.08 }))
  ).sort((a, b) => a - b)

  const resistanceLevels = Array.from({ length: 3 }, () =>
    basePrice * (1 + faker.number.float({ min: 0.02, max: 0.08 }))
  ).sort((a, b) => a - b)

  // Generate volume profile
  const volume = Array.from({ length: 24 }, () => 
    faker.number.float({ min: 100000, max: 1000000 })
  )

  // Adjust volume based on pattern type
  switch (pattern) {
    case 'double-top': {
      volume[8] *= 1.5 // Higher volume at first top
      volume[16] *= 1.3 // Slightly lower at second top
      break
    }
    case 'double-bottom': {
      volume[8] *= 1.4 // Higher volume at first bottom
      volume[16] *= 1.6 // Even higher at second bottom (accumulation)
      break
    }
    case 'head-shoulders': {
      volume[6] *= 1.3 // Left shoulder
      volume[12] *= 1.5 // Head
      volume[18] *= 1.2 // Right shoulder
      break
    }
    case 'triangle': {
      // Decreasing volume as pattern develops
      for (let i = 0; i < volume.length; i++) {
        volume[i] *= (1 - i * 0.02)
      }
      break
    }
  }

  return {
    type: pattern,
    confidence,
    priceTarget,
    supportLevels,
    resistanceLevels,
    timeframe: faker.helpers.arrayElement(['1H', '4H', '1D']),
    volume
  }
}

export function generatePriceData(pattern: TradingPattern, basePrice: number): number[] {
  const prices: number[] = []
  const volatility = faker.number.float({ min: 0.001, max: 0.003 })

  switch (pattern.type) {
    case 'double-top': {
      // Generate double top pattern
      for (let i = 0; i < 24; i++) {
        if (i < 8) {
          prices.push(basePrice * (1 + i * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 12) {
          prices.push(basePrice * (1.08 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 16) {
          prices.push(basePrice * (1 + (16 - i) * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 20) {
          prices.push(basePrice * (1.07 + faker.number.float({ min: -volatility, max: volatility })))
        } else {
          prices.push(basePrice * (1 + (24 - i) * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        }
      }
      break
    }
    case 'double-bottom': {
      // Generate double bottom pattern
      for (let i = 0; i < 24; i++) {
        if (i < 8) {
          prices.push(basePrice * (1 - i * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 12) {
          prices.push(basePrice * (0.92 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 16) {
          prices.push(basePrice * (1 - (16 - i) * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 20) {
          prices.push(basePrice * (0.93 + faker.number.float({ min: -volatility, max: volatility })))
        } else {
          prices.push(basePrice * (1 - (24 - i) * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        }
      }
      break
    }
    case 'head-shoulders': {
      // Generate head and shoulders pattern
      for (let i = 0; i < 24; i++) {
        if (i < 6) { // Left shoulder
          prices.push(basePrice * (1 + i * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 8) {
          prices.push(basePrice * (1.06 - (i - 6) * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 12) { // Head
          prices.push(basePrice * (1.04 + (i - 8) * 0.015 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 16) {
          prices.push(basePrice * (1.1 - (i - 12) * 0.015 + faker.number.float({ min: -volatility, max: volatility })))
        } else if (i < 20) { // Right shoulder
          prices.push(basePrice * (1.04 + (i - 16) * 0.01 + faker.number.float({ min: -volatility, max: volatility })))
        } else {
          prices.push(basePrice * (1.08 - (i - 20) * 0.02 + faker.number.float({ min: -volatility, max: volatility })))
        }
      }
      break
    }
    case 'triangle': {
      // Generate triangle pattern
      const height = basePrice * 0.1
      for (let i = 0; i < 24; i++) {
        const progress = i / 24
        const range = height * (1 - progress)
        prices.push(basePrice + (range / 2) * Math.sin(i) + faker.number.float({ min: -volatility, max: volatility }) * basePrice)
      }
      break
    }
  }

  return prices
}
