"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const schema = z.object({
  id: z.number(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Board name must be at least 1 character long" })
    .max(100, { message: "Board name must not exceed 100 characters long" }),
});

export const updateBoard = action(schema, async ({ id, name }) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  const updatedBoard = await db
    .update(boards)
    .set({ board_name: name as string })
    .where(eq(boards.id, id as number))
    .returning({ newBoardname: boards.board_name });

  const newBoardname = updatedBoard[0]?.newBoardname;
  revalidatePath(`/boards/${id}`);
  return { data: newBoardname };
});
