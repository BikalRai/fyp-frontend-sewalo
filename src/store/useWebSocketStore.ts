import { create } from "zustand";
import { Client, type IFrame, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Ensure this matches the UUID structure of your backend
export interface JobStatusPayload {
  jobId: string;
  status: string;
  difficulty: string | null;
  errorReason: string | null;
}

// Define the exact payload matching the ChatResponseDto from Spring Boot
export interface ChatResponseDto {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface ChatMessageEvent {
  messageId: string;
  jobId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

interface WebSocketState {
  client: Client | null;

  // Event Bus State (Transient data)
  jobUpdates: JobStatusPayload | null;
  incomingChatMessage: ChatResponseDto | null;

  // Actions
  connect: (token: string) => void;
  disconnect: () => void;
  clearJobUpdates: () => void;
  clearIncomingChatMessage: () => void;
  hasUnreadMessages: boolean;
  setHasUnreadMessages: (status: boolean) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  jobUpdates: null,
  incomingChatMessage: null,
  hasUnreadMessages: false,
  setHasUnreadMessages: (status) => set({ hasUnreadMessages: status }),

  connect: (token: string) => {
    // Prevent multiple parallel connections causing memory leaks
    if (get().client?.connected) return;

    const stompClient = new Client({
      // We use SockJS as a fallback transport mechanism if native WebSockets fail
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      // Automatically attempt to reconnect every 5 seconds if the server drops
      reconnectDelay: 5000,
      // Helps detect dead connections quickly
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("✓ Connected to Sewalo WebSocket Securely");

        // 1. Subscribe to Job Updates
        stompClient.subscribe(
          "/user/queue/job-updates",
          (message: IMessage) => {
            if (message.body) {
              try {
                const parsedMessage = JSON.parse(
                  message.body,
                ) as JobStatusPayload;
                console.log("Received Job Update:", parsedMessage);
                set({ jobUpdates: parsedMessage });
              } catch (error) {
                console.error("Failed to parse Job Update message:", error);
              }
            }
          },
        );

        stompClient.subscribe("/user/queue/messages", (message: IMessage) => {
          if (message.body) {
            try {
              // Parse it as the Event coming from RabbitMQ
              const incomingEvent = JSON.parse(
                message.body,
              ) as ChatMessageEvent;
              console.log("Received Chat Message:", incomingEvent);

              // Map it to match the UI's ChatResponseDto expectation
              const uiMessage: ChatResponseDto = {
                id: incomingEvent.messageId,
                senderId: incomingEvent.senderId,
                content: incomingEvent.content,
                createdAt: incomingEvent.timestamp,
                isRead: false,
              };

              set({ incomingChatMessage: uiMessage });

              // THE MISSING LOGIC: Check if we are in this specific chat room
              const currentPath = window.location.pathname;
              const isCurrentlyInChat = currentPath.includes(
                `/jobs/${incomingEvent.jobId}/chat`,
              );

              if (!isCurrentlyInChat) {
                set({ hasUnreadMessages: true });
              }
            } catch (error) {
              console.error("Failed to parse Chat message:", error);
            }
          }
        });
      },

      onStompError: (frame: IFrame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      },

      onWebSocketError: (event) => {
        console.error("WebSocket connection error:", event);
      },
    });

    stompClient.activate();
    set({ client: stompClient });
  },

  disconnect: () => {
    const { client } = get();
    if (client) {
      client.deactivate();
      set({
        client: null,
        jobUpdates: null,
        incomingChatMessage: null,
      });
      console.log("✗ Disconnected from Sewalo WebSocket");
    }
  },

  clearJobUpdates: () => set({ jobUpdates: null }),
  clearIncomingChatMessage: () => set({ incomingChatMessage: null }),
}));
