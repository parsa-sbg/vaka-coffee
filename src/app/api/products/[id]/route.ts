import { productmodel } from "@/models/Product"
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { uploadImage } from "@/utils/server/uploadImage"
import { productSchema } from "@/validation/product"
import { NextRequest } from "next/server"

export const DELETE = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })


    try {
        connectToDataBase()
        const result = await productmodel.findByIdAndDelete((await params).id)
        const allnewProducts = await productmodel.find({}).sort({ _id: -1 }).populate('category')
        if (result) {
            return Response.json({ message: 'products deleted successfully', allProducts: allnewProducts }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }
    } catch (err) {
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }
}


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
    const price = formData.get('price')
    const stock = formData.get('stock')
    const discount = formData.get('discount')
    const dynamicFields = formData.get('dynamicFields')
    const category = formData.get('category')
    const pictures = formData.getAll('pictures')

    const useOldImages = formData.get('useOldImages') === null ? true : formData.get('useOldImages')


    const updateProductDatas = {
        name,
        shortName,
        price: Number(price),
        stock: Number(stock),
        discount: Number(discount),
        dynamicFields: JSON.parse(dynamicFields as string),
        category: JSON.parse(category as string),
        pictures,
    }

    const parsedData = productSchema.safeParse(updateProductDatas)

    if (!parsedData.success) return Response.json({ message: 'invalid datas', data: parsedData.error }, { status: 400 })


    connectToDataBase()

    try {
        // check shortName duplication
        const isShortNameAlreadyExist = await productmodel.findOne({ shortName })
        if (isShortNameAlreadyExist) return Response.json({ message: 'این نام کوتاه قبلا استفاده شده است.' }, { status: 409 })


        const product = await productmodel.findById((await params).id)
        if (!product) return Response.json({ message: 'product not found' }, { status: 404 })

        let picturesUrl = null

        if (JSON.parse(useOldImages as string)) {
            picturesUrl = product.pictures
        } else {
            picturesUrl = await Promise.all(parsedData.data.pictures.map(pic => {
                return uploadImage(pic)
            }))
        }


        const updatedProduct = await productmodel.findByIdAndUpdate((await params).id, {
            name: parsedData.data.name,
            shortName: parsedData.data.shortName,
            price: parsedData.data.price,
            discount: parsedData.data.discount,
            stock: parsedData.data.stock,
            category: parsedData.data.category,
            dynamicFields: parsedData.data.dynamicFields,
            pictures: picturesUrl
        })

        if (updatedProduct) {
            const allProducts = await productmodel.find().sort({ _id: -1 }).populate('category')
            return Response.json({ message: 'product crete successfully', allProducts: allProducts }, { status: 201 })
        } else {
            return Response.json({ message: 'internal server error' }, { status: 500 })
        }

    } catch (err) {
        console.log('create new product error => ', err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}