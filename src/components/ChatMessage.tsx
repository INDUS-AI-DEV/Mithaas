import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Message } from '../types';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const isUser = message.sender === 'user';

  const renderMarkdownTable = (text: string) => {
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2 || !lines[0].includes('|')) return null;
    const header = lines[0].split('|').map(c => c.trim()).filter(Boolean);
    const separator = lines[1];
    if (!/-{3,}/.test(separator)) return null;
    const rows = lines.slice(2).map(line => line.split('|').map(c => c.trim()).filter(Boolean));
    if (header.length === 0 || rows.length === 0) return null;
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {header.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-border">
                {r.map((c, ci) => (
                  <td key={ci} className="px-3 py-2 align-top">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderJsonTable = (jsonText: string) => {
    try {
      const data = JSON.parse(jsonText);
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        const headers = Array.from(new Set(data.flatMap((row: any) => Object.keys(row))));
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {headers.map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b border-border">
                    {headers.map(h => (
                      <td key={h} className="px-3 py-2 align-top">{String(row?.[h] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (data && typeof data === 'object') {
        const entries = Object.entries(data);
        return (
          <div className="overflow-x-auto">
            <table className="min-w-[300px] text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left font-semibold border-b border-border w-40">Field</th>
                  <th className="px-3 py-2 text-left font-semibold border-b border-border">Value</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([k, v]) => (
                  <tr key={k} className="border-b border-border">
                    <td className="px-3 py-2 font-medium align-top">{k}</td>
                    <td className="px-3 py-2 align-top whitespace-pre-wrap">{typeof v === 'string' ? v : JSON.stringify(v)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    } catch (_) {
      // not json
    }
    return null;
  };

  const renderFormattedContent = (text: string) => {
    // If fenced JSON block, extract and render as JSON
    const fencedMatch = text.match(/```(json)?\n([\s\S]*?)```/i);
    if (fencedMatch) {
      const jsonBlock = fencedMatch[2];
      const jsonTable = renderJsonTable(jsonBlock);
      if (jsonTable) return jsonTable;
    }
    // Try full text as JSON
    const jsonTable = renderJsonTable(text);
    if (jsonTable) return jsonTable;
    // Try markdown table
    const mdTable = renderMarkdownTable(text);
    if (mdTable) return mdTable;
    // Fallback to plain text with preserved newlines
    return <span className="whitespace-pre-wrap">{text}</span>;
  };

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
          {/* Message Text or Image */}
          {message.type === 'image' && message.imageUrl ? (
            <div className="space-y-2">
              <img src={message.imageUrl} alt={message.caption || 'Graph'} className="rounded-md max-h-96 object-contain" />
              {message.caption && <div className="text-xs text-muted-foreground">{message.caption}</div>}
            </div>
          ) : (
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
              renderFormattedContent(message.content)
            )}
            </div>
          )}

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
