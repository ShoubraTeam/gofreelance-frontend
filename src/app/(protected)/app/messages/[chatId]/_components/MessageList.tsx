'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import type { DisplayMessage } from '@/lib/types/chat';

interface MessageListProps {
  messages: DisplayMessage[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export function MessageList({
  messages,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 80 && hasNextPage && !isFetchingNextPage) {
        prevScrollHeight.current = container.scrollHeight;
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isFetchingNextPage) return;

    const newScrollHeight = container.scrollHeight;
    if (prevScrollHeight.current > 0) {
      container.scrollTop = newScrollHeight - prevScrollHeight.current;
    }
  }, [isFetchingNextPage, messages.length]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
      {isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isFetchingNextPage && hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Load older messages
          </button>
        </div>
      )}

      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
          No messages yet. Say hello!
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.messageId} message={message} />
      ))}

    </div>
  );
}
