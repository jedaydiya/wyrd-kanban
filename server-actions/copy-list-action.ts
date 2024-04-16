"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { lists } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const schema = z.object({
  id: z.number(),
  boardId: z.number(),
});
export const CopyList = action(schema, async ({ id, boardId }) => {
  const deleteList = await db
    .delete(lists)
    .where(eq(lists.id, id as number))
    .returning({ listData: lists.title });
  const listName = deleteList[0]?.listData;
  revalidatePath(`/boards/${boardId}`);
  return listName;
});
