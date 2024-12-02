import { CartItemInterface } from '@/models/Cart'
import toPersianNumber from '@/utils/toPersianNubmer'
import mongoose from 'mongoose'
import Image from 'next/image'
import React, { memo } from 'react'
import { LuImageOff } from 'react-icons/lu'
import { MdOutlineDelete } from 'react-icons/md'

type props = {
    cartItem: CartItemInterface
    changeItemCount: (productId: mongoose.Types.ObjectId, newCount: number) => Promise<void>
    deleteFromCart: (product: mongoose.Types.ObjectId) => Promise<boolean>
}

const CartItem = memo(({ cartItem, changeItemCount, deleteFromCart }: props) => {


    const price = cartItem.product.price - (cartItem.product.price * cartItem.product.discount / 100)

    return (
        <div className='flex gap-2 lg:gap-5 pt-2.5 '>


            <div className='w-20 h-20 min-h-20 min-w-20 overflow-hidden rounded-md flex items-center'>
                {cartItem.product.pictures.length
                    ? <Image className='h-full w-full' alt='product image' width={200} height={200} src={cartItem.product.pictures[0]} />
                    : <div className='w-full h-full bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                }
            </div>

            <div className='grid w-full grid-cols-12 text-sm gap-2'>

                <div className='flex justify-center items-center gap-1 col-span-12 sm:col-span-3'>
                    <span className='line-clamp-3 text-center'>{cartItem.product.name}</span>
                </div>

                <div className='flex justify-between items-center col-span-12 border-b border-dashed border-secondary pb-2 sm:pb-0 sm:justify-center sm:col-span-3 sm:border-none'>
                    <span className='sm:hidden'>قیمت</span>
                    <span>{toPersianNumber(price.toLocaleString().toString())}</span>
                </div>

                <div className='flex justify-between items-center col-span-12 border-b border-dashed border-secondary pb-2 sm:pb-0 sm:justify-center sm:col-span-3 sm:border-none'>
                    <span className='sm:hidden'>تعداد</span>

                    <div className='flex h-9 text-sm w-24 rounded-md'>
                        <button onClick={() => {
                            if (cartItem.count - 1 == 0) return
                            changeItemCount(cartItem.product._id, cartItem.count - 1)
                        }} className={`hover:bg-main hover:border-main text-lg py-1 px-2.5 h-full transition-colors duration-200  border rounded-r-md`}>-</button>
                        <span className={`flex items-center justify-center border-y w-full`}>{cartItem.count}</span>
                        <button onClick={() => {
                            if (cartItem.count + 1 > cartItem.product.stock) return
                            changeItemCount(cartItem.product._id, cartItem.count + 1)
                        }} className={`hover:bg-main hover:border-main text-lg py-1 px-2.5 h-full transition-colors duration-200  border rounded-l-md`}>+</button>
                    </div>
                </div>

                <div className='flex justify-between items-center col-span-12 sm:col-span-3 sm:justify-center'>
                    <span className='sm:hidden'>جمع کل</span>

                    <span className='font-bold text-main text-center'>{toPersianNumber((price * cartItem.count).toLocaleString().toString())} تومان</span>
                </div>

            </div>
            <button>
                <MdOutlineDelete onClick={() => { deleteFromCart(cartItem.product._id) }} className='p-2 size-9 md:size-10 border border-transparent hover:border-red-600 hover:text-red-600 transition-colors duration-300 rounded-full' />
            </button>
        </div>
    )
})

export default CartItem