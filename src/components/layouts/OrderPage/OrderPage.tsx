import { OrderModel } from '@/models'
import { calculateExpireTime } from '@/utils/calculateExpireTime'
import { toPersianDate } from '@/utils/toPersianDate'
import toPersianNumber from '@/utils/toPersianNubmer'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
import { FaArrowLeft } from 'react-icons/fa'


type props = {
    orderId: string
    backLink: string
}

async function OrderPage({ orderId, backLink, children }: PropsWithChildren<props>) {

    let orderStatus: string
    let orderStatusColor: string

    const order = await OrderModel.findById(orderId).populate('user').populate('cart.product')
    if (!order) {
        redirect('/dashboard/orders')
    }

    const { isExpired, hoursRemaining } = calculateExpireTime(order.expireAt)


    switch (order.status) {
        case 'PENDING': {
            orderStatus = `در انتظار پرداخت`
            orderStatusColor = 'text-yellow-600'
            break
        }
        case 'CANCELED': {
            orderStatus = 'لغو شده'
            orderStatusColor = 'text-red-600'
            break
        }
        case 'PAID': {
            orderStatus = 'پرداخت شده (در انتظار تایید)'
            orderStatusColor = 'text-green-600'
            break
        }
        case 'PREPARING': {
            orderStatus = 'در حال آماده سازی'
            orderStatusColor = 'text-yellow-600'
            break
        }
        case 'SENT': {
            orderStatus = 'ارسال شده'
            orderStatusColor = 'text-green-600'
            break
        }
    }

    if (isExpired !== 'PAID BEFORE' && isExpired) {
        orderStatus = 'منقضی شده'
        orderStatusColor = 'text-red-600'
    }

    const sendPrce = order.address.city == 'تهران' ? 56000 : 99000



    return (
        <div>

            <div className='flex justify-end'>
                <Link href={backLink} className='flex items-center gap-2'>
                    <span>بازگشت</span>
                    <FaArrowLeft />
                </Link>
            </div>

            <div>
                <p className='mt-5'>این سفارش در تاریخ <span className='text-main'>{toPersianDate(order.createdAt)}</span>  ثبت شده و در وضعیت <span className={`${orderStatusColor}`}>{orderStatus}</span> قرار داره . {hoursRemaining ? order.status == 'PENDING' && <span >( <span className='text-yellow-600 text-nowrap'>{hoursRemaining.toLocaleString('fa')} ساعت</span> تا انقضا )</span> : ''}</p>
                {order.ref ? <span className='tracking-wider mt-2 block'>شماره تراکنش : {toPersianNumber(order.ref.toString())}</span> : ''}
            </div>

            <div className='mt-8'>
                {children}
            </div>



            <div className='mt-8 border border-secondary p-5 rounded-xl'>
                <h4 className='font-bold text-lg'>جزئیات سفارش</h4>
                <div className=''>

                    {order.cart.map((item) => (
                        <div key={item.product._id.toString() + item.count} className={`flex justify-between items-center gap-4 py-5 border-b-2 border-dashed border-secondary`}>
                            <span className='font-semibold'><span className='text-main'>{toPersianNumber(item.count.toString())}</span> عدد {item.product.name}</span>
                            <span className='tracking-wider font-semibold text-nowrap text-main'>{toPersianNumber((item.count * (item.product.price - (item.product.price * item.product.discount / 100))).toLocaleString())} تومان</span>
                        </div>
                    ))}

                    <div className={`flex justify-between items-center gap-4 py-5 border-b-2 border-main border-opacity-40`}>
                        <span className='font-semibold'>{order.address.city == 'تهران' ? 'ارسال فوری به تهران ( پیک )' : 'ارسال به شهرستان ( پیشتاز )'}</span>
                        <span className='tracking-wider font-semibold text-nowrap text-main'>{toPersianNumber(sendPrce.toLocaleString())} تومان</span>
                    </div>

                    <div className={`flex justify-between items-center gap-4 py-5`}>
                        <span className='font-semibold'>مجموع</span>
                        <span className='tracking-wider font-semibold text-nowrap text-main'>{toPersianNumber(order.totalPrice.toLocaleString())} تومان</span>
                    </div>

                </div>
            </div>

            <div className='mt-8'>
                <h4 className='font-bold text-lg'>آدرس صورت حساب</h4>
                <div className=''>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>نام</span>
                        <span className='text-main font-semibold'>{order.address.name}</span>
                    </div>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>نام خانوادگی</span>
                        <span className='text-main font-semibold'>{order.address.family}</span>
                    </div>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>استان</span>
                        <span className='text-main font-semibold'>{order.address.state}</span>
                    </div>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>شهر</span>
                        <span className='text-main font-semibold'>{order.address.city}</span>
                    </div>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>آدرس</span>
                        <span className='text-main font-semibold'>{order.address.address}</span>
                    </div>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>پلاک</span>
                        <span className='text-main font-semibold'>{order.address.houseNumber}</span>
                    </div>

                    <div className='flex items-center gap-5 py-2'>
                        <span className='min-w-12'>شماره ثبت شده</span>
                        <span className='text-main font-semibold tracking-wide'>{toPersianNumber(order.phone.toString())}</span>
                    </div>

                </div>
            </div>

        </div>)
}

export default OrderPage