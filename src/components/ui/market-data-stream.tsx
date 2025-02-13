

export function MarketDataStream() {
  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-black/80 backdrop-blur-sm border-b border-border overflow-hidden z-50">
      <div className="flex gap-8 animate-ticker whitespace-nowrap">
        {[
          'BTC $48,235.67 ▲',
          'ETH $2,891.44 ▲',
          'SPY $478.12 ▼',
          'AAPL $182.31 ▲',
          'MSFT $402.15 ▲',
          'NVDA $721.28 ▲',
          'GOOGL $142.71 ▼',
          'AMZN $171.81 ▲',
        ].map((ticker, index) => (
          <span
            key={index}
            className="text-sm font-mono"
          >
            {ticker}
          </span>
        ))}
      </div>
      <div className="flex gap-8 animate-ticker-clone whitespace-nowrap absolute top-0 left-[100%]">
        {[
          'BTC $48,235.67 ▲',
          'ETH $2,891.44 ▲',
          'SPY $478.12 ▼',
          'AAPL $182.31 ▲',
          'MSFT $402.15 ▲',
          'NVDA $721.28 ▲',
          'GOOGL $142.71 ▼',
          'AMZN $171.81 ▲',
        ].map((ticker, index) => (
          <span
            key={index}
            className="text-sm font-mono"
          >
            {ticker}
          </span>
        ))}
      </div>
    </div>
  )
}
