import Navbar from "@/components/navbar";
import { Medal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import background from "../public/background.svg";
export default function Home() {
  return (
    <>
      <Image
        alt="background"
        src={background}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="sticky z-20 bg-background">
        <Navbar />
      </div>
      <div className="margin-auto absolute inset-0 z-10 flex flex-col items-center justify-center">
        <p className="mb-4 mt-10 flex items-center rounded-full bg-accent p-2 text-white shadow-sm">
          <Medal className="mr-2 h-6 w-6" />
          The Best Productivity Tool Around.
        </p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Your Key to Organized & Efficient Productivity
        </h1>
        <div className="mt-4 scroll-m-20 rounded-md border-2 border-primary bg-gradient-to-r from-secondary to-primary p-4 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
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
