import api from "./api";

export const chat = async (conversationId, question) => {
  const response = await api.post("/chat", {
    conversationId,
    question,
  });

  return response.data;
};
