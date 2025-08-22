import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Message } from '../types';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0",
        isUser ? "order-2" : "order-1"
      )}>
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        ) : (
          <img 
            src="/Mithaas.png" 
            alt="Mithaas" 
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex-1 max-w-[80%]",
        isUser ? "order-1" : "order-2"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground ml-auto" 
            : "bg-muted text-foreground"
        )}>
          {/* Message Text */}
          <div className="text-sm leading-relaxed">
            {isTyping ? (
              <div className="flex items-center space-x-1">
                <span>Mithaas is typing</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : (
              message.content
            )}
          </div>

          {/* Analytics/Chart sections removed for backend-based replies */}
        </div>

        {/* Timestamp */}
        <div className={cn(
          "text-xs text-muted-foreground mt-2",
          isUser ? "text-right" : "text-left"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};
