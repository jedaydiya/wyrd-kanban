import { UserButton } from "@clerk/nextjs";
import { Box } from "lucide-react";
import { Toaster } from "sonner";
export default function Navigation() {
  return (
    <>
      <Toaster expand={true} richColors />
      <div className="justify between mx-auto flex max-w-7xl items-center">
        <Box size={48} className="mr-2 text-white" />
        <p className="text-xl text-white">wyrd-kanban</p>
        <div className="ml-auto flex items-center gap-4 ">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
}
