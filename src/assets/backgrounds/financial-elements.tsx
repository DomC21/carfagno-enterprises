export const CandlestickPattern = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Candlestick 1 - Bullish */}
    <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
    <rect x="16" y="15" width="8" height="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
    
    {/* Candlestick 2 - Bearish */}
    <line x1="60" y1="5" x2="60" y2="35" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
    <rect x="56" y="15" width="8" height="15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
    
    {/* Candlestick 3 - Bullish */}
    <line x1="100" y1="8" x2="100" y2="32" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
    <rect x="96" y="20" width="8" height="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"/>
  </svg>
);

export const TrendLines = () => (
  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Uptrend Line */}
    <path d="M20 80L100 40L180 20" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="4 4"/>
    
    {/* Support Line */}
    <path d="M20 60L180 40" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="4 4"/>
    
    {/* Resistance Line */}
    <path d="M20 30L180 10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="4 4"/>
  </svg>
);

export const VolumePattern = () => (
  <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="20" height="15" fill="currentColor" fillOpacity="0.03"/>
    <rect x="40" y="15" width="20" height="20" fill="currentColor" fillOpacity="0.03"/>
    <rect x="70" y="25" width="20" height="10" fill="currentColor" fillOpacity="0.03"/>
    <rect x="100" y="10" width="20" height="25" fill="currentColor" fillOpacity="0.03"/>
    <rect x="130" y="18" width="20" height="17" fill="currentColor" fillOpacity="0.03"/>
  </svg>
);

export const PriceLabel = () => (
  <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="70" height="20" rx="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05"/>
    <path d="M20 15H60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="2 2"/>
  </svg>
);
