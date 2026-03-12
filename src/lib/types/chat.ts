export type ChatStatus = 'ACTIVE' | 'ENDED';
export type MessageType = 'TEXT' | 'ATTACHMENT';

export interface ChatSummary {
  chatId: string;
  chatStatus: ChatStatus;
  otherPartyName: string;
  jobTitle: string;
  lastMessageContent: string | null;
  lastMessageDate: string | null;
}

export interface ChatMessage {
  messageId: string;
  senderId: string;
  content: string;
  date: string;
  type: MessageType;
}

export interface IncomingMessage {
  messageId: string;
  chatId: string;
  senderId: string;
  date: string;
  type: MessageType;
  content: string;
  attachmentUrl: string | null;
}

export interface ChatsPage {
  content: ChatSummary[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface MessagesPage {
  content: ChatMessage[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface DisplayMessage {
  messageId: string;
  content: string;
  date: string;
  isOwn: boolean;
}
