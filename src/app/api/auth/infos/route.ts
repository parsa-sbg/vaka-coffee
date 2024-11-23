import { UserModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { updateUserInfosSchema } from "@/validation/auth";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const reqBody = await req.json()

    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "user not found" }, { status: 404 })

    const updateInfos = {
        name: reqBody.name,
        lastName: reqBody.lastName || undefined,
        email: reqBody.email || undefined
    }

    const parsedData = updateUserInfosSchema.safeParse(updateInfos)

    try {

        const result = await UserModel.findByIdAndUpdate(user._id, parsedData.data)
        if (result) {
            return Response.json({ message: 'user infos updated sucsessfully' }, { status: 200 })
        } else {
            return Response.json({ message: 'internav server error' }, { status: 500 })
        }

    } catch (err) {
        console.log('update user info error ', err);
        return Response.json({ message: 'internav server error' }, { status: 500 })
    }
}