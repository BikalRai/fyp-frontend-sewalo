import { api } from "@/config/api";
import type { APIResponse } from "@/types/api.types";
import type { NotificationItem } from "@/types/notification.types";

export const notificationService = {
  getRecent: async (): Promise<NotificationItem[]> => {
    const res = await api.get<APIResponse<NotificationItem[]>>("/notification");
    return res.data.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const res = await api.get<APIResponse<number>>(
      "/notification/unread-count",
    );
    return res.data.data;
  },

  markAsRead: async (id: string): Promise<null> => {
    const res = await api.patch<APIResponse<null>>(`/notification/${id}/read`);
    return res.data.data;
  },

  markAllAsRead: async (): Promise<null> => {
    const res = await api.patch<APIResponse<null>>("/notification/read-all");
    return res.data.data;
  },
};
