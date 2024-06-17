"use server"

import { connectToDatabase } from "@/lib/database"
import Meme from "@/lib/database/models/meme.models";
import User from "@/lib/database/models/user.models";

const populateMeme = (query: any) => {
    return query
      .populate({ path: "authorId", model: User, select: "_id username" })
  }
export const postMeme = async (meme: { file: string; tag: string, authorId: string }) => {
    try {
        await connectToDatabase()
        const newMeme = await Meme.create({ ...meme })

        return JSON.stringify({ newMeme })
    } catch (error) {
        throw error
    }
}

export const getUserPost = async (authorId: string) => {
    try {
        await connectToDatabase()
        const memesByUser = await Meme.find({ authorId: authorId })
        return JSON.stringify(memesByUser)
    } catch (error) {
        throw error
    }
}

export const getMeme = async (id: string) => {
    try {
        await connectToDatabase()
        const meme = await populateMeme(Meme.findById(id))
        return JSON.stringify(meme)
    } catch (error) {
        throw error
    }
}

export const getAllMemes = async () => {
    try {
        await connectToDatabase()
        const allMemes = await Meme.find({})
        return JSON.stringify(allMemes)
    } catch (error) {
        throw error
    }
}


export const likePost = async (memeId: string) => {
    console.log(memeId)
    try {
        await connectToDatabase()

        const meme = await Meme.findById(memeId)
       
        if (meme) {
            meme.likes += 1
            await meme.save()
        }

        
    } catch (error) {
        throw error
    }
}

export const removeLikeFromPost = async (memeId: string) => {
    try {
        await connectToDatabase()
        const meme = await Meme.findById(memeId)

        if (meme) {
            meme.likes -= 1
            await meme.save()
        }
    } catch (error) {
        throw error
    }
}