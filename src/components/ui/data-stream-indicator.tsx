import { motion } from 'framer-motion'

interface Props {
  lastUpdated?: Date | number | null
  className?: string
  isLoading?: boolean
}

export function DataStreamIndicator({ lastUpdated, className = '', isLoading = false }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: isLoading ? 1 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-xs text-gray-400">
        {isLoading ? 'Loading data...' : 
         lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 
         'Real-time data'}
      </span>
    </div>
  )
}
