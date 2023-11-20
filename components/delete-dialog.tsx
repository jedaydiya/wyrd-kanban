import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangleIcon } from "lucide-react";
import { deleteBoard } from "@/server-actions/actions";
import { Button } from "./ui/button";
interface Board {
  id: number;
  userId: string;
  board_name: string;
  board_description?: string | null;
  createdAt: Date;
  // Add other properties as needed
}

interface DeleteBoardDialogProps {
  board: Board;
}
export default function DeleteDialog({ board }: DeleteBoardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="text-md mt-2 inline-flex h-10 w-full items-center justify-center gap-4 rounded-md border-2 border-black bg-slate-100 px-4 py-2 font-medium text-black ring-offset-background transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          Delete
          <Trash2 className="h-6 w-6" />
        </div>
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
            <div className="mb-2 flex items-center rounded-md bg-secondary p-2 shadow-md shadow-accent">
              <AlertTriangleIcon className="mr-4 h-8 w-8 text-white" />
              <p className="text-md text-white">
                Deleting the board will delete all tasks and attachments
                associated with it.
              </p>
            </div>
            This action cannot be undone, and all associated tasks will be
            permanently removed.
          </DialogDescription>
        </DialogHeader>
        <form action={deleteBoard} className="w-full">
          <input type="hidden" name="boardId" value={board.id} />
          <Button
            type="submit"
            className="mt-2 w-full gap-4 border-2 border-black bg-slate-100 text-base text-black hover:bg-white/90"
          >
            Delete
            <Trash2 className="h-6 w-6" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
