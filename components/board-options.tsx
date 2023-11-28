"use client";
import { MoreHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";
import { DeleteDialog } from "./delete-dialog";
import { deleteBoard } from "@/server-actions/delete-board-action";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./ui/popover";
import { Board } from "./board-navbar";
interface BoardOptionsProps {
  data: Board;
}

export const BoardOptions = ({ data }: BoardOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pb-3 pt-3 text-neutral-600"
        align="start"
        side="bottom"
      >
        <div className="pb-4 text-center text-sm font-medium">
          Board Actions
        </div>
        <PopoverClose className="bg-white hover:bg-slate-100" asChild>
          <Button className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <DeleteDialog board={data} deleteBoard={deleteBoard} />
      </PopoverContent>
    </Popover>
  );
};
