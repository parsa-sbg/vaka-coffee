import { UserModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { addressSchema } from "@/validation/address";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const reqBody = await req.json()

    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "user not found" }, { status: 404 })


    const parsedData = addressSchema.safeParse(reqBody)

    if (!parsedData.success) {
        return Response.json(parsedData)
    }



    try {

        const result = await UserModel.findByIdAndUpdate(user._id, {
            address: parsedData.data
        })

        if (result) {
            return Response.json({ message: 'user address updated sucsessfully' }, { status: 200 })
        } else {
            return Response.json({ message: 'internav server error' }, { status: 500 })
        }

    } catch (err) {
        console.log('update user address error ===>>', err);
        return Response.json({ message: 'internav server error' }, { status: 500 })
    }
}