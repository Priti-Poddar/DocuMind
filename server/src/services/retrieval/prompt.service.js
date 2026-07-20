export const buildPrompt = (question, chunks, history) => {
  const conversation = history
    .map((msg) => `${msg.role}: ${msg.message}`)
    .join("\n");

  const context = chunks.map((chunk) => chunk.content).join("\n\n");

  return `

You are DocuMind.

Conversation:

${conversation}

Context:

${context}

Current Question:

${question}

Answer ONLY using the context.

`;
};
