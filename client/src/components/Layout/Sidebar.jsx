import {
  FileText,
  Brain,
  MessageSquare,
  HelpCircle,
  Layers3,
  BookOpen,
  GraduationCap,
  Plus,
  Trash2,
  Search,
} from "lucide-react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getDocuments } from "../../services/document.service";
import { useDocument } from "../../context/DocumentContext";
import UploadButton from "../document/UploadButton";
import {
  createConversation,
  getConversations,
  getMessages,
  renameConversation,
  deleteConversation,
} from "../../services/conversation.service";
import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";
import { aiTools } from "../../constants/aiTools";
import AIToolCard from "./AIToolCard";

const Sidebar = () => {
  const { documents, setDocuments, selectedDocument, setSelectedDocument } =
    useDocument();

  const { conversation, setConversation, conversations, setConversations } =
    useConversation();
  const { setMessages } = useChat();

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const res = await getDocuments();

        // console.log(conversations);

        setDocuments(res.documents);
      } catch (err) {
        console.error(err);
      }
    };

    loadDocuments();

    const interval = setInterval(loadDocuments, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectDocument = async (doc) => {
    if (doc.status !== "COMPLETED") {
      toast("📄 This document is still processing.", {
        icon: "⏳",
      });
      return;
    }

    try {
      setSelectedDocument(doc);

      const res = await getConversations(doc._id);

      setConversations(res.conversations);

      if (res.conversations.length > 0) {
        const firstConversation = res.conversations[0];

        setConversation(firstConversation);

        const history = await getMessages(firstConversation._id);

        setMessages(history.messages);
      } else {
        const created = await createConversation(doc._id, "New Chat");

        setConversation(created.conversation);

        setConversations([created.conversation]);
        toast.success("New chat created.");

        setMessages([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    if (!confirm("Delete this conversation?")) return;

    try {
      await deleteConversation(conversationId);

      toast.success("Conversation deleted.");
      const updated = conversations.filter(
        (conv) => conv._id !== conversationId,
      );

      setConversations(updated);

      if (conversation?._id === conversationId) {
        if (updated.length > 0) {
          setConversation(updated[0]);

          const history = await getMessages(updated[0]._id);
          setMessages(history.messages);
        } else {
          setConversation(null);
          setMessages([]);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete conversation.");
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside className="w-90 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-5 border-b border-zinc-800">
        <UploadButton />
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="text-xs uppercase text-zinc-400 mb-3">Documents</h2>

        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="space-y-2">
          {documents.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <FileText size={36} className="mx-auto mb-3 opacity-50" />

              <p className="font-medium">No documents yet</p>

              <p className="text-xs mt-1">
                Upload your first PDF to start chatting.
              </p>
            </div>
          ) : (
            documents.map((doc) => (
              <div key={doc._id} className="space-y-2">
                {/* Document */}
                <button
                  onClick={() => handleSelectDocument(doc)}
                  disabled={doc.status !== "COMPLETED"}
                  className={`w-full rounded-lg p-3 flex items-center gap-3 transition ${
                    selectedDocument?._id === doc._id
                      ? "bg-violet-600 shadow-md"
                      : "bg-zinc-800 hover:bg-zinc-700 hover:scale-[1.02]"
                  } ${
                    doc.status !== "COMPLETED"
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FileText size={18} />

                  <span className="truncate flex-1" title={doc.originalName}>
                    {doc.originalName}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      doc.status === "COMPLETED"
                        ? "bg-green-500/20 text-green-400"
                        : doc.status === "FAILED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400 animate-pulse"
                    }`}
                  >
                    {doc.status === "COMPLETED"
                      ? "Ready"
                      : doc.status === "PROCESSING"
                        ? "Processing"
                        : "Failed"}
                  </span>
                </button>

                {/* Conversations */}
                {selectedDocument?._id === doc._id && (
                  <div className="ml-5 mt-2 border-l border-zinc-700 pl-4 py-1 space-y-1">
                    {filteredConversations.length === 0 &&
                    searchQuery.trim() !== "" ? (
                      <p className="text-sm text-zinc-500 px-3 py-2">
                        No conversations found.
                      </p>
                    ) : (
                      filteredConversations.map((conv) => (
                        <div
                          key={conv._id}
                          className={`group flex items-center justify-between rounded-md px-3 py-2 transition ${
                            conversation?._id === conv._id
                              ? "bg-violet-700 text-white"
                              : "hover:bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          <button
                            onClick={async () => {
                              setConversation(conv);

                              const history = await getMessages(conv._id);
                              setMessages(history.messages);
                            }}
                            className="flex items-center gap-2 flex-1 text-left"
                          >
                            <MessageSquare size={14} />
                            {/* <span className="truncate">{conv.title}</span> */}
                            {editingId === conv._id ? (
                              <input
                                autoFocus
                                value={editingTitle}
                                onChange={(e) =>
                                  setEditingTitle(e.target.value)
                                }
                                onBlur={() => setEditingId(null)}
                                onKeyDown={async (e) => {
                                  if (e.key === "Enter") {
                                    try {
                                      const res = await renameConversation(
                                        conv._id,
                                        editingTitle,
                                      );

                                      setConversations((prev) =>
                                        prev.map((c) =>
                                          c._id === conv._id
                                            ? res.conversation
                                            : c,
                                        ),
                                      );

                                      if (conversation?._id === conv._id) {
                                        setConversation(res.conversation);
                                      }

                                      setEditingId(null);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }
                                }}
                                className="bg-transparent outline-none flex-1"
                              />
                            ) : (
                              <span
                                className="truncate flex-1"
                                onDoubleClick={() => {
                                  setEditingId(conv._id);
                                  setEditingTitle(conv.title);
                                }}
                              >
                                {conv.title}
                              </span>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteConversation(conv._id);
                            }}
                            className="ml-2 p-1 rounded hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))
                    )}
                    <button
                      onClick={async () => {
                        const created = await createConversation(
                          doc._id,
                          `Chat ${conversations.length + 1}`,
                        );

                        setConversations((prev) => [
                          created.conversation,
                          ...prev,
                        ]);

                        setConversation(created.conversation);
                        setMessages([]);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-violet-400 hover:bg-zinc-800 transition"
                    >
                      <Plus size={14} />
                      <span>New Chat</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800 p-3 space-y-2">
        <h2 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
          AI Tools
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {aiTools.map((tool) => (
            <AIToolCard
              key={tool.title}
              icon={tool.icon}
              title={tool.title}
              prompt={tool.prompt}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-zinc-800 p-4 text-center">
        <p className="text-xs text-zinc-500">DocuMind v1.0</p>

        <p className="text-[10px] text-zinc-600 mt-1">
          AI-powered PDF Learning Assistant
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
