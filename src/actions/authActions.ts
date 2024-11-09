"use server"

import UserModel from "@/models/User"
import { connectToDataBase } from "@/utils/dataBase"

export const checkIsUserNameExist = async (username: string) => {
    connectToDataBase()
    const isExist = await UserModel.exists({ username })
    if (isExist) {
        return true
    }
    return false
}

export const checkIsPhoneExist = async (phone: string) => {
    connectToDataBase()
    const isExist = await UserModel.exists({ phone })
    if (isExist) {
        return true
    }
    return false
}