import { retrieveRelevantChunks } from "../retrieval/retrieval.service.js";
import { buildPrompt } from "../retrieval/prompt.service.js";
import { generateAnswer } from "../llm/llm.service.js";
// import { saveMessage, getConversation } from "./history.service.js";
import { getConversation } from "../conversation/conversation.service.js";
import { getMessages, saveMessage } from "../message/message.service.js";

export const chatWithDocument = async (conversationId, question) => {
  // Get conversation
  const conversation = await getConversation(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  // Get document ID from conversation
  const documentId = conversation.documentId;

  // Get previous messages
  const history = await getMessages(conversationId);

  // Retrieve relevant chunks
  const chunks = await retrieveRelevantChunks(documentId, question, 5);

  // Build prompt
  const prompt = buildPrompt(question, chunks, history);

  // Generate answer
  const answer = await generateAnswer(prompt);

  // Save conversation
  await saveMessage(conversationId, "user", question);

  await saveMessage(conversationId, "assistant", answer);

  return {
    answer,
    sources: chunks,
  };
};