import { CartModel, connectToDataBase, productmodel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);


    const reqBody = await req.json();

    const validationSchema = z.object({
        product: z.string().min(1),
        count: z.number().min(1),
    });

    const parsedData = validationSchema.safeParse(reqBody);

    if (!parsedData.success) {
        return Response.json(parsedData, { status: 400 });
    }


    try {
        connectToDataBase();

        const targetProduct = await productmodel.findById(parsedData.data.product)
        if (!targetProduct) {
            return Response.json({ message: 'product not found' }, { status: 404 })
        }

        if (!user) {
            return Response.json({ message: 'user not found', foundProduct: targetProduct }, { status: 401 });
        }

        const { stock } = targetProduct;

        const targetCart = await CartModel.findOne({ user: user._id })
        const existingItem = targetCart?.cart.find(
            (item) => item.product.toString() === parsedData.data.product
        );

        const currentCount = existingItem ? existingItem.count : 0;
        const newTotalCount = +currentCount + +parsedData.data.count;

        if (newTotalCount > stock) {
            return Response.json(
                { message: `Cannot add more than ${stock} items to the cart` },
                { status: 409 }
            );
        }

        let updatedCart;

        if (existingItem) {

            updatedCart = await CartModel.findOneAndUpdate(
                { user: user._id, "cart.product": parsedData.data.product.toString() },
                {
                    $set: { 'cart.$.count': newTotalCount },
                },
                { new: true }
            ).populate("user").populate("cart.product");
        } else {
            updatedCart = await CartModel.findOneAndUpdate(
                { user: user._id },
                {
                    $push: {
                        cart: { product: parsedData.data.product, count: parsedData.data.count },
                    },
                },
                { upsert: true, new: true }
            ).populate("user").populate("cart.product");
        }

        return Response.json({
            message: 'product added to cart successfully',
            newCart: updatedCart,
        });

    } catch (err) {
        console.error('add product to cart error ==>>', err);
        return Response.json({ message: 'internal server error' }, { status: 500 });
    }
};