"use client";
import { Plus, X } from "lucide-react";
import { FormInput } from "./form/form-input";
import { ListWrapper } from "./list-wrapper";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useState, useRef, ElementRef } from "react";
import { useAction } from "next-safe-action/hook";
import { createList } from "@/server-actions/create-list-action";
import { FormSubmit } from "./form/form-submit";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const ListForm = () => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };
  const { execute, reset } = useAction(createList, {
    onSuccess(data) {
      setIsCreating(false);
      toast.success("List " + data.name + " has been created");
      reset();
      disableEditing();
    },
    onError(error) {
      toast.error("Update failed: " + error);
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const boardId = parseInt(formData.get("boardId") as string);
    const data = {
      title: formData.get("title") as string,
      boardId: boardId,
    };
    setIsCreating(true);
    execute(data);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="h-7 border-transparent bg-white px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list title"
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit className="bg-accent">Add List</FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
              className="hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <>
      <ListWrapper>
        <button
          onClick={enableEditing}
          className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
        >
          <Plus className="mr-2 h-4 w-4" /> Add a list
        </button>
      </ListWrapper>
    </>
  );
};
