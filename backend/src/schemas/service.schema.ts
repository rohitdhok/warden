import { z } from "zod"

export const serviceSchema = z.object({
  name: z.string().trim().min(1).max(100),
  base_url: z.url().refine(
    (value) => {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol);
    },
    { message: "Only HTTP and HTTPS URLs are allowed" }
  )
});

export const updateServiceSchema = serviceSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);