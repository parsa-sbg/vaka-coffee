import { connectToDataBase, OrderModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// cancel order by user
export const PUT = async (
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);

    if (!user) {
        return Response.json({ message: 'user not fount' }, { status: 401 })
    }

    const orderId = (await params).id

    try {

        connectToDataBase()
        const updatedOrder = await OrderModel.findOneAndUpdate({ user: user._id, _id: orderId },{
            status : "CANCELED"
        }, {new: true})

        if (updatedOrder) {
            return Response.json({ message: 'order status updated successfully', order: updatedOrder }, { status: 200 })
        }else {
            return Response.json({ message: 'internal server erroor' }, { status: 500 })
        }

    } catch {
        return Response.json({ message: 'internal server erroor' }, { status: 500 })
    }
}