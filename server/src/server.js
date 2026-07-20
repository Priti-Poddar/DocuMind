import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import redisClient from "./config/redis.js";

const startServer = async () => {
    try {
        await connectDB();
        await redisClient.connect();

        app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();