import categoryModel from "@/models/Category"
import {authUserWithToken} from "@/utils/server/auth"
import {connectToDataBase} from "@/utils/server/dataBase"
import {uploadImage} from "@/utils/server/uploadImage"
import {CategoryImageFileSchema, categorySchema} from "@/validation/category"
import {NextRequest} from "next/server"

export const POST = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value
  const user = await authUserWithToken(token)

  if (!user || user.role == "USER")
    return Response.json(
      {message: "this route is protected and you can't access to it ."},
      {status: 401}
    )

  const formData = await req.formData()
  const name = formData.get("name")
  const shortName = formData.get("shortName")
  const icon = formData.get("icon")

  const newCatData = {
    name,
    shortName,
  }

  const iconParseddata = CategoryImageFileSchema.safeParse({icon})

  if (!iconParseddata.success) return Response.json(iconParseddata, {status: 400})

  const parsedData = categorySchema.safeParse(newCatData)
  if (!parsedData.success) return Response.json(parsedData, {status: 400})

  await connectToDataBase()

  const iconUrl = await uploadImage(iconParseddata.data.icon)

  if (!iconUrl) return Response.json({messgae: "error in upload the icon in cloud"})

  try {
    const isShortNameAlreadyExist = await categoryModel.findOne({
      shortName: parsedData.data.shortName,
    })
    if (isShortNameAlreadyExist)
      return Response.json({message: "این نام کوتاه قبلا استفاده شده است ."}, {status: 409})

    const result = await categoryModel.create({
      name: parsedData.data.name,
      shortName: parsedData.data.shortName,
      iconUrl: iconUrl,
    })
    const allCats = await categoryModel.find({}).sort({_id: -1})
    if (result) {
      return Response.json(
        {message: "category created successfully", allCategories: allCats},
        {status: 201}
      )
    }
    return Response.json({message: "internal serever error"}, {status: 500})
  } catch (err) {
    console.log("create category error => ", err)
    return Response.json({message: "internal serever error"}, {status: 500})
  }
}

export const GET = async (_req: NextRequest) => {
  await connectToDataBase()

  try {
    const categories = await categoryModel.find({})

    return Response.json({message: "categories list", categories}, {status: 200})
  } catch (err) {
    console.log("get categories error ==>>", err)
    return Response.json({message: "internal server error"}, {status: 500})
  }
}
