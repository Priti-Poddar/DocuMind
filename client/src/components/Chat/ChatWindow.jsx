import { useEffect, useRef } from "react";

import { useChat } from "../../context/ChatContext";

import Message from "./Message";

const ChatWindow = () => {
  const { messages, loading } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Upload a PDF and ask your first question.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}

        {loading && <div className="text-zinc-400">🤖 Thinking...</div>}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
