"use server"

import { connectToDatabase } from "@/lib/database"
import Tag from "@/lib/database/models/tag.models"

export const addTag = async (tag: string) => {
    try {
        await connectToDatabase()

        const createdTag = await Tag.create({ name: tag })
        return JSON.stringify({ createdTag })
    } catch (error) {
        throw error
    }
}

export const getAllTags = async () => {
    try {
        await connectToDatabase()
        const allTags = await Tag.find({})

        return JSON.stringify({ allTags })
    } catch (error) {
        throw error
    }
}