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
export default async function BoardList() {
  const boards = await fetchBoards();
  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {boards?.map((board) => (
          <Card className="h-[190px] text-white rounded-md border-none bg-background shadow-md shadow-accent">
            <CardHeader>
              <CardTitle>{board.board_name}</CardTitle>
              <CardDescription className="text-white/80">{formatDistance(board.createdAt, new Date(), {
                addSuffix: true,
              })}</CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">{board.board_description || "No Description"}</CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="w-full mt-2 text-md gap-4">View</Button>
              <Button variant="outline" className="w-full mt-2 text-md gap-4">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
