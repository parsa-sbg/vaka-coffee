import { CommentModel, connectToDataBase } from "@/models"
import { authUserWithToken } from "@/utils/server/auth"
import { NextRequest } from "next/server"

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })


    try {
        await connectToDataBase()
        const result = await CommentModel.findByIdAndDelete((await params).id)
        const allnewComments = await CommentModel.find({}).sort({ _id: -1 }).populate('product').populate('user')
        if (result) {
            return Response.json({ message: 'comment deleted successfully', allComments: allnewComments }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }
    } catch (err) {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }
}
