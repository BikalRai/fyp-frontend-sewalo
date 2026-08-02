import { api } from "@/config/api";
import type {
  ChatResponseDto,
  ConversationSummaryDto,
} from "@/types/chat.types";

export const chatService = {
  getHistory: async (jobId: string): Promise<ChatResponseDto[]> => {
    const { data } = await api.get(`/jobs/${jobId}/chat`);
    return data.data;
  },

  sendMessage: async (jobId: string, content: string): Promise<void> => {
    await api.post(`/jobs/${jobId}/chat`, { content });
  },

  getInbox: async (): Promise<ConversationSummaryDto[]> => {
    const { data } = await api.get(`/messages/inbox`);
    return data.data;
  },
};
