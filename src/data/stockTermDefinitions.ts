import { StockTermDefinition } from "../components/ui/stock-term-explainer";

export const stockTermDefinitions: Record<string, StockTermDefinition> = {
  "RSI": {
    term: "RSI (Relative Strength Index)",
    shortDefinition: "A momentum indicator that measures the speed and change of price movements.",
    longDefinition: "The Relative Strength Index (RSI) is a momentum indicator that measures the speed and magnitude of recent price changes to evaluate overbought or oversold conditions. It oscillates between 0 and 100, with readings above 70 generally considered overbought and readings below 30 considered oversold.",
    example: "An RSI of 75 suggests the stock may be overbought and could be due for a price correction or pullback.",
    keyTakeaway: "Use RSI to identify potential reversal points when a stock becomes too overbought or oversold."
  },
  "MACD": {
    term: "MACD (Moving Average Convergence Divergence)",
    shortDefinition: "A trend-following momentum indicator that shows the relationship between two moving averages.",
    longDefinition: "The Moving Average Convergence Divergence (MACD) is calculated by subtracting the 26-period Exponential Moving Average (EMA) from the 12-period EMA. The result is the MACD line. A 9-day EMA of the MACD, called the 'signal line,' is then plotted on top of the MACD line, which can function as a trigger for buy and sell signals.",
    example: "When the MACD line crosses above the signal line, it's often interpreted as a bullish signal, suggesting it might be a good time to buy.",
    keyTakeaway: "MACD helps identify changes in the strength, direction, momentum, and duration of a trend in a stock's price."
  },
  "Bollinger Bands": {
    term: "Bollinger Bands",
    shortDefinition: "A technical analysis tool that creates a price channel around the moving average of a stock.",
    longDefinition: "Bollinger Bands consist of a middle band (usually a 20-day simple moving average) and two outer bands that are typically 2 standard deviations away from the middle band. These bands expand and contract based on market volatility.",
    example: "When price touches or moves outside the upper band, it may indicate the stock is overbought. When it touches or moves below the lower band, it may be oversold.",
    keyTakeaway: "Bollinger Bands help identify periods of high or low volatility and potential reversal points in price."
  },
  "P/E Ratio": {
    term: "P/E Ratio (Price-to-Earnings Ratio)",
    shortDefinition: "A valuation ratio that compares a company's stock price to its earnings per share.",
    longDefinition: "The Price-to-Earnings (P/E) ratio is calculated by dividing a company's current share price by its earnings per share (EPS). It shows how much investors are willing to pay for each dollar of earnings.",
    example: "A P/E ratio of 20 means investors are willing to pay $20 for every $1 of earnings the company generates.",
    keyTakeaway: "P/E ratios vary by industry and should be compared to industry peers or historical averages to determine if a stock is potentially overvalued or undervalued."
  },
  "Market Cap": {
    term: "Market Cap (Market Capitalization)",
    shortDefinition: "The total value of a company's outstanding shares of stock.",
    longDefinition: "Market capitalization is calculated by multiplying a company's outstanding shares by the current market price of one share. It represents the total market value of a company's equity.",
    example: "A company with 10 million shares outstanding priced at $50 per share would have a market cap of $500 million.",
    keyTakeaway: "Market cap helps categorize companies by size (small-cap, mid-cap, large-cap) and is often used to assess investment risk and growth potential."
  },
  "EPS": {
    term: "EPS (Earnings Per Share)",
    shortDefinition: "A company's profit divided by its outstanding shares of common stock.",
    longDefinition: "Earnings Per Share (EPS) is calculated by dividing a company's net income by its total number of outstanding shares. It represents the portion of a company's profit allocated to each outstanding share of common stock.",
    example: "If a company earns $10 million and has 2 million shares outstanding, its EPS would be $5.",
    keyTakeaway: "EPS is a key metric for evaluating a company's profitability and is used in calculating the P/E ratio."
  },
  "52-Week High/Low": {
    term: "52-Week High/Low",
    shortDefinition: "The highest and lowest prices at which a stock has traded during the past 52 weeks.",
    longDefinition: "The 52-week high and low represent the maximum and minimum prices at which a stock has traded during the previous year (52 weeks). These levels are often used as technical indicators and psychological price points.",
    example: "A stock trading near its 52-week high might indicate strong performance, while one near its 52-week low might signal weakness or a potential buying opportunity.",
    keyTakeaway: "The 52-week range helps investors understand a stock's volatility and current price relative to its recent historical performance."
  },
  "Forward P/E": {
    term: "Forward P/E",
    shortDefinition: "A valuation measure using predicted earnings for the next 12 months.",
    longDefinition: "Forward P/E is calculated by dividing the current share price by the estimated earnings per share (EPS) for the next 12 months. It's a predictive or estimated P/E ratio based on future earnings expectations.",
    example: "A forward P/E of 15 means investors are willing to pay $15 for every $1 of expected future earnings.",
    keyTakeaway: "Forward P/E can be more relevant than trailing P/E in rapidly changing business environments, but it relies on earnings estimates which may not be accurate."
  },
  "Volume": {
    term: "Volume",
    shortDefinition: "The number of shares traded during a specific period.",
    longDefinition: "Trading volume represents the total number of shares of a security that have changed hands during a specific time period, usually a day. High volume indicates high interest in a stock.",
    example: "A sudden spike in volume accompanying a price increase might indicate strong buying interest and validate the price movement.",
    keyTakeaway: "Volume helps confirm price movements and can signal the strength of a trend or potential reversals."
  },
  "Day Range": {
    term: "Day Range",
    shortDefinition: "The highest and lowest prices at which a stock has traded during the current trading day.",
    longDefinition: "The day range shows the lowest and highest prices at which a stock has traded during the current trading session. It gives investors an idea of the stock's intraday volatility.",
    example: "A stock with a day range of $45.50 - $48.75 has fluctuated between these prices during the trading day.",
    keyTakeaway: "A wide day range indicates high volatility, while a narrow range suggests more stable trading."
  }
};
