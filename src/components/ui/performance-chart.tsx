import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

interface PerformanceChartProps {
  data: {
    period: string
    return: number
    benchmark?: number
  }[]
  className?: string
}

export function PerformanceChart({ data, className }: PerformanceChartProps) {
  return (
    <div className={cn("w-full h-[400px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="period" 
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
          <Bar 
            dataKey="return" 
            fill="hsl(var(--primary))" 
            name="Strategy Return" 
          />
          {data[0]?.benchmark !== undefined && (
            <Bar 
              dataKey="benchmark" 
              fill="hsl(var(--accent))" 
              name="Benchmark Return" 
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
