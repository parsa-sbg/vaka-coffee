import { OtpModel } from "@/models/Otp";
import UserModel from "@/models/User";
import { connectToDataBase } from "@/utils/dataBase";
import { generateToken } from "@/utils/token";
import { userLoginWithOtpSchema } from "@/validation/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type reqBodyType = {
    phone: string
    otpCode: string
}

export const POST = async (req: NextRequest) => {
    const reqBody: reqBodyType = await req.json()


    const parsedData = userLoginWithOtpSchema.safeParse({ otp: reqBody.otpCode, phone: reqBody.phone })

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


    try {
        const user = await UserModel.findOne({ phone: reqBody.phone })

        if (!user) return Response.json({ message: 'کاربر پیدا نشد !' }, { status: 404 })

        const token = generateToken({ _id: user._id })
        if (!token) return Response.json({ message: 'internal server error' }, { status: 500 })

        // set cookie
        const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        await OtpModel.findOneAndDelete({ phone: parsedData.data.phone, otpCode: parsedData.data.otp })

        return Response.json({ message: 'با موفقیت ثبت وارد.' }, { status: 200 })

    } catch (err) {
        console.log("error in login with otp code =>", err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}