import { motion } from 'framer-motion'
import { Card } from './card'

interface HeatMapProps {
  data: {
    timestamp: number;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    keywords: string[];
  }[];
  colors: {
    positive: string;
    neutral: string;
    negative: string;
  };
}

export function HeatMap({ data, colors }: HeatMapProps) {
  const maxScore = Math.max(...data.map(d => d.score));

  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <motion.div
          key={item.timestamp}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: i * 0.05
          }}
          className="relative"
        >
          <Card className="p-3 bg-black border-border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors[item.sentiment] }}
                />
                <span className="text-sm text-gray-400">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <span className="text-sm font-medium text-primary">
                {(item.score * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: colors[item.sentiment] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.score / maxScore) * 100}%` }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: i * 0.05 + 0.1
                  }}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {item.keywords.map((keyword, j) => (
                <motion.span
                  key={j}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: i * 0.05 + j * 0.02 + 0.2
                  }}
                  className="text-xs px-2 py-0.5 rounded-full bg-blue-950/20 border border-blue-500/20 text-gray-400"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
