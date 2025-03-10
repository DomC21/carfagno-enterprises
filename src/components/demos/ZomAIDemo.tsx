
import { motion } from "framer-motion"
import { ParticleBackground } from "../ui/particle-background"
import { ChatDemo } from "./zom-ai/ChatDemo"

export function ZomAIDemo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="relative space-y-6 transform-gpu"
    >
      <ParticleBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1
        }}
      >
        <ChatDemo />
      </motion.div>
    </motion.div>
  )
}
