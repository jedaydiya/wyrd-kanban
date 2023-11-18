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
import { Textarea } from "./ui/textarea";
import { PlusSquare } from "lucide-react";
import { Input } from "./ui/input";
import { createNewBoard } from "@/server-actions/actions";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { BoardSchema } from "@/lib/types";
const CreateBoardDialog = () => {
  const clientAction = async (data: FormData) => {
    const newBoard = {
      name: data.get("name"),
      description: data.get("description"),
    };
    const result = BoardSchema.safeParse(newBoard);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.error(errorMessage);
      return;
    }
    const response = await createNewBoard(result.data);
    if (response?.error) {
      toast.error(response.error);
    }
    const successMessage = result.data.name;
    toast.success("The " + successMessage + " board has been created");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusSquare className="mr-2" /> Add Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-2xl text-white">New Board</DialogTitle>
        <DialogDescription className="text-white">
          Create a new board
        </DialogDescription>
        <DialogHeader>
          <form action={clientAction}>
            <Input
              name="name"
              placeholder="Board name"
              className="bg-background text-white"
            />
            <DialogDescription className="mt-4 text-white">
              Add Description
            </DialogDescription>
            <Textarea
              name="description"
              placeholder="Add description to your board"
              className="mt-2 bg-background text-white"
            />
            <div className="h-4"></div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  type="reset"
                  variant="destructive"
                  className="text-white"
                >
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
