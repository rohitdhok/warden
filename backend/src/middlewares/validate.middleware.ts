import { RequestHandler } from "express";
import { ValidationError } from "../errors/validation.error.js";
import { z } from "zod"


export function validateRequest<T>(schema: z.ZodType<T>) : RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const issues = result.error.issues.map(issue => issue.message)
            return next(new ValidationError(issues))
        }

        req.body = result.data
        next();
    }
}