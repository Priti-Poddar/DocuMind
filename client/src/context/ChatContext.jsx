import { createContext, useContext, useState } from "react";
import { chat } from "../services/chat.service";
import { renameConversation } from "../services/conversation.service";
import { useConversation } from "./ConversationContext";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { conversation, setConversation, setConversations } = useConversation();

  const sendMessage = async (question) => {
    if (!question.trim()) return;

    if (!conversation) {
      toast.error("Select a document first.");
      return;
    }

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now(),
        role: "user",
        content: question,
      },
    ]);

    setLoading(true);

    try {
      const res = await chat(conversation._id, question);

      // Show AI response
      setMessages((prev) => [
        ...prev,
        {
          _id: Date.now() + 1,
          role: "assistant",
          content: res.answer,
          sources: res.sources,
        },
      ]);

      // Auto rename first chat
      if (
        conversation.title === "New Chat" ||
        conversation.title.startsWith("Chat")
      ) {
        const title =
          question.length > 35 ? question.substring(0, 35) + "..." : question;

        const renamed = await renameConversation(conversation._id, title);

        setConversation(renamed.conversation);

        setConversations((prev) =>
          prev.map((conv) =>
            conv._id === renamed.conversation._id ? renamed.conversation : conv,
          ),
        );

        toast.success("Conversation renamed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Chat failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        loading,
        setLoading,
        input,
        setInput,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
