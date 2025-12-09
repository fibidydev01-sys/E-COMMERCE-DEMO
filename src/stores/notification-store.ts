import { create } from "zustand";
import { Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
}

interface NotificationActions {
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter((n) => !n.isRead).length,
  }),
  addNotification: (notification) => set({
    notifications: [notification, ...get().notifications],
    unreadCount: get().unreadCount + (notification.isRead ? 0 : 1),
  }),
  markAsRead: (id) => {
    const notifications = get().notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    set({ notifications, unreadCount: notifications.filter((n) => !n.isRead).length });
  },
  markAllAsRead: () => set({
    notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
    unreadCount: 0,
  }),
  removeNotification: (id) => {
    const notification = get().notifications.find((n) => n.id === id);
    set({
      notifications: get().notifications.filter((n) => n.id !== id),
      unreadCount: get().unreadCount - (notification && !notification.isRead ? 1 : 0),
    });
  },
  setLoading: (isLoading) => set({ isLoading }),
}));