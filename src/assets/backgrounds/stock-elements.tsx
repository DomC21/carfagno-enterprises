import React from 'react';

export const StockTicker = () => (
  <svg width="400" height="40" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-ticker">
      {/* Stock Price 1 */}
      <g transform="translate(0, 10)">
        <text x="10" y="15" fill="currentColor" fillOpacity="0.6" fontSize="12">AAPL</text>
        <text x="50" y="15" fill="currentColor" fillOpacity="0.6" fontSize="12">$182.63</text>
        <path d="M85 15l5 -5l5 5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"/>
      </g>
      {/* Stock Price 2 */}
      <g transform="translate(120, 10)">
        <text x="10" y="15" fill="currentColor" fillOpacity="0.6" fontSize="12">MSFT</text>
        <text x="50" y="15" fill="currentColor" fillOpacity="0.6" fontSize="12">$403.78</text>
        <path d="M85 15l5 -5l5 5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"/>
      </g>
      {/* Stock Price 3 */}
      <g transform="translate(240, 10)">
        <text x="10" y="15" fill="currentColor" fillOpacity="0.6" fontSize="12">NVDA</text>
        <text x="50" y="15" fill="currentColor" fillOpacity="0.6" fontSize="12">$621.45</text>
        <path d="M85 15l5 5l5 -5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6"/>
      </g>
    </g>
  </svg>
);

export const CountingNumber = () => (
  <svg width="160" height="60" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-counting">
      <text x="10" y="20" fill="currentColor" fillOpacity="0.4" fontSize="12">Market Cap</text>
      <text x="10" y="45" fill="currentColor" fillOpacity="0.6" fontSize="24" className="font-mono">$2.84T</text>
    </g>
  </svg>
);

export const DataFlow = () => (
  <svg width="300" height="100" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-flow">
      {/* Data Flow Lines */}
      <path d="M10 50C50 50 50 20 90 20C130 20 130 80 170 80C210 80 210 50 250 50" 
        stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4"/>
      <path d="M10 70C50 70 50 40 90 40C130 40 130 60 170 60C210 60 210 30 250 30" 
        stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 4"/>
      {/* Data Points */}
      <circle cx="90" cy="20" r="2" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="170" cy="80" r="2" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="250" cy="50" r="2" fill="currentColor" fillOpacity="0.2"/>
    </g>
  </svg>
);
