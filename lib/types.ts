import { z } from "zod";
export const BoardSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Board name must be at least 1 character long" })
    .max(100, { message: "Board name must not exceed 100 characters long" }),
});

