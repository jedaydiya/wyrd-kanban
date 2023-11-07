import { UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { PlusSquare } from "lucide-react"
export default function Navbar() {
  return (
    <>

      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <p className="text-white text-xl"><span className="text-4xl">📝</span>wyrd-kanban</p>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="secondary"> <PlusSquare className="mr-2" /> Add Board</Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  )
}
