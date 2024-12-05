import { OrderInterface } from '@/models/Order'
import { calculateExpireTime } from '@/utils/calculateExpireTime'
import { toPersianDate } from '@/utils/toPersianDate'
import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'

type props = {
    order: OrderInterface
    isOdd: boolean
    number: number
}

function OrderItem({ order, isOdd, number }: props) {

    let orderStatus: string
    let orderStatusColor: string
    const { hoursRemaining } = calculateExpireTime(order.createdAt)


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
        case 'EXPIRED': {
            orderStatus = 'منقضی شده'
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


    return (
        <tr className={`${isOdd ? 'bg-[#0f0f0f]' : 'bg-secondary'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersianNumber(number.toString())}</span>
            </th>
            <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                <span className='block w-full text-center'>{order.ref ? toPersianNumber(order.ref.toString()) : '--'}</span>
            </th>
            <td className="px-3 lg:px-6 py-4">
                {toPersianDate(order.createdAt)}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {toPersianNumber(order.totalPrice.toLocaleString())} تومان
            </td>
            <td className={`px-3 lg:px-6 py-4 ${orderStatusColor}`}>
                {orderStatus}
            </td>
            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                        مشاهده
                    </button>

                    <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                        تغییر وضعیت
                    </button>

                </div>
            </td>
        </tr>
    )
}

export default OrderItem