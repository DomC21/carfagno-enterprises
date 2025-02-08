export interface AnimationProps {
  maxElements?: number;
  className?: string;
  priority?: 'high' | 'low';
  style?: React.CSSProperties;
  'aria-hidden'?: boolean;
}

export interface StockData {
  symbol: string;
  price: number;
  previousClose: number;
  change: number;
}

export type AnimationElement = {
  Component: React.ComponentType;
  positions: string[];
  priority: 'high' | 'low';
  scale?: number;
  customClass?: string;
};
