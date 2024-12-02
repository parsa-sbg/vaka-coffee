import { CartModel, connectToDataBase, productmodel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

export const PUT = async (req: NextRequest) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);


    const reqBody = await req.json();

    const validationSchema = z.object({
        product: z.string().min(1),
        newCount: z.number().min(1),
    });

    const parsedData = validationSchema.safeParse(reqBody);

    if (!parsedData.success) {
        return Response.json(parsedData, { status: 400 });
    }

    try {
        connectToDataBase();

        // check product stock
        const product = await productmodel.findById(parsedData.data.product)
        if (!product) {
            return Response.json({ message: 'product not found' }, { status: 404 })
        }

        if (product.stock < parsedData.data.newCount) {
            return Response.json(
                { message: `Cannot add more than ${product.stock} items to the cart` },
                { status: 409 }
            );
        }

        if (!user) {
            return Response.json({ message: 'user not found' }, { status: 401 });
        }

        const updatedCart = await CartModel.findOneAndUpdate(
            { user: user._id, 'cart.product': parsedData.data.product },
            { $set: { 'cart.$.count': parsedData.data.newCount } },
            { new: true }
        ).populate('user').populate('cart.product')

        return Response.json({
            message: 'cart updated successfully',
            newCart: updatedCart,
        });


    } catch (err) {
        return Response.json({ message: 'internal server error' }, { status: 500 });
    }
}