
import mongoose, { Document, Model } from "mongoose";

interface OtpDocument extends Document {
    phone: string;
    otpCode: string;
    createdAt: Date;
    expiresAt: Date;
}

export interface OtpModelInterface extends Model<OtpDocument> { }


const otpSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    otpCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date, required: true, }
})

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 3600 });
export const OtpModel: OtpModelInterface = mongoose.models.Otp || mongoose.model<OtpDocument>('Otp', otpSchema);