'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/store/useAuthStore';
import type { IncomingMessage } from '@/lib/types/chat';

const WS_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.gofreelance.app'
    : 'http://localhost:8080';

export function useChat(chatId: string) {
  const [newMessages, setNewMessages] = useState<IncomingMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;
    let active = true;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/api/v1/chat.send`),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        if (!active) return;
        setIsConnected(true);
        client.subscribe('/user/queue/messages', (frame) => {
          if (!active) return;
          const incoming: IncomingMessage = JSON.parse(frame.body);
          if (incoming.chatId === chatId) {
            setNewMessages((prev) =>
              prev.some((m) => m.messageId === incoming.messageId)
                ? prev
                : [...prev, incoming]
            );
          }
        });
      },
      onDisconnect: () => setIsConnected(false),
      onStompError: () => setIsConnected(false),
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      active = false;
      client.deactivate();
      stompClientRef.current = null;
    };
  }, [accessToken, chatId]);

  const sendMessage = useCallback(
    (content: string) => {
      stompClientRef.current?.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({ chatId, content }),
      });
    },
    [chatId]
  );

  return { newMessages, isConnected, sendMessage };
}
