import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { type OptionsData } from '../../utils/fakeData'
import { CustomTooltip } from './custom-tooltip'

interface OptionsFlow3DProps {
  data: OptionsData[]
  className?: string
}

export function OptionsFlow3D({ data, className }: OptionsFlow3DProps) {
  const controls = useAnimation()
  const [hoveredOption, setHoveredOption] = React.useState<OptionsData | null>(null)

  React.useEffect(() => {
    controls.start({
      rotateY: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    })
  }, [controls])

  return (
    <motion.div
      className={`relative w-full h-[400px] perspective-1000 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {data.map((option, i) => {
        const radius = 150
        const angle = (i / data.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const scale = option.callVolume / Math.max(...data.map(d => d.callVolume))

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-20 h-20"
            style={{
              x,
              z,
              transformStyle: 'preserve-3d',
              transform: `translate(-50%, -50%) translateZ(${z}px)`,
            }}
            animate={controls}
            onHoverStart={() => setHoveredOption(option)}
            onHoverEnd={() => setHoveredOption(null)}
          >
            <motion.div
              className={`w-full h-full rounded-lg ${
                option.iv > 50 ? 'bg-red-500/20' : 'bg-green-500/20'
              } border border-primary/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transform-gpu transition-all duration-300`}
              whileHover={{ scale: 1.2 }}
              style={{ transform: `scale(${0.5 + scale * 0.5})` }}
            >
              <div className="text-center">
                <div className="text-xs font-medium text-primary">${option.strike}</div>
                <div className="text-[10px] text-gray-400">IV: {option.iv.toFixed(1)}%</div>
              </div>
            </motion.div>
            {hoveredOption === option && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                <CustomTooltip
                  title="Option Details"
                  description={`Strike: $${option.strike}`}
                  insights={[
                    { label: 'IV', value: `${option.iv.toFixed(1)}%` },
                    { label: 'Volume', value: option.callVolume.toLocaleString() },
                    { label: 'Delta', value: option.greeks.delta.toFixed(3) },
                    { label: 'Gamma', value: option.greeks.gamma.toFixed(3) }
                  ]}
                >
                  {null}
                </CustomTooltip>
              </div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
