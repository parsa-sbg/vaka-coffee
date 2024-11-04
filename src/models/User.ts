import { UserDocument, UserModelInterface } from "@/types/user";
import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    family: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    houseNumber: { type: String, required: true },
});

const userSchema = new mongoose.Schema<UserDocument>({
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
        type: addressSchema,
        required: false
    }
})



const UserModel: UserModelInterface = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema)


export default UserModel