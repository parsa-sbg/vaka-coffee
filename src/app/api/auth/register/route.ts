import UserModel from "@/models/User"
import { connectToDataBase } from "@/utils/dataBase"
import { generateToken } from "@/utils/token"
import { userRegisterSchema } from "@/validation/auth"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import bcrypt from 'bcryptjs'
import { OtpModel } from "@/models/Otp"

export const POST = async (req: NextRequest) => {

    const reqBody: {
        name: string;
        username: string;
        phone: string;
        password: string;
        repeatPassword: string;
        otp: string
    } = await req.json()

    const parsedData = userRegisterSchema.safeParse(reqBody)

    if (!parsedData.success) {
        return Response.json(parsedData, {
            status: 400
        })
    }

    connectToDataBase()

    // // check otp code
    const checkOtpResult = await OtpModel.findOne({ phone: parsedData.data.phone, otpCode: parsedData.data.otp })
    if (!checkOtpResult) {
        return Response.json({ message: 'کد یکبار مصرف صحیح نیست !' }, { status: 401 })
    }
    // check otp for expiration
    if (checkOtpResult.expiresAt.getTime() < Date.now()) return Response.json({ message: 'کد یکبار مصرف منقضی شده است !' }, { status: 401 })

    // check username duplicated
    const isUserNameDuplicated = await UserModel.exists({ username: parsedData.data.username })
    if (isUserNameDuplicated) return Response.json({ message: 'این نام کاربری قبلا انتخاب شده است.', target: 'username' }, { status: 409 })

    // check username duplicated
    const isPhoneDuplicated = await UserModel.exists({ phone: parsedData.data.phone })
    if (isPhoneDuplicated) return Response.json({ message: 'این شماره تماس قبلا استفاده شده است.', target: 'phone' }, { status: 409 })


    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)

        const newUser = await UserModel.create({
            name: parsedData.data.name,
            username: parsedData.data.username,
            password: hashedPassword,
            phone: parsedData.data.phone
        })

        if (newUser) {
            const token = generateToken(newUser._id)
            if (!token) return Response.json({ message: 'internal server error' }, { status: 500 })

            const cookieStore = await cookies()
            cookieStore.set('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            })

            await OtpModel.findOneAndDelete({ phone: parsedData.data.phone, otpCode: parsedData.data.otp })


            return Response.json({ message: 'با موفقیت ثبت نام شدید.' }, { status: 201 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }

    } catch {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}