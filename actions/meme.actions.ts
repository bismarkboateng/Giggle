"use server"

import { connectToDatabase } from "@/lib/database"
import Meme from "@/lib/database/models/meme.models";

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
        const memesByUser = await Meme.find({ authorId })
        return JSON.stringify({ memesByUser })
    } catch (error) {
        throw error
    }
}

export const likePost = async (memeId: string) => {
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