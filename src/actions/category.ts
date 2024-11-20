"use server"

import { categoryModel, connectToDataBase } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import mongoose from "mongoose";
import { cookies } from "next/headers";


export const showCatInHomePage = async (catId: mongoose.Types.ObjectId) => {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    const user = await authUserWithToken(token)
    if (!user) return { success: false }
    if (user.role == "USER") return { success: false }
    await connectToDataBase()

    const result = await categoryModel.findByIdAndUpdate(catId, { showInHomePage: true })

    if (result) {
        return { success: true }
    } else {
        return { success: false }
    }
}

export const hideCatFromHomePage = async (catId: mongoose.Types.ObjectId) => {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value
    const user = await authUserWithToken(token)
    if (!user) return { success: false }
    if (user.role == "USER") return { success: false }
    await connectToDataBase()

    const result = await categoryModel.findByIdAndUpdate(catId, { showInHomePage: false })

    if (result) {
        return { success: true }
    } else {
        return { success: false }
    }
}