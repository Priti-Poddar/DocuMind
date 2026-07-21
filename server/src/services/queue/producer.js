import redisClient from "../../config/redis.js";
import { REDIS_QUEUE } from "../../utils/constants.js";

export const addJobToQueue = async (job) => {
  console.log("Queue:", REDIS_QUEUE);
  console.log("Job:", job);

  const length = await redisClient.lPush(REDIS_QUEUE, JSON.stringify(job));

  console.log("LPUSH successful. Queue length:", length);
};
