import { useChat } from "../../context/ChatContext";

const PromptCard = ({ title, icon, prompt }) => {
  const { setInput } = useChat();

  return (
    <button
      onClick={() => setInput(prompt)}
      className="
        p-5
        rounded-xl
        bg-zinc-800
        hover:bg-violet-600
        transition-all
        duration-300
        text-left
        border
        border-zinc-700
        hover:border-violet-500
      "
    >
      <p className="text-2xl mb-2">{icon}</p>

      <p className="font-medium text-white">{title}</p>
    </button>
  );
};

export default PromptCard;
