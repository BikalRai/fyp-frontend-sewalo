import { notificationKeys } from "@/lib/queryKeys";
import { notificationService } from "@/services/notification.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 1. Query: Fetch Recent Notifications
export const useRecentNotifications = (enabled = true) => {
  return useQuery({
    queryKey: notificationKeys.recent(),
    queryFn: notificationService.getRecent,
    enabled,
  });
};

// 2. Query: Fetch Unread Count
export const useUnreadNotificationCount = (enabled = true) => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: notificationService.getUnreadCount,
    enabled,
  });
};

// 3. Mutation: Mark Single as Read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      // Invalidate both the list and the unread count together
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

// 4. Mutation: Mark All as Read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};
