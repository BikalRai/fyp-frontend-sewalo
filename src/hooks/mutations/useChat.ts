import { chatKeys } from "@/lib/queryKeys";
import { chatService } from "@/services/chat.service";
import {
  useWebSocketStore,
  type ChatResponseDto,
} from "@/store/useWebSocketStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatHistory = (jobId: string | null) => {
  return useQuery({
    // 1. Use the factory key
    queryKey: jobId ? chatKeys.jobChat(jobId) : chatKeys.all,
    queryFn: () => chatService.getHistory(jobId!),
    enabled: !!jobId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, content }: { jobId: string; content: string }) =>
      chatService.sendMessage(jobId, content),
    onSuccess: (_, variables) => {
      // 2. Targeted Invalidation: Only invalidate this specific chat room if the WebSocket fails
      queryClient.invalidateQueries({
        queryKey: chatKeys.jobChat(variables.jobId),
      });
    },
  });
};

/**
 * The Bridge: Listens to Zustand's WebSocket events and mutates the React Query cache.
 * Call this hook inside your Chat Component.
 */
export const useChatSubscription = (jobId: string | null) => {
  const queryClient = useQueryClient();
  const { incomingChatMessage, clearIncomingChatMessage } = useWebSocketStore();

  useEffect(() => {
    // If a new message arrives and we are currently in a chat room
    if (incomingChatMessage && jobId) {
      // Update the React Query cache silently without triggering a network request
      queryClient.setQueryData<ChatResponseDto[]>(
        chatKeys.jobChat(jobId),
        (oldData) => {
          if (!oldData) return [incomingChatMessage];

          // Prevent duplicates (e.g., if the REST POST success and WebSocket push happen simultaneously)
          const isDuplicate = oldData.some(
            (msg) => msg.id === incomingChatMessage.id,
          );
          if (isDuplicate) return oldData;

          return [...oldData, incomingChatMessage];
        },
      );

      // Clear the event from Zustand so we don't process it twice
      clearIncomingChatMessage();
    }
  }, [incomingChatMessage, jobId, queryClient, clearIncomingChatMessage]);
};

export const useConversations = () => {
  return useQuery({
    queryKey: chatKeys.conversations(),
    queryFn: () => chatService.getInbox(),
  });
};
