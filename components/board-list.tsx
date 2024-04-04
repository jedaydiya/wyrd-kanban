import { fetchBoards } from "@/server-actions/actions";
import { formatDistance } from "date-fns";
import Link from "next/link";
import CreateBoardDialog from "./CreateBoardDialog";
import { createBoard } from "@/server-actions/create-board-action";
export default async function BoardList() {
  const boards = await fetchBoards();
  return (
    <>
      <div className="mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <CreateBoardDialog createBoard={createBoard} />
        {boards?.map((board) => (
          <Link
            className="group relative block h-[190px]"
            key={board.id}
            href={`/boards/${board.id}`}
          >
            <span className="absolute inset-0 rounded-md border-2 border-dashed border-accent"></span>
            <div className="relative flex h-full transform items-start rounded-md border-2 border-accent bg-background transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
              <div
                key={board.id}
                className="p-4 text-white transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
              >
                <h2 className="text-xl font-medium sm:text-2xl">
                  {board.board_name}
                </h2>
                <h2 className="text-md mt-2 font-medium sm:text-base">
                  {formatDistance(board.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                </h2>
              </div>

              <div className="absolute h-[190px] p-4 text-white opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
                <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                  {board.board_name}
                </h3>

                <p className="mt-4 text-sm sm:text-base">
                  {board.board_description || "No Description"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
