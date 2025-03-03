import { useState } from 'react'
import { Card } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Info } from 'lucide-react'

interface IndicatorProps {
  label: string
  value: string | number
  info?: string
}

function Indicator({ label, value, info }: IndicatorProps) {
  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{label}:</span>
        {info && (
          <button 
            className="text-gray-500 hover:text-gray-400 transition-colors"
            aria-label={`Get AI analysis for ${label}`}
          >
            <Info size={16} />
          </button>
        )}
      </div>
      <span className="text-white font-medium">{value}</span>
    </li>
  )
}

export function StockAnalysisDemo() {
  const [symbol, setSymbol] = useState('ZOM')

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-black border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">ZOM - Stock Analysis Platform</h2>
          <div className="flex gap-4">
            <Input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Enter stock ticker (e.g., AAPL, MSFT, GOOGL)"
              className="bg-gray-900 text-white w-64"
            />
            <Button>Search</Button>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 mb-8">
          <h5 className="text-yellow-500 font-medium mb-2">Disclaimer</h5>
          <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
            <li>All values here are fictitious and meant only as examples.</li>
            <li>This list is not exhaustive and does not constitute financial advice.</li>
            <li>Always refer to real-time data and official filings for accurate information.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Zomedica Corp. <span className="text-gray-400">(ZOM)</span>
          </h2>
          <p className="text-gray-400">Veterinary Health Company</p>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white">$2.35</span>
            <span className="ml-2 text-green-500">+0.15 (6.81%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Price & Volume Overview</h3>
            <ul className="space-y-2">
              <Indicator label="Current Price" value="$2.35" info="price" />
              <Indicator label="Daily Volume Avg 3m" value="2.5M shares" info="volume" />
              <Indicator label="Float" value="300M shares" info="float" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Trend Indicators</h3>
            <ul className="space-y-2">
              <Indicator label="SMA 50" value="$2.20" info="sma50" />
              <Indicator label="SMA 200" value="$2.10" info="sma200" />
              <Indicator label="EMA 21" value="$2.25" info="ema21" />
              <Indicator label="Parabolic SAR" value="$2.05" info="sar" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Momentum Indicators</h3>
            <ul className="space-y-2">
              <Indicator label="RSI 14" value="62" info="rsi" />
              <Indicator label="MACD 12 26" value="+0.03" info="macd" />
              <Indicator label="Stochastic Oscillator" value="72" info="stoch" />
              <Indicator label="CCI 20" value="+115" info="cci" />
              <Indicator label="ROC 14" value="+2.5%" info="roc" />
              <Indicator label="Williams %R 14" value="-20" info="williams" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Volatility Indicators</h3>
            <ul className="space-y-2">
              <Indicator label="ATR 14" value="$0.15" info="atr" />
              <Indicator label="Bollinger Bands" value="Upper: $2.50 | Lower: $1.90" info="bb" />
              <Indicator label="Chaikin Volatility" value="+5% (WoW)" info="chaikin" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Volume Indicators</h3>
            <ul className="space-y-2">
              <Indicator label="OBV" value="Rising" info="obv" />
              <Indicator label="VWAP Intraday" value="$2.32" info="vwap" />
              <Indicator label="CMF 20" value="+0.15" info="cmf" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Support & Resistance</h3>
            <ul className="space-y-2">
              <Indicator label="Fibonacci Retracement" value="$2.00 (38.2%)" info="fib" />
              <Indicator label="Pivot Point" value="$2.30" info="pivot" />
              <Indicator label="Support" value="$2.20 / $2.00" info="support" />
              <Indicator label="Resistance" value="$2.40 / $2.60" info="resistance" />
            </ul>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          <h3 className="text-primary font-medium mb-2">Interactive Icon Note</h3>
          <p>Each indicator comes with a clickable icon <Info className="inline" size={16} /> that opens ZOM AI's contextual analysis—explaining what the metric means, why it matters, and how it compares in the current market environment.</p>
        </div>
      </Card>
    </div>
  )
}
