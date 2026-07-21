export const buildPrompt = (question, chunks, history) => {
  const conversation = history
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const context = chunks.map((chunk) => chunk.content).join("\n\n");

  return `
You are DocuMind, an AI tutor.

You have access to:
1. Conversation History
2. Relevant document context

Rules:
- Use the conversation history to understand follow-up questions.
- If the user says "make it shorter", "simplify", "give examples",
  "explain more", or "translate",
  apply that instruction to the previous assistant response.
- Never ask the user to repeat the previous question if it already exists in the conversation history.
- If the answer is not present in the document, clearly say so.

Conversation History:
${conversation}

Relevant Document:
${context}

Current Question:
${question}

Answer:
`;
};
