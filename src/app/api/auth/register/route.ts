import { userRegisterSchema } from "@/validation/auth/userRegisterSchema"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {

    const reqBody = await req.json()

    const parsedData = userRegisterSchema.safeParse(reqBody)

    if (!parsedData.success) {
        return Response.json(parsedData, {
            status: 400
        })
    }

    return Response.json('yessss')
}