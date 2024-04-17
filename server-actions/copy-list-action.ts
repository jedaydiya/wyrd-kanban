"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { lists } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { title } from "process";
const schema = z.object({
  id: z.number(),
  boardId: z.number(),
});
export const copyList = action(schema, async ({ id, boardId }) => {
  const listToCopy = await db.query.lists.findFirst({
    where: (lists, { eq, and }) =>
      and(eq(lists.id, id), eq(lists.board_id, boardId)),
  });
  if (!listToCopy) {
    return {
      error: "List not found",
    };
  }
  const lastList = await db.query.lists.findFirst({
    where: (lists, { eq }) => eq(lists.board_id, boardId),
    orderBy: (lists, { desc }) => [desc(lists.order)],
    columns: {
      order: true,
    },
  });

  const newOrder = lastList ? lastList.order + 1 : 1;

  const list = await db.insert(lists).values({
    board_id: listToCopy.board_id,
    title: `${listToCopy.title} - Copy`,
    order: newOrder,
    updatedAt: new Date(),
  });
  revalidatePath(`/board/${boardId}`);
  return { name: listToCopy.title };
});
