import ai from "../../config/gemini.js";

export const generateAnswer = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-flash-lite-latest",

    contents: prompt,
  });

  return response.text;
};
