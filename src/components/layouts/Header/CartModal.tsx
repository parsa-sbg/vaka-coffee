import React from 'react'
import CartItem from './CartItem'
import { CartItemInterface } from '@/models/Cart'

type props = {
    userCart: CartItemInterface[]
    isCartOpen: boolean
}

function CartModal({ userCart, isCartOpen }: props) {
    return (
        <div onClick={e => { e.stopPropagation() }} className={`${isCartOpen ? 'max-w-72 max-h-72  p-4 ' : ''} flex flex-col rounded-tl-sm shadow-custom shadow-black drop-shadow-lg transition-all duration-300 absolute max-h-0 max-w-0 overflow-hidden top-full left-3/4 w-80 h-80 bg-secondary rounded-2xl`}>

            <div className='overflow-scroll h-full no-scrollbar flex flex-col gap-4'>
                {userCart.length
                    ? userCart.map(item => (
                        <CartItem key={item.product._id.toString()} count={item.count} disCount={item.product.discount} price={item.product.price} name={item.product.name} image={item.product.pictures[0]} />
                    ))
                    : <div className='h-full flex items-center justify-center text-nowrap'>سبد خریدتون خالیه ...</div>
                }
            </div>
            <div className='mt-auto'>
                <div className='border-t-2 text-xs border-main pt-4 mt-4 flex items-center gap-3 justify-between'>
                    <button className='text-nowrap w-full bg-main h-7 text-bgColer font-semibold px-4 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>
                        مشاهده سبد خرید
                    </button>
                    <button className='text-nowrap w-full bg-main h-7 text-bgColer font-semibold px-4 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>
                        تسویه حساب
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartModal