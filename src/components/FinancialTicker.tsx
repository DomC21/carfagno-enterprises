import React from 'react';

export function FinancialTicker() {
  return (
    <div className="relative w-full flex items-center justify-center bg-gradient-to-r from-blue-950/70 via-blue-900/60 to-blue-950/70 h-12 border-y border-teal-500/20 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center space-x-12 animate-ticker">
        <span className="text-teal-300 font-mono whitespace-nowrap flex items-center gap-2">
          AAPL 182.63 <span className="text-green-400 flex items-center">▲ +1.2%</span>
        </span>
        <span className="text-teal-300 font-mono whitespace-nowrap flex items-center gap-2">
          MSFT 403.78 <span className="text-green-400 flex items-center">▲ +2.4%</span>
        </span>
        <span className="text-teal-300 font-mono whitespace-nowrap flex items-center gap-2">
          NVDA 621.45 <span className="text-red-400 flex items-center">▼ -0.8%</span>
        </span>
        <span className="text-teal-300 font-mono whitespace-nowrap flex items-center gap-2">
          <span className="text-blue-400">|</span> Market Cap: $2.84T
        </span>
      </div>
    </div>
  );
}
