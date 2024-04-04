"use client";
import { Button } from "./ui/button";
import { Board } from "./board-navbar";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "./form/form-input";
import { updateBoard } from "@/server-actions/update-board-action";
import { useAction } from "next-safe-action/hook";
import { toast } from "sonner";
type Props = {
  updateBoard: typeof updateBoard;
};
interface BoardTitleProps extends Props {
  data: Board;
}
const BoardTitle = ({ data, updateBoard }: BoardTitleProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.board_name);
  const [isEditing, setIsEditing] = useState(false);

  const { execute, reset } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success("Board has been renamed to " + data);
      setTitle(data);
      reset();
      disableEditing();
    },
    onError(error) {
      toast.error("Update failed: " + error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const id = parseInt(formData.get("id") as string);
    const data = {
      id: id,
      name: formData.get("title") as string,
    };
    execute(data);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        onBlur={onBlur}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={() => {}}
          defaultValue={title}
          className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
        <input type="hidden" name="id" value={data.id} />
      </form>
    );
  }
  return (
    <>
      <Button
        onClick={enableEditing}
        variant="transparent"
        className="h-auto w-auto p-1 px-2 text-lg font-bold"
      >
        {title}
      </Button>
    </>
  );
};

export default BoardTitle;
