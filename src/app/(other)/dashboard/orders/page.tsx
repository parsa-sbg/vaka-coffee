import OrderBox from '@/components/modules/dashboard/orders/OrderBox'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col gap-7 divide-y divide-main'>
      <OrderBox />
      <OrderBox />
      <OrderBox />
    </div>
  )
}

export default page