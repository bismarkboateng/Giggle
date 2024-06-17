"use client"
import { getUserPost, likePost, removeLikeFromPost} from "@/actions/meme.actions";
import { getUserId } from "@/actions/user.actions";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { calculateStats } from "@/lib/utils";
import Link from "next/link";


export default function UserTabs() {
  const [selected, setSelected] = useState("");
  const [memes, setMemes] = useState<Meme[]>([]);
  const [liked, setLiked] = useState("not-liked")
  const [memeId, setMemeId] = useState("")
  const { accum_likes, accum_upvotes, accum_downvotes } = calculateStats(memes)
  

  useEffect(() => {
    const fetchDataBySelectValue = async () => {
        const currentUserId = await getUserId()

        switch (selected) {
            case "post":
                const userMemes = await getUserPost(currentUserId!)
                setMemes(JSON.parse(userMemes))
                break;
            case "comments":
                // fetch all comments  50 427 4816for a user
                break;
        }
    }
    fetchDataBySelectValue()
  }, [selected])


  const addLike = (memeId: string) => {
    // setIsLiked(true)
    // setLike("liked")
    console.log(memeId)
    setMemeId(memeId)
    setLiked("liked")
    console.log("liked post")
  }


  const removeLike = () => {
    // setIsLiked(false)
    // setLike("not-liked")
    setLiked("not-liked")
    console.log("unlike post")
  }

  useEffect(() => {
    const updateLike = async () => {
      if (liked === "liked") {
        await likePost(memeId)
      } else if (liked === "not-liked") {
        await removeLikeFromPost(memeId)
      }
    }
    updateLike()
  }, [liked, memeId])

  const handleComment = () => {
    setSelected("comments")
  }

  return (
    <div className="flex w-full flex-col mt-3">
     <Tabs
      aria-label="Options"         
      selectedKey={selected}
      onSelectionChange={setSelected}
     >
      <Tab key="post" title="Post">
       <Card>
        <CardBody className="flex flex-col gap-3">
         {memes && memes.map((meme) => (
           <div key={meme._id}>
            <div className="w-full">
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
            <div className="flex flex-row items-center gap-4 bg-[#27272A]
              p-2 w-fit rounded-lg mt-2">
             <div className="flex items-center gap-1">
              <FaRegCommentDots onClick={handleComment} fontSize={23} className="text-white" />
              <p>10k</p>
             </div>
             <div className="flex items-center gap-1">
              {/* {isLiked ? <FaHeart onClick={() => removeLike} fontSize={23} className="text-red-500" />
              : <CiHeart onClick={() => addLike} fontSize={23} className="text-white" />
              } */}
              {liked === "liked"
              ? <FaHeart onClick={() => removeLike} fontSize={23} className="text-red-500" />
              : liked === "not-liked" && <CiHeart onClick={() => addLike(meme._id)} fontSize={23} className="text-white" />
              }
              <p>{meme.likes}</p>
             </div>
             </div>
           </div>
        ))}
        </CardBody>
       </Card>  
      </Tab>
      <Tab key="stats" title="Stats">
       <Card>
        <CardBody>
         <div>
          <p>Accumulated likes: {accum_likes}</p>
          <p>Accumulated Upvotes: {accum_upvotes}</p>
          <p>Accumulated downvotes: {accum_downvotes}</p>
         </div>
        </CardBody>
       </Card>  
      </Tab>
      <Tab key="comments" title="Comments">
       <Card>
        <CardBody>
         all comments
        </CardBody>
       </Card>  
      </Tab>
     </Tabs>
   </div>
  )
}
