import { authUserWithToken } from "@/utils/server/auth";
import { NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import { z } from "zod";
import { passwordSchema } from "@/validation/auth";
import { UserModel } from "@/models";


export const PUT = async (req: NextRequest) => {
    const reqBody = await req.json()

    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "user not found" }, { status: 404 })

    const validator = z.object({
        oldPassword: passwordSchema,
        newPassword: passwordSchema,
    })


    const parsedData = validator.safeParse(reqBody)
    if (!parsedData.success) {
        return Response.json(parsedData)
    }

    // Password verification
    const isOldPasswordTrue = await bcrypt.compare(parsedData.data.oldPassword, user.password)
    if (!isOldPasswordTrue) return Response.json({ message: 'invalid password' }, { status: 401 })

    try {
        // hash new password
        const hashedPassword = await bcrypt.hash(parsedData.data.newPassword, 10)

        const result = await UserModel.findByIdAndUpdate(user._id, {
            password: hashedPassword
        })

        if (result) {
            return Response.json({ message: 'password updated successfully' }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }
    } catch (err) {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }


}