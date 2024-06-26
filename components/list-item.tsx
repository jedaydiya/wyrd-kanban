"use client";
import { ListProps } from "./list-container";
import { ListHeader } from "./list-header";
interface ListItemProps {
  data: ListProps[];
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <>
      <li className="h-full w-[272px] shrink-0 select-none">
        <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
          <ListHeader data={data} />
        </div>
      </li>
    </>
  );
};
