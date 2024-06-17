import { getAllMemes } from "@/actions/meme.actions"
import { Card, CardBody } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"


interface Meme {
  _id: string;
  file?: string;
  caption?: string;
  likes?: number;
  upvotes?: number;
  downvotes?: number;
  views?: number;
  commentId?: string;
  authorId: string;
  tag?: string;
  date?: Date;
}

export default async function Feed() {

  const allmemes = await getAllMemes()
  const memes = JSON.parse(allmemes)

  return (
    <section className="px-5 pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
    bg-black 2xl:grid-cols-4">
    {memes && memes.map((meme: Meme) => (
      <Fragment key={meme._id}>
       <Card key={meme._id}>
       <CardBody className="flex flex-col gap-3">
        <div>
         <div className="">
           {meme.file && (
            <div className="w-full h-[200px]">
             <Link href={`/memes/${meme._id}/detail`}>
              <Image
               src={meme.file}
               alt="meme"
               fill
               className="rounded-lg object-cover w-full h-full"
              />
             </Link>
            </div>
           )}
         </div>
        </div>
       </CardBody>
       </Card>
      </Fragment>
    ))}
    </section>
  )
}
