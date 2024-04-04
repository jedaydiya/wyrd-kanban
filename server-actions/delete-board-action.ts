"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const schema = z.object({
  id: z.number(),
});
export const deleteBoard = action(schema, async ({ id }) => {
  await db.delete(boards).where(eq(boards.id, id as number));
  revalidatePath("/boards");
  redirect("/boards");
});
