import { RATE_LIMIT, WINDOW_SECONDS } from "../config/rate-limit.js";
import { RequestHandler } from "express";
import { AppError } from "../errors/app.error.js";
import { redisClient } from "../config/redis.js";
import { rateLimitScript } from "../scripts/rate-limit.script.js";

export function handleRateLimit() : RequestHandler {
    return async (req, res, next) => {
        const api_key = req.headers["x-api-key"];

        if (typeof api_key !== "string") { return next(new AppError("invalid API key", 401)) }

        const key = `warden:rate-limit:${api_key}`;
        
        const result = await redisClient.eval(rateLimitScript, {
            keys: [key],
            arguments: [String(RATE_LIMIT), String(WINDOW_SECONDS)]
        })

        if (result === 0) {
            return next(new AppError(`you are being rate limited`, 429))
        } 

        return next();
    } 
}