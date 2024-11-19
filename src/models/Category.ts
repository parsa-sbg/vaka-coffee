import mongoose, { Model } from "mongoose";
import { ProductInterface } from "./Product";

// types and interfaces

export interface CategoryInterface {
    _id: mongoose.Types.ObjectId
    name: string
    shortName: string
    iconUrl: string
    products?: ProductInterface[]
}

export interface categoryDocument extends Document, CategoryInterface { }


export interface CategoryModelInterface extends Model<categoryDocument> { }


// the schema

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,
        required: true
    }
})

schema.virtual('products', {
    ref: 'product',
    localField: '_id', 
    foreignField: 'category',
});

// فعال کردن قابلیت virtuals در زمان تبدیل به JSON یا Object
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true })

// the model

const categoryModel: CategoryModelInterface = mongoose.models.category || mongoose.model('category', schema)

export default categoryModel