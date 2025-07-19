import type { ChatDTO } from '@features/chat/types.ts';

import apiClient from '@services/api-client.ts';

export const getChats = async (mode: 'active' | 'archived') =>
  await apiClient
    .get(`/chat/${mode}`)
    .then((res) => res.data.sort((a: ChatDTO, b: ChatDTO) => b.updatedAt.localeCompare(a.updatedAt)));

export const getChatHistory = async (chatToken?: string) =>
  await apiClient.get('/chat/history', { headers: { 'X-Chat-Token': chatToken } }).then((res) => res.data);

export const deleteChat = async (chatId: string) => await apiClient.delete(`/chat/${chatId}`).then((res) => res.data);

export const unsubscribeFromChat = async (chatId: string) =>
  await apiClient.post(`/chat/unsubscribe/${chatId}`).then((res) => res.data);
