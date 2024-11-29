import mongoose, { Model } from "mongoose";
import { UserInterface } from "./User";
import { ProductInterface } from "./Product";


// types 

export interface CartItemInterface {
    product: ProductInterface | mongoose.Types.ObjectId,
    count: number
}

export interface CartInterface {
    user: UserInterface | mongoose.Types.ObjectId
    cart: CartItemInterface[]
}

export interface CartDocument extends Document, CartInterface { }

export interface CartModelInterface extends Model<CartDocument> { }


// schemas

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    count: {
        type: Number,
        min: 1,
        required: true
    }
})

const cartSchema = new mongoose.Schema<CartDocument>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    cart: {
        type: [cartItemSchema],
        default: []
    }
})

export const CartModel: CartModelInterface = mongoose.models.Cart as CartModelInterface || mongoose.model<CartDocument>('Cart', cartSchema) 