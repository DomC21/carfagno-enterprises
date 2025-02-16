import * as React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { CustomTooltip } from './custom-tooltip'

export interface DepthData {
  price: number
  bidVolume: number
  askVolume: number
}

interface DepthChartProps {
  data: DepthData[]
  className?: string
}

export function DepthChart({ data, className }: DepthChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={className}
    >
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="bidGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="askGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="price" 
              stroke="#64748b"
              tickFormatter={(value) => value.toFixed(2)}
            />
            <YAxis 
              stroke="#64748b"
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <CustomTooltip
                      title="Order Book Depth"
                      description="Shows cumulative buy and sell orders at each price level"
                      insights={[
                        { label: 'Price', value: `$${payload[0].payload.price.toFixed(2)}` },
                        { label: 'Bid Volume', value: payload[0].payload.bidVolume.toLocaleString() },
                        { label: 'Ask Volume', value: payload[0].payload.askVolume.toLocaleString() }
                      ]}
                    >
                      {null}
                    </CustomTooltip>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="bidVolume"
              stroke="#10b981"
              fill="url(#bidGradient)"
              fillOpacity={1}
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="askVolume"
              stroke="#ef4444"
              fill="url(#askGradient)"
              fillOpacity={1}
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
