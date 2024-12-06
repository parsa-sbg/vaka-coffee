"use client"
import { OrderInterface } from '@/models/Order'
import { calculateExpireTime } from '@/utils/calculateExpireTime'
import { toPersianDate } from '@/utils/toPersianDate'
import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'
import PayAgainButton from './PayAgainButton'



type props = {
    order: OrderInterface
    hoursRemaining: number | "infinite"
    isExpired: boolean | "PAID BEFORE"
}

function OrderBox({ order, hoursRemaining, isExpired }: props) {


    let orderStatus: string
    let orderStatusColor: string

    const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL
    if (!PAYMENT_BASE_URL) {
        throw new Error('PAYMENT_BASE_URL is not defiend')
    }


    switch (order.status) {
        case 'PENDING': {
            orderStatus = `در انتظار پرداخت (${toPersianNumber(hoursRemaining.toString())} ساعت باقی مانده)`
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


    return (
        <div className='flex flex-col gap-3 pt-7'>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>سفارش</span>
                <span className='text-nowrap  text-xs sm:text-sm md:text-base tracking-widest'>{toPersianNumber(order.ref?.toString() || '__')}</span>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>تاریخ ثبت</span>
                <span className='text-nowrap tracking-wider text-xs sm:text-sm md:text-base'>{toPersianDate(order.createdAt).toString()}</span>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>وضعیت</span>
                <div className='flex items-center relative'>
                    <span className={`text-nowrap text-xs sm:text-sm md:text-base ${orderStatusColor}`}>{orderStatus}</span>

                </div>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>مبلغ کل</span>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>{toPersianNumber(order.totalPrice.toLocaleString())} تومان</span>
            </div>

            <div className='flex items-center justify-end'>
                <div className='flex items-center flex-wrap gap-1 justify-end'>
                    {order.status == 'PENDING' && !isExpired && <PayAgainButton orderId={order._id} />}
                    <button className='text-nowrap block text-sm bg-main text-bgColer px-4 py-1 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>مشاهده</button>
                </div>
            </div>

        </div>
    )
}

export default OrderBox