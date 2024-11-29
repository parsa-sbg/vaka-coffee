import toPersianNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";



type props = {
    image: string
    name: string
    price: number
    count: number
    disCount: number
}

function CartItem({ image, name, count, disCount, price }: props) {
    return (
        <div className='flex gap-2'>
            <div className='rounded-md overflow-hidden w-20 h-20 min-h-20 min-w-20'>
                <Image className='w-full h-full' quality={50} alt='' src={image} width={200} height={200} />
            </div>

            <div className='text-sm flex flex-col justify-evenly'>
                <p className='line-clamp-2'>{name}</p>

                <div className='flex items-center'>
                    <span>{toPersianNumber(count.toString())}</span>
                    <RxCross2 className='rotate-90 text-main' />
                    <span>
                        {toPersianNumber((price - (price * disCount / 100)).toString())}
                    </span>
                </div>
            </div>

            <div className=' transition-colors duration-300 h-full flex items-center justify-center mr-auto'>
                <MdOutlineDelete className='p-2 cursor-pointer hover:text-red-600 hover:border-red-600 border border-transparent rounded-full transition-colors duration-300' size={35} />
            </div>

        </div>
    )
}

export default CartItem