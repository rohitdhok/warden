import { Router } from "express";
import { createClient } from "../controllers/client.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { clientSchema } from "../schemas/client.schema.js";

const router = Router();

router.post("/clients", validateRequest(clientSchema), createClient)

export const clientRoutes = router