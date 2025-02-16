import { motion } from 'framer-motion'
import { cn } from '../../utils/styles'

interface AILoadingProps {
  className?: string
  message?: string
}

export function AILoading({ className, message = 'AI is analyzing...' }: AILoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex justify-center items-center gap-2 p-4",
        "transform-gpu transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            className="w-2 h-2 rounded-full bg-primary transform-gpu"
          />
        ))}
      </div>
      <span className="text-sm text-gray-400">{message}</span>
    </motion.div>
  )
}
