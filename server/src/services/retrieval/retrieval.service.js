// import Chunk from "../../models/Chunk.js";

// import { generateEmbedding } from "../embedding/embedding.service.js";

// import { cosineSimilarity } from "./similarity.service.js";

// export const retrieveRelevantChunks = async (
//   documentId,
//   question,
//   topK = 5,
// ) => {
//   const questionEmbedding = await generateEmbedding(question);

//   const chunks = await Chunk.find(
//     { documentId },
//     {
//       content: 1,
//       embedding: 1,
//     },
//   );

//   const scoredChunks = chunks.map((chunk) => ({
//     chunk,

//     score: cosineSimilarity(questionEmbedding, chunk.embedding),
//   }));

//   scoredChunks.sort((a, b) => b.score - a.score);

//   return scoredChunks.slice(0, topK).map((item) => ({
//     score: item.score,
//     content: item.chunk.content,
//     page: item.chunk.page,
//   }));
// };

import mongoose from "mongoose";

import Chunk from "../../models/Chunk.js";

import { generateEmbedding } from "../embedding/embedding.service.js";

export const retrieveRelevantChunks = async (
  documentId,
  question,
  topK = 5,
) => {
  const questionEmbedding = await generateEmbedding(question);

  const chunks = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",

        path: "embedding",

        queryVector: questionEmbedding,

        filter: {
          documentId: new mongoose.Types.ObjectId(documentId),
        },

        numCandidates: 100,

        limit: topK,
      },
    },

    {
      $project: {
        _id: 1,

        content: 1,

        chunkIndex: 1,

        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  return chunks;
};