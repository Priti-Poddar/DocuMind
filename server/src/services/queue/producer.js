import redisClient from "../../config/redis.js";
import { REDIS_QUEUE } from "../../utils/constants.js";

export const addJobToQueue = async (job) => {
  await redisClient.lPush(REDIS_QUEUE, JSON.stringify(job));
};
