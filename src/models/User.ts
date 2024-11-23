import mongoose, { Model } from "mongoose";


// types and interfaces

export interface Address {
    name: string;
    family: string;
    state: string;
    city: string;
    address: string;
    houseNumber: string;
}

export interface UserInterface {
    _id: mongoose.Types.ObjectId
    name: string
    lastName: string | undefined
    username: string
    phone: string
    password: string
    address: Address | undefined
    role: 'ADMIN' | 'USER' | 'OWNER'
    email: string | undefined
}

export interface UserDocument extends Document, UserInterface { }


export interface UserModelInterface extends Model<UserDocument> { }


// schemas

const address = new mongoose.Schema({
    name: { type: String, required: true },
    family: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    houseNumber: { type: String, required: true },
});

const user = new mongoose.Schema<UserDocument>({
    name: {
        required: true,
        type: String,
    },
    lastName: {
        type: String,
        default: undefined
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        length: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    address: {
        type: address,
        default: undefined,
        required: false
    },
    role: {
        type: String, enum: ['USER', 'ADMIN', 'OWNER'],
        default: 'USER'
    },
    email: {
        type: String,
        required: false,
        default: undefined
    }
})


// the model

const UserModel: UserModelInterface = mongoose.models.User || mongoose.model<UserDocument>('User', user)


export default UserModel