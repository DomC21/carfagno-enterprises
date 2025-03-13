import { useState } from 'react'
import { Card } from '../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Input } from '../../components/ui/input'

export function NeuralNetworksDemo() {
  const [symbol, setSymbol] = useState('AAPL')
  const [timeframe, setTimeframe] = useState('Next Week')
  
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-black border-border">
        <h3 className="text-xl font-semibold mb-6 text-primary">Predict</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Symbol</label>
            <Input 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="bg-gray-900 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Timeframe</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Next Week">Next Week</SelectItem>
                <SelectItem value="Next Month">Next Month</SelectItem>
                <SelectItem value="Next Quarter">Next Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Public Sentiment</h4>
            <p className="text-gray-400">WIP</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">Predicted Growth</h4>
            <p className="text-red-500 text-2xl font-bold">-12.44%</p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">ZomAI Explanation</h4>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">To understand why the AI predicted a -12.44% change for next week, let&apos;s look at the indicators in the provided data:</p>
              <ul className="space-y-4 text-gray-300">
                <li><strong>Moving Averages (MA_50 and MA_200):</strong> The Moving Average (MA) is a trend-following indicator that smooths out price data by creating a constantly updated average price. The 50-day MA (MA_50) and 200-day MA (MA_200) are commonly used to identify trends. If the MA_50 is below the MA_200, it indicates a bearish trend.</li>
                <li><strong>Exponential Moving Averages (EMA_50 and EMA_200):</strong> Similar to MA, Exponential Moving Averages (EMA) give more weight to recent prices. The EMA_50 and EMA_200 help identify potential trend reversals based on shorter-term and longer-term averages.</li>
                <li><strong>Relative Strength Index (RSI):</strong> The Relative Strength Index is a momentum oscillator that measures the speed and change of price movements. An RSI above 70 may indicate the asset is overbought and could be due for a correction.</li>
                <li><strong>Moving Average Convergence Divergence (MACD):</strong> MACD is a trend-following momentum indicator that shows the relationship between two moving averages of a security&apos;s price. The MACD line crossing below the signal line suggests a bearish trend.</li>
                <li><strong>Bollinger Bands (Bollinger High and Bollinger Low):</strong> Bollinger Bands consist of a middle band (MA) and two outer bands that are standard deviations away. They expand and contract based on volatility. Prices near the upper band may be considered overbought, while prices near the lower band may be considered oversold.</li>
                <li><strong>Average True Range (ATR):</strong> The Average True Range measures market volatility. A higher ATR value generally indicates higher volatility, which could result in larger price movements.</li>
              </ul>
              <p className="text-gray-300 mt-4">Based on the provided indicators, the AI likely predicted a -12.44% change for next week due to the following reasons:</p>
              <ol className="text-gray-300">
                <li>The Moving Averages (MA_50 and MA_200) may have shown a bearish trend.</li>
                <li>The Exponential Moving Averages (EMA_50 and EMA_200) might have indicated a potential trend reversal.</li>
                <li>The Relative Strength Index (RSI) could have suggested that the asset is overbought.</li>
                <li>The Moving Average Convergence Divergence (MACD) might have shown a bearish signal.</li>
                <li>The Bollinger Bands could have indicated that the price was near the upper band, suggesting a possible correction.</li>
                <li>The Average True Range (ATR) value might have indicated increased volatility, leading to larger price swings.</li>
              </ol>
              <p className="text-gray-300 mt-4">Considering these indicators, the AI used them to forecast a -12.44% change for next week based on the bearish signals and potential market conditions.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
