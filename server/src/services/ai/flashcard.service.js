import { generateFromDocument } from "./ai.service.js";

export const generateFlashcards = async (conversationId, count = 20) => {
  return await generateFromDocument(
    conversationId,

    `You are an expert tutor.

Generate ${count} flashcards.

Requirements:

Format:

## Flashcard

Question:

Answer:

Keep answers short.

Only use document content.`,
  );
};
