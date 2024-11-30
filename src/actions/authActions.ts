"use server"

import { OtpModel } from "@/models"
import { UserModel } from "@/models";
import { connectToDataBase } from "@/utils/server/dataBase"
import { phoneSchema } from "@/validation/auth"


export const checkIsUserNameExist = async (username: string) => {
    await connectToDataBase()
    const isExist = await UserModel.exists({ username })
    if (isExist) {
        return true
    }
    return false
}

export const checkIsPhoneExist = async (phone: string) => {
    await connectToDataBase()
    const isExist = await UserModel.exists({ phone })
    if (isExist) {
        return true
    }
    return false
}

export const sentOtpAction = async (phone: string) => {
    await connectToDataBase()

    const parsedData = phoneSchema.safeParse(phone)

    if (!parsedData.success) {
        return { success: false, message: 'شماره وارد شده صحیح نیست !' }
    }



    // delete duplicated codes
    await OtpModel.findOneAndDelete({ phone })

    try {

        // create otp code in data base
        OtpModel.findOneAndDelete({ phone })
        const otp = Math.floor(Math.random() * (10 ** 5))

        OtpModel.create({
            phone,
            otpCode: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        })


        // send otp using sms service
        const paternCode = process.env.SMS_PATERN_CODE
        if (!paternCode) {
            throw new Error('patern code is not defiend')
        }

        const userName = process.env.SMS_USER_NAME
        if (!userName) {
            throw new Error('sms userName is not defiend')
        }

        const password = process.env.SMS_PASSWORD
        if (!password) {
            throw new Error('sms password is not defiend')
        }


        // const res = await fetch('http://ippanel.com/api/select', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "op": "pattern",
        //         "user": userName,
        //         "pass": password,
        //         "fromNum": "3000505",
        //         "toNum": phone,
        //         "patternCode": paternCode,
        //         "inputData": [
        //             { "verification-code": +otp },
        //         ]
        //     })
        // })
        const res = {
            status : 200
        }

        if (res.status == 200) {
            return { success: true, message: 'کد یکبار مصرف با موفقیت ارسال شد.' }

        } else {
            return { success: false, message: 'خطای ناشناخته !' }
        }


    } catch (err) {
        console.log('sent otp error => ', err);
        return { success: false, message: 'خطای ناشناخته !' }
    }
}