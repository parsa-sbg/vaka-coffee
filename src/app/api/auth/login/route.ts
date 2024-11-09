import UserModel from "@/models/User";
import { passwordSchema, usernameSchema } from "@/validation/auth";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import { generateToken } from "@/utils/token";
import { cookies } from "next/headers";


type bodyType = {
    username: string
    password: string
}

export const POST = async (req: NextRequest) => {
    try {
        const { username, password }: bodyType = await req.json()

        // validation
        const isUserNameValid = usernameSchema.safeParse(username)
        if (!isUserNameValid.success) return Response.json(isUserNameValid.error, { status: 400 })

        const isPasswordValid = passwordSchema.safeParse(password)
        if (!isPasswordValid.success) return Response.json(isPasswordValid.error, { status: 400 })


        // check is user exist
        const user = await UserModel.findOne({ username })
        if (!user) return Response.json({ message: 'invalid password or user name' }, { status: 401 })


        // Password verification
        const isPasswordTrue = await bcrypt.compare(password, user.password)
        if (!isPasswordTrue) return Response.json({ message: 'invalid password or user name' }, { status: 401 })


        // login
        const cookieStore = await cookies()
        const token = generateToken({ _id: user._id })
        if (!token) return Response.json({ message: 'internal server error' }, { status: 500 })

        cookieStore.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        })

        return Response.json({ message: 'user logged in successfully' }, { status: 200 })
    } catch (err) {
        console.log('loggin error => ', err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}
