import { faker } from '@faker-js/faker';

// Types
export interface StockData {
  timestamp: number;
  price: number;
  volume: number;
  pattern?: {
    type: 'bullish' | 'bearish';
    confidence: number;
  };
}

export interface OptionsData {
  strike: number;
  expiry: string;
  volume: number;
  greeks: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  };
}

export interface CongressionalTrade {
  politician: string;
  stock: string;
  date: string;
  amount: number;
  type: 'buy' | 'sell';
}

export interface MarketSentiment {
  bullish: number;
  bearish: number;
  neutral: number;
  timestamp: number;
}

// Generators
export const generateStockData = (count: number): StockData[] => {
  const basePrice = faker.number.float({ min: 100, max: 200 });
  const volatility = 0.02;

  return Array.from({ length: count }, (_, i) => {
    const timestamp = Date.now() - (count - i - 1) * 60000;
    const randomChange = faker.number.float({ min: -volatility, max: volatility });
    const price = basePrice * (1 + randomChange);
    const volume = faker.number.int({ min: 1000, max: 100000 });

    const pattern = faker.number.int({ min: 1, max: 10 }) > 8 ? {
      type: price > basePrice ? 'bullish' as const : 'bearish' as const,
      confidence: faker.number.float({ min: 0.6, max: 0.95 })
    } : undefined;

    return { timestamp, price, volume, pattern };
  });
};

export const generateOptionsData = (count: number): OptionsData[] => {
  const basePrice = faker.number.float({ min: 100, max: 200 });
  
  return Array.from({ length: count }, () => ({
    strike: basePrice + faker.number.float({ min: -20, max: 20 }),
    expiry: faker.date.future().toISOString().split('T')[0],
    volume: faker.number.int({ min: 100, max: 5000 }),
    greeks: {
      delta: faker.number.float({ min: -1, max: 1 }),
      gamma: faker.number.float({ min: 0, max: 0.2 }),
      theta: faker.number.float({ min: -1, max: 0 }),
      vega: faker.number.float({ min: 0, max: 1 })
    }
  }));
};

export const generateCongressionalTrades = (count: number): CongressionalTrade[] => {
  const politicians = [
    'Sen. John Smith',
    'Rep. Sarah Johnson',
    'Sen. Michael Brown',
    'Rep. Emily Davis',
    'Sen. Robert Wilson'
  ];

  const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA'];

  return Array.from({ length: count }, () => ({
    politician: faker.helpers.arrayElement(politicians),
    stock: faker.helpers.arrayElement(stocks),
    date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    amount: faker.number.int({ min: 10000, max: 1000000 }),
    type: faker.helpers.arrayElement(['buy', 'sell']) as 'buy' | 'sell'
  }));
};

export const generateMarketSentiment = (count: number): MarketSentiment[] => {
  return Array.from({ length: count }, (_, i) => {
    const total = 100;
    const bullish = faker.number.int({ min: 20, max: 60 });
    const bearish = faker.number.int({ min: 20, max: 60 });
    const neutral = total - bullish - bearish;

    return {
      bullish,
      bearish,
      neutral,
      timestamp: Date.now() - (count - i - 1) * 3600000
    };
  });
};

// AI Response Generator
export const generateAIResponse = (_query: string): string => {
  const responses = [
    'Based on recent market analysis, the stock shows bullish momentum with strong technical indicators.',
    'Market sentiment is currently bearish, with increased selling pressure and weakening fundamentals.',
    'The stock is trading sideways with mixed signals. Consider waiting for a clear breakout pattern.',
    'Recent institutional buying suggests strong confidence in the company\'s growth prospects.',
    'Technical analysis indicates a potential reversal pattern forming on the daily chart.'
  ];

  return faker.helpers.arrayElement(responses);
};
