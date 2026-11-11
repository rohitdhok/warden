import { Request, Response, NextFunction } from "express";
import { extractToken, verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../errors/app.error.js";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {return next(new AppError("Authentication required", 401))}

    try {
        const decoded = verifyAccessToken(token);

        req.adminId = decoded.adminId;
        next();
    } catch(err) {
        return next(new AppError("Invalid or expired token", 401));
    }

}