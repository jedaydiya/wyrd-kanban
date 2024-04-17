"use client";

import { ListProps } from "./list-container";
import { Separator } from "./ui/separator";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "./form/form-submit";
import { useAction } from "next-safe-action/hook";
import { deleteList } from "@/server-actions/delete-list-action";
import { copyList } from "@/server-actions/copy-list-action";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
interface ListOptionsProps {
  data: ListProps[];
  // onAddCard: () => void;
}
export const ListOptions = ({ data }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, reset } = useAction(deleteList, {
    onSuccess(data) {
      toast.success("List " + data + " has been deleted");
      closeRef.current?.click();
      reset();
    },
    onError(error) {
      toast.error("Delete failed: " + error.fetchError);
      console.log(error);
    },
  });
  const { execute: copyExecute, reset: copyReset } = useAction(copyList, {
    onSuccess(data) {
      console.log(data);
      toast.success("List " + data.name + " copied");
      closeRef.current?.click();
      copyReset();
    },
    onError(error) {
      toast.error("Delete failed: " + error.serverError);
      console.log(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = parseInt(formData.get("id") as string);
    const boardId = parseInt(formData.get("boardId") as string);
    const data = {
      id: id,
      boardId: boardId,
    };
    execute(data);
  };

  const onCopy = (formData: FormData) => {
    const id = parseInt(formData.get("id") as string);
    const boardId = parseInt(formData.get("boardId") as string);
    const data = {
      id: id,
      boardId: boardId,
    };
    copyExecute(data);
  };

  return (
    <Popover>
      <PopoverTrigger className="bg-transparent hover:bg-slate-300" asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto bg-white p-2 text-neutral-600 hover:bg-slate-100"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        {/* <Button */}
        {/*   onClick={onAddCard} */}
        {/*   className="h-auto w-full justify-start rounded-none bg-white p-2 px-5 text-sm font-normal hover:bg-slate-100" */}
        {/*   variant="ghost" */}
        {/* > */}
        {/*   Add Card... */}
        {/* </Button> */}
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data[0].id} />
          <input hidden name="boardId" id="boardId" value={data[0].board_id} />
          <FormSubmit
            className="h-auto w-full justify-start rounded-none bg-white p-2 px-5 text-sm font-normal text-black hover:bg-slate-100"
            variant="ghost"
          >
            Copy List..
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data[0].id} />
          <input hidden name="boardId" id="boardId" value={data[0].board_id} />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none bg-white p-2 px-5 text-sm font-normal text-black hover:bg-slate-100"
          >
            Delete list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
