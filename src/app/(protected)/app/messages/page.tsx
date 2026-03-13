'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FiMessageSquare } from 'react-icons/fi';
import { getChats } from '@/lib/api/chat';
import { ChatListItem } from './_components/ChatListItem';
import type { ChatStatus } from '@/lib/types/chat';

const PAGE_SIZE = 20;

export default function MessagesPage() {
  const [status, setStatus] = useState<ChatStatus>('ACTIVE');

  const { data, isLoading } = useQuery({
    queryKey: ['chats', status],
    queryFn: () => getChats(status, 0, PAGE_SIZE),
  });

  const chats = data?.data?.content ?? [];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          {!isLoading && (
            <p className="mt-1 text-sm text-muted-foreground">
              {chats.length} conversation{chats.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setStatus('ACTIVE')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              status === 'ACTIVE'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatus('ENDED')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              status === 'ENDED'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Ended
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && chats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <FiMessageSquare className="w-10 h-10" />
            <p>No {status.toLowerCase()} conversations.</p>
          </div>
        )}

        {!isLoading && chats.length > 0 && (
          <div className="space-y-2">
            {chats.map((chat) => (
              <ChatListItem key={chat.chatId} chat={chat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
