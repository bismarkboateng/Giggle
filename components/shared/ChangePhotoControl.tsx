"use client"

import { IoCameraOutline } from "react-icons/io5";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";
import { removeProfilePhoto, updateUserProfile } from "@/actions/user.actions";
import { revalidatePath } from "next/cache";

export default function ChangePhotoControl() {
  const [clicked, setClicked] = useState(false)
  const [option, setOption] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [contextPosition, setContextPosition] = useState({
    x: 0,
    y: 0,
  })

  const handleClick = (event: MouseEvent<SVGElement>) => {
    setClicked(prev => !prev)
    setContextPosition(prevState => ({...prevState, x: event.clientX, y: event.clientY }))
  }

  const changeProfile = () => {
    setOption("change")
    setClicked(false)
  }

  const removeProfile = async () => {
    await removeProfilePhoto()
    // revalidatePath("user/profile")
    setClicked(false)
  }


  useEffect(() => {
    if (option === "change") {
        fileInputRef.current?.click()
    }

    setOption("")
  }, [option])

  const handleUpdateUserProfile = async (url: string) => {
    await updateUserProfile(url)
    
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const profileRef = ref(storage, `profile/${file.name + v4()}`)

    uploadBytes(profileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            handleUpdateUserProfile(url)
        })
    })
  }

  return (
    <section className="relative">
     <IoCameraOutline
      fontSize={23}
      className="text-gray-400 cursor-pointer"
      onClick={handleClick}
     />
     <div>
      {clicked && (
       <div style={{ display: "absolute", zIndex: "10", left: contextPosition.x, top: contextPosition.y }}
        className="rounded-md px-4 py-2 flex flex-col gap-2 ml-3 border border-gray-500 shadow-sm">
        <div onClick={changeProfile}
         className="text-gray-500 text-sm cursor-pointer hover:text-white transition-all duration-500">
          Change Profile Photo
        </div>
        <div onClick={removeProfile}
         className="text-gray-500 text-sm cursor-pointer hover:text-white">
          Remove Profile Photo
        </div>
      </div>
     )}
     </div>
     <div>
      <input
       type="file"
       accept="image/"
       ref={fileInputRef}
       style={{ display: "none" }}
       onChange={handleFileChange}
      />
     </div>
    </section>
  )
}
