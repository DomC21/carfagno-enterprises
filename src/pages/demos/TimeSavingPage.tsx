import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ChevronLeft } from "lucide-react";
import { TimeSavingDemo } from "../../components/demos/zom-ai/TimeSavingDemo";
import { motion } from "framer-motion";
import { BeginnerHelpDialog } from "../../components/ui/beginner-help-dialog";

export default function TimeSavingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <Button 
          variant="ghost" 
          className="mb-6 text-teal-400 hover:text-teal-300"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Time-Saving Research</h1>
            <BeginnerHelpDialog />
          </div>
          <p className="text-white/70 text-lg mb-8">
            No more hours of research—ask Zom, and get comprehensive answers in seconds.
          </p>
          
          <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
            <TimeSavingDemo />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
