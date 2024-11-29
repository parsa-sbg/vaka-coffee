"use client"
import { useContextCart } from '@/contexts/cartContext'
import mongoose from 'mongoose'
import React, { useState } from 'react'

type props = {
    stock: number
    productId: mongoose.Types.ObjectId,
    productName: string
}

function AddToCart({ stock, productId, productName }: props) {

    const [count, setCount] = useState(1)
    const { addToCart } = useContextCart()

    const plusHandler = () => {
        if (count >= stock) return
        setCount(prev => prev + 1)
    }

    const minusHandler = () => {

        if (count == 1) return
        setCount(prev => prev - 1)
    }

    const btnClickHadler = () => {
        addToCart(productId, count, productName)
    }

    return (
        <div className=' mt-6'>

            <div className='flex items-center gap-5'>
                <div className='flex h-10 w-28 rounded-md'>
                    <button disabled={stock == 0} onClick={minusHandler} className={`${stock == 0 ? 'border-gray-600' : 'hover:bg-main hover:border-main border-white border-opacity-60 border-l-white'} text-lg py-2 px-3 h-full transition-colors duration-200  border rounded-r-md`}>-</button>
                    <span className={`${stock == 0 ? 'border-gray-600' : ' border-white border-opacity-60'} flex items-center justify-center border-y w-full`}>{stock == 0 ? '0' : count}</span>
                    <button disabled={stock == 0} onClick={plusHandler} className={`${stock == 0 ? 'border-gray-600' : 'hover:bg-main hover:border-main border-white border-opacity-60 border-r-white'} text-lg py-2 px-3 h-full transition-colors duration-200  border rounded-l-md`}>+</button>
                </div>

                <div className=''>
                    <button onClick={btnClickHadler} disabled={stock == 0} className={`${stock == 0 ? 'bg-gray-600' : ' bg-main hover:bg-secondary hover:text-main'} w-full text-nowrap text-bgColer font-semibold py-2 px-3 text-sm h-10 rounded-md transition-all duration-300`} >افزودن به سبد خرید</button>
                </div>
            </div>

            {stock == 0
                ? <span className='text-sm text-red-600 mt-5 block'>این محصول موجود نیست !</span>
                : <span className='text-sm mt-5 block'>{stock} عدد موجود است.</span>
            }
        </div>
    )
}

export default AddToCart