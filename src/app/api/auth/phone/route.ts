import { connectToDataBase, OtpModel, UserModel } from "@/models"
import { authUserWithToken } from "@/utils/server/auth"
import { cahngePhoneSchema } from "@/validation/auth"
import { NextRequest } from "next/server"

export const PUT = async (req: NextRequest) => {
    const reqBody = await req.json()

    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "user not found" }, { status: 404 })

    const parsedData = cahngePhoneSchema.safeParse({ newPhone: reqBody.newPhone, otpCode: reqBody.otpCode })

    if (!parsedData.success) {
        return Response.json(parsedData)
    }


    try {
        connectToDataBase()

        // check phone duplicated
        const isPhoneDuplicated = await UserModel.exists({ phone: parsedData.data.newPhone })
        if (isPhoneDuplicated) return Response.json({ message: 'این شماره تماس قبلا استفاده شده است.', target: 'phone' }, { status: 409 })


        // // check otp code
        const checkOtpResult = await OtpModel.findOne({ phone: parsedData.data.newPhone, otpCode: parsedData.data.otpCode })

        if (!checkOtpResult) {
            return Response.json({ message: 'کد یکبار مصرف صحیح نیست !' }, { status: 401 })
        }

        // check otp for expiration
        if (checkOtpResult.expiresAt.getTime() < Date.now()) return Response.json({ message: 'کد یکبار مصرف منقضی شده است !' }, { status: 401 })


        // update user phone number

        const result = await UserModel.findByIdAndUpdate(user._id, { phone: parsedData.data.newPhone })

        if (result) {
            await OtpModel.findOneAndDelete({ phone: parsedData.data.newPhone, otpCode: parsedData.data.otpCode })
            return Response.json({ message: 'user phone updated successfulyy' }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }


    } catch {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}