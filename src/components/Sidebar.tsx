import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Settings, 
  History, 
  LogOut, 
  ChevronLeft,
  Menu
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'history', label: 'Conversation History', icon: History },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  activePage,
  onPageChange
}) => {
  return (
    <div className={cn(
      "relative h-screen flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <img 
              src="/Mithaas.png" 
              alt="Mithaas Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-semibold text-sm">Mithaas</span>
          </motion.div>
        )}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-accent rounded-md transition-colors"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activePage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-4">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};
