import { RequestHandler } from "express";
import { AppError } from "../errors/app.error.js";
import { fetchByApiKey } from "../services/api_key.service.js";

export function validateApiKey() : RequestHandler {
    return async (req, res, next) => {
        const api_key = req.headers["x-api-key"];
        if (typeof api_key !== "string") {
            return next(new AppError("invalid API key format", 401))
        } 
        
        const client = await fetchByApiKey(api_key);

        if (client === null) { return next(new AppError("invalid api key", 401)) }

        req.clientId = client.client_id;

        next();
    }
}