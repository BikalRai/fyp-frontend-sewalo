import { Link } from "react-router-dom";
import { useConversations } from "@/hooks/mutations/useChat";
import { IoChatbubblesOutline } from "react-icons/io5";

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const ConversationsListPage = () => {
  const { data: conversations = [], isLoading } = useConversations();

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-100px)] flex items-center justify-center text-muted">
        Loading conversations...
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-white rounded-2xl border border-light-gray shadow-sm p-8 text-center">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4">
          <IoChatbubblesOutline className="text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Your Messages</h2>
        <p className="text-muted max-w-md">
          Conversations with customers and providers will appear here once you
          start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-light-gray shadow-sm overflow-hidden">
      <div className="p-4 border-b border-light-gray">
        <h3 className="font-bold text-primary text-lg">Messages</h3>
      </div>

      <div className="divide-y divide-light-gray">
        {conversations.map((conv) => (
          <Link
            key={conv.jobId}
            to={`/dashboard/jobs/${conv.jobId}/chat`}
            className="flex items-center gap-4 p-4 hover:bg-bg/50 transition-colors"
          >
            <div className="w-12 h-12 shrink-0 rounded-full bg-accent/10 text-accent font-semibold flex items-center justify-center">
              {getInitials(conv.otherPartyName)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-primary truncate">
                  {conv.otherPartyName}
                </p>
                <span className="text-xs text-muted shrink-0">
                  {formatTimestamp(conv.lastMessageAt)}
                </span>
              </div>
              <p className="text-sm text-muted truncate mt-0.5">
                {conv.lastMessage}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConversationsListPage;
