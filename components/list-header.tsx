"use client";
import { useState, useRef, ElementRef } from "react";
import { ListProps } from "./list-container";
import { useEventListener } from "usehooks-ts";
import { FormInput } from "./form/form-input";
import { useAction } from "next-safe-action/hook";
import { updateList } from "@/server-actions/update-list-action";
import { toast } from "sonner";
import { ListOptions } from "./list-options";
interface ListHeaderProps {
  data: ListProps[];
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data?.[0]?.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

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
  const { execute, reset } = useAction(updateList, {
    onSuccess(data) {
      setTitle(data);
      toast.success("Renamed list to " + data);
      reset();
      disableEditing();
    },
    onError(error) {
      toast.error("Update failed: " + error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const id = parseInt(formData.get("id") as string);
    const boardId = parseInt(formData.get("boardId") as string);

    const data = {
      name: formData.get("title") as string,
      id: id,
      boardId: boardId,
    };

    if (title === data.name) {
      return disableEditing();
    }
    execute(data);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };
  useEventListener("keydown", onKeyDown);
  return (
    <div>
      <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
        {isEditing ? (
          <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
            <input hidden id="id" name="id" value={data[0].id} />
            <input
              hidden
              id="boardId"
              name="boardId"
              value={data[0].board_id}
            />
            <FormInput
              className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input"
              ref={inputRef}
              onBlur={onBlur}
              id="title"
              placeholder="Enter list title"
              defaultValue={title}
            />
            <button type="submit" hidden />
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
          >
            {title}
          </div>
        )}
        <ListOptions data={data} />
      </div>
    </div>
  );
};
