import type { IContainerProp } from "@/components/container/SeContainer";
import SeDashboardNavbar from "@/components/nav/dashboard/SeDashboardNavbar";
import SeSpinner from "@/components/spinner/SeSpinner";
import { useUserProfile } from "@/hooks/mutations/useUser";
import { LuBell, LuPanelLeft } from "react-icons/lu";
import DashboardContentLayoutPadding from "./DashboardContentLayoutPadding";
import { useAuthStore } from "@/store/authStore";
import { useWebSocketStore } from "@/store/useWebSocketStore";
import { useEffect } from "react";
import {
  Group,
  Indicator,
  Loader,
  Popover,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useRecentNotifications,
  useUnreadNotificationCount,
} from "@/hooks/mutations/useNotifications";

const SeDashboardLayout = ({ children }: IContainerProp) => {
  const { data: user, isLoading } = useUserProfile();

  const { data: unreadCount = 0 } = useUnreadNotificationCount(!!user);
  const { data: notifications = [], isLoading: isLoadingNotifications } =
    useRecentNotifications(!!user);

  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  //Pull the token and connection actions from Zustand
  const accessToken = useAuthStore((state) => state.accessToken);
  const connect = useWebSocketStore((state) => state.connect);
  const disconnect = useWebSocketStore((state) => state.disconnect);

  const handleItemClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markAsReadMutation.mutate(id);
    }
  };

  // Manage the WebSocket lifecycle
  useEffect(() => {
    // Only connect if we have a token and the user profile has finished loading
    if (accessToken && user) {
      connect(accessToken);
    }

    // Cleanup: disconnect if the layout unmounts (e.g., user logs out)
    return () => {
      disconnect();
    };
  }, [accessToken, user, connect, disconnect]);

  if (isLoading || !user)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <SeSpinner className="h-90 w-90" />
      </div>
    );

  return (
    <div className="h-dvh w-full flex overflow-hidden">
      <aside className="bg-primary h-full overflow-y-auto w-16 lg:w-60 shrink-0 transition-all duration-300">
        <SeDashboardNavbar role={user.role} />
      </aside>

      {/* 
        FIX 1: Added overflow-x-hidden. 
        This acts as a strict boundary. Wide tables can no longer force the main container to stretch horizontally. 
      */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto overflow-x-hidden relative bg-bg">
        <div className="sticky top-0 z-10 p-4 flex items-center justify-between border-b border-b-muted/40 bg-light">
          <div className="flex items-center">
            <LuPanelLeft className="h-4 w-4 hover:text-accent transition-colors duration-200 cursor-pointer" />
          </div>
          <div className="flex items-center gap-6">
            <Popover position="bottom-end" withArrow shadow="md" width={340}>
              <Popover.Target>
                <Indicator
                  color="red"
                  size={16}
                  label={unreadCount > 99 ? "99+" : unreadCount}
                  disabled={unreadCount === 0}
                  className="cursor-pointer"
                >
                  <LuBell className="h-5 w-5 hover:text-primary transition-colors duration-150" />
                </Indicator>
              </Popover.Target>

              <Popover.Dropdown p="0">
                {/* Header */}
                <div className="p-3 border-b border-muted/40 flex items-center justify-between bg-gray-50/50">
                  <Text fw={600} size="sm">
                    Notifications
                  </Text>
                  {unreadCount > 0 && (
                    <UnstyledButton
                      onClick={() => markAllAsReadMutation.mutate()}
                      disabled={markAllAsReadMutation.isPending}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Mark all as read
                    </UnstyledButton>
                  )}
                </div>

                {/* Notification List */}
                <ScrollArea h={320} type="hover">
                  {isLoadingNotifications ? (
                    <div className="flex justify-center p-6">
                      <Loader size="sm" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <Text size="xs" c="dimmed">
                        No notifications yet
                      </Text>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item.id, item.isRead)}
                        className={`p-3 border-b border-muted/20 transition-colors cursor-pointer ${
                          !item.isRead
                            ? "bg-primary/5 hover:bg-primary/10"
                            : "hover:bg-muted/10"
                        }`}
                      >
                        <Group align="flex-start" wrap="nowrap" gap="xs">
                          {!item.isRead && (
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            {item.title && (
                              <Text
                                size="sm"
                                fw={item.isRead ? 400 : 600}
                                className="truncate"
                              >
                                {item.title}
                              </Text>
                            )}
                            <Text
                              size="xs"
                              c={item.isRead ? "dimmed" : "dark"}
                              className="line-clamp-2"
                            >
                              {item.message}
                            </Text>
                            <Text size="xs" c="dimmed" mt={4}>
                              {new Date(item.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          </div>
                        </Group>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </Popover.Dropdown>
            </Popover>
            <div className="flex items-center gap-2">
              {user.role === "ADMIN" ? (
                <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase cursor-default">
                  Admin
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/10 hover:bg-accent/20 transition-colors duration-200 cursor-pointer overflow-hidden">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={`${user.fullName}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-accent text-sm font-bold">
                        {user.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {user.fullName}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {/* 
          FIX 2: Added min-w-0, w-full, and max-w-full to the wrapper. 
          This ensures the flexible child doesn't secretly expand the parent.
        */}
        <DashboardContentLayoutPadding>
          <div className="flex-1 min-w-0 w-full max-w-full">{children}</div>
        </DashboardContentLayoutPadding>
      </main>
    </div>
  );
};

export default SeDashboardLayout;
