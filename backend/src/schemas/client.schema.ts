import { z } from "zod";

export const clientSchema = z.object ({
    name: z.string()
        .trim()
        .min(3, {message: "Name must be at least 3 characters long"})
        .max(100, {message: "Name cannot exceed 100 characters"})
})