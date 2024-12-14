import mongoose, { Model } from "mongoose";
import { CategoryInterface } from "./Category";
import { CartModel } from "./Cart";


// types and interfaces

export interface DynamicField {
    key: string;
    value: string;
}

export interface ProductInterface {
    _id: mongoose.Types.ObjectId
    name: string
    shortName: string
    price: number
    discount: number
    pictures: string[]
    dynamicFields: DynamicField[]
    stock: number
    category: CategoryInterface & mongoose.Types.ObjectId
    averageScore: 1 | 2 | 3 | 4 | 5
    description: string | null
}

export interface ProductDocument extends Document, ProductInterface { }

export interface ProductModelInterface extends Model<ProductDocument> { }


// schema

export const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    shortName: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        max: 100,
        min: 0,
        default: 0
    },

    pictures: {
        type: [String],
        default: []
    },

    dynamicFields: {
        type: [
            {
                key: { type: String, required: true },
                value: { type: String, required: true }
            }
        ]
    },

    stock: {
        type: Number,
        default: 0,
        min: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },

    averageScore: {
        type: Number,
        max: 5,
        min: 1,
        default: 5
    },

    description: {
        type: String || null,
        default: null
    }

}, { timestamps: true })


productSchema.post('findOneAndDelete', async (deletedProduct: ProductInterface) => {
    if (deletedProduct) {
        await CartModel.updateMany({ 'cart.product': deletedProduct._id }, {
            $pull: { cart: { product: deletedProduct._id } }
        })
    }
})

export const productmodel: ProductModelInterface = mongoose.models.product || mongoose.model<ProductDocument>('product', productSchema)