'use server';

import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";


export async function createNewBoard(data: FormData) {
  const nameValue = data.get('name');
  const { userId }: { userId: string | null } = auth();

  await db.insert(boards).values({ board_name: nameValue as string, userId: userId as string });

  revalidatePath('/')

}
