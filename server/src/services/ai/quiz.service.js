import { generateFromDocument } from "./ai.service.js";

export const generateQuiz = async (conversationId, count = 10) => {
  return await generateFromDocument(
    conversationId,

    `You are an exam paper setter.

Generate ${count} multiple-choice questions.

Requirements:

- Use Markdown.
- Four options (A,B,C,D)
- Mention the correct answer.
- Questions should cover different topics.
- Do not repeat questions.
- Use only the document.`,
  );
};
