import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";

export const createConversation = async (documentId, title = "New Chat") => {
  return await Conversation.create({
    documentId,
    title,
  });
};

export const getConversation = async (conversationId) => {
  return await Conversation.findById(conversationId);
};

export const findConversationByDocument = async (documentId) => {
  return await Conversation.findOne({
    documentId,
  });
};

export const getConversationsByDocument = async (documentId) => {
  return await Conversation.find({ documentId }).sort({ updatedAt: -1 });
};

export const updateConversationTitle = async (conversationId, title) => {
  return await Conversation.findByIdAndUpdate(
    conversationId,
    { title },
    { new: true },
  );
};


export const deleteConversation = async (conversationId) => {
  await Message.deleteMany({
    conversationId,
  });

  return await Conversation.findByIdAndDelete(conversationId);
};