import Sidebar from "./Sidebar";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import User from "./User";
import Link from "next/link";
import { getUserById } from "@/actions/user.actions";
import { Button } from "@nextui-org/button";
import Image from "next/image";


export default async function NavbarComponent() {
  const currentUser = await getUserById()
  const parsedUser = JSON.parse(currentUser)

  return (
    <nav className="bg-black sticky top-0 left-0 z-50 w-full border-b pb-2 px-4 pt-4
    lg:pb-2">
     <section className="flex flex-row items-cneter justify-between">
     
     <div className="flex gap-2">
      <Sidebar />
      <div className="italic text-gray-500 text-xl">
       <Link href="/memes/feed" className="flex items-center gap-2">
        <Image
         src="/assets/favicon.ico"
         alt="logo"
         width={50}
         height={50}
         className="rounded-full"
        />
        <span className="text-white text-base">Giggle</span>
       </Link>
      </div>
     </div>

     <div className="flex items-center gap-3 text-[#DBE4E9]">
      <CiSearch className="lg:hidden" fontSize={25} />
      <Link href="/memes/create">
       <GoPlus className="lg:hidden" fontSize={25} />
      </Link>
      <User />
     </div>

     <Button className="py-[0.5px]" radius="full">
      @{parsedUser.username} 
     </Button>
     </section>
    </nav>
  )
}
