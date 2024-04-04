import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangleIcon } from "lucide-react";
import { useAction } from "next-safe-action/hook";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { deleteBoard } from "@/server-actions/delete-board-action";
type Props = {
  deleteBoard: typeof deleteBoard;
};
interface Board {
  id: number;
  userId: string;
  board_name: string;
  board_description?: string | null;
  createdAt: Date;
  // Add other properties as needed
}

interface DeleteBoardDialogProps extends Props {
  board: Board;
}
export const DeleteDialog = ({
  board,
  deleteBoard,
}: DeleteBoardDialogProps) => {
  const { execute, result } = useAction(deleteBoard, {
    onSuccess(data, result) {
      toast.success("Board has been deleted");
    },
    onError(error) {
      toast.error("Delete failed: " + error.fetchError);
      console.log(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = parseInt(formData.get("id") as string);
    const data = {
      id: id,
    };
    execute(data);
  };

  return (
    <Dialog>
      <DialogTrigger className="h-auto w-full justify-start rounded-none p-2 px-5 text-left text-sm font-normal hover:bg-slate-100">
        Delete this Board
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">
            Are you sure you want to delete this Kanban Board ?
          </DialogTitle>
          <DialogDescription>
            <p className="text-extrabold my-2 text-lg text-white">
              Board Name: {board.board_name}
            </p>
            <span className="mb-2 flex items-center rounded-md bg-secondary p-2 shadow-md shadow-accent">
              <AlertTriangleIcon className="mr-4 h-8 w-8 text-white" />
              <p className="text-md text-white">
                Deleting the board will delete all tasks and attachments
                associated with it.
              </p>
            </span>
            This action cannot be undone, and all associated tasks will be
            permanently removed.
          </DialogDescription>
        </DialogHeader>
        <form action={onDelete} className="w-full">
          <input type="hidden" name="id" value={board.id} />
          <Button
            type="submit"
            className="mt-2 w-full gap-4 border-2 border-black bg-slate-100 text-base text-black hover:bg-white/90"
          >
            Delete
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
