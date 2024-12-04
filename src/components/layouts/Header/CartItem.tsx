import toPersianNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";
import { ProductInterface } from '@/models/Product';
import { LuImageOff } from 'react-icons/lu';
import { useCartStore } from '@/store/cartStore';



type props = {
    produtc: ProductInterface
    count: number
}

function CartItem({ produtc, count }: props) {


    const { price, discount } = produtc
    const { deleteFromCart } = useCartStore()


    return (
        <div className='flex gap-2'>
            <div className='rounded-md overflow-hidden w-20 h-20 min-h-20 min-w-20'>
                {produtc.pictures.length
                    ? <Image className='w-full h-full' quality={50} alt='' src={produtc.pictures[0]} width={200} height={200} />
                    : <div className='w-full h-full bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                    }

            </div>

            <div className='text-sm flex flex-col justify-evenly'>
                <p className='line-clamp-2'>{produtc.name}</p>

                <div className='flex items-center'>
                    <span>{toPersianNumber(count.toString())}</span>
                    <RxCross2 className='rotate-90 text-main' />
                    <span>
                        {toPersianNumber((price - (price * discount / 100)).toString())}
                    </span>
                </div>
            </div>

            <div className=' transition-colors duration-300 h-full flex items-center justify-center mr-auto'>
                <MdOutlineDelete onClick={() => { deleteFromCart(produtc._id) }} className='p-2 cursor-pointer hover:text-red-600 hover:border-red-600 border border-transparent rounded-full transition-colors duration-300' size={35} />
            </div>

        </div>
    )
}

export default CartItem