import { RateLimitRecord } from "../types/rate-limit.types.js";

export const rateLimitStore = new Map<string, RateLimitRecord>();