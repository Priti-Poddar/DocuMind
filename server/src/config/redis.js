import { createClient } from "redis";
import env from "./env.js";

const redisClient = createClient({
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
  },
});

redisClient.on("connect", () => {
  console.log("🟢 Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis Error");
  console.error(err.message);
});

export default redisClient;
