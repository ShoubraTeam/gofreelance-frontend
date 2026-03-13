'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import type { IncomingMessage } from '@/lib/types/chat';
import type { ChatsPage } from '@/lib/types/chat';
import type { ApiResponse } from '@/lib/types/api';

const WS_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.gofreelance.app'
    : 'http://localhost:8080';

export function GlobalMessageListener() {
  const { accessToken } = useAuthStore();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const queryClient = useQueryClient();
  const { add } = useNotificationStore();

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!accessToken) return;
    let active = true;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/api/v1/chat.send`),
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      onConnect: () => {
        if (!active) return;
        client.subscribe('/user/queue/messages', (frame) => {
          if (!active) return;
          const incoming: IncomingMessage = JSON.parse(frame.body);

          const onChatPage = pathnameRef.current === `/app/messages/${incoming.chatId}`;
          if (onChatPage) return;

          const activeChats = queryClient.getQueryData<ApiResponse<ChatsPage>>(['chats', 'ACTIVE']);
          const endedChats = queryClient.getQueryData<ApiResponse<ChatsPage>>(['chats', 'ENDED']);
          const allChats = [
            ...(activeChats?.data?.content ?? []),
            ...(endedChats?.data?.content ?? []),
          ];
          const chatInfo = allChats.find((c) => c.chatId === incoming.chatId);

          add({
            messageId: incoming.messageId,
            chatId: incoming.chatId,
            senderName: chatInfo?.otherPartyName ?? 'Someone',
            jobTitle: chatInfo?.jobTitle ?? '',
            content: incoming.content,
            date: incoming.date,
            read: false,
          });
        });
      },
    });

    client.activate();
    return () => {
      active = false;
      client.deactivate();
    };
  }, [accessToken, add, queryClient]);

  return null;
}
