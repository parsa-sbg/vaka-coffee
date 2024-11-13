import mongoose, { Model } from "mongoose";


// types and interfaces

export interface CategoryInterface {
    _id: mongoose.Types.ObjectId
    name: string
    shortName: string
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
    }
})

// the model

const categoryModel: CategoryModelInterface = mongoose.models.category || mongoose.model('category', schema)

export default categoryModel