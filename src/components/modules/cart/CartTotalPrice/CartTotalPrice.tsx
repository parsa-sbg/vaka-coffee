"use client"
import { useContextCart } from '@/contexts/cartContext'
import toPersianNumber from '@/utils/toPersianNubmer'
import Link from 'next/link'
import React from 'react'

function CartTotalPrice() {

  const { contextCart } = useContextCart()

  const totalPrice = contextCart.reduce((total, item) => {
    const priceWithDiscount = item.product.price - (item.product.price * item.product.discount / 100)
    const finalPrice = priceWithDiscount * item.count
    return total + finalPrice
  }, 0)


  return (
    <div className='border-2 p-5 rounded-lg border-secondary'>

      <h4 className='font-semibold'>جمع کل سبد خرید</h4>

      <div className='flex justify-between mt-10'>
        <span>مجموع</span>
        <span className='font-bold text-main'>{toPersianNumber(totalPrice.toLocaleString().toString())} تومان</span>
      </div>

      <Link href={'/checkout'} className='w-full block text-center bg-main text-bgColer py-1 px-3 rounded-md mt-5 transition-colors duration-300 hover:bg-secondary hover:text-main'>ادامه جهت تسویه حساب</Link>
    </div>
  )
}

export default CartTotalPrice