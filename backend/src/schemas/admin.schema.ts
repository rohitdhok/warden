import {z} from "zod"

export const adminSchema = z.object({
    email: z.email().trim(),
    password: z.string().min(1, {message: "password is required"})
})