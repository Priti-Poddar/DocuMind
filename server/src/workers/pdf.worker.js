import redisClient from "../config/redis.js";
import connectDB from "../config/db.js";

import { REDIS_QUEUE, DOCUMENT_STATUS } from "../utils/constants.js";
import { setJobStatus } from "../services/queue/jobStatus.js";
import { parsePDF } from "../services/pdf/parser.js";
import { chunkText } from "../services/pdf/chunker.js";
import { saveChunks } from "../services/pdf/chunk.service.js";
import { updateDocumentStatus } from "../services/document/document.service.js";
import { generateEmbedding } from "../services/embedding/embedding.service.js";
import { updateChunkEmbedding } from "../services/pdf/chunk.service.js";

const startWorker = async () => {
  await connectDB();

  await redisClient.connect();

  console.log("📄 PDF Worker Started...");
  let job;
  
  while (true) {
    try {
      const result = await redisClient.brPop(REDIS_QUEUE, 0);

      if (!result) continue;

      job = JSON.parse(result.element);

      console.log("Processing:", job.documentId);

      // await setJobStatus(job.documentId, DOCUMENT_STATUS.PROCESSING);

      await updateDocumentStatus(job.documentId, DOCUMENT_STATUS.PROCESSING);

      await setJobStatus(job.documentId, DOCUMENT_STATUS.PROCESSING);

      const pdf = await parsePDF(job.filePath);

      const chunks = chunkText(pdf.text);
 
      console.log(`Generated ${chunks.length} chunks`);

      const savedChunks = await saveChunks(job.documentId, chunks);

      console.log("Generating embeddings...");

      for (const chunk of savedChunks) {
        const embedding = await generateEmbedding(chunk.content);

        await updateChunkEmbedding(chunk._id, embedding);
      }

      console.log("Embeddings generated.");

      console.log("Pages:", pdf.pages);

      console.log(pdf.text.substring(0, 300));
      // console.log("Pages:", pdf.pages);
      // console.log("Text Length:", pdf.text.length);
      // console.log("Word Count:", pdf.text.split(/\s+/).length);
      // console.log("First 500 Characters:");
      // console.log(pdf.text.substring(0, 500));

      await updateDocumentStatus(job.documentId, DOCUMENT_STATUS.COMPLETED);

      await setJobStatus(job.documentId, DOCUMENT_STATUS.COMPLETED, {
        pages: pdf.pages,
        chunks: chunks.length,
      });

      console.log("Completed:", job.documentId);
    } catch (error) {
      console.error(error);
      if (typeof job !== "undefined") {
        await updateDocumentStatus(
          job.documentId,
          DOCUMENT_STATUS.FAILED
        );

        await setJobStatus(
          job.documentId,
          DOCUMENT_STATUS.FAILED,
          {
            error: error.message,
          }
        );
      }
    }
  }
};

startWorker();
