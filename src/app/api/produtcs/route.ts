import { authUserWithToken } from "@/utils/server/auth"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const reqBody = await req.json()
}