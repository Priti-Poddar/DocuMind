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