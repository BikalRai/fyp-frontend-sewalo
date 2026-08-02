export interface ChatResponseDto {
  id: string;
  senderId: string;
  content: string;
  createdAt: string; // ISO 8601 string from Spring Boot (e.g., "2026-08-02T11:45:12")
  isRead: boolean;
}

export interface ConversationSummaryDto {
  jobId: string;
  otherPartyName: string;
  lastMessage: string;
  lastMessageAt: string;
}
