
import { connectToDataBase, OrderModel } from '@/models'
import { calculateExpireTime } from '@/utils/calculateExpireTime'
import toPersianNumber from '@/utils/toPersianNubmer'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function page(
    { searchParams }: { searchParams: Promise<{ Status: string, Authority: string }> }
) {
    let isPaidSuccessfully: boolean
    let ref_id: number | null = null


    const status = (await searchParams).Status
    const authority = (await searchParams).Authority


    connectToDataBase()
    const order = await OrderModel.findOne({ authority })
    if (!order) {
        redirect('/')
    }
    const { hoursRemaining } = calculateExpireTime(order.expireAt)



    switch (status) {

        case 'OK': {
            const ZARINPAL_BASE_URL = process.env.ZARINPAL_BASE_URL
            if (!ZARINPAL_BASE_URL) throw new Error('ZARINPAL_BASE_URL is not defiend')

            const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID
            if (!ZARINPAL_MERCHANT_ID) throw new Error('ZARINPAL_MERCHANT_ID is not defiend')



            const res = await fetch(`${ZARINPAL_BASE_URL}/verify.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    merchant_id: ZARINPAL_MERCHANT_ID,
                    amount: order.totalPrice,
                    authority
                })
            })
            const data = await res.json()

            console.log('res =>', res);
            console.log('data =>', data);

            if (data.data?.code == 100 || data.data?.code == 101) {
                isPaidSuccessfully = true
                ref_id = data.data.ref_id
                await OrderModel.findOneAndUpdate({ _id: order._id, status: 'PENDING' }, { status: "PAID", ref: ref_id, expireAt: null })
            } else {
                isPaidSuccessfully = false
            }

            // Temporary
            // isPaidSuccessfully = true

            break
        }

        case 'NOK': {
            isPaidSuccessfully = false
            break
        }

        default: {
            redirect('/')
        }

    }


    return (
        <div className='flex items-center justify-center flex-col gap-5'>
            <h4 className={`text-center text-lg font-bold ${isPaidSuccessfully ? 'text-green-700' : 'text-red-700'}`}>{isPaidSuccessfully ? 'تراکنش موفق' : 'تراکنش ناموفق'}</h4>
            <div className='text-center'>{isPaidSuccessfully
                ? <p>سفارش با شماره تراکنش <span className='text-green-700 tracking-widest font-semibold'>{toPersianNumber(ref_id?.toString() || '')}</span> با موفقیت ثبت شد، میتونید در داشبورد خود وضعیت سفارش هاتون رو پیگیری کنین .</p>
                : <p>پرداخت ناموفق بود، میتونید در داشبود خود مجدد تلاش کنید. این سفارش {toPersianNumber((hoursRemaining).toString())} ساعت <span className='text-yellow-600'>در انتظار پرداخت</span> باقی میمونه و سپس منقضی میشه.</p>
            }</div>
            <Link href={'/dashboard/orders'} className='py-1 px-4 bg-main text-bgColer font-semibold rounded-md transition-colors duration-300 hover:bg-secondary hover:text-main block'>سفارش ها</Link>
        </div>
    )
}

export default page