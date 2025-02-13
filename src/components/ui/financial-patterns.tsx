// Removed unused React import since we're using the new JSX transform
import { motion, useScroll, useTransform } from 'framer-motion'

export function FinancialPatterns() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y }} className="w-full h-full opacity-[0.03]">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Animated chart lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.path
              key={`chart-${i}`}
              d={`M ${i * 12.5} 50 Q ${i * 12.5 + 6.25} ${45 + Math.random() * 10}, ${i * 12.5 + 12.5} 50`}
              stroke="url(#line-gradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}

          {/* Data flow dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.circle
              key={`dot-${i}`}
              r="0.5"
              fill="var(--primary)"
              initial={{ 
                cx: 20 + Math.random() * 60,
                cy: -5,
                opacity: 0 
              }}
              animate={{
                cy: [0, 100],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}
