import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import SeDashboardLayout from "@/layouts/SeDashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { useWebSocketStore } from "@/store/useWebSocketStore";

const Dashboard = () => {
  const location = useLocation();

  // Pull what we need for WebSockets
  const { accessToken } = useAuthStore();
  const { connect, disconnect, incomingChatMessage } = useWebSocketStore();

  // 1. CONNECT WEBSOCKET GLOBALLY
  // As long as they have a token and are in the dashboard, the socket listens
  useEffect(() => {
    if (accessToken) {
      connect(accessToken);
    }

    // Cleanup prevents memory leaks if they log out or leave the dashboard
    return () => {
      disconnect();
    };
  }, [accessToken, connect, disconnect]);

  // 2. TRIGGER GLOBAL TOAST NOTIFICATIONS
  useEffect(() => {
    console.log("WebSocket State Changed:", incomingChatMessage); // <-- ADD THIS

    if (incomingChatMessage) {
      const isCurrentlyInChat = location.pathname.includes("chat");
      console.log("Is currently in chat?", isCurrentlyInChat); // <-- ADD THIS

      if (!isCurrentlyInChat) {
        toast.info("New Message", {
          description: incomingChatMessage.content,
          duration: 4000,
        });
      }
    }
  }, [incomingChatMessage, location.pathname]);

  return (
    <SeDashboardLayout>
      <Outlet />
    </SeDashboardLayout>
  );
};

export default Dashboard;
