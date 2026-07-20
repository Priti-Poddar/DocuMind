import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

import { retrieveRelevantChunks } from "./services/retrieval/retrieval.service.js";

await connectDB();

const result = await retrieveRelevantChunks(
  "6a5e5cae5d08957587b3f68a",

  "What is Object-Oriented Programming?",
);

console.log(result);
