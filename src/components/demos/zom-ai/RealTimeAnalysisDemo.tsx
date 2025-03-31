import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { StockTermExplainer } from "../../../components/ui/stock-term-explainer";
import { stockTermDefinitions } from "../../../data/stockTermDefinitions";

const examplePrompts = [
  "What's the current price of AAPL?",
  "Show me TSLA's P/E ratio and market cap",
  "Compare MSFT and GOOGL fundamentals",
  "What's the 52-week high for AMZN?"
];

const exampleResponses = {
  "What's the current price of AAPL?": (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">Apple Inc. (AAPL)</span>
        <span className="text-xl font-bold text-green-500">$182.63</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-400">Previous Close:</span>
          <span className="ml-2">$180.95</span>
        </div>
        <div>
          <span className="text-gray-400">Change:</span>
          <span className="ml-2 text-green-500">+$1.68 (+0.93%)</span>
        </div>
        <div>
          <StockTermExplainer term="Day Range" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">$180.44 - $183.12</span>
        </div>
        <div>
          <StockTermExplainer term="Volume" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">52.3M</span>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-300">
        <p>Apple's stock is currently trading at $182.63, up 0.93% from yesterday's close. The stock has been on an upward trend over the past week, with strong volume indicating buyer interest.</p>
      </div>
    </div>
  ),
  "Show me TSLA's P/E ratio and market cap": (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">Tesla, Inc. (TSLA)</span>
        <span className="text-xl font-bold text-red-500">$173.45</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <StockTermExplainer term="P/E Ratio" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">49.8</span>
        </div>
        <div>
          <StockTermExplainer term="Market Cap" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">$551.2B</span>
        </div>
        <div>
          <StockTermExplainer term="EPS" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">$3.48</span>
        </div>
        <div>
          <StockTermExplainer term="Forward P/E" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">42.3</span>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-300">
        <p>Tesla's P/E ratio of 49.8 is higher than the industry average of 22.1, suggesting investors are expecting strong future growth. The market cap of $551.2B makes it one of the most valuable automotive companies globally.</p>
      </div>
    </div>
  ),
  "Compare MSFT and GOOGL fundamentals": (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center font-medium">Microsoft (MSFT)</div>
        <div className="col-span-1 text-center font-medium">Alphabet (GOOGL)</div>
        
        <div className="text-gray-400">Price</div>
        <div className="text-center">$415.32</div>
        <div className="text-center">$147.68</div>
        
        <div className="text-gray-400">
          <StockTermExplainer term="P/E Ratio" definitions={stockTermDefinitions} iconOnly={true} className="text-gray-400" />
          P/E Ratio
        </div>
        <div className="text-center">37.2</div>
        <div className="text-center">25.1</div>
        
        <div className="text-gray-400">
          <StockTermExplainer term="Market Cap" definitions={stockTermDefinitions} iconOnly={true} className="text-gray-400" />
          Market Cap
        </div>
        <div className="text-center">$3.09T</div>
        <div className="text-center">$1.86T</div>
        
        <div className="text-gray-400">Revenue Growth</div>
        <div className="text-center text-green-500">+18.3%</div>
        <div className="text-center text-green-500">+13.5%</div>
      </div>
      <div className="mt-3 text-sm text-gray-300">
        <p>Both companies show strong fundamentals, but Microsoft has higher growth metrics and valuation multiples. Microsoft's cloud business (Azure) is growing faster than Google Cloud, while Alphabet has stronger advertising revenue streams.</p>
      </div>
    </div>
  ),
  "What's the 52-week high for AMZN?": (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">Amazon.com Inc. (AMZN)</span>
        <span className="text-xl font-bold text-green-500">$178.32</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <StockTermExplainer term="52-Week High/Low" definitions={stockTermDefinitions} className="text-gray-400" />
          <span className="ml-2">$189.77</span>
        </div>
        <div>
          <span className="text-gray-400">52-Week Low:</span>
          <span className="ml-2">$101.15</span>
        </div>
        <div>
          <span className="text-gray-400">% From High:</span>
          <span className="ml-2 text-red-500">-6.03%</span>
        </div>
        <div>
          <span className="text-gray-400">% From Low:</span>
          <span className="ml-2 text-green-500">+76.29%</span>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-300">
        <p>Amazon reached its 52-week high of $189.77 on March 8, 2025, following strong Q4 earnings. The stock is currently trading about 6% below this high but has gained over 76% from its 52-week low set in October 2024.</p>
      </div>
    </div>
  )
};

export const RealTimeAnalysisDemo: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0]);
  
  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">Try asking about:</h3>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((prompt) => (
            <Button
              key={prompt}
              variant={selectedPrompt === prompt ? "default" : "outline"}
              className={`text-sm ${
                selectedPrompt === prompt 
                  ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white" 
                  : "bg-black/50 text-gray-300 hover:text-white border-teal-500/20"
              }`}
              onClick={() => setSelectedPrompt(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
      
      <Card className="border border-teal-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">U</span>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-blue-950/30 text-white">
                {selectedPrompt}
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">Z</span>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-teal-950/30 text-white">
                {exampleResponses[selectedPrompt as keyof typeof exampleResponses]}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
