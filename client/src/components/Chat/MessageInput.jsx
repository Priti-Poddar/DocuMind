import { Send } from "lucide-react";

import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";

const MessageInput = () => {
  const { conversation } = useConversation();
  const { loading, input, setInput, sendMessage } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="border-t border-zinc-800 p-5">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-zinc-900 rounded-lg px-4 py-3 outline-none"
          placeholder={
            conversation
              ? "Ask anything about this document..."
              : "Select a document to start chatting..."
          }
        />

        <button
          disabled={loading}
          onClick={handleSend}
          className="bg-violet-600 hover:bg-violet-700 rounded-lg px-5 disabled:opacity-50"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
