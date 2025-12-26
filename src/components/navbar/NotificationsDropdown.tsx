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
import { FiBell } from 'react-icons/fi';

export function NotificationsDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer relative">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Notifications</span>
            <span className="text-xs text-primary font-normal cursor-pointer hover:underline">
              Mark all as read
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[400px] overflow-y-auto">
          <div className="py-8 px-4 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <FiBell className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              We&apos;ll notify you when something arrives
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/app/notifications')}
          className="cursor-pointer text-center justify-center font-medium text-primary"
        >
          See all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
