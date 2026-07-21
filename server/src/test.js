import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./config/s3.js";
import env from "./config/env.js";

try {
  await s3.send(
    new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: "test.txt",
      Body: "Hello from DocuMind!",
      ContentType: "text/plain",
    }),
  );

  console.log("✅ Uploaded successfully!");
} catch (err) {
  console.error(err);
}
