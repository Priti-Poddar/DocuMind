import Chat from "../../models/Chat.js";

export const saveMessage = async (documentId, role, message) => {
  return await Chat.create({
    documentId,
    role,
    message,
  });
};

export const getConversation = async (documentId, limit = 10) => {
  const history = await Chat.find({
    documentId,
  })
    .sort({ createdAt: -1 })
    .limit(limit);

  return history.reverse();
};
