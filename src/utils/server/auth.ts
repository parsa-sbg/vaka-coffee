import UserModel from "@/models/User"
import { connectToDataBase } from "./dataBase"
import mongoose from "mongoose"

connectToDataBase()
export const authUser = async (id: mongoose.Types.ObjectId) => {
    try {

        const user = await UserModel.findOne({ _id: id })

        if (!user) return false

        return user

    } catch {
        return false
    }
}