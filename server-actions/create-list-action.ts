"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { boards } from "@/lib/db/schema";
import { lists } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
const schema = z.object({
  boardId: z.number(),
  title: z
    .string()
    .trim()
    .min(1, { message: "List title must be at least 1 character long" })
    .max(100, { message: "List title must not exceed 100 characters long" }),
});

export const createList = action(schema, async ({ boardId, title }) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  try {
    const board = await db.query.boards.findFirst({
      where: eq(boards.id, boardId)
    });
    if (!board) {
      return {
        error: "Board not found",
      };
    }
    const lastList = await db.query.lists.findFirst({
      where: (lists, { eq }) => eq(lists.board_id, boardId),
      orderBy: (lists, { desc }) => [desc(lists.order)],
      columns: {
        order: true,
      }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    await db
      .insert(lists)
      .values({
        title: title as string,
        board_id: boardId as number,
        order: newOrder,
        updatedAt: new Date(),
      })


  }
  catch (error) {
    return {
      error: "Failed to create."
    }
  }
  revalidatePath(`/boards/${boardId}`);
});
