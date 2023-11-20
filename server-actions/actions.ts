"use server";

import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, type InferSelectModel } from "drizzle-orm";
export type SelectBoard = InferSelectModel<typeof boards>;
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
