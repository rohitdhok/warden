import { RATE_LIMIT, WINDOW_SECONDS } from "../config/rate-limit.js";
import { RequestHandler } from "express";
import { AppError } from "../errors/app.error.js";
import { redisClient } from "../config/redis.js";
import { rateLimitScript } from "../scripts/rate-limit.script.js";

export function handleRateLimit() : RequestHandler {
    return async (req, res, next) => {
        if (!req.clientId) {
        return next(new AppError("client identity missing", 401));
        }
        
        const key = `warden:rate-limit:${req.clientId}`;
        
        const result = await redisClient.eval(rateLimitScript, {
            keys: [key],
            arguments: [String(RATE_LIMIT), String(WINDOW_SECONDS)]
        })

        if (Number(result === 0)) {
            return next(new AppError(`you are being rate limited`, 429))
        } 

        return next();
    } 
}