"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { lists } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const schema = z.object({
  id: z.number(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Title name must be at least 1 character long" })
    .max(100, { message: "Title name must not exceed 100 characters long" }),
  boardId: z.number(),
});
export const updateList = action(schema, async ({ id, name, boardId }) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const updatedList = await db
    .update(lists)
    .set({ title: name as string })
    .where(
      and(eq(lists.id, id as number), eq(lists.board_id, boardId as number)),
    )
    .returning({ newListname: lists.title });

  const newListname = updatedList[0]?.newListname;
  revalidatePath(`/boards/${id}`);
  return { data: newListname };
});
