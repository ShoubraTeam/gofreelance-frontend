import { create } from 'zustand';

export interface MessageNotification {
  messageId: string;
  chatId: string;
  senderName: string;
  jobTitle: string;
  content: string;
  date: string;
  read: boolean;
}

interface NotificationState {
  notifications: MessageNotification[];
  add: (n: MessageNotification) => void;
  markChatAsRead: (chatId: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],

  add: (n) =>
    set((state) => ({
      notifications: state.notifications.some((x) => x.messageId === n.messageId)
        ? state.notifications
        : [n, ...state.notifications],
    })),

  markChatAsRead: (chatId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.chatId === chatId ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
