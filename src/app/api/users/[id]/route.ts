import { UserModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { NextRequest } from "next/server"

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {

    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user) return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })
    if (user.role !== "OWNER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    try {
        connectToDataBase()
        const result = await UserModel.findByIdAndDelete((await params).id)
        const allNewUsers = await UserModel.find({ role: "USER" }).sort({ _id: -1 })
        if (result) {
            return Response.json({ message: 'user removed successfullt', users: allNewUsers }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }
    } catch (err) {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}