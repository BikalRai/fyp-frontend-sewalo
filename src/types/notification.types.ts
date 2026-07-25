export interface NotificationItem {
  id: string;
  title?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type?: string;
}
