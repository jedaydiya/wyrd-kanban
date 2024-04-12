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
import { toast } from "sonner";
import { createBoard } from "@/server-actions/create-board-action";
import { useAction } from "next-safe-action/hook";
import { useRef, ElementRef } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {
  createBoard: typeof createBoard;
};
const CreateBoardDialog = ({ createBoard }: Props) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const { execute, result, status } = useAction(createBoard, {
    onSuccess() {
      closeRef.current?.click();
    },
    onError(error) {
      if (error.validationError && error.validationError.name) {
        toast.error(`Name: ${error.validationError.name}`);
      }

      // Check if validationError in description is defined
      if (error.validationError && error.validationError.description) {
        toast.error(`Description: ${error.validationError.description}`);
      }

      // Check if both errors are present and show a combined toast
      if (
        error.validationError &&
        error.validationError.name &&
        error.validationError.description
      ) {
        toast.error(
          `Combined Error: ${error.validationError.name} - ${error.validationError.description}`,
        );
      }
    },
  });
  return (
    <div className="group relative block h-[190px]">
      <Dialog>
        <span className="absolute inset-0 rounded-md border-2 border-dashed border-accent"></span>
        <DialogTrigger
          asChild
          className="relative flex h-full w-full transform flex-col items-center gap-4 rounded-md border-2 border-accent bg-background transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
        >
          <Button className="text-xl font-extrabold">
            <PlusSquare className="mr-2 h-8 w-8" /> Add Boards
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="text-2xl text-white">New Board</DialogTitle>
          <DialogDescription className="text-white">
            Create a new board
          </DialogDescription>
          <DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                };
                execute(data);
              }}
            >
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
                <DialogClose ref={closeRef} asChild>
                  <Button
                    type="reset"
                    variant="destructive"
                    className="text-white"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {status === "executing" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBoardDialog;
