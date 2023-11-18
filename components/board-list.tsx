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
import { deleteBoard } from "@/server-actions/actions";
export default async function BoardList() {
  const boards = await fetchBoards();
  return (
    <>
      <div className="mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {boards?.map((board) => (
          <Card className="h-[190px] rounded-md border-none bg-background text-white shadow-md shadow-accent">
            <CardHeader>
              <CardTitle>{board.board_name}</CardTitle>
              <CardDescription className="text-white/80">
                {formatDistance(board.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
              {board.board_description || "No Description"}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="text-md mt-2 w-full gap-4">
                View
              </Button>
              <form action={deleteBoard} className="w-full">
                <input type="hidden" name="boardId" value={board.id} />
                <Button
                  type="submit"
                  variant="outline"
                  className="text-md mt-2 w-full gap-4"
                >
                  Delete
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
