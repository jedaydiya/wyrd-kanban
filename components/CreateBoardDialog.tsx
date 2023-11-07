"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { Input } from "./ui/input";
import { createNewBoard } from "@/server-actions/actions";
import { useState } from "react";
import SubmitButton from "./submit-button";

const CreateBoardDialog = (props: Props) => {
  const clientAction = async (data: FormData) => {
    const newBoard = {};
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusSquare className="mr-2" /> Add Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>New Board</DialogTitle>
        <DialogDescription>Create a new board</DialogDescription>
        <DialogHeader>
          <form action={createNewBoard}>
            <Input name="name" placeholder="Board name" />
            <div className="h-4"></div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="reset" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <SubmitButton />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardDialog;
