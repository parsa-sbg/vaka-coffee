import mongoose, { Model } from "mongoose";
import { Address, address, UserInterface } from "./User";
import { CartItemInterface } from "./Cart";
import { productSchema } from "./Product";


export interface OrderInterface {
    _id: mongoose.Types.ObjectId
    user: UserInterface,
    address: Address,
    phone: String,
    description: string
    authority: string
    status: 'PENDING' | 'PAID' | 'PREPARING' | 'SENT' | 'CANCELED'
    cart: CartItemInterface[],
    totalPrice: number
    ref: number
    createdAt: Date,
    expireAt: Date | null
}

export interface OrderDocument extends Document, OrderInterface { }

export interface OrderModelInterface extends Model<OrderDocument> { }


export const OrderCartItemSchema = new mongoose.Schema({
    product: {
        type: productSchema,
        required: true,
    },
    count: {
        type: Number,
        min: 1,
        required: true
    }
})

const schema = new mongoose.Schema<OrderDocument>({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    address: {
        type: address,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
        default: ''
    },

    authority: {
        type: String,
        required: true
    },

    status: {
        type: String, enum: ['PENDING', 'PAID', 'PREPARING', 'SENT', 'CANCELED'],
        default: 'PENDING'
    },

    cart: {
        type: [OrderCartItemSchema],
        required: true
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    ref: {
        type: Number,
        default: null
    },

    expireAt: {
        type: Date || null,
        required: true
    },


}, {
    timestamps: true
})

export const OrderModel: OrderModelInterface = mongoose.models.Order || mongoose.model('Order', schema)