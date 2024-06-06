"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import {Button, Divider, Input, Select, SelectItem} from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { addTag, getAllTags } from "@/actions/tag.actions";


type TagType = {
  _id: string;
  name: string;
}
export default function CreateMeme() {
  const [meme, setMeme] = useState<FileList | null>(null)
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<TagType[]>([])
  const [select, setSelect] = useState("")

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeme(event.target.files);
  };

  const handleSubmitTag = async () => {
    await addTag(tag)
    setTag("")
  }

  const handlePost = () => {
    console.log(select)
    console.log(meme)
  }

  useEffect(() => {
    const fetchTags = async () => {
      const allTags = await getAllTags()

      // set the state
      const tags = JSON.parse(allTags)
      setTags(tags.allTags)
    }

    fetchTags()
  }, [tag])

  return (
    <section className="px-5 mt-5">
      <h1 className="text-[#B7CAD4] font-bold text-base">
        Create Meme
      </h1>
      <div className="mt-10 ">
        <div className="w-full border-dashed border border-[#F2F2F2] rounded-lg
        h-28 flex items-center justify-center">
          <form>
            <div className="flex items-center gap-1">
            <input type="file" className="block w-full text-sm text-slate-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
            file:bg-violet-50 file:text-[#B7CAD4]
            hover:file:bg-gray-300"
            onChange={handleFileChange}
            />
            <IoCloudUploadOutline fontSize={25} />
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 w-full">
        <h1 className="text-[#B7CAD4] font-bold text-base mb-2">Select Tag</h1>
        <section>
         <Select
          label="Add Tag"
          className="w-full"
          onChange={event => setSelect(event?.target.value)}
          value={select}
        >
          {tags.map((tag) => (
           <SelectItem key={tag.name} value={tag.name}>
            {tag.name}
           </SelectItem>
          ))}
         </Select> 
        </section>
        <div>
          <div className="flex items-center gap-2 my-5">
           <Divider className="my-1 w-[45%]" />
           <p className="text-[#B7CAD4]">Or</p>
           <Divider className="my-1 w-[45%]" />
          </div>

          <div>
            <AlertDialog>
             <AlertDialogTrigger className="flex items-center gap-2">
               <GoPlus fontSize={25} /> 
               <p>Add a new tag</p>
             </AlertDialogTrigger>
             <AlertDialogContent>
              <AlertDialogHeader>
               <AlertDialogTitle>Add a new tag</AlertDialogTitle>
               <AlertDialogDescription>
                <Input
                 type="text"
                 label="Tag"
                 onChange={(e) => setTag(e.target.value)}
                 value={tag}
                />
               </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleSubmitTag}>Add</AlertDialogAction>
              </AlertDialogFooter>
             </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <Button className="mt-7 w-full text-white py-6 font-bold bg-[#D93900]"
      onClick={handlePost}>
       Post
      </Button>
    </section>
  )
}
