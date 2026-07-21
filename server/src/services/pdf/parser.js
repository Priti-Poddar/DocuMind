import { GetObjectCommand } from "@aws-sdk/client-s3";
import { PDFParse } from "pdf-parse";

import s3 from "../../config/s3.js";
import env from "../../config/env.js";

const streamToBuffer = async (stream) => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};

export const parsePDF = async (s3Key) => {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: s3Key,
    }),
  );

  const buffer = await streamToBuffer(response.Body);

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
