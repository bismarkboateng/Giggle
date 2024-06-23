"use client"

import { Avatar, Divider } from "@nextui-org/react";
import { FiLogOut } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { Sheet, SheetContent, SheetDescription,
    SheetHeader, SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"
import { deleteUserId } from "@/actions/user.actions";
import { useRouter } from "next/navigation";



export default function User() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      await deleteUserId()
      router.push("/accounts/sign-in")
    } catch (error) {
      alert("Something went wrong. please try again")
    }
  }

  return (
    <section>
      <Sheet>
       <SheetTrigger>
        <Avatar className="w-6 h-6 text-tiny lg:hidden" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
       </SheetTrigger>
       <SheetContent side="bottom">
        <SheetHeader>
         <SheetDescription className="mt-5 flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="w-6 h-6 text-tiny" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
            <Link href="/user/profile" className="flex flex-col items-start">
              <p>View Profile</p>
              <div>Meme God</div>
            </Link>
          </div>
          <Divider className="my-1" />
          <div className="flex gap-2 items-center" onClick={handleLogout}>
            <FiLogOut fontSize={25} />
            <span>Logout</span>
          </div>
          <Divider className="my-1" />
          <div className="flex gap-2 items-center">
            <CiSettings fontSize={25} />
            <span>
             <Link href="/user/settings">Settings</Link>
            </span>
          </div>
         </SheetDescription>
        </SheetHeader>
       </SheetContent>
      </Sheet>
    </section>
  )
}