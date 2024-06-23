"use client"

import Image from "next/image"
import { defaultProfile } from "@/lib/constants"
import { Button, Input, Textarea } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { uploadFileToFirebase } from "@/lib/utils";
import { getUserId, updateProfile } from "@/actions/user.actions";

type AccountProfileProps = {
    userData: {
        _id: string;
        username: string;
        email: string;
        rank: string;
        total_likes: string;
        total_upvotes: string;
        authId: string;
        onboardered: boolean;
        image?: string;
    }
}


export default function AccountProfile({ userData }: AccountProfileProps) {
  const [username, setUsername] = useState("")
  const [file, setFile] = useState<FileList | null>(null)
  const [bio, setBio] = useState("")


  const updateUserInfo = async (url: string) => {
    try {
      await updateProfile({
        file: url,
        username,
        bio,
      })
    } catch (error: any) {
      throw new Error(`Error updating user info: ${error.message}`)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) return null
    const profileImageToUpload = file && file[0]

    if (!profileImageToUpload) return
    const uploadedFileUrl = await uploadFileToFirebase("profile", profileImageToUpload)

    updateUserInfo(uploadedFileUrl)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files)
  }

  return (
    <section>
     <section className="flex items-center gap-2 mb-8">
       <Image
        src={userData.image || defaultProfile}
        alt="default profile image"
        width={52}
        height={52}
        className="rounded-full object-cover"
       />
       <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:text-blue-600 file:bg-black file:border-none file:outline-none
        file:cursor-pointer file:text-base text-base text-gray-200 cursor-pointer"
       />
     </section>

      <section>
       <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3">
         <div>
          <Input
           type="text"
           label="Username"
           value={username || userData.username || ""}
           onValueChange={setUsername}
          />
         </div>
         <div>
         <Textarea
          label="bio"
          className="w-full "
          value={bio}
          onValueChange={setBio}
         />
         </div>
         <Button
          type="submit"
          className="bg-[#D93900] text-white font-bold">
          Continue
         </Button>
       </form>
      </section>

    </section>
  )
}
