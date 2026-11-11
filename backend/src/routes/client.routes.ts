import { Router } from "express";
import { createClient } from "../controllers/client.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/client.schema.js";
import { adminAuth } from "../middlewares/admin_auth.middleware.js";

const router = Router();

router.post("/clients", adminAuth, validateRequest(clientSchema), createClient)

export const clientRoutes = router