"use client"
import { OrderInterface } from '@/models/Order'
import React, { useState } from 'react'
import OrderItem from './OrderItem'
import Sort from './Sort'

type props = {
    intialOrders: OrderInterface[]
}

function OrdersTable({ intialOrders }: props) {

    const [orders, setOrders] = useState(intialOrders)

    const [shownOrders, setShownOrders] = useState(orders)


    return (
        <>
            <div className='flex justify-end mb-5'>
                <Sort allOrders={orders} setShownOrders={setShownOrders} />
            </div>

            <table className="rounded-md text-sm text-left rtl:text-right w-full">

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
                    {shownOrders.length
                        ? shownOrders.map((order, index) => (
                            <OrderItem setOrders={setOrders} number={index + 1} intialOrder={order} isOdd={index % 2 == 0} key={order._id.toString()} />
                        ))
                        : <tr className='mt-5 block'>
                            <td className='font-semibold'>سفارشی نیست !</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>


    )
}

export default OrdersTable