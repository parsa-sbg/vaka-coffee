import { UserModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { usernameSchema } from "@/validation/auth";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const reqBody = await req.json()

    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "user not found" }, { status: 404 })


    const parsedData = usernameSchema.safeParse(reqBody)

    if (!parsedData.success) {
        return Response.json(parsedData)
    }

    try {

        // check user name duplication
        const isUserNameAlreadyExist = await UserModel.findOne({ username: parsedData.data })
        if (isUserNameAlreadyExist) {
            return Response.json({ message: 'این نام کاربری قبلا انتخاب شده است.', target: 'phone' }, { status: 409 })
        }

        const result = await UserModel.findByIdAndUpdate(user._id, { username: parsedData.data })
        if (result) {
            return Response.json({ message: 'username updated sucsessfully' }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }

    } catch (err) {
        console.log('update username error ', err);
        return Response.json({ message: 'internav server error' }, { status: 500 })
    }
}