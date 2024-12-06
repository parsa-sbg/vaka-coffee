import { connectToDataBase, OrderModel } from "@/models";
import { calculateExpireTime } from "@/utils/calculateExpireTime";
import { authUserWithToken } from "@/utils/server/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


// re pay orders
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

        // get user order
        const order = await OrderModel.findById(orderId)
        if (!order) return Response.json({ message: 'order not found' }, { status: 404 })
        switch (order.status) {
            case 'CANCELED': {
                return Response.json({ message: 'order is canceled' }, { status: 400 })
            }
            case 'PENDING': {
                break
            }
            default: {
                return Response.json({ message: 'order is paid before' }, { status: 400 })
            }
        }
        const { isExpired } = calculateExpireTime(order.expireAt)


        if (isExpired !== 'PAID BEFORE' && isExpired) {
            return Response.json({ message: 'order is expired' }, { status: 400 })
        }


        const merchant_id = process.env.ZARINPAL_MERCHANT_ID
        if (!merchant_id) {
            throw new Error('ZARINPAL_MERCHANT_ID is not defiend')
        }
        const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL
        if (!PAYMENT_BASE_URL) {
            throw new Error('NEXT_PUBLIC_PAYMENT_BASE_URL is not defiend')
        }
        const ZARINPAL_BASE_URL = process.env.ZARINPAL_BASE_URL
        if (!ZARINPAL_BASE_URL) {
            throw new Error('ZARINPAL_BASE_URL is not defiend')
        }
        const SITE_DOMIN = process.env.SITE_DOMIN
        if (!SITE_DOMIN) {
            throw new Error('SITE_DOMIN is not defiend')
        }

        const res = await fetch(`${ZARINPAL_BASE_URL}/request.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                merchant_id,
                amount: order.totalPrice,
                currency: 'IRT',
                description: `تلاش مجدد برای پرداخت سفارش با آیدی ${order._id}`,
                callback_url: `${SITE_DOMIN}/verify`,
                metadata: {
                    mobile: user.phone
                }
            })
        })


        const data = await res.json()

        if (res.status == 200) {

            const authority = data.data.authority
            const paymentUrl = PAYMENT_BASE_URL + '/' + authority

            const updatedOrder = await OrderModel.findByIdAndUpdate(order._id, {
                authority
            })

            if (updatedOrder) {

                return Response.json({ message: 'order authority updated successfully', paymentUrl }, { status: 200 })

            } else {
                return Response.json({ message: 'internal server error' }, { status: 500 })
            }

        } else {
            return Response.json({ message: 'create zarinpal link error' }, { status: 500 })
        }



    } catch (err) {
        console.log('update order authority error ===>>>', err);

        return Response.json({ message: 'internal server erroor' }, { status: 500 })
    }

}