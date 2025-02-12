// No need for explicit React import with JSX transform
import { motion } from 'framer-motion'

export function AnimatedLogo() {
  return (
    <motion.div
      className="fixed top-0 left-4 z-50 p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-8 h-8">
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="absolute"
          animate={{
            filter: ['drop-shadow(0 0 2px #3B82F6)', 'drop-shadow(0 0 8px #3B82F6)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <rect width="32" height="32" rx="8" fill="#030711"/>
          <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 24C11.5817 24 8 20.4183 8 16" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="16" cy="16" r="4" fill="#3B82F6"/>
        </motion.svg>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.div>
  )
}
