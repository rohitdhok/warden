import { Router } from "express";
import { handleCreateService, handleDeleteService, handleGetAllServices, handleGetServiceById, handleUpdateService } from "../controllers/service.controller.js";
import { adminAuth } from "../middlewares/admin_auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { serviceSchema, updateServiceSchema } from "../schemas/service.schema.js";

const router = Router();

router.post("/services", adminAuth, validateRequest(serviceSchema), handleCreateService);
router.get("/services", adminAuth, handleGetAllServices);
router.get("/services/:serviceId", adminAuth, handleGetServiceById);
router.patch("/services/:serviceId", adminAuth, validateRequest(updateServiceSchema), handleUpdateService);
router.delete("/services/:serviceId",adminAuth, handleDeleteService)

export const servicesRoutes = router;