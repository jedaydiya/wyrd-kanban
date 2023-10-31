import { UserButton } from "@clerk/nextjs"
import { User } from "lucide-react"
export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/" />
      <div className='text-red-300'>wyrd-kanban</div>
    </>
  )
}
