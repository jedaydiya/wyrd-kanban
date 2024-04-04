"use client";
import { useEffect, useState } from "react";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
export interface ListProps {
  id: number;
  title: string;
  order: number;
  description?: string | null;
  board_id: number;
  createdAt: Date;
  updatedAt: Date;
}
interface ListContainerProps {
  data: ListProps[];
  boardId: number;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
    console.log("Gumana ang useEffect");
  }, [data]);
  return (
    <>
      <ol className="flex h-full gap-x-3 px-6 py-2">
        {orderedData?.map((list, index) => {
          return <ListItem key={list.id} index={index} data={[list]} />;
        })}
        <ListForm />
        <div className="w-1 flex-shrink-0" />
      </ol>
    </>
  );
};
