import type { DisplayMessage } from '@/lib/types/chat';

interface MessageBubbleProps {
  message: DisplayMessage;
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] flex flex-col gap-1 ${message.isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
            message.isOwn
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-card border border-border text-foreground rounded-bl-sm'
          }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-muted-foreground px-1">{formatTime(message.date)}</span>
      </div>
    </div>
  );
}
