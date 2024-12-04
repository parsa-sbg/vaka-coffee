import { z } from "zod";
import { addressSchema } from "./address";
import { phoneSchema } from "./auth";

export const orderSchema = z.object({
    address: addressSchema,
    phone: phoneSchema,
    description: z.optional(z.string())
})