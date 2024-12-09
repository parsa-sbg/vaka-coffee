import mongoose, { Model } from "mongoose";
import { UserInterface } from "./User";
import { ProductInterface } from "./Product";

export interface CommentInterface {
    _id: mongoose.Types.ObjectId
    user: UserInterface,
    createdAt: Date,
    score: number
    comment: string,
    isAccepted: boolean,
    product: ProductInterface
}

export interface CommentDocument extends Document, CommentInterface { }

export interface CommentModelInterface extends Model<CommentDocument> { }


const schema = new mongoose.Schema<CommentDocument>({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    product: {
        type : mongoose.Types.ObjectId,
        ref : 'product',
        required: true,
    },

    score: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    isAccepted: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})

export const CommentModel: CommentModelInterface = mongoose.models.Comment || mongoose.model('Comment', schema)