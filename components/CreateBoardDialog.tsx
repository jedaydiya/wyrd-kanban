"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

const CreateBoardDialog = (props: Props) => {
  const [input, setInput] = useState("");
  return (
    <Dialog>
      <DialogTrigger><Button variant="secondary"><PlusSquare className="mr-2" /> Add Board</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>New Board</DialogTitle>
        <DialogDescription>Create a new board</DialogDescription>
        <DialogHeader>
          <form>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Board name"
            />
            <div className="h-4"></div>
            <div className="flex justify-end gap-2">
              <Button type="reset" variant="secondary">
                Cancel
              </Button>
              <Button>Create</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardDialog;
