import BoardList from "@/components/board-list";
import Navigation from "@/components/navigation";
import { Separator } from "@/components/ui/separator";
export default function Home() {
  return (
    <>
      <div className="px-4 py-3">
        <Navigation />
        <div className="mx-auto mt-20 max-w-7xl text-white">
          <p className="text-xl">Your Boards</p>
        </div>
        <Separator className="mx-auto my-2 max-w-7xl" />
        <BoardList />
      </div>
    </>
  );
}
