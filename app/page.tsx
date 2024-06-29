import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center bg-black">
     <div className="w-[95%] md:w-[30%] md:h-[30%] flex flex-col items-center border rounded-md p-4 mt-10">
      <h1>Welcome to giggle</h1>
      <Button className="mt-3 bg-[#D93900] rounded-md p-1">
       <Link href="/accounts/sign-in">
        Continue
       </Link>
      </Button>
     </div>
    </section>
  )
}
