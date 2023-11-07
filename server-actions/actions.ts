'use server';

import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { BoardSchema } from "@/lib/types";

export async function createNewBoard(newBoard: unknown) {
  const result = BoardSchema.safeParse(newBoard);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage =
        errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    }
  }
  const { userId }: { userId: string | null } = auth();

  await db.insert(boards).values({ board_name: result.data.name as string, userId: userId as string });

  revalidatePath('/')

}
