import { connectToDataBase, OrderModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

// cancel order by user
export const PUT = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);

    if (!user || user.role == 'USER') {
        return Response.json({ message: 'this route is protected' }, { status: 401 })
    }

    const reqBody = await req.json()
    console.log(reqBody);


    const validationSchema = z.string(z.enum(['PAID', 'PREPARING', 'SENT', 'CANCELED']))

    const parsedData = validationSchema.safeParse(reqBody)
    if (!parsedData.success) {
        return Response.json({ message: 'invalid status', parsedData }, { status: 400 })
    }

    const orderId = (await params).id

    try {

        connectToDataBase()
        const updatedOrder = await OrderModel.findOneAndUpdate({ user: user._id, _id: orderId }, {
            status: parsedData.data,
            expireAt: parsedData.data == 'PENDING' ? new Date(Date.now() + 1000 * 60 * 60 * 24) : null
        }, { new: true })

        const allOrders = await OrderModel.find()

        if (updatedOrder) {
            return Response.json({ message: 'order status updated successfully', order: updatedOrder, allOrders }, { status: 200 })
        } else {
            return Response.json({ message: 'internal server erroor' }, { status: 500 })
        }

    } catch {
        return Response.json({ message: 'internal server erroor' }, { status: 500 })
    }
}