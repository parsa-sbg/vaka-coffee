"use client"
import { OrderInterface } from '@/models/Order'
import React from 'react'
import OrderItem from './OrderItem'

type props = {
    orders: OrderInterface[]
}

function OrdersTable({ orders }: props) {
    return (
        <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

            <thead className="text-xs text-nowrap bg-secondary">
                <tr>
                    <th scope="col" className="px-1 py-3">
                        <span>شماره</span>
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        کد
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        تاریخ
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        قیمت کل
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        وضعیت
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        عملیات
                    </th>
                </tr>
            </thead>

            <tbody>

                {orders.map((order, index) => (
                    <OrderItem number={index + 1} order={order} isOdd={index % 2 == 0} key={order._id.toString()} />
                ))}

            </tbody>
        </table>
    )
}

export default OrdersTable