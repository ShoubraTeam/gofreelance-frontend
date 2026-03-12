import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { ChatsPage, MessagesPage } from '../types/chat';

export async function getChats(
  status: 'ACTIVE' | 'ENDED' = 'ACTIVE',
  page = 0,
  size = 20
): Promise<ApiResponse<ChatsPage>> {
  return apiClient.get<ApiResponse<ChatsPage>>(
    `/chats?status=${status}&page=${page}&size=${size}`,
    { requiresAuth: true }
  );
}

export async function startChat(proposalId: string): Promise<ApiResponse<{ chatId: string }>> {
  return apiClient.post<ApiResponse<{ chatId: string }>, { proposalId: string }>(
    '/chats/start',
    { proposalId },
    { requiresAuth: true }
  );
}

export async function getChatHistory(
  chatId: string,
  page = 0,
  size = 20
): Promise<ApiResponse<MessagesPage>> {
  return apiClient.get<ApiResponse<MessagesPage>>(
    `/chats/${chatId}?page=${page}&size=${size}`,
    { requiresAuth: true }
  );
}

export async function endChat(chatId: string): Promise<ApiResponse<void>> {
  return apiClient.post<ApiResponse<void>>(
    `/chats/${chatId}/end`,
    undefined,
    { requiresAuth: true }
  );
}
