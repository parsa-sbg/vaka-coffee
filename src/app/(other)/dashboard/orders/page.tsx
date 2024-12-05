import OrderBox from '@/components/modules/dashboard/orders/OrderBox'
import { connectToDataBase, OrderModel } from '@/models'
import { authUserWithToken } from '@/utils/server/auth'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

async function page() {

  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/login', RedirectType.replace)

  const orders = await OrderModel.find({ user: user._id }).sort({ _id: -1 })


  return (
    <div className='flex flex-col gap-7 divide-y divide-main'>
      {orders.map(order => (
        <OrderBox order={JSON.parse(JSON.stringify(order))} key={order._id.toString()} />
      ))}
    </div>
  )
}

export default page