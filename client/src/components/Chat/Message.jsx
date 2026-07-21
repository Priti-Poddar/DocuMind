import { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const Message = ({ message }) => {
  const isUser = message.role === "user";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success("Copied to clipboard!");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-6">
      <div
        className={`group relative rounded-2xl px-5 py-4 max-w-[85%] ${
          isUser
            ? "ml-auto bg-violet-600 text-white"
            : "mr-auto bg-zinc-800 text-zinc-100"
        }`}
      >
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-md opacity-0 group-hover:opacity-100 hover:bg-zinc-700 transition"
            title="Copy"
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} className="text-zinc-400" />
            )}
          </button>
        )}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-6 mb-3">{children}</h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-5 mb-2">{children}</h2>
            ),

            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
            ),

            p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,

            ul: ({ children }) => (
              <ul className="list-disc ml-6 mb-4">{children}</ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal ml-6 mb-4">{children}</ol>
            ),

            li: ({ children }) => <li className="mb-1">{children}</li>,

            strong: ({ children }) => (
              <strong className="font-bold text-white">{children}</strong>
            ),
          }}
        >
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
