import { connectToDataBase } from "@/models"
import { ArticleModel } from "@/models/Article"
import { authUserWithToken } from "@/utils/server/auth"
import { uploadImage } from "@/utils/server/uploadImage"
import { articleSchema } from "@/validation/article"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = (await cookies()).get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const formData = await req.formData()

    const title = formData.get('title')
    const shortName = formData.get('shortName')
    const image = formData.get('image') || undefined
    const description = formData.get('description')
    const content = formData.get('content')

    const parsedData = articleSchema.safeParse({
        title,
        shortName,
        image,
        description,
        content
    })

    if (!parsedData.success) {
        return Response.json(parsedData, { status: 400 })
    }

    const targetArticle = await ArticleModel.findById((await params).id)
    if (!targetArticle) {
        return Response.json({ message: 'article not found' }, { status: 404 })
    }


    let imageUrl: null | string = targetArticle.image


    if (parsedData.data.image) {
        imageUrl = await uploadImage(parsedData.data.image) as string
    }

    try {

        connectToDataBase()

        const isShortNameAlreadyExist = await ArticleModel.findOne({ shortName: parsedData.data.shortName })
        if (isShortNameAlreadyExist && targetArticle.shortName !== parsedData.data.shortName) return Response.json({ message: 'این نام کوتاه قبلا استفاده شده است .' }, { status: 409 })


        targetArticle.title = parsedData.data.title
        targetArticle.shortName = parsedData.data.shortName
        targetArticle.description = parsedData.data.description
        targetArticle.content = parsedData.data.content
        targetArticle.image = imageUrl

        const updatedArticle = await targetArticle.save()

        if (updatedArticle) {
            return Response.json({ message: 'article created successfully', updatedArticle }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }



    } catch (err) {
        console.log('create article error ==>>', err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }


}

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    await connectToDataBase()

    try {
        const result = await ArticleModel.findByIdAndDelete((await params).id)
        const allArticles = await ArticleModel.find({}).sort({ _id: -1 })
        if (result) {
            return Response.json({ message: 'category updated successfully', allArticles }, { status: 200 })
        }
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    } catch (err) {
        console.log('create category error => ', err);
        return Response.json({ message: 'internal serever error' }, { status: 500 })
    }
}