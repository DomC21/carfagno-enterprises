import { motion } from 'framer-motion'

export function FinancialPatterns() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Animated chart lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.path
            key={`chart-${i}`}
            d={`M ${i * 100} ${Math.random() * 100} L ${(i + 1) * 100} ${Math.random() * 100}`}
            stroke="url(#line-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.3,
              d: `M ${i * 100} ${Math.random() * 100} L ${(i + 1) * 100} ${Math.random() * 100}`
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}

        {/* Data flow dots */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            r="1"
            fill="var(--primary)"
            initial={{ 
              cx: Math.random() * 100,
              cy: -10,
              opacity: 0 
            }}
            animate={{
              cy: [0, 100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  )
}
