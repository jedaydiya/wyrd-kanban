import { db } from "@/lib/db";
import { boards } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import BoardNavbar from "@/components/board-navbar";
export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await db
    .select()
    .from(boards)
    .where(sql`${boards.id} = ${params.boardId}`)
    .limit(1);
  return {
    title: board[0]?.board_name || "Board",
  };
}

const boardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const board = await db
    .select()
    .from(boards)
    .where(sql`${boards.id} = ${params.boardId}`);
  return (
    <div>
      <BoardNavbar data={board[0]} />
      <main>{children}</main>
    </div>
  );
};

export default boardLayout;
