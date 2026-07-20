import Conversation from "../../models/Conversation.js";

export const createConversation = async (documentId, title = "New Chat") => {
  return await Conversation.create({
    documentId,
    title,
  });
};

export const getConversation = async (conversationId) => {
  return await Conversation.findById(conversationId);
};
