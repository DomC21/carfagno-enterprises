import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

interface PriceChartProps {
  data: {
    date: string
    actual: number
    predicted?: number
  }[]
  className?: string
}

export function PriceChart({ data, className }: PriceChartProps) {
  return (
    <div className={cn("w-full h-[400px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="date" 
            className="text-gray-400"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis 
            className="text-gray-400"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            name="Actual Price" 
          />
          {data[0]?.predicted !== undefined && (
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={false}
              name="Predicted Price" 
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
