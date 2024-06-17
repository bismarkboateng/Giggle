import { getAllMemes } from "@/actions/meme.actions"
import { Card, CardBody } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { FaRegCommentDots } from "react-icons/fa"

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
      <Card key={meme._id}>
      <CardBody className="flex flex-col gap-3">
        <div >
         <div className="">
           {meme.file && (
           <Link href={`/memes/${meme._id}/detail`}>
            <Image
              src={meme.file}
              width={350}
              height={150}
              alt="meme"
              className="rounded-lg"
            />
           </Link>
           )}
         </div>
         <div className="flex flex-row items-center gap-4 bg-[#27272A] p-2 w-fit rounded-lg mt-2">
           <div className="flex items-center gap-1">
            {/* <FaRegCommentDots onClick={handleComment} fontSize={23} className="text-white" /> */}
            <p>10k</p>
           </div>
           <div className="flex items-center gap-1">
            {/* {isLiked ? <FaHeart onClick={() => removeLike} fontSize={23} className="text-red-500" />
            : <CiHeart onClick={() => addLike} fontSize={23} className="text-white" />
            } */}
            {/* {liked === "liked"
            ? <FaHeart onClick={() => removeLike} fontSize={23} className="text-red-500" />
            : liked === "not-liked" && <CiHeart onClick={() => addLike(meme._id)} fontSize={23} className="text-white" />
            } */}
            <p>{meme.likes}</p>
           </div>
          </div>
        </div>
      </CardBody>
      </Card> 
    ))}
    </section>
  )
}
