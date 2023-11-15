import Navbar from "@/components/navbar";
import { Medal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <div className="bg-background px-4 py-3">
        <Navbar />
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <p className="mt-10 mb-4 flex items-center bg-accent rounded-full p-2 shadow-sm text-white">
          <Medal className="h-6 w-6 mr-2" />
          The Best Productivity Tool Around.
        </p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Your Key to Organized & Efficient Productivity
        </h1>
        <div className="mt-4 scroll-m-20 rounded-md bg-gradient-to-r from-secondary to-primary p-4 text-4xl font-extrabold tracking-tight text-white lg:text-5xl border-2 border-primary">
          Elevate your work.
        </div>
        <div className="mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl">
          Organize your tasks visually, boost your productivity, and achieve
          your goals. Visualize your progress, take control of your projects,
          and get things done with Kanban.
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Try for free</Link>
        </Button>
      </div>
    </>
  );
}
