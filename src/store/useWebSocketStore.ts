import { create } from "zustand";
import { Client, type IFrame, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface JobStatusPayload {
  jobId: number;
  status: "ACTIVE" | "FAILED" | "DRAFT";
  difficulty: string | null;
  errorReason: string | null;
}

interface WebSocketState {
  client: Client | null;
  jobUpdates: JobStatusPayload | null;

  // Actions
  connect: (token: string) => void;
  disconnect: () => void;
  clearJobUpdates: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  jobUpdates: null,

  connect: (token: string) => {
    // Prevent multiple connections
    if (get().client?.connected) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✓ Connected to Sewalo WebSocket Securely");

        // Subscribe to the private channel
        stompClient.subscribe(
          "/user/queue/job-updates",
          (message: IMessage) => {
            if (message.body) {
              try {
                const parsedMessage = JSON.parse(
                  message.body,
                ) as JobStatusPayload;
                console.log("Received Job Update:", parsedMessage);

                // Instantly update global state
                set({ jobUpdates: parsedMessage });
              } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
              }
            }
          },
        );
      },

      onStompError: (frame: IFrame) => {
        console.error("Broker reported error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
    set({ client: stompClient });
  },

  disconnect: () => {
    const { client } = get();
    if (client) {
      client.deactivate();
      set({ client: null, jobUpdates: null });
    }
  },

  clearJobUpdates: () => set({ jobUpdates: null }),
}));
