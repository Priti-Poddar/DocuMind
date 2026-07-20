import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,

  MONGODB_URI: process.env.MONGODB_URI,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  UPLOAD_PATH: process.env.UPLOAD_PATH || "uploads",
};

export default env;
