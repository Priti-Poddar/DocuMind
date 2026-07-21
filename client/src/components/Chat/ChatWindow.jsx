import { useEffect, useRef } from "react";

import { useChat } from "../../context/ChatContext";
import PromptCard from "./PromptCard";
import Message from "./Message";

const ChatWindow = () => {
  const { messages, loading } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const promptCards = [
    {
      icon: "📄",
      title: "Summarize",
      prompt: "Summarize this document in simple language.",
    },
    {
      icon: "📝",
      title: "Generate MCQs",
      prompt: "Generate 20 MCQs from this document.",
    },
    {
      icon: "🧠",
      title: "Explain Concepts",
      prompt: "Explain the difficult concepts from this document.",
    },
    {
      icon: "🎓",
      title: "Viva Questions",
      prompt: "Generate important viva questions from this document.",
    },
  ];

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full text-center">
          <div className="text-6xl mb-6">📚</div>

          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome to DocuMind
          </h1>

          <p className="text-zinc-400 text-lg mb-10">
            Upload your PDF and let AI summarize, explain, generate quizzes,
            flashcards, and answer questions instantly.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {promptCards.map((card) => (
              <PromptCard
                key={card.title}
                title={card.title}
                icon={card.icon}
                prompt={card.prompt}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}

        {loading && (
          <div className="flex justify-start mb-6">
            <div className="bg-zinc-800 rounded-2xl px-5 py-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"></div>

              <div
                className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></div>

              <div
                className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>

              <span className="ml-2 text-zinc-400 text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
