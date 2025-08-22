import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { ConversationHistory } from './components/ConversationHistory';
import { Profile } from './components/Profile';
import { Message, Conversation, UserSettings } from './types';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('chatbot');
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    darkMode: false,
    notifications: true,
    dataRefreshInterval: '15min'
  });

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: 'Hello! I\'m MithaasGenie, your AI-powered analytics assistant. I can help you with any kind of analytics related to Mithaas. What would you like to know?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const handleAddMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // Update or create conversation
    if (currentConversationId) {
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, messages: [...conv.messages, message], updatedAt: new Date() }
          : conv
      ));
    } else {
      // Create new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : ''),
        messages: [message],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
    }
  };

  const handleLoadConversation = (conversation: Conversation) => {
    setMessages(conversation.messages);
    setCurrentConversationId(conversation.id);
    setActivePage('chatbot');
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    if (currentConversationId === conversationId) {
      setMessages([]);
      setCurrentConversationId(null);
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    setUserSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleToggleNotifications = () => {
    setUserSettings(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  const handleDataRefreshIntervalChange = (interval: string) => {
    setUserSettings(prev => ({ ...prev, dataRefreshInterval: interval as any }));
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'chatbot':
        return <ChatInterface messages={messages} onAddMessage={handleAddMessage} sessionId={sessionId} onSessionChange={setSessionId} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <Settings
            darkMode={userSettings.darkMode}
            notifications={userSettings.notifications}
            dataRefreshInterval={userSettings.dataRefreshInterval}
            onToggleDarkMode={handleToggleDarkMode}
            onToggleNotifications={handleToggleNotifications}
            onDataRefreshIntervalChange={handleDataRefreshIntervalChange}
          />
        );
      case 'profile':
        return <Profile />;
      case 'history':
        return (
          <ConversationHistory
            conversations={conversations}
            onLoadConversation={handleLoadConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        );
      default:
        return <ChatInterface messages={messages} onAddMessage={handleAddMessage} sessionId={sessionId} onSessionChange={setSessionId} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          activePage={activePage}
          onPageChange={setActivePage}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} onOpenProfile={() => setActivePage('profile')} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-hidden">
            {renderActivePage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
