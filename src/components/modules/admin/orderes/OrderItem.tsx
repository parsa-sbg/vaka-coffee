"use client"
import { OrderInterface } from '@/models/Order'
import { calculateExpireTime } from '@/utils/calculateExpireTime'
import { toPersianDate } from '@/utils/toPersianDate'
import toPersianNumber from '@/utils/toPersianNubmer'
import Link from 'next/link'
import React, { useState } from 'react'
import ChangeStatusDropDown from './ChangeStatusDropDown'

type props = {
    intialOrder: OrderInterface
    isOdd: boolean
    number: number
}

function OrderItem({ intialOrder, isOdd, number }: props) {

    const [order, setOrder] = useState(intialOrder)

    let orderStatus: string
    let orderStatusColor: string
    const { isExpired, hoursRemaining } = calculateExpireTime(order.expireAt)
    const [isLoading, setIsLoading] = useState(false)


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


    if (hoursRemaining !== 'infinite' && isExpired) {
        orderStatus = 'منقضی شده'
        orderStatusColor = 'text-red-600'
    }


    return (
        <tr className={`${isOdd ? 'bg-[#0f0f0f]' : 'bg-secondary'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersianNumber(number.toString())}</span>
            </th>
            <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                <span className='block w-full text-center'>{order.ref ? toPersianNumber(order.ref.toString()) : '--'}</span>
            </th>
            <td className="px-3 lg:px-6 py-4 text-nowrap">
                {toPersianDate(order.createdAt)}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {toPersianNumber(order.totalPrice.toLocaleString())} تومان
            </td>
            <td className={`px-3 lg:px-6 py-4 ${orderStatusColor}`}>
                {!isLoading
                    ? orderStatus
                    : <div className='w-3 h-3 border-x-2 border-main rounded-full animate-spin mx-auto' />
                }
            </td>
            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs justify-center'>

                    <Link href={`/p-admin/orders/${order._id}`} className={`${isOdd ? 'sm:hover:bg-secondary sm:hover:text-main' : 'sm:hover:bg-[#0f0f0f] sm:hover:text-main'} text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 `} >
                        مشاهده
                    </Link>

                    <ChangeStatusDropDown isLoading={isLoading} setIsLoading={setIsLoading} setOrder={setOrder} orderId={order._id} currentStatus={order.status} isExpired={isExpired} isOdd={isOdd} />

                </div>
            </td>
        </tr>
    )
}

export default OrderItem