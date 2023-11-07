import { UserButton } from "@clerk/nextjs";
import CreateBoardDialog from "./CreateBoardDialog";
export default function Navbar() {
  return (
    <>
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <p className="text-white text-xl">
          <span className="text-4xl">📝</span>wyrd-kanban
        </p>
        <div className="ml-auto flex items-center gap-4">
          <CreateBoardDialog />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
}
