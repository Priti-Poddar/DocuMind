import { readFile } from "fs/promises";
import { PDFParse } from "pdf-parse";

export const parsePDF = async (filePath) => {
  const buffer = await readFile(filePath);

  const parser = new PDFParse({
    data: buffer,
  });

  try {
    const result = await parser.getText();

    return {
      text: result.text,
      pages: result.total ?? result.numpages,
      info: result.info,
    };
  } finally {
    await parser.destroy();
  }
};
