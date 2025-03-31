import React, { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { MessageSquare, Lightbulb, TrendingUp, FileText } from "lucide-react";

const exampleTopics = [
  "Technical Indicators",
  "Earnings Reports",
  "Market News",
  "Investment Strategy"
];

const exampleResponses = {
  "Technical Indicators": (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-teal-400" />
        <h4 className="font-medium text-white">Technical Indicators Explained</h4>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">RSI of 72 for TSLA means:</span> Tesla stock is currently in <span className="text-red-400">overbought territory</span>. This suggests the stock may be due for a short-term pullback or consolidation as momentum slows.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to know that RSI above 70 typically indicates overbought conditions.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">MACD crossover on AAPL chart means:</span> The MACD line crossing above the signal line is a <span className="text-green-400">bullish signal</span>, suggesting positive momentum is building and potentially indicating a good entry point.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to understand MACD crossover patterns and their implications.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">Bollinger Band squeeze on MSFT means:</span> Microsoft stock is experiencing low volatility, which often precedes a significant price movement. The direction is uncertain, but <span className="text-yellow-400">prepare for increased volatility</span> soon.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to recognize the pattern and understand its implications for future price action.</p>
        </div>
      </div>
    </div>
  ),
  "Earnings Reports": (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-teal-400" />
        <h4 className="font-medium text-white">Earnings Reports Decoded</h4>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">AMZN's "operating margin expansion to 7.8%":</span> Amazon's profitability is <span className="text-green-400">improving significantly</span>, as they're keeping more money from each dollar of sales. This suggests their cost-cutting measures and AWS growth are working effectively.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to compare this to historical margins and industry benchmarks to understand its significance.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">META's "DAU growth of 5% YoY":</span> Meta's daily active users are growing at a <span className="text-yellow-400">moderate pace</span>, which is positive but not exceptional. For a mature social platform, this suggests they're maintaining engagement despite competition.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to research typical growth rates for social media platforms at Meta's stage.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">GOOGL's "Traffic acquisition costs increased 12%":</span> Google is <span className="text-red-400">paying more</span> to maintain its search traffic, which could pressure margins. This might indicate increasing competition or changes in how users access search.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to understand the relationship between TAC and Google's business model.</p>
        </div>
      </div>
    </div>
  ),
  "Market News": (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-teal-400" />
        <h4 className="font-medium text-white">Market News Interpreted</h4>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">"Fed signals potential rate cut in September":</span> This is generally <span className="text-green-400">positive for stocks</span>, especially growth and tech companies. Lower rates reduce borrowing costs and make equities more attractive compared to bonds.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to understand the relationship between interest rates and different market sectors.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">"Chip export restrictions to China expanded":</span> This could <span className="text-red-400">negatively impact</span> semiconductor companies with significant China exposure like QCOM and NVDA, while potentially benefiting domestic Chinese chip manufacturers long-term.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to research which companies have the most China revenue exposure.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">"Oil prices surge 5% on Middle East tensions":</span> This is <span className="text-green-400">positive for energy stocks</span> like XOM and CVX, but potentially <span className="text-red-400">negative for airlines</span>, transportation, and consumer discretionary companies due to higher input costs.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to understand the complex relationships between oil prices and various sectors.</p>
        </div>
      </div>
    </div>
  ),
  "Investment Strategy": (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-teal-400" />
        <h4 className="font-medium text-white">Investment Strategy Insights</h4>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">"Dollar-cost averaging vs. lump sum investing":</span> For most investors, <span className="text-green-400">dollar-cost averaging</span> reduces timing risk and emotional decision-making, though lump sum has historically outperformed when you have a very long time horizon.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to research historical performance data and behavioral finance concepts.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">"Portfolio allocation in high inflation environment":</span> Consider increasing exposure to <span className="text-green-400">TIPS, commodities, real estate, and value stocks</span> while reducing long-duration bonds and high-multiple growth stocks that are more sensitive to interest rates.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to understand how different asset classes historically perform during inflationary periods.</p>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-medium text-teal-400">"Tax-loss harvesting opportunities":</span> Consider selling underperforming investments to offset capital gains, but be aware of <span className="text-yellow-400">wash sale rules</span> that prevent claiming losses if you repurchase the same or substantially identical securities within 30 days.
        </p>
        
        <div className="flex items-center gap-2 mt-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <p className="text-xs text-gray-400">Without Zom AI, you'd need to research tax regulations and identify suitable replacement investments.</p>
        </div>
      </div>
    </div>
  )
};

export const AICompanionDemo: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(exampleTopics[0]);
  
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Zom AI explains:</h3>
        <div className="flex flex-wrap gap-2">
          {exampleTopics.map((topic) => (
            <Button
              key={topic}
              variant={selectedTopic === topic ? "default" : "outline"}
              className={`text-sm ${
                selectedTopic === topic 
                  ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white" 
                  : "bg-black/50 text-gray-300 hover:text-white border-teal-500/20"
              }`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
      
      <Card className="border border-teal-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4">
          {exampleResponses[selectedTopic as keyof typeof exampleResponses]}
        </CardContent>
      </Card>
    </div>
  );
};
