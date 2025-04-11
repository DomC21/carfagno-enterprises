import { RealTimeAnalysisDemo } from "../../components/demos/zom-ai/RealTimeAnalysisDemo";
import { motion } from "framer-motion";
import { BeginnerHelpDialog } from "../../components/ui/beginner-help-dialog";

export default function RealTimeAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto max-w-6xl px-4 py-16 pt-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Real-Time Stock Analysis</h1>
            <BeginnerHelpDialog />
          </div>
          <p className="text-white/70 text-lg mb-8">
            Get instant insights on any stock you query with comprehensive data and metrics.
          </p>
          
          <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
            <RealTimeAnalysisDemo />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
