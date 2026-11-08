import { Request, Response, NextFunction } from "express";

export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error("internal server error : ", err);
    return res.status(500).json({
        success: false,
        message: "internal server error."
    })
}