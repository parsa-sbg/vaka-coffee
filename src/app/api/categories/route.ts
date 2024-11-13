import categoryModel from "@/models/Category"
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { categorySchema } from "@/validation/category"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const reqBody = await req.json()

    const parsedData = categorySchema.safeParse(reqBody)
    if (!parsedData.success) return Response.json(parsedData, { status: 400 })

    connectToDataBase()

    try {
        const result = await categoryModel.create({
            name: reqBody.name,
            shortName: reqBody.shortName,
        })
        const allCats = await categoryModel.find({}).sort({ _id: -1 })
        if (result) {
            return Response.json({ message: 'category created successfully', allCategories: allCats }, { status: 201 })
        }
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    } catch (err) {
        console.log('create category error => ', err);
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    }
}