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
    name: string
    username: string
    phone: string
    password: string
    address?: Address
    role: 'ADMIN' | 'USER' | 'OWNER'
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
        required: false
    },
    role: {
        type: String, enum: ['USER', 'ADMIN', 'OWNER'],
        default: 'USER'
    }
})


// the model

const UserModel: UserModelInterface = mongoose.models.User || mongoose.model<UserDocument>('User', user)


export default UserModel