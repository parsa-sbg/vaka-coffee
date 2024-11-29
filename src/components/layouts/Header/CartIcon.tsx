"use client"

import { useContextCart } from '@/contexts/cartContext';
import { CartItemInterface } from '@/models/Cart';
import toPersianNumber from '@/utils/toPersianNubmer';
import React, { useEffect, useState } from 'react'
import { PiShoppingCart } from "react-icons/pi";
import Cover from '@/components/common/Cover';
import CartModal from './CartModal';
import { getManyProductsById } from '@/actions/products';


type props = {
  userIntialCart: CartItemInterface[] | null
}

function CartIcon({ userIntialCart }: props) {

  const [isCartOpen, setIsCartOpen] = useState(false)

  const [userCart, setUserCart] = useState(userIntialCart || [])

  const { contextCart, setContextCart, localCart, setLocalCart } = useContextCart()

  const windowClickHandler = () => {
    setIsCartOpen(false)
  }

  const toggleCart = (e: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setIsCartOpen(prev => !prev)
  }

  useEffect(() => {
    if (!userIntialCart) {
      console.log('set local cart');

      const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
      console.log(localCart);
      setLocalCart(localCart)
    } else {
      setContextCart(userIntialCart)
    }

    window.addEventListener('click', windowClickHandler)
    return () => {
      window.removeEventListener('click', windowClickHandler)
    }
  }, [])

  useEffect(() => {
    setUserCart(contextCart)
  }, [contextCart])


  useEffect(() => {

    getManyProductsById(localCart.map(item => item.productId.toString()))
      .then(products => {
        products.map((product, index) => {
          setUserCart([{ count: localCart[index].count, product }])
        })
      })
  }, [localCart])

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

        <CartModal isCartOpen={isCartOpen} userCart={userCart} />


      </div>
      <Cover visible={isCartOpen}></Cover>
    </>


  )
}

export default CartIcon