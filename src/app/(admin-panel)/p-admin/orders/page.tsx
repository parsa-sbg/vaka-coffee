import OrdersTable from '@/components/modules/admin/orderes/OrdersTable'
import { connectToDataBase, OrderModel } from '@/models'
import { Metadata } from 'next'
import React from 'react'

async function Orders() {

  connectToDataBase()
  const orders = await OrderModel.find().populate('user').populate('cart.product').sort({ _id: -1 })

  return (
    <div className=' pb-2'>
      <OrdersTable intialOrders={JSON.parse(JSON.stringify(orders))} />
    </div>
  )
}

export default Orders

export const metadata: Metadata = {
  title: "پنل مدیریت - سفارش ها",
};
