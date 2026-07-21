import api from "./api";

export const summary = async (conversationId, length) => {
  const response = await api.post("/ai/summary", {
    conversationId,
    length,
  });

  return response.data;
};

export const quiz = async (conversationId, count) => {
  const response = await api.post("/ai/quiz", {
    conversationId,
    count,
  });

  return response.data;
};

export const flashcards = async (conversationId, count) => {
  const response = await api.post("/ai/flashcards", {
    conversationId,
    count,
  });

  return response.data;
};

export const viva = async (conversationId, count) => {
  const response = await api.post("/ai/viva", {
    conversationId,
    count,
  });

  return response.data;
};

export const keypoints = async (conversationId) => {
  const response = await api.post("/ai/keypoints", {
    conversationId,
  });

  return response.data;
};

export const explain = async (conversationId, topic) => {
  const response = await api.post("/ai/explain", {
    conversationId,
    topic,
  });

  return response.data;
};
