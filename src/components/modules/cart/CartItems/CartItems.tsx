"use client"

import { useContextCart } from '@/contexts/cartContext'
import React from 'react'
import CartItem from './CartItem'
import Link from 'next/link'

function CartItems() {

    const { contextCart, changeItemCount, deleteFromCart } = useContextCart()

    return (
        <div >
            <div className='hidden sm:grid grid-cols-4 pr-24 pl-16 lg:pr-26 lg:pl-18 gap-2 mb-1 pb-3 border-b-2 border-secondary'>
                <span className='text-center'>محصول</span>
                <span className='text-center'>قیمت</span>
                <span className='text-center'>تعداد</span>
                <span className='text-center'>قیمت کل</span>
            </div>
            <div className='flex flex-col gap-2.5 divide-y-2 divide-secondary'>
                {contextCart.length
                    ? contextCart.map(cartItem => (
                        <CartItem deleteFromCart={deleteFromCart} changeItemCount={changeItemCount} cartItem={cartItem} key={cartItem.product._id.toString()} />
                    ))
                    : <div className='mt-10'>
                        <p>
                            سبد خریدتون خالی شد ! <Link className='mt-3 transition-colors duration-300 hover:text-main animate-pulse' href={'/'}>بازگشت به سایت</Link>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartItems