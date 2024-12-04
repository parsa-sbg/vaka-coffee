import { CartModel, connectToDataBase, OrderModel } from "@/models";
import { authUserWithToken } from "@/utils/server/auth";
import { orderSchema } from "@/validation/order";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const token = (await cookies()).get('token')?.value;
    const user = await authUserWithToken(token);

    if (!user) {
        return Response.json({ message: 'user not fount' }, { status: 401 })
    }

    const reqBody = await req.json();


    const parsedData = orderSchema.safeParse(reqBody);

    if (!parsedData.success) {
        return Response.json(parsedData, { status: 400 });
    }

    try {

        connectToDataBase()

        // get user cart
        const cart = await CartModel.findOne({ user: user._id }).populate('user').populate('cart.product')
        if (!cart) return Response.json({ message: 'cart not found' }, { status: 404 })
        if (!cart.cart.length) return Response.json({ message: 'the cart is empty' }, { status: 404 })

        const postPrice = parsedData.data.address.city == 'تهران' ? 56000 : 99000

        const totalCartPrice = cart.cart.reduce((total, item) => {
            const priceWithDiscount = item.product.price - (item.product.price * item.product.discount / 100)
            const finalPrice = priceWithDiscount * item.count
            return total + finalPrice
        }, 0)

        const finalPrice = totalCartPrice + postPrice


        const merchant_id = process.env.ZARINPAL_MERCHANT_ID
        if (!merchant_id) {
            throw new Error('ZARINPAL_MERCHANT_ID is not defiend')
        }
        const PAYMENT_BASE_URL = process.env.PAYMENT_BASE_URL
        if (!PAYMENT_BASE_URL) {
            throw new Error('PAYMENT_BASE_URL is not defiend')
        }
        const ZARINPAL_BASE_URL = process.env.ZARINPAL_BASE_URL
        if (!ZARINPAL_BASE_URL) {
            throw new Error('ZARINPAL_BASE_URL is not defiend')
        }

        const res = await fetch(`${ZARINPAL_BASE_URL}/request.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                merchant_id,
                amount: finalPrice,
                currency: 'IRT',
                description: `تسویه سبد خرید با آیدی ${cart._id}`,
                callback_url: '/'
            })
        })


        const data = await res.json()

        if (res.status == 200) {

            const authority = data.data.authority
            const paymentUrl = PAYMENT_BASE_URL + '/' + authority

            const newOrder = await OrderModel.create({
                user: user._id,
                address: parsedData.data.address,
                phone: parsedData.data.phone,
                description: parsedData.data.description,
                cart: cart.cart,
                authority,
                status: 'PENDING',
                totalPrice: finalPrice
            })

            if (newOrder) {

                await CartModel.findByIdAndUpdate(cart._id, {
                    cart: []
                })
                return Response.json({ message: 'order created successfully', paymentUrl }, { status: 201 })

            } else {
                return Response.json({ message: 'internal server error' }, { status: 500 })
            }

        } else {
            return Response.json({ message: 'create zarinpal link error' }, { status: 500 })
        }



    } catch (err) {
        console.log('create order error ===>>>', err);

        return Response.json({ message: 'internal server erroor' }, { status: 500 })
    }


}