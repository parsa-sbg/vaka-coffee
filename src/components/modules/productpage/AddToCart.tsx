"use client"
import React, { useState } from 'react'

function AddToCart() {

    const [count, setCount] = useState(1)

    const plusHandler = () => {
        setCount(prev => prev + 1)
    }

    const minusHandler = () => {

        if (count == 1) return
        setCount(prev => prev - 1)
    }

    return (
        <div className='flex items-center gap-5 mt-6'>

            <div className='flex h-10 w-28 rounded-md'>
                <button onClick={minusHandler} className='text-lg py-2 px-3 h-full transition-colors duration-200 border-white border-opacity-60 hover:bg-main hover:border-main border-l-white border rounded-r-md'>-</button>
                <span className='flex items-center justify-center border-y border-white border-opacity-60 w-full'>{count}</span>
                <button onClick={plusHandler} className='text-lg py-2 px-3 h-full transition-colors duration-200 hover:bg-main hover:border-main border-white border-opacity-60 border-r-white border rounded-l-md'>+</button>
            </div>

            <div className=''>
                <button className='w-full text-nowrap bg-main text-bgColer font-semibold py-2 px-3 text-sm h-10 rounded-md transition-all duration-300 hover:bg-secondary hover:text-main' >افزودن به سبد خرید</button>
            </div>
        </div>
    )
}

export default AddToCart