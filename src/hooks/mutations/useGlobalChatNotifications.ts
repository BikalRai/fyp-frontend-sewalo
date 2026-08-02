import { useWebSocketStore } from "@/store/useWebSocketStore";
import { useEffect } from "react";
import { toast } from "sonner";

export const useGlobalChatNotifications = () => {
  const { incomingChatMessage } = useWebSocketStore();

  useEffect(() => {
    if (incomingChatMessage) {
      // We do the same path check here to avoid toasting if they are already in the chat looking at it
      const currentPath = window.location.pathname;
      const isCurrentlyInChat = currentPath.includes(incomingChatMessage.id); // Or check jobId if you have it stored

      if (!isCurrentlyInChat) {
        toast.info("New message received!", {
          description: incomingChatMessage.content,
        });
      }
    }
  }, [incomingChatMessage]);
};
