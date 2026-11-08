import { Request, Response } from "express";

export function handleHealthCheck(req: Request, res: Response) {
    return res.json({status: "healthy", service: "warden-api-gateway"})
}