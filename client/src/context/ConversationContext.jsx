import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        setConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
