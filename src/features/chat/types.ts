export interface ChatDTO {
  id: number;
  accessToken: string;
  createdAt: string;
  expiresAt: string;
  archived: boolean;
  notifyCompanyUser: boolean;
  updatedAt: string;
  lastMessage?: string;
  company: {
    id: number;
    name: string;
  };
}

export interface ChatHistoryEntryDTO {
  chatId: number;
  content: string;
  senderType: string;
  sentAt: string;
  accessToken: string;
}

export type ChatStatus = 'active' | 'archived';
