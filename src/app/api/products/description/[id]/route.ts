import { connectToDataBase, productmodel } from "@/models"
import { authUserWithToken } from "@/utils/server/auth"
import { NextRequest } from "next/server"

export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }

) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const reqBody = await req.json()

    await connectToDataBase()

    try {

        const product = await productmodel.findById((await params).id)
        if (!product) return Response.json({ message: 'product not found' }, { status: 404 })

        product.description = reqBody.newDescription
        await product.save()


        return Response.json({ message: 'product description updated successfully' }, { status: 200 })


    } catch (err) {
        console.log('update product desc error => ', err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}