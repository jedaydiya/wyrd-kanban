"use server";
import { z } from "zod";
import { action } from "@/lib/safe-action";
import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
const schema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Board name must be at least 1 character long" })
    .max(100, { message: "Board name must not exceed 100 characters long" }),
  description: z
    .string()
    .trim()
    .max(100, { message: "Description must not exceed 100 character long" }),
});

export const createBoard = action(schema, async ({ name, description }) => {
  const { userId }: { userId: string | null } = auth();
  const result = await db
    .insert(boards)
    .values({
      board_name: name as string,
      board_description: description as string,
      userId: userId as string,
    })
    .returning({ insertedId: boards.id });

  const insertedId = result[0]?.insertedId;
  revalidatePath("/boards");
  return { data: insertedId };
});
