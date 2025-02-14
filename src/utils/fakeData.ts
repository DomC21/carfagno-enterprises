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
  bid: number;
  ask: number;
  last: number;
  putVolume: number;
  callVolume: number;
  iv: number;
  greeks: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
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
export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: number;
  signal: number;
  histogram: number;
}

export interface StockData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  orderBook?: OrderBook;
  technicalIndicators?: TechnicalIndicators;
  pattern?: {
    type: 'bullish' | 'bearish';
    confidence: number;
  };
}

export const generateOrderBook = (basePrice: number): OrderBook => {
  const spread = faker.number.float({ min: 0.01, max: 0.05 });
  const levels = 10;
  
  const bids = Array.from({ length: levels }, (_, i) => {
    const price = basePrice * (1 - spread * (i + 1) / levels);
    const size = faker.number.int({ min: 100, max: 10000 });
    return {
      price,
      size,
      total: size // Will be calculated cumulatively
    };
  });

  const asks = Array.from({ length: levels }, (_, i) => {
    const price = basePrice * (1 + spread * (i + 1) / levels);
    const size = faker.number.int({ min: 100, max: 10000 });
    return {
      price,
      size,
      total: size // Will be calculated cumulatively
    };
  });

  // Calculate cumulative totals
  let bidTotal = 0;
  bids.forEach(bid => {
    bidTotal += bid.size;
    bid.total = bidTotal;
  });

  let askTotal = 0;
  asks.forEach(ask => {
    askTotal += ask.size;
    ask.total = askTotal;
  });

  return {
    bids,
    asks,
    spread: asks[0].price - bids[0].price
  };
};

export const generateStockData = (count: number): StockData[] => {
  const basePrice = faker.number.float({ min: 100, max: 200 });
  const volatility = 0.02;
  let prevRSI = 50;
  let prevMACD = 0;
  let prevSignal = 0;

  return Array.from({ length: count }, (_, i) => {
    const timestamp = Date.now() - (count - i - 1) * 60000;
    const randomChange = faker.number.float({ min: -volatility, max: volatility });
    const open = basePrice * (1 + randomChange);
    const high = open * (1 + faker.number.float({ min: 0, max: 0.01 }));
    const low = open * (1 - faker.number.float({ min: 0, max: 0.01 }));
    const close = faker.number.float({ min: low, max: high });
    const volume = faker.number.int({ min: 1000, max: 100000 });
    const orderBook = generateOrderBook(close);

    // Generate realistic technical indicators
    const rsi = Math.max(0, Math.min(100, prevRSI + faker.number.float({ min: -5, max: 5 })));
    const macd = prevMACD + faker.number.float({ min: -0.5, max: 0.5 });
    const signal = prevSignal + faker.number.float({ min: -0.3, max: 0.3 });
    const histogram = macd - signal;

    prevRSI = rsi;
    prevMACD = macd;
    prevSignal = signal;

    const pattern = faker.number.int({ min: 1, max: 10 }) > 8 ? {
      type: close > open ? 'bullish' as const : 'bearish' as const,
      confidence: faker.number.float({ min: 0.6, max: 0.95 })
    } : undefined;

    return { 
      timestamp, 
      open, 
      high, 
      low, 
      close, 
      volume, 
      orderBook, 
      pattern,
      technicalIndicators: {
        rsi,
        macd,
        signal,
        histogram
      }
    };
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
  
  return Array.from({ length: count }, () => {
    const strike = basePrice + faker.number.float({ min: -20, max: 20 });
    const last = faker.number.float({ min: 0.1, max: 10 });
    const spread = faker.number.float({ min: 0.05, max: 0.2 });
    
    return {
      strike,
      expiry: faker.date.future().toISOString().split('T')[0],
      bid: last - spread / 2,
      ask: last + spread / 2,
      last,
      putVolume: faker.number.int({ min: 100, max: 5000 }),
      callVolume: faker.number.int({ min: 100, max: 5000 }),
      iv: faker.number.float({ min: 20, max: 80 }),
      greeks: {
        delta: faker.number.float({ min: -1, max: 1 }),
        gamma: faker.number.float({ min: 0, max: 0.2 }),
        theta: faker.number.float({ min: -1, max: 0 }),
        vega: faker.number.float({ min: 0, max: 1 }),
        rho: faker.number.float({ min: -0.5, max: 0.5 })
      }
    };
  });
};

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
