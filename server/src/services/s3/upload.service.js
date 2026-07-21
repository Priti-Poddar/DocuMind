import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import path from "path";

import s3 from "../../config/s3.js";
import env from "../../config/env.js";

export const uploadPDFToS3 = async (file) => {
  const extension = path.extname(file.originalname);

  const key = `documents/${uuid()}${extension}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return {
    key,
    url: `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`,
  };
};
