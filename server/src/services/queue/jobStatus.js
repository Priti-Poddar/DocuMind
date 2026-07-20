import redisClient from "../../config/redis.js";

export const setJobStatus = async (jobId, status, extra = {}) => {
  await redisClient.hSet(`job:${jobId}`, {
    status,
    updatedAt: new Date().toISOString(),
    ...extra,
  });
};

export const getJobStatus = async (jobId) => {
  return await redisClient.hGetAll(`job:${jobId}`);
};
