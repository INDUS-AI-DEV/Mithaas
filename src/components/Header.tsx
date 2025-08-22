import React from 'react';
import { Sun, Moon, User } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onOpenProfile }) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-3">
          <img 
            src="/Mithaas.png" 
            alt="Mithaas Logo" 
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground">Mithaas Analytics Bot</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Financial Analytics</p>
          </div>
        </div>

        {/* Right side - Dark mode toggle and Profile */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="hover:bg-accent"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 bg-primary rounded-full flex items-center justify-center hover:opacity-90"
            aria-label="Open profile"
          >
            <User className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
