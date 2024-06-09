import { type ClassValue, clsx } from "clsx"
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