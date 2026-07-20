import Message from "../../models/Message.js";

export const saveMessage = async (conversationId, role, content) => {
  return await Message.create({
    conversationId,

    role,

    content,
  });
};

export const getMessages = async (conversationId, limit = 10) => {
  const messages = await Message.find({
    conversationId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(limit);

  return messages.reverse();
};
