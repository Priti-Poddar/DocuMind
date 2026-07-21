import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";
import toast from "react-hot-toast";

const AIToolCard = ({ icon: Icon, title, prompt }) => {
  const { conversation } = useConversation();
  const { sendMessage } = useChat();

  const handleClick = async () => {
    if (!conversation) {
      toast.error("Select a document first.");
      return;
    }

    await sendMessage(prompt);
  };

  return (
    <button
      onClick={handleClick}
      className="
      flex
      flex-col
      items-center
      justify-center
      gap-1
      rounded-lg
      bg-zinc-800
      hover:bg-violet-600
      transition
      py-3
    "
    >
      <Icon size={18} />
      <span className="text-xs">{title}</span>
    </button>
  );
};

export default AIToolCard;
