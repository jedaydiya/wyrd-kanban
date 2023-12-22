import { SelectBoard } from "@/server-actions/actions";
import Navigation from "./navigation";
import { boards } from "@/lib/db/schema";
import BoardTitle from "./board-title";
import { BoardOptions } from "./board-options";
import { updateBoard } from "@/server-actions/update-board-action";
export interface Board {
  id: number;
  userId: string;
  board_name: string;
  board_description?: string | null;
  createdAt: Date;
  // Add other properties as needed
}
interface BoardNavbarProps {
  data: Board;
}
export default function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <>
      <Navigation />
      <div className="top-14 z-[40] mx-auto flex h-14 w-full items-center gap-x-4 bg-secondary px-6 text-white">
        <BoardTitle data={data} updateBoard={updateBoard} />
        <div className="ml-auto">
          <BoardOptions data={data} />
        </div>
      </div>
    </>
  );
}
