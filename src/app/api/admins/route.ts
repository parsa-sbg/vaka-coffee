import UserModel from "@/models/User";
import { authUserWithToken } from "@/utils/server/auth";
import { connectToDataBase } from "@/utils/server/dataBase";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })
    if (user.role !== "OWNER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const reqBody = await req.json()

    try {
        connectToDataBase()
        const result = await UserModel.findByIdAndUpdate(reqBody._id, { role: reqBody.role })
        const updatedDatas = await UserModel.find({ role: reqBody.role == 'USER' ? 'ADMIN' : 'USER' }).sort({ _id: -1 })
        if (result) {
            return Response.json({ message: 'user role cahnged successfully', updatedDatas }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }
    } catch (err) {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}