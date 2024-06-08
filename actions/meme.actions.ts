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