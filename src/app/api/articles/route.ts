import { connectToDataBase } from "@/models"
import { ArticleModel } from "@/models/Article"
import { authUserWithToken } from "@/utils/server/auth"
import { uploadImage } from "@/utils/server/uploadImage"
import { articleSchema } from "@/validation/article"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
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


    let imageUrl: null | string = null


    if (parsedData.data.image) {
        imageUrl = await uploadImage(parsedData.data.image) as string
    }

    try {

        connectToDataBase()

        const newArticle = await ArticleModel.create({
            title: parsedData.data.title,
            shortName: parsedData.data.shortName,
            description: parsedData.data.description,
            content: parsedData.data.content,
            image: imageUrl,
        })

        console.log(newArticle);
        if (newArticle) {
            return Response.json({ message: 'article created successfully', newArticle }, { status: 201 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }



    } catch (err) {
        console.log('create article error ==>>', err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }


}