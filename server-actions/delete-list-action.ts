"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { lists } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const schema = z.object({
  id: z.number(),
});
export const deleteList = action(schema, async ({ id }) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  await db.delete(lists).where(eq(boards.id, id as number));
  revalidatePath("/boards");
  redirect("/boards");
});
