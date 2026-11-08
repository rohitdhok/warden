import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/app.error.js";

export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }

    return res.status(500).json({
        success: false,
        message: "internal server error."
    })
}