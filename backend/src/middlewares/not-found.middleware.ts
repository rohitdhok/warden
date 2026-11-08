import { Request, Response } from "express";

export function routeNotFound(req: Request, res: Response) {
    return res.status(404).json({error: "route not found"})
}