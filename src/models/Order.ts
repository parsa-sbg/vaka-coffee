import mongoose, { Model } from "mongoose";
import { Address, address, UserInterface } from "./User";
import { CartItemInterface, cartItemSchema } from "./Cart";


export interface OrderInterface {
    user: UserInterface,
    address: Address,
    phone: String,
    description: string
    authority: string
    status: 'PENDING' | 'EXPIRED' | 'PAID' | 'PREPARING' | 'SENT'
    cart: CartItemInterface[],
    totalPrice: number
}

export interface OrderDocument extends Document, OrderInterface { }

export interface OrderModelInterface extends Model<OrderDocument> { }


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
        type: String, enum: ['PENDING', 'EXPIRED', 'PAID', 'PREPARING', 'SENT'],
        required: true,
        default: 'PENDING'
    },

    cart: {
        type: [cartItemSchema],
        required: true
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }

})

export const OrderModel: OrderModelInterface = mongoose.models.Order || mongoose.model('Order', schema)