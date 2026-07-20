import { GoogleGenAI } from "@google/genai";
import env from "./env.js";

// console.log("Gemini key:", env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export default ai;
