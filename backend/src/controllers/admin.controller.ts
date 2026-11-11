import { Request, Response } from "express";
import { loginAdmin} from "../services/admin.service.js";

export async function handleLoginAdmin(req: Request, res: Response) {
    const email = req.body.email
    const password = req.body.password

    const admin = await loginAdmin(email, password)

    return res.json(admin)
}