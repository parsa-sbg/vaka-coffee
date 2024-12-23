import OrderPage from '@/components/layouts/OrderPage/OrderPage'
import { Metadata } from 'next'
import React from 'react'

type props = {
    params: Promise<{ id: string }>
}

async function page(
    { params }: props
) {
    const orderID = (await params).id


    return (
        <div>
            <OrderPage backLink='/p-admin/orders' orderId={orderID} ></OrderPage>
        </div>
    )
}

export default page

export const metadata: Metadata = {
    title: "پنل مدیریت - سفارش ها",
  };
  