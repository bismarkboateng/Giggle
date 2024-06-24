"use client"

import { sidebarLinks } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function LeftSidebar() {
  const pathname = usePathname()

  return (
    <section className="w-[15%] h-screen bg-black text-white border-r border-gray-500
    px-6">
     <section className="mt-5 flex flex-col gap-10">
      {sidebarLinks.map((item) => {

        const isActive = pathname === item.route

        return(
        <div key={item.label}>
         <Link href={item.route}
          className={`${isActive && "bg-[#D93900] px-1 py-2 rounded-md shadow-sm" }
          flex items-center gap-4`}>
            
          <Image
           src={item.imgURL}
           alt="controller"
           width={25}
           height={25}
          />
          <p>{item.label}</p>
         </Link>
        </div>
        )
      })}
     </section>
    </section>
  )
}
