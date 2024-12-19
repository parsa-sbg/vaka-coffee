import CartItems from '@/components/modules/cart/CartItems/CartItems'
import CartTotalPrice from '@/components/modules/cart/CartTotalPrice/CartTotalPrice'
import { Metadata } from 'next'
import React from 'react'

function page() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-5'>

      <div className='col-span-2 md:col-span-8'> <CartItems /> </div>
      <div className='col-span-2 h-56 md:col-span-4'> <CartTotalPrice /> </div>

    </div>
  )
}

export default page


export const metadata : Metadata = {
  title: 'سبد خرید | قهوه واکا'
}