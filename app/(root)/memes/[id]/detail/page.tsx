"use client"

import { addComment, getAllComment } from "@/actions/comment.actions";
import { downvote, getMeme, likePost, unLikePost, upvote } from "@/actions/meme.actions";
import {Card, CardBody, Divider, Input} from "@nextui-org/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { TfiComment } from "react-icons/tfi";

interface Comment {
  _id: string;
  content: string;
  memeId: string;
  commentorId: {
    username: string;
  };
  date: string;
}
type MemeDetailProps = {
  params: { 
    id: string;
  }
}
export default function MemeDetail({ params }: MemeDetailProps) {
  const memeId = params.id
  const [memeDetails, setMemeDetails] = useState<MemeDetail | null>(null)
  const [comments, setComments] = useState<Comment[] | null>(null)
  const [isLiked, setIsLiked] = useState<boolean | null>(null)
  const [liked, setLiked] = useState("")
  const [isUpvote, setIsUpvote] = useState("")
  const [value, setValue] = useState("")

  useEffect(() => {
    const fetchMemeDetails = async () => {
      const details = await getMeme(memeId)
      const parsedMeme: MemeDetail = JSON.parse(details)
      setMemeDetails(parsedMeme)
    }

    fetchMemeDetails()
  }, [memeId, liked, isLiked, isUpvote])

  useEffect(() => {
    const fetchAllComments = async () => {
      const allComments = await getAllComment(memeId)
      const parsedComments: Comment[] = JSON.parse(allComments)
      setComments(parsedComments)
    }

    fetchAllComments()
  }, [memeId, value])


  const handleAddComment = async (formData: FormData, memeId: string) => {
    const info = formData.get("comment")
    await addComment(memeId, formData)
    setValue(JSON.stringify(info))
  }

  const toggleLike = () => {
    setLiked("liked")
  }

  const toggleUnLike = () => {
    setLiked("not-liked")
  }


  useEffect(() => {
    const toggleLikeAndUnLike = async () => {
      if (liked === "liked") {
        await likePost(memeId)
        setIsLiked(true)
      } else if (liked === "not-liked") {
        await unLikePost(memeId)
        setIsLiked(false)
      }
    }
    toggleLikeAndUnLike()
  }, [liked, memeId])

  const handleUpvote = async () => {
    await upvote(memeId)
    setIsUpvote("upvote")
  }

  const handleDownvote = async () => {
    await downvote(memeId)
    setIsUpvote("not-upvote")
  }

  return (
    <section className="px-5 mt-10 bg-black flex items-start gap-10">
     <div>
      <Card>
        <CardBody className="flex flex-col gap-3 overflow-hidden">
         <div className="h-[300px] w-[300px] p-2">
          <Image
           src={memeDetails?.file!}
           fill
           alt="meme detail"
           className="w-full h-full transform transition-transform duration-300 ease-in-out hover:scale-105
           object-center rounded-lg cursor-pointer"
          />
         </div>
        </CardBody>
      </Card>

      <div>
       <div className="flex flex-row items-center justify-evenly
       gap-4 bg-[#27272A] p-2 w-full rounded-lg mt-4">
       <div className="flex items-center gap-1">
        <TfiComment fontSize={19} className="text-red-500" />
        <p>{" "}{comments?.length}</p>
       </div>
       <div className="flex items-center gap-1">
        {liked === "liked"
         ? <FaHeart onClick={toggleUnLike} fontSize={19} className="text-red-500 cursor-pointer" />
         : <CiHeart onClick={toggleLike} fontSize={23} className="text-red-500 cursor-pointer" />
        }
        <p>{memeDetails?.likes}</p>
       </div>
       <div className="flex items-center gap-1">
        <BiUpvote onClick={handleUpvote} fontSize={23} className="text-red-500 cursor-pointer" />
        <p>{memeDetails?.upvotes}</p>
        {" "}
        <BiDownvote onClick={handleDownvote} fontSize={23} className="text-red-500 cursor-pointer" />
        <p>{memeDetails?.downvotes}</p>
       </div>
       </div>

       <div className="italic text-gray-400 my-2">
        by {memeDetails?.authorId?.username}
       </div>
      </div>
     </div>

     <div>
      <form action={(formData) => handleAddComment(formData, memeDetails?._id!)}>
       <Input className="mt-2" name="comment" type="text" placeholder="Add a comment" />
       <button type="submit" hidden></button>
      </form>

      <section className="mt-3">
       {comments && comments.map((comment: Comment) => (
        <Fragment key={comment._id}>
         <div className="flex flex-row gap-2 p-2 justify-between items-center" key={comment._id}>
          <li className="list-none text-sm text-gray-500 font-bold">{comment.content}</li>
          <li className="list-none text-sm italic text-gray-500">{comment.commentorId.username}</li>
         </div>
         <Divider />
        </Fragment>
       ))}
      </section>
     </div>
    </section>
  )
}