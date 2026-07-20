export const chunkText = (text, chunkSize = 200, overlap = 50) => {
  const words = text.split(/\s+/);
  console.log("Total Words:", words.length);

  const chunks = [];

  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + chunkSize, words.length);

    const chunk = words.slice(start, end).join(" ");

    chunks.push(chunk);

    start += chunkSize - overlap;
  }

  return chunks;
};
