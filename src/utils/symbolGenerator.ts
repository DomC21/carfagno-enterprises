const stockSymbols = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META', 'TSLA', 'JPM', 'BAC', 'GS',
  'IBM', 'INTC', 'AMD', 'NFLX', 'DIS', 'CSCO', 'ORCL', 'CRM', 'ADBE', 'PYPL',
  'V', 'MA', 'WMT', 'HD', 'PG', 'KO', 'PEP', 'MCD', 'NKE', 'SBUX'
]

export const generateRandomSymbol = () => {
  return stockSymbols[Math.floor(Math.random() * stockSymbols.length)]
}

export const generateRelatedSymbols = (count: number = 3) => {
  const shuffled = [...stockSymbols].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export { stockSymbols }
