import { DocumentProvider } from "./DocumentContext";
import { ConversationProvider } from "./ConversationContext";
import { ChatProvider } from "./ChatContext";

const AppProvider = ({ children }) => {
  return (
    <DocumentProvider>
      <ConversationProvider>
        <ChatProvider>{children}</ChatProvider>
      </ConversationProvider>
    </DocumentProvider>
  );
};

export default AppProvider;
