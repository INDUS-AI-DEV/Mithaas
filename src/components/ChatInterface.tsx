import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '../types';
import { postChat, getGraphPng } from '../lib/api';

interface ChatInterfaceProps {
  messages: Message[];
  onAddMessage: (message: Message) => void;
  sessionId?: string | null;
  onSessionChange?: (sessionId: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onAddMessage, sessionId, onSessionChange }) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    onAddMessage(userMessage);

    // Show typing indicator
    setIsTyping(true);
    try {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const res = await postChat({ message: content, session_id: sessionId ?? null }, abortRef.current.signal);
      setIsTyping(false);

      if (onSessionChange && res.session_id) {
        onSessionChange(res.session_id);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: res.response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      onAddMessage(botMessage);

      // If graphs provided, fetch and append images
      if (Array.isArray(res.graphs) && res.graphs.length > 0) {
        for (const graphId of res.graphs) {
          try {
            const url = await getGraphPng(graphId);
            onAddMessage({
              id: `${Date.now()}-${graphId}`,
              content: '',
              sender: 'bot',
              timestamp: new Date(),
              type: 'image',
              imageUrl: url,
              caption: `Graph ${graphId}`
            });
          } catch (e) {
            onAddMessage({
              id: `${Date.now()}-${graphId}-err`,
              content: `Failed to load graph ${graphId}`,
              sender: 'bot',
              timestamp: new Date(),
              type: 'text'
            });
          }
        }
      }
    } catch (err: any) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: `Failed to fetch response: ${err?.message || 'Unknown error'}`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      onAddMessage(errorMessage);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src="/Mithaas.png" 
                alt="Mithaas Logo" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center space-y-2"
            >
              <h2 className="text-2xl font-bold text-foreground">Mithaas Analytics Bot</h2>
              <p className="text-muted-foreground max-w-md">
                Your AI-powered financial analytics assistant. Ask me about loan recovery rates, 
                regional performance, or any financial insights you need.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage("Show me recovery analytics and trends")}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-foreground mb-2">📊 Recovery Analytics</h3>
                <p className="text-sm text-muted-foreground">Get insights on loan recovery rates and trends</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage("Analyze regional performance across states")}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-foreground mb-2">🏢 Regional Performance</h3>
                <p className="text-sm text-muted-foreground">Analyze performance across different states</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage("Show monthly recovery trends")}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-foreground mb-2">📈 Monthly Trends</h3>
                <p className="text-sm text-muted-foreground">Track monthly recovery trends and patterns</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage("Display key performance metrics and KPIs")}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-foreground mb-2">🎯 Performance Metrics</h3>
                <p className="text-sm text-muted-foreground">View key performance indicators and KPIs</p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>
        )}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-3 mb-6"
          >
            <div className="flex-shrink-0">
              <img 
                src="/Mithaas.png" 
                alt="Mithaas" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 max-w-[80%]">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-1 text-sm">
                  <span>Mithaas is typing</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};
