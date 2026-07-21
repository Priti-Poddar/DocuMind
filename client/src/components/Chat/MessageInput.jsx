import { useState } from "react";
import { Send } from "lucide-react";

import { chat } from "../../services/chat.service";

import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";

const MessageInput = () => {
  const [text, setText] = useState("");

  const { conversation } = useConversation();

  const { messages, setMessages, loading, setLoading } = useChat();

  const handleSend = async () => {
    if (!text.trim()) return;

    if (!conversation) {
      alert("Select a document first.");
      return;
    }

    const question = text;

    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now(),
        role: "user",
        content: question,
      },
    ]);

    setText("");
    setLoading(true);

    try {
      const res = await chat(conversation._id, question);

      // Append AI response
      setMessages((prev) => [
        ...prev,
        {
          _id: Date.now() + 1,
          role: "assistant",
          content: res.answer,
          sources: res.sources,
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Chat failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-zinc-800 p-5">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-zinc-900 rounded-lg px-4 py-3 outline-none"
          placeholder="Ask anything..."
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
