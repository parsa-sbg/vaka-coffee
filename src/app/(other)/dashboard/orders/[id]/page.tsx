import OrderPage from '@/components/layouts/OrderPage/OrderPage';
import React from 'react'


type props = {
    params: Promise<{ id: string }>
}

async function page(
    { params }: props
) {

    const orderID = (await params).id

    return (
        <OrderPage backLink='/dashboard/orders' orderId={orderID} />
    )
}

export default page