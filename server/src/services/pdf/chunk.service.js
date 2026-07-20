import Chunk from "../../models/Chunk.js";

export const saveChunks = async (documentId, chunks) => {
  const documents = chunks.map((chunk, index) => ({
    documentId,
    chunkIndex: index,
    content: chunk,
    wordCount: chunk.split(/\s+/).length,
  }));

  return await Chunk.insertMany(documents);
};

export const updateChunkEmbedding = async (chunkId, embedding) => {
  return await Chunk.findByIdAndUpdate(
    chunkId,
    {
      embedding,
    },
    {
      returnDocument: "after",
    },
  );
};