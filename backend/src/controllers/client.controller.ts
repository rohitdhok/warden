import { Request, Response } from "express";
import { registerClient } from "../services/client.service.js";

export async function createClient(req: Request, res: Response) {
    const clientName = req.body.name;

    const client = await registerClient(clientName);
    return res.status(201).json(client);
} 