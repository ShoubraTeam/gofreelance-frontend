'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

interface ChatHeaderProps {
  otherPartyName: string;
  jobTitle: string;
}

export function ChatHeader({ otherPartyName, jobTitle }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card shrink-0">
      <button
        onClick={() => router.push('/app/messages')}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <FiArrowLeft className="w-5 h-5" />
      </button>

      <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-semibold ring-2 ring-white shadow-sm shrink-0">
        {otherPartyName
          .split(/[\s_]+/)
          .slice(0, 2)
          .map((w) => w[0]?.toUpperCase())
          .join('')}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm leading-tight">{otherPartyName}</p>
        <p className="text-xs text-muted-foreground truncate">{jobTitle}</p>
      </div>
    </div>
  );
}
