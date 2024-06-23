import { type ClassValue, clsx } from "clsx"
import {ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { v4 } from "uuid"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateStats = (memes: Meme[]) => {
  let accum_likes = 0
  let accum_upvotes = 0
  let accum_downvotes = 0

  memes.map(meme => {
    if (meme && meme.likes && meme.upvotes && meme.downvotes) {
      accum_likes += meme?.likes
      accum_upvotes += meme?.upvotes
      accum_downvotes += meme?.downvotes
    }
  })

  return { accum_likes, accum_upvotes, accum_downvotes }
}

export const uploadFileToFirebase = async (type: string, fileToUpload: any) => {
  let uploadedUrl = ""
  
  try {

    let fileRef
    
    if (type === "memes") {
      fileRef = ref(storage, `memes/${fileToUpload.name + v4()}`);
    } else if (type === "profile") {
      fileRef = ref(storage, `profile/${fileToUpload.name + v4()}`);
    } 

    const snapshot = await uploadBytes(fileRef!, fileToUpload);

    uploadedUrl = await getDownloadURL(snapshot.ref);

  } catch (error: any) {
    throw new Error(`Error uploading file to firebase: ${error.message}`)
  }

  return uploadedUrl
}