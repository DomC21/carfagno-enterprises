import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function AIChatbot() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        className="group bg-gradient-to-r from-blue-900/50 to-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-full p-4 hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-500"
        variant="ghost"
      >
        <MessageCircle className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform duration-500" />
        <span className="sr-only">Open AI Chat Assistant</span>
      </Button>
      <div className="absolute bottom-full right-0 mb-2 w-64 bg-gradient-to-br from-blue-900/50 to-blue-950/50 backdrop-blur-sm border border-teal-500/20 rounded-lg p-4 hidden group-hover:block">
        <p className="text-teal-400 text-sm">Hello! Ask me about financial insights.</p>
      </div>
    </div>
  );
}
