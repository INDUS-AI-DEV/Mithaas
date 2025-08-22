import React, { useState } from 'react';
import { Search, MessageSquare, Clock, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Conversation } from '../types';

interface ConversationHistoryProps {
  conversations: Conversation[];
  onLoadConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversationId: string) => void;
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  conversations,
  onLoadConversation,
  onDeleteConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredConversations = conversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.messages.some((msg: any) => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDelete = async (conversationId: string) => {
    setDeletingId(conversationId);
    // Simulate deletion delay
    setTimeout(() => {
      onDeleteConversation(conversationId);
      setDeletingId(null);
    }, 500);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };



  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Conversation History</h1>
        <p className="text-muted-foreground">View and manage your past conversations with Mithaas</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-4">
        {filteredConversations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Start a conversation with Mithaas to see your chat history here'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-medium text-foreground truncate">
                        {conversation.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(conversation.updatedAt)}
                      </div>
                      <span>•</span>
                      <span>{conversation.messages.length} messages</span>
                    </div>

                    {/* Preview of last message */}
                    {conversation.messages.length > 0 && (
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.messages[conversation.messages.length - 1].content}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLoadConversation(conversation)}
                    >
                      Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(conversation.id)}
                      disabled={deletingId === conversation.id}
                      className="text-destructive hover:text-destructive"
                    >
                      {deletingId === conversation.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      {conversations.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {filteredConversations.length === conversations.length 
            ? `Showing all ${conversations.length} conversations`
            : `Showing ${filteredConversations.length} of ${conversations.length} conversations`
          }
        </div>
      )}
    </div>
  );
};
