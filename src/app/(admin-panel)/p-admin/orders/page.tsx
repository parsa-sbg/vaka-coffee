import OrdersTable from '@/components/modules/admin/orderes/OrdersTable'
import { connectToDataBase, OrderModel } from '@/models'
import React from 'react'

async function Orders() {

  connectToDataBase()
  const orders = await OrderModel.find().populate('user').populate('cart.product').sort({ _id: -1 })

  return (
    <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2'>
      <OrdersTable orders={JSON.parse(JSON.stringify(orders))} />
    </div>
  )
}

export default Orders