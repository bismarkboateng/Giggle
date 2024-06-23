"use server"

import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.models"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type updateProfileParams = {
    file: string;
    username: string;
    bio: string;
}

export const setUserId = async (id: string) => {
    await cookies().set("userId", id)
}

export const deleteUserId = async () => {
    await cookies().delete("userId")
}

export const getUserId = async () => {
    const cookie = await cookies().get("userId")
    if (cookie) return cookie.value
}

export const checkUser = async (email: string) => {
    try {
        await connectToDatabase()

        const user = await User.findOne({ email })

        if (user) {
            return JSON.stringify({
                isUserExist: true, 
                currentUser: user
            })
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
        return JSON.stringify(createdUser)
    } catch (error) {
        throw error
    }
}

export const getUserById = async () => {
    const currentUserId = await getUserId()

    try {
        await connectToDatabase()
        const user = await User.findById(currentUserId)
        return JSON.stringify(user)
    } catch (error) {
        throw error
    }
}

export const updateUser = async (data: { username: string}) => {
    const currentUserId = await getUserId()

    try {
        await connectToDatabase()
        const updatedUser = await User.findByIdAndUpdate(currentUserId, data, { new: true })
        redirect("/user/profile")
    } catch (error) {
        throw error
    }
}

export const updateUserProfile = async (url: string) => {
    const currentUserId = await getUserId()

    try {
        await connectToDatabase()

        const currentUser = await User.findById(currentUserId)
        if (!currentUser) {
            throw new Error("User not found!")
        }

        currentUser.image = url
        await currentUser.save()
        revalidatePath("user/profile")
        return JSON.stringify(currentUser)
    } catch (error) {
        throw error
    }
}

export const updateProfile = async ({
    file, username, bio
}: updateProfileParams) => {
    const currentUserId = await getUserId()

    try {
        await connectToDatabase()
        const currentUser = await User.findById(currentUserId)
        if (!currentUser) {
            throw new Error("User not found!")
        }

        currentUser.username = username,
        currentUser.bio = bio
        currentUser.image = file
        currentUser.onboardered = true
        await currentUser.save()

        redirect("/memes/feed")
    } catch (error: any) {
        throw error
    }
}

export const removeProfilePhoto = async () => {
    const currentUserId = await getUserId()

    try {
        await connectToDatabase()

        const currentUser = await User.findById(currentUserId)
        if (!currentUser) {
            throw new Error("User not found!")
        }

        currentUser.image = null
        await currentUser.save()
        revalidatePath("user/profile")
        return JSON.stringify(currentUser)
    } catch (error) {
        throw error
    }
}