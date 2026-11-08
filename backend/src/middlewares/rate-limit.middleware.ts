import { RATE_LIMIT, WINDOW_MS } from "../config/rate-limit.js";
import { RequestHandler } from "express";
import { AppError } from "../errors/app.error.js";
import { rateLimitStore } from "../store/rate-limit.store.js";

export function handleRateLimit() : RequestHandler {
    return (req, res, next) => {
        const api_key = req.headers["x-api-key"];

        if (typeof api_key !== "string") { return next(new AppError("invalid API key", 401)) }

        const record = rateLimitStore.get(api_key)

        if (!record || Date.now() - (record?.windowStart?? Date.now()) >= WINDOW_MS) {
            rateLimitStore.set(api_key, {count: 1, windowStart: Date.now()})
            return next()
        }

        if ((record?.count ?? 0) >= RATE_LIMIT) {
            return next(new AppError("you are being rate limited", 429))
        } else {
            rateLimitStore.set(api_key, {count: (record?.count ?? 0) + 1, windowStart: (record?.windowStart ?? Date.now())})
            return next()
        }
    } 
}