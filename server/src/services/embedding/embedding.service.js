import ai from "../../config/gemini.js";

export const generateEmbedding = async (text) => {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
    });

    return response.embeddings[0].values;
  } catch (error) {
    throw new Error(`Embedding Failed: ${error.message}`);
  }
};

export const generateEmbeddings = async (chunks) => {
  const embeddings = [];

  for (const chunk of chunks) {
    const vector = await generateEmbedding(chunk.content);

    embeddings.push(vector);
  }

  return embeddings;
}; 