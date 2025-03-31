import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ChevronLeft } from "lucide-react";
import { AICompanionDemo } from "../../components/demos/zom-ai/AICompanionDemo";
import { motion } from "framer-motion";

export default function AICompanionPage() {
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
          <h1 className="text-3xl font-bold text-white mb-6">AI Companion</h1>
          <p className="text-white/70 text-lg mb-8">
            Zom interprets complex data into plain English so you can make confident decisions.
          </p>
          
          <div className="bg-zinc-900/50 border border-teal-500/20 rounded-2xl p-8">
            <AICompanionDemo />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
