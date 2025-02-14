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

export interface GreekMetrics {
  timestamp: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

export interface OptionsData {
  strike: number;
  expiry: string;
  putVolume: number;
  callVolume: number;
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
  committee: string;
  shares: number;
  sector: string;
  performance: number;
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

export const generateGreekMetrics = (count: number): GreekMetrics[] => {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: Date.now() - (count - i - 1) * 60000,
    delta: faker.number.float({ min: -1, max: 1 }),
    gamma: faker.number.float({ min: 0, max: 0.2 }),
    theta: faker.number.float({ min: -1, max: 0 }),
    vega: faker.number.float({ min: 0, max: 1 })
  }));
};

export const generateOptionsData = (count: number): OptionsData[] => {
  const basePrice = faker.number.float({ min: 100, max: 200 });
  
  return Array.from({ length: count }, () => ({
    strike: basePrice + faker.number.float({ min: -20, max: 20 }),
    expiry: faker.date.future().toISOString().split('T')[0],
    putVolume: faker.number.int({ min: 100, max: 5000 }),
    callVolume: faker.number.int({ min: 100, max: 5000 }),
    greeks: {
      delta: faker.number.float({ min: -1, max: 1 }),
      gamma: faker.number.float({ min: 0, max: 0.2 }),
      theta: faker.number.float({ min: -1, max: 0 }),
      vega: faker.number.float({ min: 0, max: 1 })
    }
  }));

export const generateCongressionalTrades = (count: number): CongressionalTrade[] => {
  const politicians = [
    'Sen. John Smith',
    'Rep. Sarah Johnson',
    'Sen. Michael Brown',
    'Rep. Emily Davis',
    'Sen. Robert Wilson'
  ];

  const committees = [
    'Finance Committee',
    'Banking Committee',
    'Budget Committee',
    'Ways and Means Committee',
    'Economic Committee'
  ];

  const sectors = [
    'Technology',
    'Healthcare',
    'Finance',
    'Energy',
    'Consumer Goods'
  ];

  const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA'];

  return Array.from({ length: count }, () => ({
    politician: faker.helpers.arrayElement(politicians),
    stock: faker.helpers.arrayElement(stocks),
    date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    amount: faker.number.int({ min: 10000, max: 1000000 }),
    type: faker.helpers.arrayElement(['buy', 'sell']) as 'buy' | 'sell',
    committee: faker.helpers.arrayElement(committees),
    shares: faker.number.int({ min: 100, max: 10000 }),
    sector: faker.helpers.arrayElement(sectors),
    performance: faker.number.float({ min: -15, max: 15, fractionDigits: 1 })
  }));
};
