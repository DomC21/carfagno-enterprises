import React from 'react'

interface DataPoint {
  x: number
  y: number
}

function generateRandomData(points: number): DataPoint[] {
  const data: DataPoint[] = []
  let y = 50
  for (let i = 0; i < points; i++) {
    y += (Math.random() - 0.5) * 10
    data.push({ x: i, y })
  }
  return data
}

export function FinancialBackground() {
  const [data, setData] = React.useState<DataPoint[]>(() => generateRandomData(100))

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)]
        const lastPoint = prev[prev.length - 1]
        newData.push({
          x: lastPoint.x + 1,
          y: lastPoint.y + (Math.random() - 0.5) * 10
        })
        return newData
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Create SVG path from data points
  const pathD = data.reduce((path, point, i) => {
    const x = (point.x / 100) * 100 + '%'
    const y = (point.y / 100) * 100 + '%'
    return path + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`)
  }, '')

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d={pathD}
          className="stroke-primary fill-none"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
    </div>
  )
}
