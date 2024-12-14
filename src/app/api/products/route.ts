import { categoryModel } from "@/models"
import { productmodel } from "@/models/Product"
import { authUserWithToken } from "@/utils/server/auth"
import { connectToDataBase } from "@/utils/server/dataBase"
import { uploadImage } from "@/utils/server/uploadImage"
import { productSchema } from "@/validation/product"
import { NextRequest } from "next/server"


export const POST = async (req: NextRequest) => {
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

    const newProductDatas = {
        name,
        shortName,
        price: Number(price),
        stock: Number(stock),
        discount: Number(discount),
        dynamicFields: JSON.parse(dynamicFields as string),
        category: JSON.parse(category as string),
        pictures,
    }

    const parsedData = productSchema.safeParse(newProductDatas)

    if (!parsedData.success) return Response.json({ message: 'invalid datas', data: parsedData.error }, { status: 400 })


    await connectToDataBase()

    try {

        // check shortName duplication
        const isShortNameAlreadyExist = await productmodel.findOne({ shortName: parsedData.data.shortName })
        if (isShortNameAlreadyExist) return Response.json({ message: 'این نام کوتاه قبلا استفاده شده است.' }, { status: 409 })


        const picturesUrl = await Promise.all(parsedData.data.pictures.map(pic => {
            return uploadImage(pic)
        }))


        const newProduct = await productmodel.create({
            name: parsedData.data.name,
            shortName: parsedData.data.shortName,
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


export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams

    const categoryShortName = searchParams.get('categoryShortName')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')
    const search = searchParams.get('search')


    // min and max price validation 

    if (minPrice && isNaN(+minPrice)) {
        return Response.json({ message: 'Invalid minPrice value.' }, { status: 400 });
    }
    if (maxPrice && isNaN(+maxPrice)) {
        return Response.json({ message: 'Invalid maxPrice value.' }, { status: 400 });
    }

    connectToDataBase()
    const pipeline = []

    // add final price field
    pipeline.push({
        $addFields: {
            finalPrice: {
                $subtract: [
                    "$price",
                    { $multiply: ["$price", { $divide: ["$discount", 100] }] }
                ]
            }
        }
    });


    // price filtering
    if (minPrice || maxPrice) {
        pipeline.push({
            $match: {
                finalPrice: {
                    ...(minPrice ? { $gte: +minPrice } : {}),
                    ...(maxPrice ? { $lte: +maxPrice } : {})
                }
            }
        });
    }

    // category filtering
    if (categoryShortName) {
        try {
            const targetcategory = await categoryModel.findOne({ shortName: categoryShortName })
            if (targetcategory) {
                pipeline.push({
                    $match: {
                        category: targetcategory._id
                    }
                });
            }
        } catch {
        }
    }

    // sort
    switch (sort) {
        case 'lastest': {
            pipeline.push({
                $sort: { createdAt: -1 as 1 | -1 }
            })
            break
        }
        case 'lowprice': {
            pipeline.push({
                $sort: { finalPrice: 1 as 1 | -1 }
            })
            break
        }
        case 'hightprice': {
            pipeline.push({
                $sort: { finalPrice: -1 as 1 | -1 }
            })
            break
        }
        case 'score': {
            pipeline.push({
                $sort: { averageScore: -1 as 1 | -1 }
            })
            break
        }
        default: {
            pipeline.push({
                $sort: { createdAt: -1 as 1 | -1 }
            })
        }
    }

    // search
    if (search?.length) {
        pipeline.push({
            $match: {
                $search: {
                    $search: search
                }
            }
        })
    }



    try {
        const products = await productmodel.aggregate(pipeline)
        return Response.json(products)

    } catch (err) {
        console.log('get products error ===>>>', err);
        return Response.json({ message: 'internal server error' }, { status: 500 })
    }

}