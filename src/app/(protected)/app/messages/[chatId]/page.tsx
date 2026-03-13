'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { getChatHistory, getChats } from '@/lib/api/chat';
import { useChat } from '@/hooks/useChat';
import { ChatHeader } from './_components/ChatHeader';
import { MessageList } from './_components/MessageList';
import { MessageInput } from './_components/MessageInput';
import type { DisplayMessage } from '@/lib/types/chat';

const PAGE_SIZE = 20;

interface ChatPageProps {
  params: Promise<{ chatId: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatId } = use(params);
  const searchParams = useSearchParams();
  const displayName = searchParams.get('other') ?? '';
  const jobTitle = searchParams.get('job') ?? '';
  const { user } = useAuthStore();
  const { markChatAsRead } = useNotificationStore();

  useEffect(() => {
    markChatAsRead(chatId);
  }, [chatId, markChatAsRead]);

  const [optimisticMessages, setOptimisticMessages] = useState<DisplayMessage[]>([]);

  const { data: activeChats } = useQuery({
    queryKey: ['chats', 'ACTIVE'],
    queryFn: () => getChats('ACTIVE', 0, 100),
  });
  const { data: endedChats } = useQuery({
    queryKey: ['chats', 'ENDED'],
    queryFn: () => getChats('ENDED', 0, 100),
  });

  const chatInfo = useMemo(() => {
    const all = [
      ...(activeChats?.data?.content ?? []),
      ...(endedChats?.data?.content ?? []),
    ];
    return all.find((c) => c.chatId === chatId);
  }, [activeChats, endedChats, chatId]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['chat-history', chatId],
    queryFn: ({ pageParam }) => getChatHistory(chatId, pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const page = lastPage.data;
      return page.number + 1 < page.totalPages ? page.number + 1 : undefined;
    },
  });

  const { newMessages, isConnected, sendMessage } = useChat(chatId);

  const historyMessages = useMemo<DisplayMessage[]>(() => {
    if (!data) return [];
    return [...data.pages]
      .reverse()
      .flatMap((page) =>
        [...page.data.content].reverse().map((msg) => ({
          messageId: msg.messageId,
          content: msg.content,
          date: msg.date,
          isOwn: msg.senderId === user?.id,
        }))
      );
  }, [data, user?.id]);

  const wsMessages = useMemo<DisplayMessage[]>(
    () =>
      newMessages.map((msg) => ({
        messageId: msg.messageId,
        content: msg.content,
        date: msg.date,
        isOwn: msg.senderId === user?.id,
      })),
    [newMessages, user?.id]
  );

  const allMessages = useMemo(() => {
    const seen = new Set<string>();
    return [...historyMessages, ...wsMessages, ...optimisticMessages]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter((msg) => {
        if (seen.has(msg.messageId)) return false;
        seen.add(msg.messageId);
        return true;
      });
  }, [historyMessages, wsMessages, optimisticMessages]);

  const handleSend = (content: string) => {
    const optimistic: DisplayMessage = {
      messageId: crypto.randomUUID(),
      content,
      date: new Date().toISOString(),
      isOwn: true,
    };
    setOptimisticMessages((prev) => [...prev, optimistic]);
    sendMessage(content);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ChatHeader
        otherPartyName={chatInfo?.otherPartyName ?? displayName}
        jobTitle={chatInfo?.jobTitle ?? jobTitle}
      />
      <MessageList
        messages={allMessages}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
      />
      <MessageInput onSend={handleSend} disabled={false} />
    </div>
  );
}
