import { Box } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="mx-auto border-b border-dotted border-slate-200 py-2 ">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Box size={48} className="mr-2 text-white" />
          <p className="text-xl text-white">wyrd-kanban</p>
          <div className="ml-auto flex items-center gap-4">
            <Button size="sm" className="font-normal" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="font-normal text-white"
              asChild
            >
              <Link href="/sign-up">Sign Up for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
