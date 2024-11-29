"use client"

import { CartItemInterface } from '@/models/Cart';
import toPersianNumber from '@/utils/toPersianNubmer';
import React, { useEffect, useState } from 'react'
import { PiShoppingCart } from "react-icons/pi";


type props = {
  userIntialCart: CartItemInterface[] | null
}

function CartIcon({ userIntialCart }: props) {

  console.log(userIntialCart);

  const [userCart, setUserCart] = useState(userIntialCart)

  useEffect(() => {
    if (!userIntialCart) {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setUserCart(localCart)
    }
  }, [])

  return (

    <div className='cursor-pointer group p-1 relative'>
      <PiShoppingCart className='group-hover:text-main transition-colors duration-200' size={25} />

      {userCart?.length
        ?
        <div className=' bg-main absolute text-bgColer top-0 left-0 rounded-full w-4 h-4 flex items-center justify-center'>
          <span className='text-xs'>{toPersianNumber(userCart.length.toString())}</span>
        </div>

        : ''
      }

    </div>

  )
}

export default CartIcon