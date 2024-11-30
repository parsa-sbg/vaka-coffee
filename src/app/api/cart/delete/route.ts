import { CartModel, connectToDataBase } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

export const DELETE = async (req: NextRequest) => {
    const token = (await cookies()).get('token')?.value;

    const user = await authUserWithToken(token);

    if (!user) {
        return Response.json({ message: 'User not authenticated' }, { status: 401 });
    }

    try {
        const reqBody = await req.json();

        const validationSchema = z.object({
            product: z.string().min(1),
        });

        const parsedData = validationSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return Response.json(parsedData.error.format(), { status: 400 });
        }

        const { product } = parsedData.data;

        await connectToDataBase();

        const updatedCart = await CartModel.findOneAndUpdate(
            { user: user._id },
            { $pull: { cart: { product } } },
            { new: true }
        ).populate("user").populate("cart.product");

        if (!updatedCart) {
            return Response.json({ message: 'Cart not found' }, { status: 404 });
        }

        return Response.json({
            message: 'Product removed from cart successfully',
            newCart: updatedCart,
        });
    } catch (err) {
        console.error('Error removing product from cart:', err);
        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};