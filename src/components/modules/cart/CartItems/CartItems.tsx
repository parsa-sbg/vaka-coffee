"use client"

import { useContextCart } from '@/contexts/cartContext'
import React from 'react'
import CartItem from './CartItem'

function CartItems() {

    const { contextCart, changeItemCount } = useContextCart()

    return (
        <div >
            <div className='hidden sm:grid grid-cols-4 pr-26 gap-2 mb-1 pb-3 border-b-2 border-secondary'>
                <span className='text-center'>محصول</span>
                <span className='text-center'>قیمت</span>
                <span className='text-center'>تعداد</span>
                <span className='text-center'>قیمت کل</span>
            </div>
            <div className='flex flex-col gap-2.5 divide-y-2 divide-secondary'>
                {contextCart.map(cartItem => (
                    <CartItem changeItemCount={changeItemCount} cartItem={cartItem} key={cartItem.product._id.toString()} />
                ))}
            </div>
        </div>
    )
}

export default CartItems