import UserModel from "@/models/User"
import { connectToDataBase } from "./dataBase"
import mongoose from "mongoose"
import { verifyToken } from "./token"

connectToDataBase()
export const authUser = async (id: mongoose.Types.ObjectId) => {
    try {

        const user = await UserModel.findOne({ _id: id })

        if (!user) return null

        return user

    } catch {
        return null
    }
}

export const authUserWithToken = async (token: string | undefined | null) => {

    if (!token) return null

    try {
        const payload = verifyToken(token)
        if (!payload) return null

        const user = await UserModel.findOne({ _id: payload._id })

        if (!user) return null

        return user

    } catch {
        return null
    }
}