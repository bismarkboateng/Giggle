"use server"

import { connectToDatabase } from "@/lib/database"
import Comment from "@/lib/database/models/comment.models";
import Meme from "@/lib/database/models/meme.models";
import User from "@/lib/database/models/user.models";

const populateMeme = (query: any) => {
    return query
      .populate({ path: "authorId", model: User, select: "_id username" })
      .populate({ path: "commentId", model: Comment, select: "_id content"})
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
        const allMemes = await populateMeme(Meme.find({}))
        return JSON.stringify(allMemes)
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

export const unLikePost = async (memeId: string) => {
    try {
        await connectToDatabase()
        const meme = await Meme.findById(memeId)

        if (meme) {
            if (meme.likes <= 0) return
            meme.likes -= 1
            await meme.save()
        }
    } catch (error) {
        throw error
    }
}

export const upvote = async (memeId: string) => {
    try {
        await connectToDatabase()
        const meme = await Meme.findById(memeId)
        if (meme) {
            meme.upvotes += 1
            await meme.save()
        }
    } catch (error) {
        throw error
    }
}

export const downvote = async (memeId: string) => {
    try {
        await connectToDatabase()
        const meme = await Meme.findById(memeId)
        if (meme) {
            meme.downvotes += 1
            await meme.save()
        }
    } catch (error) {
        throw error
    }
}