import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  // Currently selected conversation
  const [conversation, setConversation] = useState(null);

  // All conversations for the selected document
  const [conversations, setConversations] = useState([]);

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        setConversation,
        conversations,
        setConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);
