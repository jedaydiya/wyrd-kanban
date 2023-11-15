import { Toaster } from "sonner";
import { Box } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <Toaster richColors />
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Box size={48} className="text-white mr-2" />
        <p className="text-white text-xl">
          wyrd-kanban
        </p>
        <div className="ml-auto flex items-center gap-4">
          <Button size="sm" className="font-normal" asChild>
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
          <Button size="sm" variant="secondary" className="font-normal text-white" asChild>
            <Link href="/sign-up">Sign Up for Free</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
