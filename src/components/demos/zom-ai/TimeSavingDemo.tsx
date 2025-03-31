import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Clock, Search, CheckCircle, XCircle } from "lucide-react";
import { StockTermExplainer } from "../../../components/ui/stock-term-explainer";
import { stockTermDefinitions } from "../../../data/stockTermDefinitions";

export const TimeSavingDemo: React.FC = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-teal-500/20">
          <TabsTrigger 
            value="comparison" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            With vs. Without Zom
          </TabsTrigger>
          <TabsTrigger 
            value="example" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-blue-500 data-[state=active]:text-white"
          >
            Example Query
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-red-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-medium text-white">Without Zom AI</h3>
                </div>
                
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <p>Spend 15-30 minutes searching multiple financial websites</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Search className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <p>Navigate through complex charts and tables to find relevant data</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <p>Manually compare metrics across different sources</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <p>Interpret technical indicators yourself</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <p>No personalized insights or plain-English explanations</p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-red-950/20 rounded-lg border border-red-500/20">
                    <p className="font-medium text-red-400">Time spent: 15-30 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-teal-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <h3 className="text-lg font-medium text-white">With Zom AI</h3>
                </div>
                
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <p>Get comprehensive answers in seconds with a single query</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <p>All relevant data presented in a clear, organized format</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <p>Automatic comparison of key metrics</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <p>Technical indicators explained in plain English</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                    <p>AI-generated insights highlight what's most important</p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-teal-950/20 rounded-lg border border-teal-500/20">
                    <p className="font-medium text-teal-400">Time spent: 5-10 seconds</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="example" className="mt-4">
          <Card className="border border-teal-500/20 bg-black/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">U</span>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-blue-950/30 text-white">
                    What are the key technical indicators for NVDA right now?
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">Z</span>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-teal-950/30 text-white">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">NVIDIA Corporation (NVDA)</span>
                        <span className="text-xl font-bold text-green-500">$942.89</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-teal-400 font-medium mb-1">
                            <StockTermExplainer term="RSI" definitions={stockTermDefinitions} />
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                            </div>
                            <span className="text-sm">68</span>
                          </div>
                          <p className="text-sm mt-1">Approaching overbought territory (70+) but not yet overextended.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-teal-400 font-medium mb-1">
                            <StockTermExplainer term="MACD" definitions={stockTermDefinitions} />
                          </h4>
                          <p className="text-sm">MACD (12,26,9): +15.32 (above signal line)</p>
                          <p className="text-sm mt-1">Bullish momentum continues with MACD above signal line.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-teal-400 font-medium mb-1">
                            <StockTermExplainer term="Bollinger Bands" definitions={stockTermDefinitions} />
                          </h4>
                          <div className="grid grid-cols-3 text-sm text-center">
                            <div>
                              <p className="text-gray-400">Lower Band</p>
                              <p>$876.42</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Middle Band</p>
                              <p>$912.65</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Upper Band</p>
                              <p>$948.88</p>
                            </div>
                          </div>
                          <p className="text-sm mt-1">Price is near the upper band, suggesting strong momentum but potential for a pullback.</p>
                        </div>
                      </div>
                      
                      
                      <div className="mt-3 text-sm border-t border-teal-500/20 pt-3">
                        <p className="font-medium text-teal-400">Summary:</p>
                        <p>Technical indicators for NVDA show strong bullish momentum with the stock trading near its upper Bollinger Band. The RSI at 68 suggests strength but is approaching overbought levels. MACD remains positive above its signal line, confirming the uptrend. Consider watching for signs of exhaustion if RSI moves above 70.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
