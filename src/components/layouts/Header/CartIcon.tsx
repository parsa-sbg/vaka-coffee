"use client"

import { CartItemInterface } from '@/models/Cart';
import toPersianNumber from '@/utils/toPersianNubmer';
import React, { memo, useEffect } from 'react'
import { PiShoppingCart } from "react-icons/pi";
import Cover from '@/components/common/Cover';
import CartModal from './CartModal';
import { useCartStore } from '@/store/cartStore';
import { useCartModalStore } from '@/store/cartModalStore';


type props = {
  userIntialCart: CartItemInterface[] | null
}

const CartIcon = memo(({ userIntialCart }: props) => {

  const { isCartModalOpen, setIsCartModalOpen } = useCartModalStore()

  const { cart, setCart, syncCartWithLocalCart, setLocalCart } = useCartStore()

  const windowClickHandler = () => {
    setIsCartModalOpen(false)
  }

  useEffect(() => {
    if (!userIntialCart) {
      setLocalCart(JSON.parse(localStorage?.getItem('cart') || '[]'))
      syncCartWithLocalCart()
    } else {
      setCart(userIntialCart)
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }, [userIntialCart])

  const toggleCart = (e: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsCartModalOpen(!isCartModalOpen)
  }

  useEffect(() => {
    window.addEventListener('click', windowClickHandler)
    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  }, [])


  return (
    <>

      <div className=' group relative select-none z-50'>
        <PiShoppingCart onClick={(e) => { toggleCart(e) }} className={`${isCartModalOpen ? 'text-main' : ''} cursor-pointer p-1 group-hover:text-main transition-colors duration-200`} size={30} />

        {cart?.length
          ?
          <div onClick={(e) => { toggleCart(e) }} className='cursor-pointer absolute bg-main text-bgColer -top-1 -left-1 rounded-full w-4 h-4 flex items-center justify-center'>
            <span className='text-xs'>{toPersianNumber(cart.length.toString())}</span>
          </div>

          : ''
        }

        <CartModal />


      </div>
      <Cover visible={isCartModalOpen}></Cover>
    </>


  )
})

export default CartIcon