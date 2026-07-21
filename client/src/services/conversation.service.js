import api from "./api";

export const createConversation = async (documentId, title) => {
  const response = await api.post("/conversations", {
    documentId,
    title,
  });

  return response.data;
};

export const getMessages = async (conversationId) => {
  const response = await api.get(`/conversations/${conversationId}/messages`);

  return response.data;
};

export const getConversationByDocument = async (documentId) => {
  const res = await api.get(`/conversations/document/${documentId}`);

  return res.data;
};

export const getConversations = async (documentId) => {
  const res = await api.get(`/conversations/document/${documentId}/all`);

  return res.data;
};

export const renameConversation = async (conversationId, title) => {
  const res = await api.patch(`/conversations/${conversationId}/title`, {
    title,
  });

  return res.data;
};

export const deleteConversation = async (id) => {
  const res = await api.delete(`/conversations/${id}`);
  return res.data;
};