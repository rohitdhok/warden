import express from "express"
import { handleHealthCheck } from "../controllers/healthControllers.js";

const router = express.Router();

router.get("/", handleHealthCheck)

export const healthRoutes = router