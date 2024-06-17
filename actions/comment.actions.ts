"use server"

import { connectToDatabase } from "@/lib/database"
import { getUserId } from "./user.actions"
import Comment from "@/lib/database/models/comment.models"
import { revalidatePath } from "next/cache"
import User from "@/lib/database/models/user.models"

const populateComment = (query: any) => {
    return query
      .populate({ path: "commentorId", model: User, select: "username"})
  }

export const addComment = async (memeId: string, formData: FormData) => {
    const comment = formData.get("comment")
    const currentUserId = await getUserId()

    // info to database
    try {
        await connectToDatabase()
        const newComment = await Comment.create({
            content: comment,
            memeId,
            commentorId: currentUserId,
        })
        if (newComment) {
            revalidatePath(`/memes/${memeId}/detail`)
        }
    } catch (error) {
        throw error
    }

}


export const getAllComment = async (memeId: string) => {
    try {
        await connectToDatabase()
        const allComments = await populateComment(Comment.find({ memeId: memeId }))
        return JSON.stringify(allComments)
    } catch (error) {
        throw error
    }
}

export const getAllCommentWithUserId = async (userId: string) => {
    try {
        await connectToDatabase()
        const userComments = await Comment.find({ commentorId: userId })
        return JSON.stringify(userComments)
    } catch (error) {
        throw error
    }
}