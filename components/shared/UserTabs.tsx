"use client"
import { getUserPost } from "@/actions/meme.actions";
import { getUserId } from "@/actions/user.actions";
import {Tabs, Tab, Card, CardBody, Divider} from "@nextui-org/react";
import { getAllCommentWithUserId } from "@/actions/comment.actions";
import { Fragment, useEffect, useState } from "react";
import { calculateStats } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import moment from "moment"



export default function UserTabs() {
  const [selected, setSelected] = useState("");
  const [memes, setMemes] = useState<Meme[]>([]);
  const [accumLikes, setAccumLikes] = useState(0)
  const [accumUpvotes, setAccumUpvotes] = useState(0)
  const [accumDownvotes, setAccumDownvotes] = useState(0)
  const [userComment, setUserComment] = useState<UserComment[] | null>(null)

  useEffect(() => {
    const fetchDataBySelectValue = async () => {
        const currentUserId = await getUserId()

        switch (selected) {
            case "post":
                const userMemes = await getUserPost(currentUserId!)
                setMemes(JSON.parse(userMemes))
                break;
            case "comments":
                const userComments = await getAllCommentWithUserId(currentUserId!)
                setUserComment(JSON.parse(userComments))
                break;
            case "stats":
              const { accum_likes, accum_upvotes, accum_downvotes } = calculateStats(memes)
              setAccumLikes(accum_likes)
              setAccumUpvotes(accum_upvotes)
              setAccumDownvotes(accum_downvotes)
              break
        }
    }
    fetchDataBySelectValue()
  }, [selected, memes])


  return (
    <div className="flex w-full flex-col mt-3">
     <Tabs
      aria-label="Options"
      selectedKey={selected}
      // onSelectionChange={setSelected}
      onSelectionChange={(key) => setSelected(key as string)}
     >
      <Tab key="post" className="flex flex-col gap-3" title="Post">
       {memes && memes.map((meme) => (
        <Fragment key={meme._id}>
         <Card>
          <CardBody className="flex flex-col gap-3">
           <div>
            <div>
             {meme.file && (
              <div className="w-full h-[200px]">
               <Link href={`/memes/${meme._id}/detail`}>
                <Image
                 src={meme.file}
                 width={350}
                 height={150}
                 alt="meme"
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
      </Tab>
      <Tab key="stats" title="Stats">
       <Card>
        <CardBody>
         <div>
          <p>Accumulated likes: {accumLikes}</p>
          <p>Accumulated Upvotes: {accumUpvotes}</p>
          <p>Accumulated downvotes: {accumDownvotes}</p>
         </div>
        </CardBody>
       </Card>  
      </Tab>
      <Tab key="comments" title="Comments">
       <Card>
        <CardBody>
         <h1>All Your Comments</h1>
         <Divider className="mt-3 mb-3" />
         <div className="grid grid-cols-1 gap-2">
          {userComment?.map(comment => (
            <div key={comment._id} className="flex flex-row items-center justify-between">
              <div>{comment.content}</div>
              <div className="text-xs italic text-gray-400">{moment(comment.date).format("YYYY-MM-DD")}</div>
            </div>
          ))}
         </div>
        </CardBody>
       </Card>  
      </Tab>
     </Tabs>
   </div>
  )
}
