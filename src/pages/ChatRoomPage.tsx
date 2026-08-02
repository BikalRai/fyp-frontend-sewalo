import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoSend, IoChatbubblesOutline, IoArrowBack } from "react-icons/io5";
import { useAuthStore } from "@/store/authStore";
import {
  useChatHistory,
  useChatSubscription,
  useSendMessage,
} from "@/hooks/mutations/useChat";

const ChatRoomPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { userId } = useAuthStore();

  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useChatHistory(jobId || null);
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  useChatSubscription(jobId || null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || !jobId) return;

    sendMessage(
      { jobId, content: content.trim() },
      {
        onSuccess: () => setContent(""),
      },
    );
  };

  if (!jobId) return null; // route guard should prevent this, but keep it safe

  return (
    <div className="flex flex-col max-h-200 bg-white rounded-2xl border border-light-gray shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-light-gray flex items-center gap-3 bg-white shadow-sm shrink-0">
        <button
          onClick={() => navigate("/dashboard/messages")}
          className="p-2 -ml-2 rounded-full hover:bg-bg transition-colors text-muted hover:text-primary"
          aria-label="Back to messages"
        >
          <IoArrowBack className="text-xl" />
        </button>
        <div>
          <h3 className="font-bold text-primary text-lg flex items-center gap-2">
            <IoChatbubblesOutline className="text-accent" />
            Active Conversation
          </h3>
          <p className="text-xs text-muted font-medium">
            Job Reference: {jobId.split("-")[0].toUpperCase()}
          </p>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 p-6 overflow-y-auto bg-bg/30 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-muted">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted flex-col">
            <p>No messages yet.</p>
            <p className="text-xs">Say hello to get started!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === userId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <span
                    className={`px-4 py-2.5 text-sm inline-block shadow-sm ${
                      isMe
                        ? "bg-accent text-white rounded-2xl rounded-tr-sm"
                        : "bg-white border border-light-gray text-primary rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </span>
                  <span className="text-small text-muted mt-1 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t border-light-gray flex gap-2 items-center shrink-0"
      >
        <input
          className="flex-1 px-4 py-3 bg-bg rounded-xl text-sm outline-none border border-transparent focus:border-accent transition-colors disabled:opacity-50"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSending}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!content.trim() || isSending}
          className="bg-primary text-white p-3.5 rounded-xl hover:bg-text-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm shrink-0"
        >
          <IoSend className={isSending ? "animate-pulse" : ""} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoomPage;
