import { memesByUser } from "@/actions/meme.actions"

export default async function RightSidebar() {
  const counts = await memesByUser()

  return (
    <section className="hidden md:flex md:w-[20%] lg:w-[20%] bg-black text-white border-l border-gray-500
    px-6">
    <div>
     <h1 className="font-bold text-xl mt-5">Activities</h1>
     <section>
      <p className="text-xs mt-2">
        You&apos;ve <span className="text-blue-500">published</span> {counts.memesCount || 0} memes so far
      </p>
      <p className="text-xs mt-2">
        You&apos;ve <span className="text-blue-500">posted</span> {counts.commentsCount || 0} comment(s)
      </p>
     </section>
    </div>
    </section>
  )
}
