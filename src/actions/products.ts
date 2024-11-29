"use server"

import { connectToDataBase, productmodel } from "@/models"
import { ProductInterface } from "@/models/Product"

export const getManyProductsById = async (productsIds: string[]): Promise<ProductInterface[]> => {
    try {

        connectToDataBase()
        const products = await productmodel.find({ _id: { $in: productsIds } })

        return JSON.parse(JSON.stringify(products))
    } catch {
        return []
    }
}