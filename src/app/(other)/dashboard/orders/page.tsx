import OrderBox from '@/components/modules/dashboard/orders/OrderBox'
import { connectToDataBase, OrderModel } from '@/models'
import { calculateExpireTime } from '@/utils/calculateExpireTime'
import { authUserWithToken } from '@/utils/server/auth'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

async function page() {

  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/login', RedirectType.replace)

  const orders = await OrderModel.find({ user: user._id }).sort({ _id: -1 })


  return (
    <div className='flex flex-col gap-7 divide-y divide-main'>

      {orders.length
        ? orders.map(order => {

          const { hoursRemaining, isExpired } = calculateExpireTime(order.expireAt)

          return <OrderBox hoursRemaining={hoursRemaining} isExpired={isExpired} intialOrder={JSON.parse(JSON.stringify(order))} key={order._id.toString()} />

        })
        :
        <div className='flex gap-4'>
          <span>هنوز سفارشی ندارید.</span>

          <Link className='flex items-center gap-1 transition-colors hover:text-main animate-pulse hover:animate-none' href={'/products'}>
            محصولات
            <BsArrowLeft />
          </Link>
        </div>
      }
    </div>
  )
}

export default page

export const metadata: Metadata = {
  title: "داشبورد - سفارش ها",
};
