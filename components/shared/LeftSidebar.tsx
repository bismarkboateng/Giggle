import { sidebarLinks } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"

export default function LeftSidebar() {
  return (
    <section className="w-[15%] h-screen bg-black text-white border-r border-gray-500
    px-6">
     <section className="mt-5 flex flex-col gap-10">
      {sidebarLinks.map((item) => (
        <div key={item.label}>
         <Link href={item.route} className="flex items-center gap-4">
          <Image
           src={item.imgURL}
           alt="controller"
           width={25}
           height={25}
          />
          <p>{item.label}</p>
         </Link>
        </div>
      ))}
     </section>
    </section>
  )
}
