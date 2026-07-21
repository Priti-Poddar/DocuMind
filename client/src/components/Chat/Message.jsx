import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Message = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className="mb-6">
      <div
        className={`rounded-2xl px-5 py-4 max-w-[85%] ${
          isUser
            ? "ml-auto bg-violet-600 text-white"
            : "mr-auto bg-zinc-800 text-zinc-100"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>

        {message.sources?.length > 0 && (
          <div className="mt-4 border-t border-zinc-700 pt-3">
            <p className="text-xs text-zinc-400 mb-2">Sources</p>

            {message.sources.map((source, index) => (
              <div key={index} className="text-xs text-zinc-300">
                • {source.content?.slice(0, 100)}...
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
