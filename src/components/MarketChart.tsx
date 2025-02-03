import * as React from 'react';
import { cn } from '../lib/utils';
import { colorClasses, animationClasses } from '../utils/styles';

interface DataPoint {
  time: string;
  value: number;
}

const mockData: DataPoint[] = [
  { time: '9:30', value: 100 },
  { time: '10:00', value: 105 },
  { time: '10:30', value: 103 },
  { time: '11:00', value: 108 },
  { time: '11:30', value: 106 },
  { time: '12:00', value: 110 },
  { time: '12:30', value: 112 },
  { time: '13:00', value: 115 },
  { time: '13:30', value: 113 },
  { time: '14:00', value: 118 },
  { time: '14:30', value: 120 },
  { time: '15:00', value: 122 },
  { time: '15:30', value: 125 },
  { time: '16:00', value: 128 }
];

export function MarketChart() {
  const [dimensions, setDimensions] = React.useState({ width: 600, height: 300 });
  const chartRef = React.useRef<HTMLDivElement>(null);
  const padding = 40;

  React.useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const containerWidth = chartRef.current.clientWidth;
        setDimensions({
          width: Math.min(600, containerWidth - 32), // 32px for padding
          height: Math.min(300, (containerWidth - 32) * 0.5)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate scales
  const xScale = (dimensions.width - padding * 2) / (mockData.length - 1);
  const yMin = Math.min(...mockData.map(d => d.value));
  const yMax = Math.max(...mockData.map(d => d.value));
  const yScale = (dimensions.height - padding * 2) / (yMax - yMin);

  // Generate path data
  const pathData = mockData.map((point, i) => {
    const x = padding + i * xScale;
    const y = dimensions.height - padding - (point.value - yMin) * yScale;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate gradient path for fill
  const fillPathData = `${pathData} L ${dimensions.width - padding} ${dimensions.height - padding} L ${padding} ${dimensions.height - padding} Z`;

  return (
    <div ref={chartRef} className={cn(
      "relative p-4 rounded-xl",
      "bg-gradient-to-br from-blue-950/50 to-blue-900/30",
      "border border-teal-500/20",
      "backdrop-blur-sm",
      animationClasses.fadeIn
    )}>
      <svg 
        width={dimensions.width} 
        height={dimensions.height} 
        className="overflow-visible"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        {/* Grid lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`grid-${i}`}
            x1={padding}
            y1={padding + i * (dimensions.height - padding * 2) / 5}
            x2={dimensions.width - padding}
            y2={padding + i * (dimensions.height - padding * 2) / 5}
            className="stroke-gray-700/20"
            strokeDasharray="4 4"
          />
        ))}

        {/* Y-axis labels */}
        {Array.from({ length: 6 }, (_, i) => (
          <text
            key={`label-${i}`}
            x={padding - 10}
            y={padding + i * (dimensions.height - padding * 2) / 5}
            className="text-xs fill-gray-400 text-right"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {Math.round(yMax - (i * (yMax - yMin) / 5))}
          </text>
        ))}

        {/* X-axis labels */}
        {mockData.filter((_, i) => i % 2 === 0).map((point, i) => (
          <text
            key={`time-${i}`}
            x={padding + i * xScale * 2}
            y={dimensions.height - padding + 20}
            className="text-xs fill-gray-400 text-center"
            textAnchor="middle"
          >
            {point.time}
          </text>
        ))}

        {/* Chart line with gradient fill */}
        <path
          d={fillPathData}
          className="fill-teal-500/5"
        />
        <path
          d={pathData}
          className={cn(
            "stroke-teal-400",
            "stroke-2",
            "fill-none",
            animationClasses.flow
          )}
        />

        {/* Data points */}
        {mockData.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={padding + i * xScale}
            cy={dimensions.height - padding - (point.value - yMin) * yScale}
            r="3"
            className={cn(
              "fill-teal-400",
              animationClasses.pulse
            )}
          />
        ))}
      </svg>
    </div>
  );
}
