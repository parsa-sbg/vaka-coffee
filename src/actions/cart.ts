"use server"

import { connectToDataBase } from "@/models"
import { CartItemInterface, CartModel } from "@/models/Cart"
import { authUserWithToken } from "@/utils/server/auth"
import { cookies } from "next/headers"

export const getUserIntialCart = async () => {
    let userIntialCart: CartItemInterface[] | null = null

    const token = (await cookies()).get('token')?.value
    const user = await authUserWithToken(token)
    if (user) {
        connectToDataBase()
        const targetCart = await CartModel.findOne({ user: user._id }).populate('user').populate('cart.product')
        if (targetCart) {
            userIntialCart = targetCart.cart
        } else {
            userIntialCart = []
        }
    }

    return JSON.parse(JSON.stringify(userIntialCart))
}