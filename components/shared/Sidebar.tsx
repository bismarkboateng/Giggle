"use client"

import { Sheet, SheetContent, SheetDescription,
    SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { MdOutlineMenu } from "react-icons/md";
import LeftSidebar from "./LeftSidebar";

import { sidebarLinks } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"
import { deleteUserId } from "@/actions/user.actions"




export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await signOut(auth)
      await deleteUserId()
      router.push("/accounts/sign-in")
    } catch (error) {
      throw error
    }
  }


  return (
    <section className="">
      <Sheet>
       <SheetTrigger>
        <MdOutlineMenu className="md:hidden lg:hidden" fontSize={25} />
       </SheetTrigger>
       <SheetContent side="left">
        <SheetHeader>
         <SheetDescription>
         <section className="mt-5 px-10 flex flex-col gap-10">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route

            return(
            <div key={item.label}>
            <Link href={item.route}
              className={`${isActive && "bg-[#D93900] text-white px-1 py-2 rounded-md shadow-sm" }
              flex items-center gap-4`}>
                
              <Image
              src={item.imgURL}
              alt="controller"
              width={25}
              height={25}
              />
              <p className="md:hidden lg:block">{item.label}</p>
            </Link>
            </div>
            )
          })}
          <div className="flex flex-row items-center gap-4 cursor-pointer mt-5"
          onClick={handleLogout}
          >
          <Image
            src="/assets/logout.svg"
            alt="logout"
            width={25}
            height={25}
          />
          <p className="md:hidden lg:block">Logout</p>
          </div>
        </section>
         </SheetDescription>
        </SheetHeader>
       </SheetContent>
      </Sheet>
    </section>
  )
}
