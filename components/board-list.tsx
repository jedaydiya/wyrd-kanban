import { fetchBoards } from "@/server-actions/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDistance } from "date-fns";
import { Button } from "./ui/button";
import { Trash2, MoveRight, AlertTriangleIcon } from "lucide-react";
import CreateBoardDialog from "./CreateBoardDialog";
import { createBoard } from "@/server-actions/create-board-action";
export default async function BoardList() {
  const boards = await fetchBoards();
  return (
    <>
      <div className="mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {boards?.map((board) => (
          <Card className="h-[190px] rounded-md border-none bg-background text-white shadow-md shadow-accent">
            <CardHeader>
              <CardTitle key={board.id}>{board.board_name}</CardTitle>
              <CardDescription className="text-white/80">
                {formatDistance(board.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
              {board.board_description || "No Description"}
            </CardContent>
            <CardFooter>
              <Button className="text-md mt-2 w-full gap-4 border-2 border-black bg-slate-100 text-lg text-black hover:bg-white/90">
                View
                <MoveRight className="h-6 w-6" />
              </Button>
            </CardFooter>
          </Card>
        ))}
        <CreateBoardDialog createBoard={createBoard} />
      </div>
    </>
  );
}
