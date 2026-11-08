import { RequestHandler } from "express";
import { AppError } from "../errors/app.error.js";
import { API_KEYS } from "../config/api-keys.js";

export function validateApiKey() : RequestHandler {
    return (req, res, next) => {
        const api_key = req.headers["x-api-key"];
        if (typeof api_key !== "string") {
            return next(new AppError("invalid API key format", 401))
        } 
        
        if (!API_KEYS.includes(api_key)) {
            return next(new AppError("invalid API key", 401))
        }

        next();
    }
}