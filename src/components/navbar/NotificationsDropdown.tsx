'use client';

import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiBell, FiMessageSquare } from 'react-icons/fi';
import { useNotificationStore } from '@/store/useNotificationStore';

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function NotificationsDropdown() {
  const router = useRouter();
  const { notifications, markChatAsRead, markAllAsRead } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (chatId: string, otherPartyName: string, jobTitle: string) => {
    markChatAsRead(chatId);
    router.push(
      `/app/messages/${chatId}?other=${encodeURIComponent(otherPartyName)}&job=${encodeURIComponent(jobTitle)}`
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer relative">
          <FiBell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary font-normal cursor-pointer hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 px-4 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <FiBell className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                We&apos;ll notify you when something arrives
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.messageId}
                onClick={() => handleNotificationClick(n.chatId, n.senderName, n.jobTitle)}
                className="cursor-pointer px-4 py-3 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0 mt-0.5">
                  {n.senderName
                    .split(/[\s_]+/)
                    .slice(0, 2)
                    .map((w) => w[0]?.toUpperCase())
                    .join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">{n.senderName}</p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatTime(n.date)}
                    </span>
                  </div>
                  {n.jobTitle && (
                    <p className="text-xs text-muted-foreground truncate">{n.jobTitle}</p>
                  )}
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{n.content}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                )}
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/app/messages')}
          className="cursor-pointer text-center justify-center font-medium text-primary"
        >
          <FiMessageSquare className="w-4 h-4 mr-2" />
          Go to Messages
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
