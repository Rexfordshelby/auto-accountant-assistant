
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageSquare, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

const AIFinancialAssistant = () => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! I\'m your AI financial assistant. Ask me about tax regulations, financial planning, or accounting best practices.',
      type: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your financial data, I recommend setting aside an additional 5% of revenue for tax provisions.",
        "Looking at your expense patterns, there's an opportunity to optimize your business travel deductions.",
        "Your current depreciation schedule could be optimized to improve cash flow in the next quarter.",
        "Based on recent tax law changes, you might qualify for additional R&D credits. Would you like me to analyze this further?"
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        type: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setQuery('');
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveToFavorites = () => {
    toast({
      title: "Conversation saved",
      description: "This conversation has been added to your favorites.",
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare size={20} className="text-blue-600" />
          AI Financial Assistant
        </CardTitle>
        <CardDescription>
          Get instant answers to your financial and tax questions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 h-96 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div 
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className={`text-xs mt-1 flex items-center gap-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <Clock size={12} />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-gray-50 flex flex-col gap-4">
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder="Ask a financial question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !query.trim()}
            size="icon"
          >
            <Send size={16} />
          </Button>
        </div>
        
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])}>
            New Conversation
          </Button>
          <Button variant="outline" size="sm" onClick={saveToFavorites}>
            <Star size={14} className="mr-1" />
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIFinancialAssistant;
