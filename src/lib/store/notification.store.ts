import { create } from 'zustand';
import { NotificationProps } from "../types/response-models/dashboard";

interface NotificationState {
  notifications: NotificationProps[];
  setNotification: (e: any) => void;
  resetNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotification: (notification: any) => {
    set(state => ({
      notifications: [...state.notifications, notification]
    }));
  },
  resetNotifications: () => {
    set({ notifications: [] });
  }
}))


