import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", (err) => { console.error("redis server error : ", err)} )

export async function connectRedis() {
    await redisClient.connect();
}