"use client"

import { addComment, getAllComment } from "@/actions/comment.actions";
import { getMeme, likePost, unLikePost } from "@/actions/meme.actions";
import {Card, CardBody, Divider, Input} from "@nextui-org/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
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

  useEffect(() => {
    const fetchMemeDetails = async () => {
      const details = await getMeme(memeId)
      const parsedMeme: MemeDetail = JSON.parse(details)
      setMemeDetails(parsedMeme)
    }

    fetchMemeDetails()
  }, [memeId, liked, isLiked])

  useEffect(() => {
    const fetchAllComments = async () => {
      const allComments = await getAllComment(memeId)
      const parsedComments: Comment[] = JSON.parse(allComments)
      setComments(parsedComments)
    }

    fetchAllComments()
  }, [memeId, comments])


  const handleAddComment = async (formData: FormData, memeId: string) => {
    await addComment(memeId, formData)
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

  return (
    <section className="px-5 mt-10 bg-black">
      <Card>
        <CardBody className="flex flex-col gap-3">
         <div className="h-[300px] w-[300px] p-2">
          <Image
           src={memeDetails?.file!}
           fill
           alt="meme detail"
           className="object-cover rounded-lg"
          />
         </div>
        </CardBody>
      </Card>
      <div className="flex flex-row items-center justify-evenly gap-4 bg-[#27272A] p-2 w-full rounded-lg mt-2">
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
        <BiDownvote fontSize={23} className="text-red-500" />
        <p>22</p>
        <BiUpvote fontSize={23} className="text-red-500" />
       </div>
      </div>
      <div className="italic text-gray-400 my-2">
        By {memeDetails?.authorId?.username}
      </div>
      <form action={(formData) => handleAddComment(formData, memeDetails?._id!)}>
       <Input className="mt-2" name="comment" type="text" placeholder="Add a comment" />
       <button type="submit" hidden></button>
      </form>

      <section className="mt-3">
       {comments && comments.map((comment: Comment) => (
        <Fragment key={comment._id}>
         <div className="flex flex-row gap-2 p-2 justify-between items-center" key={comment._id}>
          <li className="list-none text-lg">{comment.content}</li>
          <li className="list-none text-lg">{comment.commentorId.username}</li>
         </div>
         <Divider />
        </Fragment>
       ))}
      </section>
    </section>
  )
}