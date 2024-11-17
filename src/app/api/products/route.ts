import { productmodel } from "@/models/Product"
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { productSchema } from "@/validation/product"
import { S3 } from "aws-sdk"
import { NextRequest } from "next/server"


const uploadImage = async (pic: File) => {
    const accessKeyId = process.env.LIARA_CLOUD_ACCESS_KEY
    const secretAccessKey = process.env.LIARA_CLOUD_SECRET_KEY
    const endpoint = process.env.LIARA_CLOUD_API_ENDPOINT

    const bucket = process.env.LIARA_CLOUD_BUCKET

    if (!bucket || !endpoint || !secretAccessKey || !accessKeyId) return Response.json({ message: 'the .env file error' }, { status: 500 })

    const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
    });


    const params = {
        Bucket: bucket,
        Key: pic.name,
        Body: Buffer.from(await pic.arrayBuffer()),
    };

    const response = await s3.upload(params).promise();
    console.log('response ===>>>>>>>>', response);

    return s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: pic.name,
        Expires: 315360000000,
    });

}


export const POST = async (req: NextRequest) => {
    const token = req.cookies.get('token')?.value
    const user = await authUserWithToken(token)

    if (!user || user.role == "USER") return Response.json({ message: "this route is protected and you can't access to it ." }, { status: 401 })

    const formData = await req.formData()

    const name = formData.get('name')
    const price = formData.get('price')
    const stock = formData.get('stock')
    const discount = formData.get('discount')
    const dynamicFields = formData.get('dynamicFields')
    const category = formData.get('category')
    const pictures = formData.getAll('pictures')

    const newProductDatas = {
        name,
        price: Number(price),
        stock: Number(stock),
        discount: Number(discount),
        dynamicFields: JSON.parse(dynamicFields as string),
        category: JSON.parse(category as string),
        pictures,
    }

    const parsedData = productSchema.safeParse(newProductDatas)

    if (!parsedData.success) return Response.json({ message: 'invalid datas', data: parsedData.error }, { status: 400 })


    connectToDataBase()

    try {


        const picturesUrl = await Promise.all(parsedData.data.pictures.map(pic => {
            return uploadImage(pic)
        }))


        const newProduct = await productmodel.create({
            name: parsedData.data.name,
            price: parsedData.data.price,
            discount: parsedData.data.discount,
            stock: parsedData.data.stock,
            category: parsedData.data.category,
            dynamicFields: parsedData.data.dynamicFields,
            pictures: picturesUrl
        })

        if (newProduct) {
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