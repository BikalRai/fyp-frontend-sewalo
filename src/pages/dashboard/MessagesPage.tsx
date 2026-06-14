import { useState } from "react";
import { IoSend, IoSearchOutline } from "react-icons/io5";

// Mock data to visualize the UI structure
const mockConversations = [
  {
    id: 1,
    name: "Ramesh Sharma",
    jobTitle: "Leaking pipe under sink",
    lastMsg: "I'll be there at 10 AM.",
  },
  {
    id: 2,
    name: "Kathmandu Quick Fix",
    jobTitle: "Electrical wiring issue",
    lastMsg: "Price is fixed at Rs. 1500.",
  },
];

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);

  return (
    <div className="h-[calc(100vh-100px)] flex bg-white rounded-2xl border border-light-gray shadow-sm overflow-hidden">
      {/* Sidebar: List of Conversations */}
      <div className="w-80 border-r border-light-gray flex flex-col">
        <div className="p-4 border-b border-light-gray">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-3 text-muted" />
            <input
              className="w-full pl-9 pr-4 py-2 bg-bg rounded-xl text-sm outline-none"
              placeholder="Search messages..."
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-light-gray cursor-pointer hover:bg-bg transition-colors ${selectedChat.id === chat.id ? "bg-bg" : ""}`}
            >
              <h4 className="font-bold text-primary text-sm">{chat.name}</h4>
              <p className="text-xs text-muted truncate">{chat.jobTitle}</p>
              <p className="text-xs text-slate-500 mt-1 truncate">
                {chat.lastMsg}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-light-gray font-bold text-primary">
          {selectedChat.name}
          <p className="text-xs text-muted font-normal">
            {selectedChat.jobTitle}
          </p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-bg/20 space-y-4">
          {/* Mock Messages */}
          <div className="text-right">
            <span className="bg-accent text-white px-4 py-2 rounded-2xl rounded-br-none text-sm inline-block">
              Hi, are you still available for the sink repair?
            </span>
          </div>
          <div className="text-left">
            <span className="bg-white border border-light-gray px-4 py-2 rounded-2xl rounded-bl-none text-sm inline-block text-primary">
              Yes, I can be there at 10 AM.
            </span>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-light-gray flex gap-2">
          <input
            className="flex-1 px-4 py-2 bg-bg rounded-xl text-sm outline-none border border-transparent focus:border-accent"
            placeholder="Type a message..."
          />
          <button className="bg-primary text-white p-3 rounded-xl hover:bg-text-dark transition-colors">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
