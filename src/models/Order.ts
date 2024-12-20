import mongoose, {Model} from "mongoose"
import {Address, address, UserInterface} from "./User"
import {CartItemInterface} from "./Cart"

// types
export interface OrderInterface {
  _id: mongoose.Types.ObjectId
  user: UserInterface
  address: Address
  phone: String
  description: string
  authority: string
  status: "PENDING" | "PAID" | "PREPARING" | "SENT" | "CANCELED"
  cart: CartItemInterface[]
  totalPrice: number
  ref: number
  createdAt: Date
  expireAt: Date | null
}

export interface OrderDocument extends Document, OrderInterface {}

export interface OrderModelInterface extends Model<OrderDocument> {}

// schemas

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  shortName: {
    type: String,
    required: true,
    unique: false
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    max: 100,
    min: 0,
    default: 0,
  },

  pictures: {
    type: [String],
    default: [],
  },

  dynamicFields: {
    type: [
      {
        key: {type: String, required: true},
        value: {type: String, required: true},
      },
    ],
  },

  stock: {
    type: Number,
    default: 0,
    min: 0,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },

  averageScore: {
    type: Number,
    max: 5,
    min: 1,
    default: 5,
  },

  description: {
    type: String || null,
    default: null,
  },
})

export const OrderCartItemSchema = new mongoose.Schema({
  product: {
    type: productSchema,
    required: true,
  },
  count: {
    type: Number,
    min: 1,
    required: true,
  },
})

const schema = new mongoose.Schema<OrderDocument>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      type: address,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
      default: "",
    },

    authority: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "PREPARING", "SENT", "CANCELED"],
      default: "PENDING",
    },

    cart: {
      type: [OrderCartItemSchema],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    ref: {
      type: Number,
      default: null,
    },

    expireAt: {
      type: Date || null,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const OrderModel: OrderModelInterface =
  mongoose.models.Order || mongoose.model("Order", schema)
