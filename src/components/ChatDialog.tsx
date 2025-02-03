import * as React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { colorClasses, animationClasses } from '../utils/styles';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI financial assistant. How can I help you today?' }
  ]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = { 
        role: 'assistant', 
        content: 'I\'m a demo AI assistant. In the future, I\'ll be able to provide real financial insights and answer your questions!' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-blue-950/90 to-blue-900/90 backdrop-blur-sm border-teal-500/20">
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === 'user'
                      ? 'bg-teal-500/20 text-teal-100'
                      : 'bg-blue-900/50 text-gray-200'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-teal-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={cn(
                  "flex-1 bg-blue-900/30 rounded-md px-4 py-2",
                  colorClasses.border,
                  "placeholder:text-gray-400",
                  "focus:border-teal-400 focus:ring-teal-400/20",
                  "text-gray-200"
                )}
              />
              <Button
                type="submit"
                className={cn(
                  "bg-gradient-to-r from-teal-400 to-blue-500",
                  animationClasses.button
                )}
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
