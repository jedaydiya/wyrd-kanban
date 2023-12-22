import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { fetchList } from "@/server-actions/actions";
import { ListContainer } from "@/components/list-container";
interface BoardIdPageProps {
  params: {
    boardId: number;
  };
}
const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { userId } = auth();
  const lists = await db.query.lists.findMany({
    where: (lists, { eq }) => eq(lists.board_id, params.boardId),
    orderBy: (lists, { desc }) => [desc(lists.createdAt)],
  });
  if (!userId) {
    redirect("/");
  }
  return (
    <>
      <ListContainer boardId={params.boardId} data={lists} />
    </>
  );
};

export default BoardIdPage;
