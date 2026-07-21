import {
  FileText,
  Brain,
  MessageSquare,
  HelpCircle,
  Layers3,
  BookOpen,
  GraduationCap,
} from "lucide-react";

import { useEffect } from "react";
import { getDocuments } from "../../services/document.service";
import { useDocument } from "../../context/DocumentContext";
import UploadButton from "../document/UploadButton";
import {
  createConversation,
  getConversationByDocument,
  getMessages,
} from "../../services/conversation.service";
import { useConversation } from "../../context/ConversationContext";
import { useChat } from "../../context/ChatContext";

const Sidebar = () => {
  const { documents, setDocuments, selectedDocument, setSelectedDocument } =
    useDocument();

  const { setConversation } = useConversation();
  const { setMessages } = useChat();

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const res = await getDocuments();

        console.log("Documents:", res.documents);

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
      alert("Document is still processing.");
      return;
    }

    try {
      setSelectedDocument(doc);

      let conversation;

      // Check if conversation already exists
      const existing = await getConversationByDocument(doc._id);

      if (existing.conversation) {
        conversation = existing.conversation;
      } else {
        const created = await createConversation(doc._id, doc.originalName);

        conversation = created.conversation;
      }

      setConversation(conversation);

      const history = await getMessages(conversation._id);

      setMessages(history.messages);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-5 border-b border-zinc-800">
        <UploadButton />
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="text-xs uppercase text-zinc-400 mb-3">Documents</h2>

        <div className="space-y-2">
          {documents.length === 0 ? (
            <p className="text-sm text-zinc-500">No documents uploaded.</p>
          ) : (
            documents.map((doc) => (
              <button
                key={doc._id}
                onClick={() => handleSelectDocument(doc)}
                disabled={doc.status !== "COMPLETED"}
                className={`w-full rounded-lg p-3 flex items-center gap-3 transition ${
                  selectedDocument?._id === doc._id
                    ? "bg-violet-600"
                    : "bg-zinc-800 hover:bg-zinc-700"
                } ${
                  doc.status !== "COMPLETED"
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              >
                <FileText size={18} />

                <span className="truncate flex-1">{doc.originalName}</span>

                <span
                  className={`text-xs font-medium ${
                    doc.status === "COMPLETED"
                      ? "text-green-400"
                      : doc.status === "FAILED"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }`}
                >
                  {doc.status}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800 p-5">
        <h2 className="text-xs uppercase text-zinc-400 mb-3">AI Tools</h2>

        <div className="space-y-2">
          <button className="tool-btn">
            <Brain size={18} />
            Summary
          </button>

          <button className="tool-btn">
            <BookOpen size={18} />
            Explain
          </button>

          <button className="tool-btn">
            <HelpCircle size={18} />
            Quiz
          </button>

          <button className="tool-btn">
            <Layers3 size={18} />
            Flashcards
          </button>

          <button className="tool-btn">
            <GraduationCap size={18} />
            Viva
          </button>

          <button className="tool-btn">
            <MessageSquare size={18} />
            Key Concepts
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
