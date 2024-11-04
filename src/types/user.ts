import { Document, Model } from "mongoose";

export interface Address {
    name: string;
    family: string;
    state: string;
    city: string;
    address: string;
    houseNumber: string;
}

export interface User {
    name: string
    username: string
    phone: string
    password: string
    address?: Address
}

export interface UserDocument extends Document, User { }


export interface UserModelInterface extends Model<UserDocument> {}