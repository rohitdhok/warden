import { Router } from "express";
import { handleLoginAdmin } from "../controllers/admin.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { adminSchema } from "../schemas/admin.schema.js";

const router = Router();

router.post("/auth/login", validateRequest(adminSchema), handleLoginAdmin);

export const adminRoutes = router