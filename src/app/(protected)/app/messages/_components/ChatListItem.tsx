'use client';

import Link from 'next/link';
import { FiMessageSquare } from 'react-icons/fi';
import type { ChatSummary } from '@/lib/types/chat';

interface ChatListItemProps {
  chat: ChatSummary;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: 'short' });
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function getInitials(name: string): string {
  return name
    .split(/[\s_]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export function ChatListItem({ chat }: ChatListItemProps) {
  const isEnded = chat.chatStatus === 'ENDED';

  return (
    <Link
      href={`/app/messages/${chat.chatId}?other=${encodeURIComponent(chat.otherPartyName)}&job=${encodeURIComponent(chat.jobTitle)}`}
      className="flex items-center gap-4 px-4 py-4 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-semibold ring-2 ring-white shadow-sm shrink-0">
        {getInitials(chat.otherPartyName)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-foreground truncate">{chat.otherPartyName}</span>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatDate(chat.lastMessageDate)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.jobTitle}</p>
        {chat.lastMessageContent ? (
          <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessageContent}</p>
        ) : (
          <p className="text-sm text-muted-foreground/60 italic mt-0.5">No messages yet</p>
        )}
      </div>

      {isEnded && (
        <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5 shrink-0">
          Ended
        </span>
      )}

      {!isEnded && <FiMessageSquare className="w-4 h-4 text-primary shrink-0" />}
    </Link>
  );
}
