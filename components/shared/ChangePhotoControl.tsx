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
//   const [newImage, setNewImage] = useState<File | null>(null)
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
    const profileRef = ref(storage, `profiles/${file.name + v4()}`)

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
      className="text-gray-400"
      onClick={handleClick}
     />
     <div>
      {clicked && (
       <div style={{ display: "absolute", left: contextPosition.x, top: contextPosition.y }}
        className="bg-gray-900 rounded-md px-2 py-4 flex flex-col gap-2 ml-3">
        <div onClick={changeProfile}>Change Profile Photo</div>
        <div onClick={removeProfile}>Remove Profile Photo</div>
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
