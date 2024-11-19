import mongoose from "mongoose";
import categoryModel from "./Category";
import UserModel from "./User"; 
import { OtpModel } from "./Otp";
import { productmodel } from "./Product";

export { categoryModel, productmodel, UserModel, OtpModel };

export const connectToDataBase = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI!);
    }
};