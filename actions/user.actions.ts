"use server"

import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.models"
import { cookies } from "next/headers"


export const setUserId = (id: string) => {
    cookies().set("authId", JSON.stringify({ id }))
}

export const deleteUserId = () => {
    cookies().delete("authId")
}

export const checkUser = async (email: string) => {
    try {
        await connectToDatabase()

        const user = await User.findOne({ email })

        if (user) {
            return JSON.stringify({ isUserExist: true })
        }

        return JSON.stringify({ isUserExist: false })
    } catch (error) {
        throw error
    }
}

export const createUser = async (user: CreatUserParams) => {
    try {
        await connectToDatabase()
        
        const createdUser = await User.create(user)
        return JSON.stringify({ createdUser })
    } catch (error) {
        throw error
    }
}

