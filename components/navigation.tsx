import { UserButton } from "@clerk/nextjs";
import { Box } from "lucide-react";
import { Button } from "./ui/button";
import CreateBoardDialog from "./CreateBoardDialog";
export default function Navigation() {
  return (
    <>
      <div className="justify between mx-auto flex max-w-7xl items-center">
        <Box size={48} className="mr-2 text-white" />
        <p className="text-xl text-white">wyrd-kanban</p>
        <div className="ml-auto flex items-center gap-4 ">
          <CreateBoardDialog />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
}
