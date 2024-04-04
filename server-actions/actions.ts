"use server";

import { db } from "@/lib/db";
import { boards, lists } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { eq, type InferSelectModel } from "drizzle-orm";
export type SelectBoard = InferSelectModel<typeof boards>;
export type SelectList = InferSelectModel<typeof lists>;
export async function fetchBoards() {
  try {
    const boardResults: SelectBoard[] = await db
      .select()
      .from(boards)
      .orderBy(desc(boards.createdAt));
    return boardResults;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}

export async function fetchList() {
  try {
    const listResults: SelectList[] = await db
      .select()
      .from(lists)
      .orderBy(lists.createdAt);
    return listResults;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}
