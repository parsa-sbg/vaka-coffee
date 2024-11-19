import categoryModel from "@/models/Category"
import { productmodel } from "@/models/Product"
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { uploadImage } from "@/utils/server/uploadImage"
import { CategoryImageFileSchema, categorySchema } from "@/validation/category"
import { NextRequest } from "next/server"

export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const formData = await req.formData()
    const name = formData.get('name')
    const shortName = formData.get('shortName')
    const icon = formData.get('icon')


    const newCatData = {
        name,
        shortName,
    }

    const parsedData = categorySchema.safeParse(newCatData)

    if (!parsedData.success) return Response.json(parsedData, { status: 400 })

    connectToDataBase()

    const targetCategory = await categoryModel.findById((await params).id)
    if (!targetCategory) return Response.json({ message: 'category not found' }, { status: 404 })

    let iconUrl = null


    // Upload and use the new icon URL if the client sends a new icon; otherwise, reuse the old one
    if (icon && icon instanceof File) {
        const iconParsedData = CategoryImageFileSchema.safeParse({ icon })

        if (!iconParsedData.success) return Response.json(iconParsedData)

        iconUrl = await uploadImage(iconParsedData.data.icon as File)
    } else {
        iconUrl = targetCategory.iconUrl
    }

    if (!iconUrl) return Response.json({ message: 'error in upload the icon in cloud' })


    try {

        const isShortNameAlreadyExist = await categoryModel.findOne({ shortName: parsedData.data.shortName })
        if (isShortNameAlreadyExist && targetCategory.shortName !== parsedData.data.shortName) return Response.json({ message: 'این نام کوتاه قبلا استفاده شده است .' }, { status: 409 })


        const result = await categoryModel.findByIdAndUpdate((await params).id, { name: parsedData.data.name, shortName: parsedData.data.shortName, iconUrl })
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
            await productmodel.deleteMany({ category: (await params).id })
            return Response.json({ message: 'category updated successfully', allCategories: allCats }, { status: 200 })
        }
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    } catch (err) {
        console.log('create category error => ', err);
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    }
}