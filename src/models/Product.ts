import mongoose, { Model } from "mongoose";
import categoryModel, { CategoryInterface } from "./Category";


// types and interfaces

export interface DynamicField {
    key: string;
    value: string;
}

export interface ProductInterface {
    _id: mongoose.Types.ObjectId
    name: string
    price: number
    discount: number
    pictures: string[]
    dynamicFields: DynamicField[]
    stock?: number
    category: CategoryInterface & mongoose.Types.ObjectId
}

export interface ProductDocument extends Document, ProductInterface { }

export interface ProductModelInterface extends Model<ProductDocument> { }


// schema

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
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
    }
    
}, { timestamps: true })

export const productmodel: ProductModelInterface = mongoose.models.product || mongoose.model<ProductDocument>('product', schema)