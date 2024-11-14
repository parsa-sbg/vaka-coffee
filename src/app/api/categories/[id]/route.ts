import categoryModel from "@/models/Category"
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { categorySchema } from "@/validation/category"
import { NextRequest } from "next/server"

export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const reqBody = await req.json()

    const parsedData = categorySchema.safeParse(reqBody)
    if (!parsedData.success) return Response.json(parsedData, { status: 400 })

    connectToDataBase()

    try {
        const result = await categoryModel.findByIdAndUpdate((await params).id, { name: reqBody.name, shortName: reqBody.shortName })
        const allCats = await categoryModel.find({}).sort({ _id: -1 })
        if (result) {
            return Response.json({ message: 'category updated successfully', allCategories: allCats }, { status: 200 })
        }
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    } catch (err) {
        console.log('create category error => ', err);
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    }
}

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    connectToDataBase()

    try {
        const result = await categoryModel.findByIdAndDelete((await params).id)
        const allCats = await categoryModel.find({}).sort({ _id: -1 })
        if (result) {
            return Response.json({ message: 'category updated successfully', allCategories: allCats }, { status: 200 })
        }
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    } catch (err) {
        console.log('create category error => ', err);
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    }
}