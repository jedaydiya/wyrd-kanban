"use server";

import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { BoardSchema } from "@/lib/types";
import { eq, type InferSelectModel } from "drizzle-orm";

export type SelectBoard = InferSelectModel<typeof boards>;
export async function createNewBoard(newBoard: unknown) {
  const result = BoardSchema.safeParse(newBoard);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }
  const { userId }: { userId: string | null } = auth();

  await db.insert(boards).values({
    board_name: result.data.name as string,
    board_description: result.data.description as string,
    userId: userId as string,
  });
  revalidatePath("/boards");
}

export async function fetchBoards() {
  try {
    const boardResults: SelectBoard[] = await db.select().from(boards);
    return boardResults;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}

export async function deleteBoard(data: FormData) {
  const boardIdValue = data.get("boardId");
  if (boardIdValue === null || typeof boardIdValue !== "string") {
    throw new Error("User ID is missing or not a string from FormData");
  }
  const boardId = parseInt(boardIdValue, 10);

  try {
    await db.delete(boards).where(eq(boards.id, boardId));
    revalidatePath("/boards");
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}
