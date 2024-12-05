"use client"

import { CartItemInterface } from '@/models/Cart';
import toPersianNumber from '@/utils/toPersianNubmer';
import React, { useEffect, useState } from 'react'
import { PiShoppingCart } from "react-icons/pi";
import Cover from '@/components/common/Cover';
import CartModal from './CartModal';
import { useCartStore } from '@/store/cartStore';


type props = {
  userIntialCart: CartItemInterface[] | null
}

function CartIcon({ userIntialCart }: props) {

  const [isCartOpen, setIsCartOpen] = useState(false)

  const [userCart, setUserCart] = useState(userIntialCart || [])

  const { cart, setCart, syncCartWithLocalCart, setLocalCart } = useCartStore()

  const windowClickHandler = () => {
    setIsCartOpen(false)
  }

  const toggleCart = (e: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsCartOpen(prev => !prev)
  }

  useEffect(() => {
    if (!userIntialCart) {
      setLocalCart(JSON.parse(localStorage?.getItem('cart') || '[]'))
      syncCartWithLocalCart()
    } else {
      setCart(userIntialCart)
    }

    window.addEventListener('click', windowClickHandler)
    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  }, [])

  useEffect(() => {
    setUserCart(cart)
  }, [cart])

  return (
    <>

      <div className=' group relative select-none z-50'>
        <PiShoppingCart onClick={(e) => { toggleCart(e) }} className={`${isCartOpen ? 'text-main' : ''} cursor-pointer p-1 group-hover:text-main transition-colors duration-200`} size={30} />

        {userCart?.length
          ?
          <div onClick={(e) => { toggleCart(e) }} className='cursor-pointer absolute bg-main text-bgColer -top-1 -left-1 rounded-full w-4 h-4 flex items-center justify-center'>
            <span className='text-xs'>{toPersianNumber(userCart.length.toString())}</span>
          </div>

          : ''
        }

        <CartModal setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} userCart={userCart} />


      </div>
      <Cover visible={isCartOpen}></Cover>
    </>


  )
}

export default CartIcon