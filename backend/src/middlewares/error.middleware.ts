import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { ValidationError } from "../errors/validation.error.js";

export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    } else if (err instanceof ValidationError) {
        return res.status(400).json({
            success: false,
            message: err.message,
            errors: err.issues
        })
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}